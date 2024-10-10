import { Channel } from "amqplib";
import { Difficulty, Topic } from "./matchingEnums";
import logger from "../utils/logger";

/**
 * QueueManager manages the exchanges and queues of rabbitmq.
 */
class QueueManager {
    public static RESPONSE_QUEUE: string = "response";
    public static CANCELLATION_QUEUE: string = "cancellation";
    private categoryExchange: string;
    private directExchange: string;
    private channel: Channel;

    constructor(channel: Channel, categoryExchange: string, directExchange: string) {
        this.channel = channel;
        this.categoryExchange = categoryExchange;
        this.directExchange = directExchange;
    }

    public async createExchanges(): Promise<void> {
        await this.channel.assertExchange(this.categoryExchange, "headers", { durable: false });
        await this.channel.assertExchange(this.directExchange, "direct", { durable: false });
        logger.info("Successully set up exchanges");
    }

    public async setupQueues(): Promise<void> {
        for (const topic of Object.values(Topic)) {
            for (const difficulty of Object.values(Difficulty)) {
                const queueName = `${topic}_${difficulty}`;
                await this.channel.assertQueue(queueName, { durable: false });

                await this.channel.bindQueue(queueName, this.categoryExchange, '', {
                    "x-match": 'all',
                    "topic": topic,
                    "difficulty": difficulty
                });
            }
        }
        await this.channel.assertQueue(QueueManager.CANCELLATION_QUEUE, { durable: false });
        await this.channel.bindQueue(QueueManager.CANCELLATION_QUEUE, this.directExchange, QueueManager.CANCELLATION_QUEUE);

        await this.channel.assertQueue(QueueManager.RESPONSE_QUEUE, { durable: false });
        await this.channel.bindQueue(QueueManager.RESPONSE_QUEUE, this.directExchange, QueueManager.RESPONSE_QUEUE);
        logger.info("Successully created and binded queues to exchanges");
    }
}

export default QueueManager;
