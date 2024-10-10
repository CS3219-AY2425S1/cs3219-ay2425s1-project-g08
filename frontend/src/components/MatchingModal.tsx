import { useState } from "react";
import io from "socket.io-client";
import IsConnected from "./IsConnected";

const MATCH_WEBSOCKET_URL: string = "ws://localhost:3001";

const MatchingModal: React.FC = () => {

    // --- Declare your states ---- 
    var matchId: string;
    var topic: string = "algorithm";
    var difficulty: string = "hard";

    const [isMatchFound, setIsMatchFound]= useState(false);

    const socket = io(MATCH_WEBSOCKET_URL, { autoConnect: false });

    async function handleFindMatchRequest() {
        const res = await fetch("http://localhost:3000/match/findMatch", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Mike2",
                topic: topic,
                difficulty: difficulty
            })
        });
        matchId = (await res.json()).matchId;

        socket.connect();
        socket.on("connect", () => {
            console.log("Connected to server", socket.id);
            socket.emit("joinMatchResponseRoom", matchId);

            socket.on("receiveMatchResponse", (data, ack) => {
                console.log("Received match response:", data);
                ack(true);
                socket.disconnect();
                // --- Successfully matched!!! ---
                // Change in some state here
                setIsMatchFound(true);
            });
            console.log(`Listening to room: ${matchId}`)
        });

        socket.on("disconnect", () => {
            socket.off();
            console.log("Disconnected from server");
        });
    }

    async function handleCancelMatchRequest() {
        console.log(`Cancelling request of matchId: ${matchId}`);
        await fetch(`http://localhost:3000/match/cancelMatch?matchId=${matchId}&topic=${topic}&difficulty=${difficulty}`, {
            mode: "cors",
            method: "DELETE",
        });
        socket.disconnect();
    }

  return (
    <div>
        <div>Found Match??: {isMatchFound ? <div>Found!</div> : <div>Not found yet</div>}</div>
        <button onClick={handleFindMatchRequest}>Find Match here</button>
        <button onClick={handleCancelMatchRequest}>Cancel match request! Ensure you press the above button first!!</button>
    </div>
  );
};

export default MatchingModal;
