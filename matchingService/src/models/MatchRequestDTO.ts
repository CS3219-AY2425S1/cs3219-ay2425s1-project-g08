import { Difficulty, Topic } from "../QueueService/matchingEnums";

export type MatchRequestDTO = {
    readonly userId: string;
    readonly matchId: string;
    topic: Topic;
    difficulty: Difficulty;
    readonly timestamp: Date;
    retries: number;
}