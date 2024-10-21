import { NextFunction, Request, Response } from "express";
import MatchService from "../services/MatchService";
import RequestValidator from "../validators/RequestValidator";
import { Difficulty, Topic } from "../QueueService/matchingEnums";

/**
 * MatchController handles the incoming requests related to user matching.
 * This class is responsible for parsing and validating incoming requests and packaging responses.
 */
export default class MatchController {
    private matchService: MatchService;

    constructor(matchService: MatchService) {
        this.matchService = matchService;
    }

    public async findMatch(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, topic, difficulty } = req.body;
            RequestValidator.validateFindMatchRequest({ name, topic, difficulty });

            const matchId: string = await this.matchService.findMatch(name, topic, difficulty);
            
            if (matchId) {
                return res.json({ matchId: matchId });
            } else {
                return res.status(500).json({ error: "Failed to process match request" });
            }
        } catch (error) {
            next(error);
        }
    }

    public async cancelMatch(req: Request, res: Response, next: NextFunction) {
        const matchId: string = req.query.matchId as string;
        const difficulty: Difficulty = req.query.difficulty as Difficulty;
        const topic: Topic = req.query.topic as Topic;

        try {
            RequestValidator.validateCancelMatchRequest(matchId, difficulty, topic);
            this.matchService.cancelMatch(matchId, difficulty, topic);
            return res.json({ success: true });
        } catch (error) {
            next(error);
        }
    }
}
