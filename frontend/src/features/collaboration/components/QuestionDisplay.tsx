import React, { useState, useEffect } from "react";
import { GrPowerCycle } from "react-icons/gr";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Question } from "../../questions/types/Question";
import { useClaudeSonnet } from "../../communication";

interface QuestionDisplayProps {
  question: Question | undefined;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  const [hintIsOpen, setHintIsOpen] = useState(false); // Hint toggle for dropdown
  const [hintText, setHintText] = useState(
    "Click the button on the right to generate a hint!"
  ); // Text for the dropdown

  const { sendAIMessage, aiResponse, isLoading, error } = useClaudeSonnet();

  const toggleHintText = () => {
    if (question && question.description) {
      // Send the question description to get the AI-generated hint
      sendAIMessage("Give me a hint for this question:" + question.description);
    }
  };

  // Update hint text when aiResponse changes
  useEffect(() => {
    if (aiResponse) {
      setHintText(aiResponse);
    }
  }, [aiResponse]);

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
                  className="flex items-center bg-slate-400 text-white text-base rounded-l rounded-r font-semibold p-1"
                  onClick={() => setHintIsOpen(!hintIsOpen)}
                >
                  <div className="mr-1">
                    <HiOutlineLightBulb />
                  </div>
                  Hint!
                </button>
                {hintIsOpen && (
                  <div className="mt-2 bg-gray-100 p-2 rounded-md shadow-md">
                    {isLoading ? (
                      <p className="text-gray-500">Loading hint...</p>
                    ) : error ? (
                      <p className="text-red-500">Error loading hint</p>
                    ) : (
                      <p className="text-gray-800">{hintText}</p>
                    )}
                    <div className="flex justify-end mt-2">
                      <button
                        className="mt-2 flex items-center text-gray-600"
                        onClick={toggleHintText}
                      >
                        <div className="mr-1">
                          <GrPowerCycle />
                        </div>
                        <span>Generate Hint</span>
                      </button>
                    </div>
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
