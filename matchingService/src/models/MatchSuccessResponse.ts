import { Difficulty } from "../QueueService/matchingEnums";

export type MatchSuccessResponse = {
    readonly userId: string;
    readonly matchId: string;
    readonly category: string;
    readonly difficulty: Difficulty;
    readonly roomId: string;
    readonly questionId: string;
}