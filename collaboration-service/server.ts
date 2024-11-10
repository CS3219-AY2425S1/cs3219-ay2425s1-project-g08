import express from "express";
import RoomServer from "./websocket";

const app = express();
const port = 1234;

const rooms = new Map<string, RoomServer>();

app.get("/join-room", (req, res) => {
    const { roomId } = req.query;
    console.log(`Joining room ${roomId}`);
    res.send(`Joining room ${roomId}`);
    if (roomId) {
        // Add the user to the room
        if (!rooms.has(roomId as string)) {
            const roomServer = new RoomServer(roomId as string);
            roomServer.start();
            rooms.set(roomId as string, roomServer);
        }
    }
});

app.get("/leave-room", (req, res) => {
    const { roomId } = req.query;
    res.send(`Leaving room ${roomId}`);
    if (roomId) {
        const roomServer = rooms.get(roomId as string);
        if (roomServer) {
            roomServer.onAnUserLeft();
            rooms.delete(roomId as string);
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
