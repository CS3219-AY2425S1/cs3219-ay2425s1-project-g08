import { Channel } from "amqplib"
import logger from "../utils/logger";
import QueueMessage from "../models/QueueMessage";
import { Server } from "socket.io";
import QueueManager from "./QueueManager";

export default class ResponseConsumer {
    private channel: Channel;
    private io: Server;
    
    constructor(channel: Channel, io: Server) {
        this.channel = channel;
        this.io = io;
    }

    public async consumeResponses() {
        logger.info("Consuming responses from queue: responses");
        this.channel.consume(QueueManager.RESPONSE_QUEUE, (msg) => {
            this.handleResponse(msg);
        }, { noAck: true });
    }

    private handleResponse(msg: QueueMessage | null): void {
        if (!msg) {
            logger.warn("Received null message in handleResponse");
            return;
        }

        const maxRetries = 10;
        const initialDelay = 100;

        const response = JSON.parse(msg.content.toString());
        const room = response.matchId;

        const sendWithRetry = async (attempt: number = 1): Promise<void> => { // Possible that user disconnected or experiencing delay in listening
            if (attempt > maxRetries) {
                logger.error(`Failed to deliver message after ${maxRetries} attempts for room: ${room}`);
                return;
            }
    
            logger.debug(`Attempt ${attempt} to send response to room: ${room}`);
    
            this.io.to(room).emit("receiveMatchResponse", response, (ackResponse: boolean) => {
                if (ackResponse) {
                    logger.debug(`Message acknowledged by client on attempt ${attempt} for room: ${room}`);
                } else {
                    const delay = initialDelay * 2 ** (attempt - 1);
                    logger.warn(`Client did not confirm receipt, retrying after ${delay}ms (Attempt ${attempt} of ${maxRetries})`);
    
                    setTimeout(() => sendWithRetry(attempt + 1), delay);
                }
            });
        };
    
        sendWithRetry();
    }
}