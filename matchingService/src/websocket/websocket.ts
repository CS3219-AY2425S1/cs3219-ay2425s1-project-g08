import { Application } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import QueueService from "../QueueService/QueueService";
import { WebSocketEventHandler } from "./WebSocketEventHandler";
import logger from "../utils/logger";

export default function initialiseWebsocket(app: Application, queueService: QueueService) {
    const WEBSOCKET_PORT: number = 3001;
    const server = createServer(app);
    const io: Server = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });
    queueService.consumeResponses(io);

    const handler: WebSocketEventHandler = new WebSocketEventHandler(io);
    handler.setUpListeners();
    server.listen(WEBSOCKET_PORT);
    logger.info(`Websocket listening on port ${WEBSOCKET_PORT}`);
}