import { InvalidCategoryError, InvalidDifficultyError, MissingFieldError } from "../errors/ValidationError";
import { Category } from "../models/Category";
import { Difficulty } from "../QueueService/matchingEnums";

/**
 * RequestValidator checks if incoming requests contains all the required fields and that the difficulty and category are of valid values.
 */
class RequestValidator {
    private categories: Category[];
    public constructor(categories: Category[]) {
        this.categories = categories;
    }
    
    public validateFindMatchRequest(data: { name: string; category: string; difficulty: string }): void {
        const { name, category, difficulty } = data;
    
        const missingFields: string[] = [];
        if (!name) missingFields.push("name");
        if (!category) missingFields.push("category");
        if (!difficulty) missingFields.push("difficulty");
    
        if (missingFields.length > 0) {
            throw new MissingFieldError(missingFields);
        }
    
        if (!Object.values(Difficulty).includes(difficulty as Difficulty)) {
            throw new InvalidDifficultyError(difficulty);
        }
    
        var isValidCategory: boolean = false;
        for (const validCategory of this.categories) {
            if (category == validCategory.name) {
                isValidCategory = true;
                break;
            }
        }
        if (!isValidCategory) {
            throw new InvalidCategoryError(category);
        }
    }

    public validateCancelMatchRequest(matchId: string, difficulty: Difficulty, category: string): void {
        const missingFields: string[] = [];
        if (!matchId) missingFields.push("matchId");
        if (!category) missingFields.push("category");
        if (!difficulty) missingFields.push("difficulty");
        if (missingFields.length > 0) {
            throw new MissingFieldError(missingFields);
        }

        if (!Object.values(Difficulty).includes(difficulty as Difficulty)) {
            throw new InvalidDifficultyError(difficulty);
        }
    
        var isValidCategory: boolean = false;
        for (const validCategory of this.categories) {
            if (category == validCategory.name) {
                isValidCategory = true;
                break;
            }
        }
        if (!isValidCategory) {
            throw new InvalidCategoryError(category);
        }
    }
}

export default RequestValidator;