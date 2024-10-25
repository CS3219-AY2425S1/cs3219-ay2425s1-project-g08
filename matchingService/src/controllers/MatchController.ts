import { NextFunction, Request, Response } from "express";
import MatchService from "../services/MatchService";
import RequestValidator from "../validators/RequestValidator";
import { Difficulty } from "../QueueService/matchingEnums";

/**
 * MatchController handles the incoming requests related to user matching.
 * This class is responsible for parsing and validating incoming requests and packaging responses.
 */
export default class MatchController {
    private matchService: MatchService;
    private requestValidator: RequestValidator;

    constructor(matchService: MatchService, requestValidator: RequestValidator) {
        this.matchService = matchService;
        this.requestValidator = requestValidator;
    }

    public async findMatch(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, category, difficulty } = req.body;
            this.requestValidator.validateFindMatchRequest({ name, category, difficulty });

            const matchId: string = await this.matchService.findMatch(name, category, difficulty);
            
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
        const category: string = req.query.category as string;

        try {
            this.requestValidator.validateCancelMatchRequest(matchId, difficulty, category);
            this.matchService.cancelMatch(matchId, difficulty, category);
            return res.json({ success: true });
        } catch (error) {
            next(error);
        }
    }
}
