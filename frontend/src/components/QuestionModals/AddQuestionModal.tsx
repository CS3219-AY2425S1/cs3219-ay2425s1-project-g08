import React, {useState} from "react";
import ComplexityDropDown from "./ComplexityDropDown";
import DescriptionInput from "./DescriptionInput";

interface AddQuestionModalProps {
  fetchData: () => Promise<void>;
  onClose: () => void;
}

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  fetchData,
  onClose,
}) => {
  const [complexityValue, setComplexityValue] = useState("");
  const [categoryList, setCategoryList] = useState([""]);
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [isMissingWarningVisible, setIsMissingWarningVisible] = useState(false);
  //const [canSubmit, setCanSubmit] = useState(false);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCategoryValue = event.target.value;
    const categoryList = newCategoryValue
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    setCategoryList(categoryList);
  }

  /* POST request to API to add question */
  const addQuestion = async (
    complexityValue: string,
    categoryList: string[],
    titleValue: string,
    descriptionValue: string
  ) => {
    try {
      const response = await fetch("http://localhost:8080/questions", {
        mode: "cors",
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:8080",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleValue,
          description: descriptionValue,
          categories: categoryList,
          complexity: complexityValue,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        throw new Error("Title already exists");
      } else {
        onClose();
        fetchData();
      }
    } catch (error) {
      alert(
        "Error adding question. The question you are adding may be a duplicate (having the same title as an existing question). Please try again."
      );
      console.error("Error adding question:", error);
    }
  };

  /* Handle Submit button click */
  const onSubmit = async () => {
    if (
      complexityValue == "" ||
      categoryList.length == 0 ||
      titleValue == "" ||
      descriptionValue == ""
    ) {
      /* Empty fields detected, show warning */
      //alert(complexityValue + categoryList + titleValue + descriptionValue);
      setIsMissingWarningVisible(true);
      return;
    }
    /* API call to add question */
    await addQuestion(complexityValue, categoryList, titleValue, descriptionValue);
  }

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
          <div className="mt-2">
            <label className="font-semibold">Categories</label>
            <p className="text-xs text-gray-500">
              Separate different categories using commas. E.g., "Arrays,
              Databases"
            </p>
            <div className="relative mt-1 shadow-md">
              <input
                type="text"
                id="category"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-opacity-50 focus:ring-black sm:text-sm sm:leading-6"
                onChange={handleCategoryChange}
              ></input>
            </div>
          </div>

          {/* Question Title */}
          <div className="mt-2">
            <label className="font-semibold">Question Title</label>
            <div className="relative mt-1 shadow-md">
              <input
                type="text"
                id="title"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-opacity-50 focus:ring-black sm:text-sm sm:leading-6"
                onChange={(event) => {setTitleValue(event.target.value)}}
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
              <p id="emptyMessage" className="flex justify-center text-red-500">
                * Please fill in all the empty fields. *
              </p>
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
