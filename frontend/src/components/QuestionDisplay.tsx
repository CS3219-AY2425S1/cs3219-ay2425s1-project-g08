import React from "react";
import { Question } from "../types/Question";

interface QuestionDisplayProps {
  question: Question | undefined;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  return (
    <div className="w-full h-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-full h-full px-6 py-4">
        {question && (
          <>
            <h2 className="text-xl font-bold text-gray-800">
              {question.title}
            </h2>
            <p className="text-gray-700 mt-2">{question.description}</p>
            <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide mt-4">
              {question.complexity}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionDisplay;
