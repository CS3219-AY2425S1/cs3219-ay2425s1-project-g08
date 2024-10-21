import { Channel } from "amqplib";
import { MatchRequest } from "../models/MatchRequest";
import { CancelRequest } from "../models/CancelRequest";
import {
    ConnectionManager,
    IConnectionManager,
} from "../config/ConnectionManager";
import ChannelNotFoundError from "../errors/ChannelNotFoundError";
import Consumer from "./Consumer";
import Producer from "./Producer";
import QueueManager from "./QueueManager";
import { Difficulty, Topic } from "./matchingEnums";
import logger from "../utils/logger";
import CancellationConsumer from "./CancellationConsumer";
import { v4 as uuidv4 } from "uuid";
import { MatchRequestDTO } from "../models/MatchRequestDTO";
import ResponseConsumer from "./ResponseConsumer";
import { Server } from "socket.io";

/**
 * QueueService manages message queues for RabbitMq.
 * It provides an interface for sending match request messages into the queues and match cancellation requests.
 */
class QueueService {
    private categoryExchange: string;
    private directExchange: string;
    private connectionManager: IConnectionManager;
    private queueManager: QueueManager;

    private constructor(
        categoryExchange: string,
        directExchange: string,
        connectionManager: IConnectionManager,
        queueManager: QueueManager
    ) {
        this.categoryExchange = categoryExchange;
        this.connectionManager = connectionManager;
        this.directExchange = directExchange;
        this.queueManager = queueManager;
    }

    public static async of(
        connectionUrl: string,
        categoryExchange: string,
        responseExchange: string
    ): Promise<QueueService> {
        logger.info(
            `Creating QueueService with connection URL: ${connectionUrl}`
        );
        var connectionManager: IConnectionManager = new ConnectionManager();
        await connectionManager.setup(connectionUrl);
        var channel: Channel = connectionManager.getChannel();

        const queueManager: QueueManager = new QueueManager(
            channel,
            categoryExchange,
            responseExchange
        );
        const service: QueueService = new QueueService(
            categoryExchange,
            responseExchange,
            connectionManager,
            queueManager
        );

        await service.init();
        await service.startConsumers();

        logger.info("QueueService initialized and consumers started");
        return service;
    }

    private async init(): Promise<void> {
        logger.info("Initializing QueueService");
        var channel: Channel | null = this.connectionManager.getChannel();
        if (!channel) {
            logger.error("Channel not found during initialization");
            return;
        }
        await this.queueManager.createExchanges();
        await this.queueManager.setupQueues();
        logger.info("QueueService initialized successfully");
    }

    public async startConsumers(): Promise<void> {
        var channel: Channel = this.connectionManager.getChannel();
        if (channel instanceof ChannelNotFoundError) {
            logger.error(channel.message);
            return;
        }

        const cancellationConsumer: CancellationConsumer =
            new CancellationConsumer(channel, this.directExchange);
        cancellationConsumer.consumeCancelRequest();
        for (const topic of Object.values(Topic)) {
            for (const difficulty of Object.values(Difficulty)) {
                const consumer: Consumer = new Consumer(
                    channel,
                    this.directExchange,
                    difficulty,
                    topic
                );
                cancellationConsumer.registerConsumer(
                    `${topic}_${difficulty}`,
                    consumer
                );
                await consumer.consumeMatchRequest(topic, difficulty);
                await consumer.consumeFallbackMatchRequest(topic);
            }
        }
        logger.info("Consumer successully initialised and consuming");
    }

    public async sendMatchRequest(matchRequest: MatchRequest): Promise<string> {
        const matchId: string = uuidv4();
        const matchReqWithId: MatchRequestDTO = {
            userId: matchRequest.userId,
            matchId: matchId,
            topic: matchRequest.topic,
            difficulty: matchRequest.difficulty,
            timestamp: new Date(),
            retries: 0,
        };

        logger.info(`Sending match request for match ID: ${matchId}`);
        var channel: Channel = this.connectionManager.getChannel();
        if (channel instanceof ChannelNotFoundError) {
            logger.error(channel.message);
            return "";
        }
        var producer: Producer = new Producer();
        const result = await producer.sendRequest(
            matchReqWithId,
            channel,
            this.categoryExchange,
            this.directExchange
        );
        logger.info(
            `Match request sent for match ID: ${matchId}, result: ${result}`
        );
        return matchId;
    }

    public async cancelMatchRequest(
        matchId: string,
        difficulty: Difficulty,
        topic: Topic
    ): Promise<void> {
        logger.info(`Canceling match request for match ID: ${matchId}`);
        var channel: Channel = this.connectionManager.getChannel();
        if (channel instanceof ChannelNotFoundError) {
            logger.error(channel.message);
            return;
        }
        var producer: Producer = new Producer();
        var req: CancelRequest = {
            matchId: matchId,
            difficulty: difficulty,
            topic: topic,
        };
        producer.sendCancelMessage(req, channel, this.directExchange);
        logger.info(`Cancellation request sent for match ID: ${matchId}`);
        return;
    }

    public async consumeResponses(io: Server) {
        logger.info("Consuming responses");
        var channel: Channel = this.connectionManager.getChannel();
        if (channel instanceof ChannelNotFoundError) {
            logger.error(channel.message);
            return;
        }
        var consumer: ResponseConsumer = new ResponseConsumer(channel, io);
        consumer.consumeResponses();
    }
}

export default QueueService;
