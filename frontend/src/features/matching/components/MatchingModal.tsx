import { useState } from "react";
import io from "socket.io-client";
import MatchingRequestForm from "./MatchingRequestForm";
import { MatchingRequestFormState } from "../types/MatchingRequestFormState";
import Timer from "./Timer.tsx";
import { useUser } from "../../../context/UserContext.tsx";
import Alert from "react-bootstrap/Alert";
import apiConfig from "../../../config/config.ts";

interface MatchingModalProps {
  closeMatchingModal: () => void;
}

const MATCH_WEBSOCKET_URL: string = apiConfig.matchWebsocketUrl;

const MatchingModal: React.FC<MatchingModalProps> = ({
  closeMatchingModal,
}) => {
  const [matchId, setMatchId] = useState("");
  const [formData, setFormData] = useState<MatchingRequestFormState>({
    topic: "",
    difficulty: "",
  });

  const { user } = useUser();

  const [isMatchFound, setIsMatchFound] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [cancelAlert, setCancelAlert] = useState<boolean>(false);

  console.log("MATCH_WEBSOCKET_URL: ", MATCH_WEBSOCKET_URL);
  const socket = io(MATCH_WEBSOCKET_URL, { autoConnect: false });

  async function handleFindMatchRequest(formData: MatchingRequestFormState) {
    try {
      setCancelAlert(false);
      setShowCancelButton(true);
      setShowTimer(true);
      socket.connect();
      socket.on("connect", () => {
        console.log("Connected to server", socket.id);
      });
      console.log("Sent match request: ", {
        name: user?.username, // set up with user context later
        topic: formData.topic,
        difficulty: formData.difficulty,
      });
      const res = await fetch(
        `${apiConfig.matchExpressJsUrl}/match/findMatch`,
        {
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
        }
      );
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
        socket.emit("broadcast", `hi from ${user?.username}`);
        setShowTimer(false);
        setShowCancelButton(false);
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
      `${apiConfig.matchExpressJsUrl}/match/cancelMatch?matchId=${matchId}&topic=${formData.topic}&difficulty=${formData.difficulty}`,
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
      setShowCancelButton(false);
    }
  };

  const handleMatchNotFound = (): Promise<void> => {
    handleCancelMatchRequest();
    setCancelAlert(true);
    setShowCancelButton(false);
    return Promise.resolve();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-60">
      <div className="relative p-6 bg-white rounded-lg shadow-lg space-y-6">
        {" "}
        {/* Consistent spacing inside modal */}
        <button
          onClick={closeMatchingModal}
          className="absolute top-2 right-2 px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-full"
        >
          X
        </button>
        {cancelAlert ? (
          <Alert key="warning" variant="warning">
            No match was found! Please try again later
          </Alert>
        ) : (
          <></>
        )}
        {isMatchFound ? (
          <Alert key="success" variant="success">
            Found a new match!{" "}
          </Alert>
        ) : (
          <></>
        )}
        <div className="flex flex-col space-y-4">
          {showTimer ? (
            <Timer
              showTimer={showTimer}
              cancelMatchRequest={handleMatchNotFound}
              setShowTimer={setShowTimer}
            />
          ) : (
            <MatchingRequestForm
              handleSubmit={() => handleFindMatchRequest(formData)}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>
        {showCancelButton ? (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleCancel}
              className="px-6 py-2 text-white bg-yellow rounded hover:bg-brown"
            >
              Cancel match request
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MatchingModal;
