import React from "react";
import ComplexityDropDown from "./ComplexityDropDown";
import { Question } from "../../types/Question";
import DescriptionInput from "./DescriptionInput";

interface DeleteQuestionModalProps {
  oldQuestion: Question;
  onClose: () => void;
  onDelete: () => void;
  fetchData: () => Promise<void>;
}

const DeleteQuestionModal: React.FC<
  DeleteQuestionModalProps> = ({
    oldQuestion,
    onClose,
    onDelete,
    fetchData,
}) => {
  const deleteQuestion = async (questionID: string) => {
    try {
      //console.log("deleting question");
      const response = await fetch(
        `http://localhost:8080/questions/${questionID}`,
        {
          mode: "cors",
          method: "DELETE",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      fetchData();
    } catch (error) {
      alert("Error deleting question. Please try again.");
      console.error("Error deleting question:", error);
    }
  };

  return (
    <>
      <div
        id="deleteQuestionModal"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-lg p-4 w-3/5 h-9/10 fade-in modal-context z-50">
          {/* Header */}
          <div className="justify-start">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-red-500 text-2xl font-bold">
                Deleting Question
              </h2>
              <button
                onClick={onClose}
                id="submit"
                className="px-2 rounded-lg hover:bg-gray-200"
              >
                X
              </button>
            </div>
            <p className="text-sm">
              Are you sure you wish to delete the following question? This
              action cannot be reversed!
            </p>
          </div>

          <div className="mt-3"></div>
          {/* Complexity */}
          <ComplexityDropDown 
            currComplexity={oldQuestion.complexity} 
            setComplexityValue={() => {}} 
            isDisabled={true} 
          />

          {/* Category */}
          <div className="mt-2">
            <label className="font-semibold">Category</label>
            <div className="relative mt-1 shadow-md">
              <p
                id="category"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-500 ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6"
              >
                {oldQuestion.categories.toString()}
              </p>
            </div>
          </div>

          {/* Question Title */}
          <div className="mt-2">
            <label className="font-semibold">Question Title</label>
            <div className="relative mt-1 shadow-md">
              <p
                id="title"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-500 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
              >
                {oldQuestion.title}
              </p>
            </div>
          </div>

          {/* Question Description */}
          <DescriptionInput
            currDescription={oldQuestion.description}
            setDescriptionValue={() => {}}
            isDisabled={true}
          />

          {/* Action buttons */}
          <div className="mt-6">
            <div className="flex justify-evenly mt-2">
              <button
                onClick={() => {
                  deleteQuestion(oldQuestion.id);
                  onDelete();
                }}
                className="bg-black bg-opacity-80 rounded-lg px-4 py-1.5 text-white text-lg hover:bg-gray-600"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="bg-red-500 rounded-lg px-4 py-1.5 text-white text-lg hover:bg-red-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteQuestionModal;
