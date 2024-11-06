import React, { useEffect, useState } from "react";
import CollabNavBar from "../components/navbars/CollabNavBar";
import { useParams } from "react-router-dom";
import { useRetrieveQuestion } from "../features/questions";
import { QuestionDisplay } from "../features/collaboration";
import { Question } from "../features/questions";
import { CollaborativeEditor } from "../features/collaboration";
import { ChatBoxModal } from "../features/communication";
import { SaveHistoryContext } from "../context/saveHistoryContext";

const QuestionPage: React.FC = () => {
    const { title } = useParams<{ title: string }>();
    const [question, setQuestion] = useState<Question>();
    const fetchQuestion = useRetrieveQuestion(title, setQuestion);
    const [saveHistoryCallback, setSaveHistoryCallback] = useState<() => Promise<void>>(async () => {});

    useEffect(() => {
        fetchQuestion();
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col">
            <SaveHistoryContext.Provider value={saveHistoryCallback || (async() => {})}>
                <CollabNavBar />
                <div className="grid grid-cols-2 gap-1 flex-grow">
                    <div className="flex flex-col flex-grow">
                        <QuestionDisplay question={question} />
                    </div>
                    <div>
                        <CollaborativeEditor question={question} setSaveHistoryCallback={setSaveHistoryCallback} />
                    </div>
                    <div>
                        <ChatBoxModal />
                    </div>
                </div>
            </SaveHistoryContext.Provider>
        </div>
    );
};
export default QuestionPage;
