import { Channel } from "amqplib";
import { Difficulty } from "./matchingEnums";
import logger from "../utils/logger";
import { Category } from "../models/Category";

/**
 * QueueManager manages the exchanges and queues of rabbitmq.
 */
class QueueManager {
    public static RESPONSE_QUEUE: string = "response";
    public static CANCELLATION_QUEUE: string = "cancellation";
    private categoryExchange: string;
    private directExchange: string;
    private channel: Channel;
    private categories: Category[];

    constructor(channel: Channel, categoryExchange: string, directExchange: string, categories: Category[]) {
        this.channel = channel;
        this.categoryExchange = categoryExchange;
        this.directExchange = directExchange;
        this.categories = categories;
    }

    public async createExchanges(): Promise<void> {
        await this.channel.assertExchange(this.categoryExchange, "headers", { durable: true });
        await this.channel.assertExchange(this.directExchange, "direct", { durable: true });
        logger.info("Successully set up exchanges");
    }

    public async setupQueues(): Promise<void> {
        for (const category of this.categories) {
            for (const difficulty of Object.values(Difficulty)) {
                const queueName = `${category.name}_${difficulty}`;
                await this.channel.assertQueue(queueName, { durable: true });

                await this.channel.bindQueue(queueName, this.categoryExchange, '', {
                    "x-match": 'all',
                    "category": category.name,
                    "difficulty": difficulty
                });
            }
        }

        // Create category queues that will be consumed by all consumers of that category
        for (const category of this.categories) {
            await this.channel.assertQueue(category.name, { durable: true });
            await this.channel.bindQueue(category.name, this.directExchange, category.name);
        }
        
        await this.channel.assertQueue(QueueManager.CANCELLATION_QUEUE, { durable: true });
        await this.channel.bindQueue(QueueManager.CANCELLATION_QUEUE, this.directExchange, QueueManager.CANCELLATION_QUEUE);

        await this.channel.assertQueue(QueueManager.RESPONSE_QUEUE, { durable: true });
        await this.channel.bindQueue(QueueManager.RESPONSE_QUEUE, this.directExchange, QueueManager.RESPONSE_QUEUE);
        logger.info("Successully created and binded queues to exchanges");
    }
}

export default QueueManager;