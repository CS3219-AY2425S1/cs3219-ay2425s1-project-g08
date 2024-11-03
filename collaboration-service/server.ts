import { WebSocketServer } from "ws";

const WEBSOCKET_PORT = 1234;

const wss = new WebSocketServer({ port: WEBSOCKET_PORT });

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        // Broadcast the message to all other clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === client.OPEN) {
                client.send(message);
            }
        });
    });
});

console.log("WebSocket server is running on ws://localhost:1234");
