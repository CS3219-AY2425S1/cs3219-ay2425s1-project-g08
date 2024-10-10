import winston, { Logger } from "winston";

const desiredLogLevel: string = "debug";

const logger: Logger = winston.createLogger({
    level: desiredLogLevel,
    format: winston.format.combine(
        winston.format.json(),
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp} ${level}]: ${message}`;
        })
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logs/combined.log' })
    ]
  });

export default logger;