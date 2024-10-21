import { Difficulty, Topic } from "../QueueService/matchingEnums";

export type CancelRequest = {
    readonly matchId: string,
    readonly difficulty: Difficulty,
    readonly topic: Topic
}