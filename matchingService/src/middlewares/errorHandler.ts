import { Request, Response, NextFunction } from "express";
import { InvalidDifficultyError, InvalidTopicError, MissingFieldError } from "../errors/ValidationError";
import logger from "../utils/logger";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof MissingFieldError 
            || err instanceof InvalidDifficultyError 
            || err instanceof InvalidTopicError) {
        return res.status(400).json({ error: err.message });
    }

    logger.debug("Unhandled error");
    return res.status(500).json({ error: "Internal server error" });
};

export default errorHandler;
