// import MatchRequestWithQueueInfo from "./IdentifiedMatchRequest";

class MatchRequest {
    private userId: string;
    private topic: string;
    private difficulty: string;

    constructor(userId: string, topic: string, difficulty: string) {
        this.userId = userId;
        this.topic = topic;
        this.difficulty = difficulty;
    }

    public getUserId(): string {
        return this.userId;
    }

    public getTopic(): string {
        return this.topic;
    }

    public getDifficulty(): string {
        return this.difficulty;
    }
}

export default MatchRequest;