import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.tsx";
import { useParams } from "react-router-dom";
import useRetrieveQuestion from "../hooks/useRetrieveQuestion.tsx";
import QuestionDisplay from "../components/QuestionDisplay.tsx";
import { Question } from "../types/Question.tsx";

const QuestionPage: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const [question, setQuestion] = useState<Question>();
  const fetchQuestion = useRetrieveQuestion(title, setQuestion);

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col">
      <NavBar />
      <div className="grid grid-cols-2 gap-4 flex-grow">
        <div className="flex flex-col flex-grow">
          <QuestionDisplay question={question} />
        </div>
        <div className="flex flex-col flex-grow">editor</div>
      </div>
    </div>
  );
};

export default QuestionPage;
