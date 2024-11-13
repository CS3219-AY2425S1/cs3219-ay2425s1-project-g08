import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const loggerRequestMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { method, url } = req;
    logger.info(`Incoming request: ${method} ${url}`);
    next();
};

export const loggerResponseMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const start = Date.now();
    
    res.on("finish", () => {
        const duration = Date.now() - start;
        logger.info(`Response: ${res.statusCode} ${req.method} ${req.url} - ${duration}ms`);
    });

    next();
}