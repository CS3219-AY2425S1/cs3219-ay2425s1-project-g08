import React, { useEffect, useState } from "react";
import UserNavBar from "../components/navbars/UserNavBar.tsx";
import { useParams } from "react-router-dom";
import { useRetrieveQuestion } from "../features/questions";
import { QuestionDisplay } from "../features/questions";
import { Question } from "../features/questions";
import { useCategoryWithQuestionsList } from "../features/questions";

const QuestionPage: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const [question, setQuestion] = useState<Question>();
  const fetchQuestion = useRetrieveQuestion(title, setQuestion);
  const { categoriesWithQuestions, fetchCategoriesWithQuestions } =
  useCategoryWithQuestionsList();

  useEffect(() => {
    fetchQuestion();
    fetchCategoriesWithQuestions();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col">
      <UserNavBar categoriesWithQuestions={categoriesWithQuestions}/>
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
