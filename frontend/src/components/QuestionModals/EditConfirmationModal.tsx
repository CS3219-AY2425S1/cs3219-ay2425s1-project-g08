import React from "react";
import ComplexityDropDown from "./ComplexityDropDown";
import { Question } from "../../types/Question";
import DescriptionInput from "./DescriptionInput";

interface EditConfirmationModalProps {
  newQuestion: Question
  onClose: () => void; 
  onEditConfirm: () => void;
}

const EditConfirmationModal: React.FC<
  EditConfirmationModalProps> = ({
    newQuestion,
    onClose, 
    onEditConfirm
}) => {
  
  return (
    <>
      <div id="editConfirmationModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-4 w-3/5 h-9/10 fade-in modal-context z-50">
          {/* Header */}
          <div className="justify-start">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-green text-2xl font-bold">Confirm Changes</h2>
              <button 
              onClick={onClose} 
              id="submit"
              className="px-2 rounded-lg hover:bg-gray-200"
            >
              X
            </button>
            </div>
            <p className="text-sm">Are you sure of the following changes? This action cannot be reversed!</p>
          </div>
          
          <div className="mt-3"></div>
          {/* Complexity */}
          <ComplexityDropDown 
            currComplexity={newQuestion.complexity} 
            setComplexityValue={() => {}} 
            isDisabled={true} 
          />

          {/* Category */}
          <div className="mt-2">
            <label className="font-semibold">Categories</label>
            <div className="relative mt-1 shadow-md">
              <p
                id="category"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-500 ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6"
              >{newQuestion.categories.toString()}</p>
            </div>
          </div>

          {/* Question Title */}
          <div className="mt-2">
            <label className="font-semibold">Question Title</label>
            <div className="relative mt-1 shadow-md">
              <p
                id="title"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-500 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
              >{newQuestion.title}</p>
            </div>
          </div>

          {/* Question description */}
          <DescriptionInput
            currDescription={newQuestion.description}
            setDescriptionValue={() => {}}
            isDisabled={true}
          />

          {/* Action buttons */}
          <div className="mt-6">
            <div className="flex justify-evenly mt-2">
            <button 
                onClick={onEditConfirm}
                className="bg-green rounded-lg px-4 py-1.5 text-white text-lg hover:bg-emerald-400"
              >
                Submit
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

export default EditConfirmationModal;