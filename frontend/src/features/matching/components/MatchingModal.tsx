import { useState, useEffect } from "react";
import io from "socket.io-client";
import MatchingRequestForm from "./MatchingRequestForm";
import { MatchingRequestFormState } from "../types/MatchingRequestFormState";
import Timer from "./Timer.tsx";
import { useUser } from "../../../context/UserContext.tsx";
import Alert from "react-bootstrap/Alert";
import apiConfig from "../../../config/config.ts";
import {
  Category,
  useQuestionWithCategoryAndComplexityList,
} from "../../questions/index.ts";
import { useNavigate } from "react-router-dom";

interface MatchingModalProps {
  closeMatchingModal: () => void;
  categoriesWithQuestions: Array<Category>;
}

const MATCH_WEBSOCKET_URL: string = apiConfig.matchWebsocketUrl;

const MatchingModal: React.FC<MatchingModalProps> = ({
  closeMatchingModal,
  categoriesWithQuestions,
}) => {
  const [matchId, setMatchId] = useState("");
  const [formData, setFormData] = useState<MatchingRequestFormState>({
    category: "",
    difficulty: "",
  });

  const { questions, fetchQuestionList } =
    useQuestionWithCategoryAndComplexityList(
      formData.category,
      formData.difficulty
    );
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsFetching(true);
      await fetchQuestionList();
      setIsFetching(false);
    };

    fetchQuestions();
  }, [formData]);

  const navigate = useNavigate();
  const { user, updateRoomId, updateQuestionId } = useUser();

  const [isMatchFound, setIsMatchFound] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [cancelAlert, setCancelAlert] = useState<boolean>(false);

  console.log("MATCH_WEBSOCKET_URL: ", MATCH_WEBSOCKET_URL);
  const socket = io(MATCH_WEBSOCKET_URL, { autoConnect: false });

  async function handleFindMatchRequest(formData: MatchingRequestFormState) {
    try {
      // Don't even allow matching if there are no questions for that category and difficulty
      if (!isFetching) {
        if (!questions || questions.length === 0) {
          console.error("No questions with that difficulty for this category.");
          alert(
            "No questions are found for that difficulty. Try a different difficulty (e.g. Easy, Medium, Hard)."
          );
          return;
        }
      }

      setCancelAlert(false);
      setShowCancelButton(true);
      setShowTimer(true);
      socket.connect();
      socket.on("connect", () => {
        console.log("Connected to server", socket.id);
      });
      socket.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });

      socket.on("connect_timeout", (timeout) => {
        console.error("Connection timeout:", timeout);
      });

      socket.on("error", (error) => {
        console.error("Socket error:", error);
      });
      console.log("Sent match request: ", {
        name: user?.username, // set up with user context later
        category: formData.category,
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
            category: formData.category,
            difficulty: formData.difficulty,
          }),
        }
      );
      const data = await res.json();

      console.log("Received response from server:", data);

      if (!data.matchId) {
        console.error("No match ID received");
        return;
      }

      setMatchId(data.matchId);

      // Execute socket logic after returning the response object
      socket.emit("joinMatchResponseRoom", data.matchId);

      socket.on("receiveMatchResponse", (responseData, ack) => {
        console.log("Received match response:", responseData);
        if (responseData.roomId !== undefined) {
          ack(true);
          console.log("RoomId", responseData.roomId);
          updateRoomId(responseData.roomId);
          setShowTimer(false);
          setShowCancelButton(false);
          setIsMatchFound(true);
          console.log(`Listening to room: ${responseData.roomId}`);
        } else {
          ack(false);
          console.error("RoomId is undefined");
        }
        if (responseData.questionId) {
          updateQuestionId(responseData.questionId); // set questionId in user context
          console.log("Navigating to question page");
          navigate(`/question/${responseData.questionId}`);
        } else {
          console.error("No question ID received");
          alert(
            `No question is found that satisfies the category of ${formData.category} and of difficulty: ${formData.difficulty}`
          );
        }
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
      `${apiConfig.matchExpressJsUrl}/match/cancelMatch?matchId=${matchId}&category=${formData.category}&difficulty=${formData.difficulty}`,
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
              categoriesWithQuestions={categoriesWithQuestions}
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
