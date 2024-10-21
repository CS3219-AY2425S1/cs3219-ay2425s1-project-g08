import QueueService from "../QueueService/QueueService";
import MatchService from "../services/MatchService";
import MatchController from "../controllers/MatchController";
import { MatchRequest } from "../models/MatchRequest";
import logger from "../utils/logger";
import { Difficulty, Topic } from "../QueueService/matchingEnums";
import { Application } from "express";
import initialiseWebsocket from "../websocket/websocket";

export interface IQueueService {
    sendMatchRequest(matchRequest: MatchRequest): Promise<string>;
    cancelMatchRequest(matchId: string, difficulty: Difficulty, topic: Topic): Promise<void>;
}

/**
 * Initialises the different services, controllers and websocket.
 */
export async function initialiseServices(app: Application): Promise<MatchController> {
    const queueService: QueueService = await QueueService.of(process.env.RABBITMQ_URL || "amqp://localhost:5672", "gateway", "responseGateway");
    const matchService = new MatchService(queueService);
    const matchController = new MatchController(matchService);
    initialiseWebsocket(app, queueService);

    logger.info("Service initilisation completed");
    return matchController;
}