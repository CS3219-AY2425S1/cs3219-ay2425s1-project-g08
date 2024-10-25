import React from "react";
import { useState } from "react";
import DeleteQuestionModal from "./DeleteQuestionModal";
import EditConfirmationModal from "./EditConfirmationModal";
import ComplexityDropDown from "./ComplexityDropDown";
import CategoryDropDown from "./CategoryDropDown";
import { Question } from "../types/Question";
import DescriptionInput from "./DescriptionInput";
import useEditQuestion from "../hooks/useEditQuestion";
import { Category } from "..";

interface EditQuestionModalProps {
  oldQuestion: Question;
  onClose: () => void;
  fetchData: () => Promise<void>;
  categories: Category[];
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  oldQuestion,
  onClose,
  fetchData,
  categories,
}) => {
  
  const { editQuestion } = useEditQuestion();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const [isEditConfirmationModalOpen, setEditConfirmationModalOpen] =
    useState(false);
  const openEditConfirmationModal = () => setEditConfirmationModalOpen(true);
  const closeEditConfirmationModal = () => setEditConfirmationModalOpen(false);

  const [newComplexityValue, setNewComplexityValue] = useState(
    oldQuestion.complexity
  );
  const [newCategoryList, setNewCategoryList] = useState<Category[]>([]); //For intermediate state of categories with displayName
  const [newTitleValue, setNewTitleValue] = useState(oldQuestion.title);
  const [newDescriptionValue, setNewDescriptionValue] = useState(
    oldQuestion.description
  );
  const [newQuestion, setNewQuestion] = useState(oldQuestion);
  const [isMissingWarningVisible, setIsMissingWarningVisible] = useState(false);

  const onDeleteConfirm = () => {
    closeDeleteModal();
    onClose();
  };

  const onEditConfirm = async () => {
    // Extract only the names from selectedCategories
    const selectedCategoriesToSubmit = newCategoryList.map(
      (category) => category.name
    );

    await editQuestion(
      oldQuestion.id,
      newComplexityValue,
      selectedCategoriesToSubmit,
      newTitleValue,
      newDescriptionValue,
      closeEditConfirmationModal,
      onClose,
      fetchData
    );
  };

  const onEditSubmit = () => {
    /* Check if all fields are filled */
    if (
      newComplexityValue == "" ||
      newCategoryList.length == 0 ||
      newTitleValue == "" ||
      newDescriptionValue == ""
    ) {
      //alert(newComplexityValue + newCategoryList + newTitleValue + newDescriptionValue);
      setIsMissingWarningVisible(true);
    } else {
      /* All fields are filled -> ask user to confirm the changes */
      setIsMissingWarningVisible(false);

      // Extract only the names from selectedCategories
      const selectedCategoriesToSubmit = newCategoryList.map(
        (category) => category.name
      );

      const newQuestion: Question = {
        id: "",
        complexity: newComplexityValue,
        categories: selectedCategoriesToSubmit,
        title: newTitleValue,
        description: newDescriptionValue,
      };
      setNewQuestion(newQuestion);
      openEditConfirmationModal();
    }
  };

  return (
    <div
      id="editQuestionModal"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 text-black"
    >
      <div className="bg-white rounded-lg p-4 w-3/5 h-9/10 fade-in modal-context z-50">
        {/* Header */}
        <div className="justify-start">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-bold">Edit Question</h2>
            <button
              onClick={() => onClose()}
              id="submit"
              className="px-2 rounded-lg hover:bg-gray-200"
            >
              X
            </button>
          </div>
          <div>
            <p className="text-sm">Editing "{oldQuestion.title}" Question.</p>
            {/* <button className="text-sm text-indigo-800 hover:bg-gray-200 rounded-lg">Click here to view the original question for reference.</button> */}
          </div>
        </div>

        <div className="mt-3"></div>
        {/* Complexity */}
        <ComplexityDropDown
          currComplexity={oldQuestion.complexity}
          setComplexityValue={setNewComplexityValue}
          isDisabled={false}
        />

        {/* Category */}
        <CategoryDropDown
          rawCategories={oldQuestion.categories}
          categories={categories}
          selectedCategories={newCategoryList}
          setSelectedCategories={setNewCategoryList}
          isDisabled={false}
        />

        {/* Question Title */}
        <div className="mt-2">
          <label className="font-semibold">Question Title</label>
          <div className="relative mt-1 shadow-md">
            <input
              type="text"
              id="title"
              defaultValue={oldQuestion.title}
              onChange={(event) => {
                setNewTitleValue(event.target.value);
              }}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-opacity-50 focus:ring-black sm:text-sm sm:leading-6"
            ></input>
          </div>
        </div>

        {/* Question description */}
        <DescriptionInput
          currDescription={oldQuestion.description}
          setDescriptionValue={setNewDescriptionValue}
          isDisabled={false}
        />

        {/* Action buttons */}
        <div className="mt-6">
          {isMissingWarningVisible && (
            <p id="emptyMessage" className="flex justify-center text-red-500">
              * Please fill in all the empty fields. *
            </p>
          )}
          <div className="flex justify-evenly mt-2">
            <button
              onClick={openDeleteModal}
              className="bg-black bg-opacity-80 rounded-lg px-4 py-1.5 text-white text-lg hover:bg-gray-600"
            >
              Delete Question
            </button>
            {isDeleteModalOpen && (
              <DeleteQuestionModal
                oldQuestion={oldQuestion}
                onClose={closeDeleteModal}
                onDelete={onDeleteConfirm}
                fetchData={fetchData}
              />
            )}
            <button
              onClick={onEditSubmit}
              className="bg-green rounded-lg px-4 py-1.5 text-white text-lg hover:bg-emerald-400"
            >
              Submit
            </button>
            {isEditConfirmationModalOpen && (
              <EditConfirmationModal
                newQuestion={newQuestion}
                onClose={closeEditConfirmationModal}
                onEditConfirm={onEditConfirm}
              />
            )}
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
  );
};

export default EditQuestionModal;
