import QueueService from "../QueueService/QueueService";
import MatchService from "../services/MatchService";
import MatchController from "../controllers/MatchController";
import { MatchRequest } from "../models/MatchRequest";
import logger from "../utils/logger";
import { Difficulty } from "../QueueService/matchingEnums";
import { Application } from "express";
import initialiseWebsocket from "../websocket/websocket";
import RequestValidator from "../validators/RequestValidator";
import { Category } from "../models/Category";
import { fetchData } from "../utils/http";

export interface IQueueService {
    sendMatchRequest(matchRequest: MatchRequest): Promise<string>;
    cancelMatchRequest(matchId: string, difficulty: Difficulty, category: string): Promise<void>;
}

/**
 * Initialises the different services, controllers and websocket.
 */
export async function initialiseServices(app: Application): Promise<MatchController> {
    const QUESTION_SERVICE_URL: string = `http://questionbank:8080`; // Change as required
    const categories: Category[] = await getQuestionCategories(QUESTION_SERVICE_URL);
    const requestValidator: RequestValidator = new RequestValidator(categories);
    const queueService: QueueService = await QueueService.of(process.env.RABBITMQ_URL || "amqp://localhost:5672", "gateway", "responseGateway", categories);
    const matchService = new MatchService(queueService);
    const matchController = new MatchController(matchService, requestValidator);
    initialiseWebsocket(app, queueService);

    logger.info("Service initilisation completed");
    return matchController;
}

async function getQuestionCategories(QUESTION_SERVICE_URL: string): Promise<Category[]> {
    var categories: Category[] = [];
    const res = await fetchData(`${QUESTION_SERVICE_URL}/categories`);
    categories = res._embedded.categoryDtoList.map((item: any): Category => ({
        name: item.name,
        displayName: item.displayName
    }));
    console.log(categories);
    return categories;
}