import { Channel } from "amqplib";
import MatchRequest from "../models/MatchRequest";
import CancelRequest from "../models/CancelRequest";
import { MessageHeader, CancelMessageHeader } from "../models/MessageHeaders";
import { v4 as uuidv4 } from 'uuid';
import logger from "../utils/logger";
import MatchRequestWithId from "../models/MatchRequestWIthId";

/** 
 * Class representing a Producer that will push matchmaking requests into a header exchange.
 */
class Producer {
    public async sendRequest(msg: MatchRequestWithId, channel: Channel, exchange: string, responseExchange: string): Promise<boolean> {
        logger.info(`Sending match request for topic: ${msg.getTopic()}, difficulty: ${msg.getDifficulty()}`);
        
        const replyQueue = await channel.assertQueue("", { exclusive: true });
        const replyQueueName = replyQueue?.queue;
        if (!replyQueue) {
            logger.error("Failed to create response queue");
            return false;
        }

        const correlationId = uuidv4();
        const messageHeaders: MessageHeader = {
            topic: msg.getTopic(),
            difficulty: msg.getDifficulty()
        };

        channel.publish(exchange, "", Buffer.from(JSON.stringify(msg)), {
            headers: messageHeaders,
            replyTo: replyQueueName,
            correlationId: correlationId,
        });

        logger.info(`Match request sent with correlation ID: ${correlationId}`);
        return true;
    }

    public async sendCancelMessage(msg: CancelRequest, channel: Channel, directExchange: string): Promise<void> {
        logger.info(`Sending cancel request for match ID: ${msg.getMatchId()}`);

        const replyQueue = await channel.assertQueue("", { exclusive: true });
        const replyQueueName = replyQueue?.queue;
        if (!replyQueue) {
            logger.error("Failed to create response queue");
            return;
        }

        const correlationId = uuidv4();
        const messageHeaders: CancelMessageHeader = {
            matchId: msg.getMatchId(),
        };
        
        channel.publish(directExchange, "cancellation", Buffer.from(JSON.stringify(msg)), {
            headers: messageHeaders,
            replyTo: replyQueueName,
            correlationId: correlationId,
        });

        logger.info(`Cancellation request sent with correlation ID: ${correlationId}`);
        return;
    }
}

export default Producer;