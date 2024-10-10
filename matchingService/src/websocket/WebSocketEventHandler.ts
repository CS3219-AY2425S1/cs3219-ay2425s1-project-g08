import { Server, Socket } from "socket.io";
import logger from "../utils/logger";

export class WebSocketEventHandler {
    private io: Server;

    constructor(io: Server) {
        this.io = io;
    }

    public setUpListeners() {
        this.io.on("connection", (socket: Socket) => {
            socket.on("joinMatchResponseRoom", (matchId) => this.handleJoinMatchResponseRoom(socket, matchId));
            socket.on("matchRequestResponse", (matchId, data) => this.handleMatchRequestResponse(socket, matchId, data));
            socket.on("disconnect", () => this.handleDisconnect(socket));
        })
    }

    private handleJoinMatchResponseRoom(socket: Socket, matchId: string) {
        socket.join(matchId);
        logger.info(`Client joined room: ${matchId}`);
    }

    private handleMatchRequestResponse(socket: Socket, matchId: string, data: any) {
        this.io.to(matchId).emit("receiveMatchResponse", data);
        logger.info(`Match resopnse tsent to room: ${matchId}`);

        this.io.to(matchId).socketsLeave(matchId);
    }

    private handleDisconnect(socket: Socket) {
        logger.info(`Client disconnected: ${socket.id}`);
    }
}