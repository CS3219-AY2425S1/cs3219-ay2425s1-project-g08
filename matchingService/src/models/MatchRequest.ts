import { Topic, Difficulty } from '../QueueService/matchingEnums';

export type MatchRequest = {
    readonly userId: string,
    readonly topic: Topic,
    readonly difficulty: Difficulty
}