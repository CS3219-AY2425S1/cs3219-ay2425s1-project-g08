import { Channel } from "amqplib";
import { CancelRequest } from "../models/CancelRequest";
import { MessageHeader, CancelMessageHeader } from "../models/MessageHeaders";
import { v4 as uuidv4 } from 'uuid';
import logger from "../utils/logger";
import { MatchRequestDTO } from "../models/MatchRequestDTO";

/** 
 * Class representing a Producer that will push matchmaking requests into a header exchange.
 */
class Producer {
    public async sendRequest(msg: MatchRequestDTO, channel: Channel, exchange: string, responseExchange: string): Promise<boolean> {
        logger.info(`Sending match request for topic: ${msg.topic}, difficulty: ${msg.difficulty}`);
        
        const replyQueue = await channel.assertQueue("", { exclusive: true });
        const replyQueueName = replyQueue?.queue;
        if (!replyQueue) {
            logger.error("Failed to create response queue");
            return false;
        }

        const messageHeaders: MessageHeader = {
            topic: msg.topic,
            difficulty: msg.difficulty
        };

        channel.publish(exchange, "", Buffer.from(JSON.stringify(msg)), {
            headers: messageHeaders,
            replyTo: replyQueueName
        });

        logger.info(`Match request sent!`);
        return true;
    }

    public async sendCancelMessage(msg: CancelRequest, channel: Channel, directExchange: string): Promise<void> {
        logger.info(`Sending cancel request for match ID: ${msg.matchId}`);

        const replyQueue = await channel.assertQueue("", { exclusive: true });
        const replyQueueName = replyQueue?.queue;
        if (!replyQueue) {
            logger.error("Failed to create response queue");
            return;
        }

        const messageHeaders: CancelMessageHeader = {
            matchId: msg.matchId,
        };
        
        channel.publish(directExchange, "cancellation", Buffer.from(JSON.stringify(msg)), {
            headers: messageHeaders
        });

        logger.info(`Cancellation request sent`);
        return;
    }
}

export default Producer;
