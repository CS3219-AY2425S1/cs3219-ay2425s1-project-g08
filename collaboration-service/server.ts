import { WebSocketServer } from "ws";

const WEBSOCKET_PORT = 1234;

const wss = new WebSocketServer({ port: WEBSOCKET_PORT });

wss.on("connection", (ws, req) => {
    console.log(`Client connected: ${req.url}`);
    ws.on("message", (message) => {
        // Broadcast the message to all other clients
        const roomId = req.url
            ? new URL(req.url, `ws://${req.headers.host}`).searchParams.get(
                  "roomId"
              )
            : null;
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === client.OPEN) {
                const clientRoomId = new URL(
                    client.url,
                    `ws://${req.headers.host}`
                ).searchParams.get("roomId");
                if (clientRoomId === roomId) {
                    client.send(message);
                }
            }
        });
    });
});

console.log("WebSocket server is running on ws://localhost:1234");
