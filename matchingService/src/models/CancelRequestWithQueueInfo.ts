import { Difficulty, Topic } from "../QueueService/matchingEnums";
import { CancelRequest } from "./CancelRequest";

/**
 * CancelRequestWithQueueInfo stores additional information - timestamp. 
 * This enables the consumer to remember which repsonse queue to reply to.
 */
class CancelRequestWithQueueInfo {
    private readonly matchId: string;
    private readonly difficulty: Difficulty;
    private readonly topic: Topic;

    private static readonly EXPIRATION_DURATION = 1 * 60 * 1000;
    private timestamp: Date;

    constructor(matchId: string, difficulty: Difficulty, topic: Topic) {
        this.matchId = matchId;
        this.difficulty = difficulty;
        this.topic = topic;
        this.timestamp = new Date();
    }

    public getMatchId(): string {
        return this.matchId;
    }

    public getDifficulty(): Difficulty {
        return this.difficulty;
    }

    public getTopic(): Topic {
        return this.topic;
    }

    public static createFromCancelRequest(cancelRequest: CancelRequest): CancelRequestWithQueueInfo {
        return new CancelRequestWithQueueInfo(cancelRequest.matchId, 
            cancelRequest.difficulty, cancelRequest.topic);
    }

    public hasExpired(): boolean {
        const currentTime = new Date().getTime();
        return currentTime - this.timestamp.getTime() > CancelRequestWithQueueInfo.EXPIRATION_DURATION;
    }
}

export default CancelRequestWithQueueInfo;