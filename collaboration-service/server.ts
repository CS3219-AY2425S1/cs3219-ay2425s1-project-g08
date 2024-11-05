import { WebSocketServer } from "ws";

const WEBSOCKET_PORT = 1234;

const wss = new WebSocketServer({ port: WEBSOCKET_PORT });

const roomMap = new Map<string, Set<any>>();

wss.on("connection", (ws, req) => {
    console.log(`Client connected with roomId: ${req.url}`);

    const roomId = req.url
        ? new URL(req.url, `ws://${req.headers.host}`).searchParams.get(
              "roomId"
          )
        : null;

    if (roomId) {
        if (!roomMap.has(roomId)) {
            roomMap.set(roomId, new Set());
        }
        console.log(`Adding client to room: ${roomId}`);
        roomMap.get(roomId)?.add(ws);
    }
    ws.on("message", (message) => {
        // Broadcast the message to all other clients
        console.log(`Received message: ${message}`);
        const roomId = req.url
            ? new URL(req.url, `ws://${req.headers.host}`).searchParams.get(
                  "roomId"
              )
            : null;
        if (roomId && roomMap.has(roomId)) {
            roomMap.get(roomId)?.forEach((client) => {
                if (client !== ws && client.readyState === client.OPEN) {
                    console.log(`Broadcasting message: ${message}`);
                    client.send(message);
                }
            });
        }
    });
});

console.log("WebSocket server is running on ws://localhost:1234");
