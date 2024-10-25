import { Difficulty } from "../QueueService/matchingEnums";
import { Category } from "./Category";

export type CancelRequest = {
    readonly matchId: string,
    readonly difficulty: Difficulty,
    readonly category: string
}