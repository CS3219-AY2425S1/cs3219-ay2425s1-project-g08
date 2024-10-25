import { IQueueService } from "../config/bootstrap";
import { MatchRequest } from "../models/MatchRequest";
import { Difficulty } from "../QueueService/matchingEnums";

/**
 * MatchService handles the business logic related to user matching.
 */
export default class MatchService {
    private queueService: IQueueService;

    constructor(queueService: IQueueService) {
        this.queueService = queueService;
    }

    public async findMatch(name: string, category: string, difficulty: Difficulty ): Promise<string> {
        const req: MatchRequest = {
            userId: name,
            category: category,
            difficulty: difficulty
        }
        return this.queueService.sendMatchRequest(req);
    }

    public async cancelMatch(matchId: string, difficulty: Difficulty, category: string): Promise<void> {
       return this.queueService.cancelMatchRequest(matchId, difficulty, category);
    }
}