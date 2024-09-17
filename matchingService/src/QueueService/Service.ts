import { Channel } from "amqplib";
import MatchRequest from "../models/MatchRequest";
import { ConnectionManager, IConnectionManager } from "../config/ConnectionManager";
import ChannelNotFoundError from "../errors/ChannelNotFoundError";
import Consumer from "./Consumer";
import Producer from "./Producer";

const TOPIC_LIST: string[] = ["algorithm", "graph", "dp"];
const DIFFICULTY_LEVELS: string[] = ["easy", "medium", "hard"];

const testMessages: MatchRequest[] = [
    new MatchRequest("john", "algorithm", "hard"),
    new MatchRequest("amy", "algorithm", "medium"),
    new MatchRequest("johhny", "graph", "easy"),
    new MatchRequest("bob", "graph", "easy"),
    new MatchRequest("the builder", "dp", "medium"),
    new MatchRequest("johnny2.0", "algorithm", "hard"),
];

/**
 * Class representing a Service that initiates groups of Consumers.
 */
class Service {
    private categoryExchange: string;
    private responseExchange: string;
    private connectionManager: IConnectionManager;

    private constructor(categoryExchange: string, responseExchange: string, connectionManager: IConnectionManager) {
        this.categoryExchange = categoryExchange;
        this.connectionManager = connectionManager;
        this.responseExchange = responseExchange;
    }

    private async init(): Promise<void> {
        var channel: Channel | null = this.connectionManager.getChannel();
        if (!channel) {
            return;
        }
        this.createExchanges(channel);
        await this.setupQueues();
    }

    private async createExchanges(channel: Channel): Promise<void> {
        channel.assertExchange(this.categoryExchange, "headers", { durable: false });
        channel.assertExchange(this.responseExchange, "direct", { durable: false });
    }

    private async setupQueues(): Promise<void> {
        var channel: Channel = this.connectionManager.getChannel();
        if (channel instanceof ChannelNotFoundError) {
            console.error(channel.message);
            return;
        }
        for (const topic of TOPIC_LIST) {
            for (const difficulty of DIFFICULTY_LEVELS) {
                const queueName = `${topic}_${difficulty}`;
                await channel.assertQueue(queueName, { durable: false });
    
                await channel.bindQueue(queueName, this.categoryExchange, '', {
                    "x-match": 'all',
                    "topic": topic,
                    "difficulty": difficulty
                });
            }
        }
    }

    public static async of(connectionUrl: string, categoryExchange: string, responseExchange: string): Promise<Service> {
        var connectionManager: IConnectionManager = new ConnectionManager();
        var service: Service = new Service(categoryExchange, responseExchange, connectionManager);
        await connectionManager.setup(connectionUrl);
        await service.init();
        await service.startConsumers();
        return service;
    }

    public async startConsumers(): Promise<void> {
        var channel: Channel = this.connectionManager.getChannel();
        if (channel instanceof ChannelNotFoundError) {
            console.error(channel.message);
            return;
        }
        var consumer: Consumer = new Consumer();
        for (const topic of TOPIC_LIST) {
            for (const difficulty of DIFFICULTY_LEVELS) {
                await consumer.receiveMessages(topic, difficulty, this.responseExchange, channel);
            }
        }
    }

    public async startProducers(): Promise<void> {
        var channel: Channel = this.connectionManager.getChannel();
        if (channel instanceof ChannelNotFoundError) {
            console.error(channel.message);
            return;
        }
        var producer: Producer = new Producer();
        for (const testMessage of testMessages) {
            await producer.sendJsonMessage(testMessage, channel, this.categoryExchange, this.responseExchange);
        }
    }
}

export default Service;