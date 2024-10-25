import React, { useState } from "react";
import ComplexityDropDown from "./ComplexityDropDown";
import DescriptionInput from "./DescriptionInput";
import useAddQuestion from "../hooks/useAddQuestion";
import { Category, CategoryDropDown, WarningMessage } from "..";

interface AddQuestionModalProps {
  fetchData: () => Promise<void>;
  onClose: () => void;
  categories: Category[];
}

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  fetchData,
  onClose,
  categories,
}) => {
  const [complexityValue, setComplexityValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const missingWarningMessage = "* Please fill in all the empty fields. *";
  const [isMissingWarningVisible, setIsMissingWarningVisible] = useState(false);

  const duplicateWarningMessage = "* Error adding question. Your newly edited question may be a duplicate (having the same title as an existing question). Please try again. *";
  const [isDuplicateWarningVisible, setIsDuplicateWarningVisible] = useState(false);

  const { addQuestion } = useAddQuestion();

  /* Handle Submit button click */
  const onSubmit = async () => {
    if (
      complexityValue == "" ||
      selectedCategories.length == 0 ||
      titleValue == "" ||
      descriptionValue == ""
    ) {
      /* Empty fields detected, show warning */
      setIsDuplicateWarningVisible(false);
      setIsMissingWarningVisible(true);
      return;
    }

    setIsDuplicateWarningVisible(false);
    setIsMissingWarningVisible(false);

    /* Extract only the names from selectedCategories */
    const selectedCategoriesToSubmit = selectedCategories.map(
      (category) => category.name
    );

    /* API call to add question */
    await addQuestion(
      complexityValue,
      selectedCategoriesToSubmit,
      titleValue,
      descriptionValue,
      onClose,
      fetchData,
      setIsDuplicateWarningVisible
    );
  };

  return (
    <>
      <div
        id="addQuestionModal"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 text-black"
      >
        <div className="bg-white rounded-lg p-4 w-3/5 h-9/10 fade-in modal-context z-50">
          {/* Header */}
          <div className="justify-start">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-2xl font-bold">Add Question</h2>
              <button
                onClick={onClose}
                id="submit"
                className="px-2 rounded-lg hover:bg-gray-200"
              >
                X
              </button>
            </div>
            <p className="text-sm">
              Fill in all the fields. Click "Submit" when done.
            </p>
          </div>

          <div className="mt-3"></div>
          {/* Complexity */}
          <ComplexityDropDown
            currComplexity=""
            setComplexityValue={setComplexityValue}
            isDisabled={false}
          />

          {/* Category */}
          <CategoryDropDown
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            isDisabled={false}
          />

          {/* Question Title */}
          <div className="mt-2">
            <label className="font-semibold">Question Title</label>
            <div className="relative mt-1 shadow-md">
              <input
                type="text"
                id="title"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-opacity-50 focus:ring-black sm:text-sm sm:leading-6"
                onChange={(event) => {
                  setTitleValue(event.target.value);
                }}
              ></input>
            </div>
          </div>

          {/* Question Description */}
          <DescriptionInput
            currDescription={descriptionValue}
            setDescriptionValue={setDescriptionValue}
            isDisabled={false}
          />

          {/* Action buttons */}
          <div className="mt-6">
            {isMissingWarningVisible && (
              <WarningMessage message={missingWarningMessage} />
            )}
            {isDuplicateWarningVisible && (
              <WarningMessage message={duplicateWarningMessage} />
            )}
            <div className="flex justify-evenly mt-2">
              <button
                onClick={onSubmit}
                id="submit"
                className="bg-green rounded-lg px-4 py-1.5 text-white text-lg hover:bg-emerald-400"
              >
                Submit
              </button>
              <button
                onClick={onClose}
                id="submit"
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

export default AddQuestionModal;
