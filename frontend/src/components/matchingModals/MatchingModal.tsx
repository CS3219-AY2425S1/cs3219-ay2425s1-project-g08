import { useState } from "react";
import io from "socket.io-client";
import MatchingRequestForm from "./MatchingRequestForm";
import { MatchingRequestFormState } from "../../types/MatchingRequestFormState";
import Timer from "./Timer.tsx";
import { useUser } from "../../context/UserContext.tsx";
import IsConnected from "../IsConnected";

interface MatchingModalProps {
  closeMatchingModal: () => void;
}

const MATCH_WEBSOCKET_URL: string = "ws://localhost:8082";

const MatchingModal: React.FC<MatchingModalProps> = ({
  closeMatchingModal,
}) => {
  // --- Declare your states ----
  const [matchId, setMatchId] = useState("");
  const [formData, setFormData] = useState<MatchingRequestFormState>({
    topic: "",
    difficulty: "",
  });

  const { user } = useUser();

  const [isMatchFound, setIsMatchFound] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const socket = io(MATCH_WEBSOCKET_URL, { autoConnect: false });

  async function handleFindMatchRequest(formData: MatchingRequestFormState) {
    try {
      setShowTimer(true);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      socket.connect();
      socket.on("connect", () => {
        console.log("Connected to server", socket.id);
      });

      const res = await fetch("http://localhost:3000/match/findMatch", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user?.username, // set up with user context later
          topic: formData.topic,
          difficulty: formData.difficulty,
        }),
      });
      const data = await res.json();

      if (!data.matchId) {
        console.error("No match ID received");
        return;
      }
      
      setMatchId(data.matchId);

      // Execute socket logic after returning the response object
      socket.emit("joinMatchResponseRoom", data.matchId);

      socket.on("receiveMatchResponse", (responseData, ack) => {
        console.log("Received match response:", responseData);
        ack(true);
        // --- Successfully matched!!! ---
        // Change in some state here
        socket.emit("broadcast", `hi from ${user?.username}`);
        setShowTimer(false);
        setIsMatchFound(true);
      });
      console.log(`Listening to room: ${data.matchId}`);

      socket.on("broadcast", (message) => {
        console.log("Received broadcast message:", message);
      }); 

      socket.on("disconnect", () => {
        socket.off();
        console.log("Disconnected from server");
      });

      return data;
    } catch (error) {
      console.error("Error finding match:", error);
      return;
    }
  }

  async function handleCancelMatchRequest() {
    console.log(`Cancelling request of matchId: ${matchId}`);
    await fetch(
      `http://localhost:3000/match/cancelMatch?matchId=${matchId}&topic=${formData.topic}&difficulty=${formData.difficulty}`,
      {
        mode: "cors",
        method: "DELETE",
      }
    );
    socket.disconnect();
  }

  const handleCancel = () => {
    if (matchId) {
      handleCancelMatchRequest();
      setShowTimer(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-60">
      <div className="relative p-6 bg-white rounded-lg shadow-lg space-y-6"> {/* Consistent spacing inside modal */}
        <button
          onClick={closeMatchingModal}
          className="absolute top-2 right-2 px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-full"
        >
          X
        </button>
        <div className="text-lg font-semibold text-center">
          Found Match?:{" "}
          {isMatchFound ? (
            <div className="text-green-500">Found!</div>
          ) : (
            <div className="text-red-500">Not found yet</div>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          {showTimer ? (
            <Timer showTimer={showTimer} cancelMatchRequest={handleCancelMatchRequest} setShowTimer={setShowTimer}/>
          ) : (
            <MatchingRequestForm
              handleSubmit={() => handleFindMatchRequest(formData)}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleCancel}
            className="px-6 py-2 text-white bg-yellow rounded hover:bg-brown"
          >
            Cancel match request
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchingModal;