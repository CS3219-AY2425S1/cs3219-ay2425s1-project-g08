import { Difficulty, Topic } from "../QueueService/matchingEnums";

export type MatchSuccessResponse = {
    readonly userId: string;
    readonly matchId: string;
    readonly topic: Topic;
    readonly difficulty: Difficulty;
    readonly roomId: string;
}