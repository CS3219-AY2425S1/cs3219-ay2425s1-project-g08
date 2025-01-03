import express, { Application } from "express";
import createMatchingRouter from "./routes/matching";
import MatchController from "./controllers/MatchController";
import { initialiseServices } from "./config/bootstrap";
import {
    loggerRequestMiddleware,
    loggerResponseMiddleware,
} from "./middlewares/loggerMiddleware";
import logger from "./utils/logger";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";
import apiConfig from "./config/config";

async function main() {
    const app: Application = express();
    const matchController: MatchController = await initialiseServices(app);
    console.log("Expressjs from matching service: set origin to : ", apiConfig.frontendURL);
    app.use(
        cors({
            origin:`${apiConfig.frontendURL}`,
            methods: ["POST", "DELETE"],
        })
    );
    app.use(express.json());
    app.use(loggerRequestMiddleware);
    app.use(loggerResponseMiddleware);
    app.use("/match", createMatchingRouter(matchController));
    app.use(errorHandler);

    app.listen(3000, () => {
        logger.info("Server is running on port 3000");
    });
}

main();
