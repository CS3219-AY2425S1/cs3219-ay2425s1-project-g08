import { Difficulty } from '../QueueService/matchingEnums';

export type MatchRequest = {
    readonly userId: string,
    readonly category: string,
    readonly difficulty: Difficulty
}