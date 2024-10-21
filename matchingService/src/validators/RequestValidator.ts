import { InvalidDifficultyError, InvalidTopicError, MissingFieldError } from "../errors/ValidationError";
import { Difficulty, Topic } from "../QueueService/matchingEnums";

/**
 * RequestValidator checks if incoming requests contains all the required fields and that the difficulty and topic are of valid values.
 */
class RequestValidator {
    public static validateFindMatchRequest(data: { name: string; topic: string; difficulty: string }): void {
        const { name, topic, difficulty } = data;
    
        const missingFields: string[] = [];
        if (!name) missingFields.push("name");
        if (!topic) missingFields.push("topic");
        if (!difficulty) missingFields.push("difficulty");
    
        if (missingFields.length > 0) {
            throw new MissingFieldError(missingFields);
        }
    
        if (!Object.values(Difficulty).includes(difficulty as Difficulty)) {
            throw new InvalidDifficultyError(difficulty);
        }
    
        if (!Object.values(Topic).includes(topic as Topic)) {
            throw new InvalidTopicError(topic);
        }
    }

    public static validateCancelMatchRequest(matchId: string, difficulty: Difficulty, topic: Topic): void {
        const missingFields: string[] = [];
        if (!matchId) missingFields.push("matchId");
        if (!topic) missingFields.push("topic");
        if (!difficulty) missingFields.push("difficulty");
        if (missingFields.length > 0) {
            throw new MissingFieldError(missingFields);
        }
    }
}

export default RequestValidator;