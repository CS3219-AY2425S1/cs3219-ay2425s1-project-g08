import { Server, Socket } from "socket.io";
import logger from "../utils/logger";

export class WebSocketEventHandler {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  public setUpListeners() {
    this.io.on("connection", (socket: Socket) => {
      socket.on("joinMatchResponseRoom", (matchId) =>
        this.handleJoinMatchResponseRoom(socket, matchId)
      );
      socket.on("matchRequestResponse", (matchId, data) =>
        this.handleMatchRequestResponse(socket, matchId, data)
      );
      socket.on("broadcast", (message) =>
        this.handleBroadcast(socket, message)
      );
      socket.on("disconnect", () => this.handleDisconnect(socket));
    });
  }

  private handleBroadcast(socket: Socket, message: string) {
    logger.info(`Broadcasting message: ${message}`);
    this.io.emit("broadcast", message);
  }

private handleMatchRequestResponse(socket: Socket, matchId: string, data: any) {
  this.io.to(matchId).emit("receiveMatchResponse", data);
  logger.info(`Match response sent to room: ${matchId}`);

    this.io.to(matchId).socketsLeave(matchId);
  }

  private handleDisconnect(socket: Socket) {
    logger.info(`Client disconnected: ${socket.id}`);
  }
}
