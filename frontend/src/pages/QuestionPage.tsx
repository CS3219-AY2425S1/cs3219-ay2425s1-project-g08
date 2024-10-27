import React, { useEffect, useState } from "react";
import UserNavBar from "../components/navbars/UserNavBar.tsx";
import { useParams } from "react-router-dom";
import { useRetrieveQuestion } from "../features/questions";
import { QuestionDisplay } from "../features/collaboration";
import { Question } from "../features/questions";
import { CollaborativeEditor } from "../features/collaboration";


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
          <CollaborativeEditor />
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
