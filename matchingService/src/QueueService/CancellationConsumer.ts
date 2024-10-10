import { Channel } from "amqplib";
import logger from "../utils/logger";
import { CancelRequest } from "../models/CancelRequest";
import CancelRequestWithQueueInfo from "../models/CancelRequestWithQueueInfo";
import QueueMessage from "../models/QueueMessage";
import Consumer from "./Consumer";
import QueueManager from "./QueueManager";

/**
 * CancellationConsumer listens to the cancellation queue and distributes the cancellation requests to the other consumers.
 */
export default class CancellationConsumer {
    private channel: Channel;
    private directExchange: string;
    private consumerMap: Map<string, Consumer> = new Map();

    constructor(channel: Channel, directExchange: string) {
        this.channel = channel;
        this.directExchange = directExchange;
    }

    public async consumeCancelRequest() {
        logger.info("Consuming cancellation requests from queue: cancellation");

        this.channel.consume(QueueManager.CANCELLATION_QUEUE, (msg) => {
            this.handleCancellationRequest(msg);
        }, { noAck: true });
    }

    private handleCancellationRequest(msg: QueueMessage | null): void {
        if (!msg) {
            logger.warn("Received null message in handleCancellationRequest");
            return;
        }

        try {
            logger.debug("Assigning cancellation request to consumer");
            var req: CancelRequest = this.parseCancelRequest(msg);
            const correlationId: string = msg.properties.correlationId;
            const replyQueue: string = msg.properties.replyTo;
            const reqWithInfo: CancelRequestWithQueueInfo = CancelRequestWithQueueInfo.createFromCancelRequest(req, correlationId);

            const consumer: Consumer | undefined = this.consumerMap.get(`${reqWithInfo.getTopic()}_${reqWithInfo.getDifficulty()}`);
            if (!consumer) {
                logger.debug("No consumer found for incoming request");
                return;
            }
            consumer.addCancelRequest(reqWithInfo);
            consumer.cancelIfPendingRequestCancelled();
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Error occurred while handling cancellation request: ${e.message}`);
            } else {
                logger.error(`Unexpected error occurred: ${JSON.stringify(e)}`);
            }
        }
    }

    private parseCancelRequest(msg: QueueMessage): CancelRequest {
        const content: string = msg.content.toString();
        if (!content) {
            logger.error("Message content should not be empty!");
            throw new Error("Message content should not be empty!");
        }
        
        logger.debug(`Parsing cancellation request content: ${content}`);
        const jsonObject = JSON.parse(content);
        logger.debug(`Parsed cancellation JSON object: ${JSON.stringify(jsonObject)}`);
        const req: CancelRequest = {
            matchId: jsonObject.matchId,
            difficulty: jsonObject.difficulty,
            topic: jsonObject.topic
        }
        return req;
    }

    public registerConsumer(key: string, consumer: Consumer) {
        this.consumerMap.set(key, consumer);
    }
}