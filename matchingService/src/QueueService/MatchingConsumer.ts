import { Channel } from "amqplib";
import QueueMessage from "../models/QueueMessage";
import CancelRequestWithQueueInfo from "../models/CancelRequestWithQueueInfo";
import logger from "../utils/logger";
import { MatchRequestDTO } from "../models/MatchRequestDTO";
import QueueManager from "./QueueManager";
import { v4 as uuidv4 } from "uuid";
import { Difficulty } from "./matchingEnums";
import { MatchSuccessResponse } from "../models/MatchSuccessResponse";
import { fetchData } from "../utils/http";

type Question = {
    id: string,
    title: string;
    description: string,
    categories: string[],
    complexity: string,
}

/** 
 * MatchingConsumer consumes incoming messages from queues that will contain Matchmaking requests
 * MatchMaking requests are partitioned based on (category, difficulty) 
 * */
class MatchingConsumer {
    private channel: Channel;
    private directExchange: string;
    private pendingReq: MatchRequestDTO | null;
    private cancelledMatches: Map<string, CancelRequestWithQueueInfo> = new Map();
    private cleanupInterval: NodeJS.Timeout;
    private pendingReqTimeout: NodeJS.Timeout | null = null;
    private category: string;
    private difficulty: Difficulty;

    constructor(channel: Channel, directExchange: string, difficulty: Difficulty, category: string) {
        this.channel = channel;
        this.directExchange = directExchange;
        this.pendingReq = null;
        this.difficulty = difficulty;
        this.category = category;

        // Incoming cancellation requests may reference non-existing matches. 
        // If these requests are not deleted from the hashmap, they will accumulate over time.
        // To prevent this, we regularly clean up expired cancellation requests from the hashmap.
        const intervalDuration = 5 * 60 * 1000;
        this.cleanupInterval = setInterval(() => this.cleanupExpiredCancellationRequests(), intervalDuration);
    }

    public async consumeMatchRequest(category: string, difficulty: string): Promise<void> {
        const queueName = `${category}_${difficulty}`;
        logger.info(`Consuming match requests from queue: ${queueName}`);
        
        await this.channel.consume(queueName, (message) => {
            this.handleMatchRequest(message);
        }, { noAck: true });
    }

    public async consumeFallbackMatchRequest(category: string): Promise<void> {
        await this.channel.consume(category, (message) => {
            this.handleFallbackMatchRequest(message);
        }, { noAck: true });
    }

    private async handleFallbackMatchRequest(msg: QueueMessage | null): Promise<void> {
        if (!msg) {
            logger.warn("Received null message in handleMatchRequest");
            return;
        }
        logger.debug("Consumer received fallback match request");
        try {
            const req: MatchRequestDTO = this.parseMatchRequest(msg);
            const maxRetries = Object.keys(Difficulty).length;

            if (req.retries >= maxRetries) {
                logger.warn("Removing match request with maximum retry");
                return;
            }
            req.retries++;
            if (!this.pendingReq) {
                const updatedMessageContent = Buffer.from(JSON.stringify(req));
                this.channel.sendToQueue(msg.fields.routingKey, updatedMessageContent, {persistent: true});
                return;
            }
            req.difficulty = this.difficulty; // Fallback request's difficulty will change depending on who is available
            await this.processMatchRequest(req);
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Error occurred while handling match request: ${e.message}`);
            } else {
                logger.error(`Unexpected error occurred: ${JSON.stringify(e)}`);
            }
        }
    }

    public addCancelRequest(req: CancelRequestWithQueueInfo) {
        this.cancelledMatches.set(req.getMatchId(), req);
        logger.debug("Added cancellation request to consumer: ", JSON.stringify(req));
    }

    public cancelIfPendingRequestCancelled() {
        if (!this.pendingReq) {
            logger.debug("No existing pending request encountered");
            return;
        }
        if (this.pendingReq && this.isCancelledMatchRequest(this.pendingReq.matchId)) {
            this.deletePendingMatchRequestById(this.pendingReq.matchId);
        }
    }

    private async handleMatchRequest(msg: QueueMessage | null): Promise<void> {
        if (!msg) {
            logger.warn("Received null message in handleMatchRequest");
            return;
        }
        
        logger.debug("Consumer received match request");
        try {
            const req: MatchRequestDTO = this.parseMatchRequest(msg);

            if (this.pendingReq && this.isCancelledMatchRequest(this.pendingReq.matchId)) {
                logger.debug("Deleting pending match");
                this.deletePendingMatchRequestById(this.pendingReq.matchId);
                return;
            }

            if (this.isCancelledMatchRequest(req.matchId)) { // Handle case whereby cancellation requests comes before match request due to latency issue
                logger.debug("Deleting new match request");
                this.deleteIncomingMatchRequestById(req.matchId);
                return;
            }

            await this.processMatchRequest(req);
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Error occurred while handling match request: ${e.message}`);
            } else {
                logger.error(`Unexpected error occurred: ${JSON.stringify(e)}`);
            }
        }
    }

    private parseMatchRequest(msg: QueueMessage): MatchRequestDTO {
        const content: string = msg.content.toString();
        if (!content) {
            logger.error("Message content is empty!");
            throw new Error("Message content is empty!");
        }

        logger.debug(`Parsing match request content: ${content}`);
        const jsonObject = JSON.parse(content);
        logger.debug(`Parsed JSON object: ${JSON.stringify(jsonObject)}`);
        const req: MatchRequestDTO = {
            userId: jsonObject.userId,
            matchId: jsonObject.matchId,
            category: jsonObject.category,
            difficulty: jsonObject.difficulty,
            timestamp: jsonObject.timestamp,
            retries: jsonObject.retries,
        }
        return req;
    }

    private async processMatchRequest(incomingReq: MatchRequestDTO): Promise<void> {
        logger.debug(`Processing match request: ${incomingReq.matchId}`);

        if (!this.pendingReq) {
            this.pendingReq = incomingReq;
            this.startPendingReqTimeout(incomingReq);
            logger.debug(`Stored pending request: ${incomingReq.matchId}`);
            return;
        }

        logger.debug(`Matching and responding to requests: ${this.pendingReq.matchId} and ${incomingReq.matchId}`);
        await this.matchAndRespond(this.pendingReq, incomingReq);
    }

    private async matchAndRespond(req1: MatchRequestDTO, req2: MatchRequestDTO): Promise<void> {
        logger.debug(`Responding to matched requests: ${req1.matchId} and ${req2.matchId}`);
        const roomId: string = uuidv4();
        const res: Question = await fetchData(`${process.env.QB_URL || "http://questionbank:8080"}/questions/category-and-complexity/random/${req1.category}/${req1.difficulty}`);
        logger.debug(res);
        const res1: MatchSuccessResponse = {
            userId: req1.userId,
            matchId: req1.matchId,
            category: req1.category,
            difficulty: req1.difficulty,
            roomId: roomId,
            questionId: res.id
        }
        const res2: MatchSuccessResponse = {
            userId: req2.userId,
            matchId: req2.matchId,
            category: req2.category,
            difficulty: req2.difficulty,
            roomId: roomId,
            questionId: res.id
        }

        this.channel.publish(this.directExchange, QueueManager.RESPONSE_QUEUE, Buffer.from(JSON.stringify(res1)), {persistent: true});
        this.channel.publish(this.directExchange, QueueManager.RESPONSE_QUEUE, Buffer.from(JSON.stringify(res2)), {persistent: true});

        logger.debug("Responses sent to matched requests");
        this.pendingReq = null;
        if (this.pendingReqTimeout) {
            clearTimeout(this.pendingReqTimeout);
            this.pendingReqTimeout = null;
        }
    }

    private startPendingReqTimeout(req: MatchRequestDTO): void {
        const timestamp = new Date(req.timestamp).getTime(); // Ensure timestamp is in milliseconds
        const expirationTime = 0.48 * 60 * 1000; // Give some buffer for frontend
        const currentTime = Date.now();

        const delay = (timestamp + expirationTime) - currentTime;
        if (delay > 0) {
            this.pendingReqTimeout = setTimeout(() => {
                logger.debug(`Pending request expired: ${req.matchId}`);
                this.pendingReq = null; // Clear the pending request
                this.channel.publish(this.directExchange, req.category, Buffer.from(JSON.stringify(req)), {persistent: true});
                logger.debug(`Expired request sent to ${req.category}`);
            }, delay);
        } else {
            logger.debug(`Pending request already expired: ${req.matchId}`);
            this.pendingReq = null; // Clear if already expired
        }
    }

    private deleteIncomingMatchRequestById(matchId: string): void {
        const cancellationResponseQueue: CancelRequestWithQueueInfo | null = this.getCancellationResponseQueue(matchId);
        if (!cancellationResponseQueue) {
            logger.warn("Missing response queue for cancellation");
            return;
        }
        
        if (this.isCancelledMatchRequest(matchId)) {
            logger.debug(`Deleting cancelled match request: ${matchId}`);
            this.cancelledMatches.delete(matchId);
        }
        return;
    }

    private deletePendingMatchRequestById(matchId: string): void {
        const cancellationResponseQueue: CancelRequestWithQueueInfo | null = this.getCancellationResponseQueue(matchId);
        if (!cancellationResponseQueue) {
            logger.warn("Missing response queue for cancellation");
            return;
        }
        
        if (this.isCancelledMatchRequest(matchId)) {
            logger.debug(`Deleting cancelled match request: ${matchId}`);
            this.cancelledMatches.delete(matchId);
            this.pendingReq = null;
            if (this.pendingReqTimeout) {
                clearTimeout(this.pendingReqTimeout);
                this.pendingReqTimeout = null;
            }
        }
        return;
    }

    private isCancelledMatchRequest(matchId: string): boolean {
        const isCancelled = this.cancelledMatches.has(matchId);
        logger.debug(`Match ID ${matchId} is cancelled: ${isCancelled}`);
        return isCancelled;
    }

    private getCancellationResponseQueue(matchId: string): CancelRequestWithQueueInfo | null {
        if (this.isCancelledMatchRequest(matchId)) {
            const cancelReq: CancelRequestWithQueueInfo | undefined = this.cancelledMatches.get(matchId);
            if (!cancelReq) {
                logger.warn(`Cancellation request not found for match ID: ${matchId}`);
                return null;
            }
            logger.debug(`Found cancellation request for match ID: ${matchId}`);
            return cancelReq;
        }
        return null;
    }

    private cleanupExpiredCancellationRequests(): void {
        logger.info("Cleaning expired match cancellation requests");
    
        this.cancelledMatches.forEach((cancelRequest, matchId) => {
            if (cancelRequest.hasExpired()) {
                logger.debug(`Expired cancellation request detected for match ID: ${matchId}`);
                this.cancelledMatches.delete(matchId);
            }
        });
    }
    
}

export default MatchingConsumer;