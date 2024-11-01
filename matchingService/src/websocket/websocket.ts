import { Application } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import QueueService from "../QueueService/QueueService";
import { WebSocketEventHandler } from "./WebSocketEventHandler";
import logger from "../utils/logger";
import apiConfig from "../config/config";

export default function initialiseWebsocket(
  app: Application,
  queueService: QueueService
) {
  const WEBSOCKET_PORT: number = 8082;
  const server = createServer(app);
  const io: Server = new Server(server, {
    cors: {
      origin: `${apiConfig.frontendURL}`,
      methods: ["GET", "POST"],
    },
  });
  queueService.consumeResponses(io);

  const handler: WebSocketEventHandler = new WebSocketEventHandler(io);
  handler.setUpListeners();
  server.listen(WEBSOCKET_PORT, () => {
    logger.info(`WebSocket server listening on port ${WEBSOCKET_PORT}`);
  });
}