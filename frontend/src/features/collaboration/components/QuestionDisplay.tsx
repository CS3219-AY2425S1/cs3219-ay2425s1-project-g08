import React, { useState } from "react";
import { GrPowerCycle } from "react-icons/gr";
import { Question } from "../../questions/types/Question";

interface QuestionDisplayProps {
  question: Question | undefined;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  const [hintIsOpen, setHintIsOpen] = useState(false); // Hint toggle for dropdown
  const [hintText, setHintText] = useState("Dropdown Menu"); // Text for the dropdown

  const toggleHintText = () => {
    setHintText((prevText) =>
      prevText === "Dropdown Menu" ? "New Hint Content" : "Dropdown Menu"
    );
  };

  return (
    <div className="w-full h-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-full h-full px-6 py-4">
        {question && (
          <>
            <div className="">
              <h2 className="text-xl font-bold text-gray-800">
                {question.title}
              </h2>
              <p className="text-gray-700 mt-2">{question.description}</p>
              <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide mt-4">
                {question.complexity}
              </span>

              <div className="mt-4">
                {/* Hint and Solution Buttons */}
                <button
                  className="inline-block bg-slate-400 text-slate-200 text-base rounded-l rounded-r font-semibold"
                  onClick={() => setHintIsOpen(!hintIsOpen)}
                >
                  Hint!
                </button>
                {hintIsOpen && (
                  <div className="mt-2 bg-gray-100 p-2 rounded-md shadow-md">
                    <p className="text-gray-800">{hintText}</p>
                    <button className="mt-2" onClick={toggleHintText}>
                      <GrPowerCycle />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionDisplay;
