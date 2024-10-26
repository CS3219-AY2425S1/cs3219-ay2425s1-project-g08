import { Difficulty } from "../QueueService/matchingEnums";
import { CancelRequest } from "./CancelRequest";
import { Category } from "./Category";

/**
 * CancelRequestWithQueueInfo stores additional information - timestamp. 
 * This enables the consumer to remember which repsonse queue to reply to.
 */
class CancelRequestWithQueueInfo {
    private readonly matchId: string;
    private readonly difficulty: Difficulty;
    private readonly category: string;

    private static readonly EXPIRATION_DURATION = 1 * 60 * 1000;
    private timestamp: Date;

    constructor(matchId: string, difficulty: Difficulty, category: string) {
        this.matchId = matchId;
        this.difficulty = difficulty;
        this.category = category;
        this.timestamp = new Date();
    }

    public getMatchId(): string {
        return this.matchId;
    }

    public getDifficulty(): Difficulty {
        return this.difficulty;
    }

    public getCategory(): string {
        return this.category;
    }

    public static createFromCancelRequest(cancelRequest: CancelRequest): CancelRequestWithQueueInfo {
        return new CancelRequestWithQueueInfo(cancelRequest.matchId, 
            cancelRequest.difficulty, cancelRequest.category);
    }

    public hasExpired(): boolean {
        const currentTime = new Date().getTime();
        return currentTime - this.timestamp.getTime() > CancelRequestWithQueueInfo.EXPIRATION_DURATION;
    }
}

export default CancelRequestWithQueueInfo;