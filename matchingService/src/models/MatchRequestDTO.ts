import { Difficulty } from "../QueueService/matchingEnums";

export type MatchRequestDTO = {
    readonly userId: string;
    readonly matchId: string;
    category: string;
    difficulty: Difficulty;
    readonly timestamp: Date;
    retries: number;
}