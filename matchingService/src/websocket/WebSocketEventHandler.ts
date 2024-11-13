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
        
        this.io.of("/comm").on('connection', (socket) => {
            console.log('Client connected');
          
            /* Join a room */
            socket.on('joinRoom', ({ userId, roomId }) => {
              socket.join(roomId);
              console.log(`${userId} joined room ${roomId}`);
            });
          
            /* Send message to specific room */
            socket.on('sendMessage', ({roomId, message}) => {
              socket.to(roomId).emit('receiveMessage', message);
            });
          
            socket.on('disconnect', () => {
              console.log('Client disconnected');
            });
          })
    }

    private handleJoinMatchResponseRoom(socket: Socket, matchId: string) {
        socket.join(matchId);
        logger.info(`Client joined room: ${matchId}`);
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