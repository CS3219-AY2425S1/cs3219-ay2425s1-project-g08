import { WebSocketServer, WebSocket } from "ws";
import { v4 as uuidv4 } from "uuid";
import * as Y from "yjs";

const WEBSOCKET_PORT = 1234;

const wss = new WebSocketServer({ port: WEBSOCKET_PORT });

const generateUniqueId = () => {
    return uuidv4();
};

const clients: Map<string, WebSocket> = new Map(); // Map to store the clients

type room = { user_1: string; user_2: string };

const roomMap: Map<string, room> = new Map(); // Map to store the user in rooms

wss.on("connection", (ws: WebSocket) => {
    const uniqueId = generateUniqueId();
    const message = JSON.stringify({ type: "USER_ID", uniqueId: uniqueId });
    clients.set(uniqueId, ws);
    ws.send(message); // generate a unique ID for the client
});

function readBlobAsText(blob: Blob): any {
    let file = new Blob([blob], { type: "application/json" });
    const parsedData = null;
    file.text()
        .then((value) => {
            const parsedData = JSON.parse(value);
            console.log(parsedData);
        })
        .catch((error) => {
            console.log("Unable to parse data" + error);
        });
    return parsedData;
}

function joinRoom(roomId: string, userId: string) {
    if (roomMap.has(roomId)) {
        const room = roomMap.get(roomId);
        if (room) {
            if (clients.has(userId)) {
                room.user_2 = userId;
                // notify second user to join that the room is full
                const client = clients.get(userId);
                client?.send(JSON.stringify({ type: "room-full" }));
            } else {
                console.log(
                    "Unknown user ID. Didnt add user to room and send room full message to user"
                );
            }
        }
    } else {
        if (clients.has(userId)) {
            roomMap.set(roomId, { user_1: userId, user_2: "" });
        } else {
            console.log("Unknown user ID. Didnt add user to room");
        }
       
    }

    // second user to join will be notified that the room is full
}

function leaveRoom(roomId: string, userId: string) {
    if (roomMap.has(roomId)) {
        const room = roomMap.get(roomId);
        if (room) {
            const otherUserId =
                room.user_1 === userId ? room.user_2 : room.user_1;
            if (clients.has(otherUserId)) {
                const otherUserClient = clients.get(otherUserId);
                otherUserClient?.send(
                    JSON.stringify({ type: "other-user-left-room" })
                ); //notify other user that they have left the room
            }
        }
        roomMap.delete(roomId);
        console.log(`Room ${roomId} has been removed from roomMap.`);
    } else {
        console.log(
            `Room ${roomId} does not exist in roomMap or has already been removed.`
        );
    }
}

function createYdoc(roomId: string) {
    if (roomMap.has(roomId)) {
        const room = roomMap.get(roomId);
        if (room) {
            const ydoc = new Y.Doc();
            const ytext = ydoc.getText("monaco");
            const data = { type: "generatedYdoc", ydoc: ydoc, ytext: ytext };
            ytext.insert(0, "Hello world!");
            const client_1 = clients.get(room.user_1);
            const client_2 = clients.get(room.user_2);
            if (client_1) {
                client_1.send(JSON.stringify(data));
            } else {
                console.log(
                    "Unknown user ID. Didnt send generated Ydoc to user 1"
                );
            }
            if (client_2) {
                client_2.send(JSON.stringify(data));
            } else {
                console.log(
                    "Unknown user ID. Didnt send generated Ydoc to user 2"
                );
            }
        }
    }
}

wss.on("message", (message) => {
    console.log("Received message from client:", message);
    // Add any additional logic for when a message is received
    const messageData = readBlobAsText(message.data);
    switch (messageData.type) {
        case "join-room":
            joinRoom(messageData.roomId, messageData.userId);
            console.log("User joined room:", messageData.roomId);
            break;
        case "create-ydoc":
            console.log("Creating YDoc...");
            createYdoc(messageData.roomId);
            break;
        case "leave-room":
            leaveRoom(messageData.roomId, messageData.userId);
            console.log("User left room:", messageData.roomId);
            break;
        default:
            console.warn("Unknown message type:", messageData.type);
            break;
    }
});

console.log("WebSocket server is running on ws://localhost:1234");
