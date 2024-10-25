export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

export class MissingFieldError extends ValidationError {
    constructor(fields: string[]) {
        super(`Missing required fields: ${fields.join(", ")}`);
        this.name = "MissingFieldError";
    }
}

export class InvalidDifficultyError extends ValidationError {
    constructor(difficulty: string) {
        super(`Invalid difficulty level provided: ${difficulty}`);
        this.name = "InvalidDifficultyError";
    }
}

export class InvalidCategoryError extends ValidationError {
    constructor(category: string) {
        super(`Invalid category provided: ${category}`);
        this.name = "InvalidCategoryError";
    }
}
