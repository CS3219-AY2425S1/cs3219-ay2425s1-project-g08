import { Difficulty, Topic } from "../QueueService/matchingEnums";

export type MatchRequestDTO = {
    readonly userId: string;
    readonly matchId: string;
    readonly topic: Topic;
    readonly difficulty: Difficulty;
}