import React, { useEffect, useState } from "react";
import UserNavBar from "../components/navbars/UserNavBar.tsx";
import { useParams } from "react-router-dom";
import { useRetrieveQuestion } from "../features/questions";
import QuestionDisplay from "../features/collaboration/components/QuestionDisplay.tsx";
import { Question } from "../features/questions";
import Editor from "@monaco-editor/react";

const QuestionPage: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const [question, setQuestion] = useState<Question>();
  const fetchQuestion = useRetrieveQuestion(title, setQuestion);

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col">
      <UserNavBar categoriesWithQuestions={[]} />
      <div className="grid grid-cols-2 gap-1 flex-grow">
        <div className="flex flex-col flex-grow">
          <QuestionDisplay question={question} />
        </div>
        <div>
          <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" theme="vs-light"/>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
