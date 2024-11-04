import React, { useEffect, useState } from "react";
import CollabNavBar from "../components/navbars/CollabNavBar";
import { useParams } from "react-router-dom";
import { useRetrieveQuestion } from "../features/questions";
import { QuestionDisplay } from "../features/collaboration";
import { Question } from "../features/questions";
import { CollaborativeEditor } from "../features/collaboration";
import { useUser } from "../context/UserContext";
import ClientWebSocket from "../features/collaboration/ClientWebSocket";

const QuestionPage: React.FC = () => {
    const { title } = useParams<{ title: string }>();
    const [question, setQuestion] = useState<Question>();
    const fetchQuestion = useRetrieveQuestion(title, setQuestion);
    const { roomId, setClientWebSocket } = useUser();

    useEffect(() => {
        fetchQuestion();
    }, []);

    // initialise client websocket
    const clientWebSocket = new ClientWebSocket();

    // set the client websocket in the user context
    setClientWebSocket(clientWebSocket);

    clientWebSocket.sendJoinRoomMessage(roomId);

    return (
        <div className="w-screen h-screen flex flex-col">
            <CollabNavBar />
            <div className="grid grid-cols-2 gap-1 flex-grow">
                <div className="flex flex-col flex-grow">
                    <QuestionDisplay question={question} />
                </div>
                <div>
                    <CollaborativeEditor />
                </div>
            </div>
        </div>
    );
};
export default QuestionPage;
