import React, {useEffect, useState} from "react";
import Dashboard from "./Dashboard/Dashboard";

interface AddQuestionModalProps {
  setQuestions: React.Dispatch<React.SetStateAction<never[]>>;
  onClose: () => void;
}

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({setQuestions, onClose}) => {
  //const [difficultyValue, setDifficultyValue] = useState("");
  //const [topicValue, setTopicValue] = useState([""]);
  //const [titleValue, setTitleValue] = useState("");
  //const [detailsValue, setDetailsValue] = useState("");
  //const [canSubmit, setCanSubmit] = useState(false);

  const addQuestion = async (difficultyValue: string, topicValue: string[], titleValue: string, detailsValue: string) => {
      try {
        console.log("trying");
        const response = await fetch('http://localhost:8080/questions', {
            mode: "cors",
            method: 'POST',
            headers: {
              "Access-Control-Allow-Origin": "http://localhost:8080",
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: titleValue,
              description: detailsValue,
              categories: topicValue,
              complexity: difficultyValue
            })
          });

        const data = await response.json();
        console.log(data);
        onClose();
      } catch (error) {
        alert('Error adding question. The question you are adding may be a duplicate (having the same title as an existing question). Please try again.');
        console.error('Error adding question:', error);
      }
  };
  
  const retrieveAndSetQuestionList = async () => {
    try {
      const response = await fetch("http://localhost:8080/questions", {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await response.json();
      
      // Assuming the API returns a structure like data._embedded.questionList
      setQuestions(data._embedded.questionList); 
      console.log("Testing: Question list should appear below");
      console.log(data._embedded.questionList);
      
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }
  

  async function onSubmit() {
    console.log("Testing submit button")
    const difficultyElement = document.getElementById('difficulty') as HTMLSelectElement | null;
    const difficultyValue = difficultyElement ? difficultyElement.value : '';
    //setDifficultyValue(difficultyValue);
    
    const topicElement = document.getElementById("topic") as HTMLInputElement | null;
    const topicValue = topicElement ? topicElement.value : "";
    const topicList = topicValue
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== "");
    //setTopicValue(topicList);
    
    const titleElement = document.getElementById("title") as HTMLInputElement | null;
    const titleValue = titleElement ? titleElement.value : "";
    //setTitleValue(titleValue);
    
    const detailsElement = document.getElementById("details") as HTMLInputElement | null;
    const detailsValue = detailsElement ? detailsElement.value : "";
    //setDetailsValue(detailsValue);

    if (
      difficultyValue == "" ||
      topicList.length == 0 ||
      titleValue == "" ||
      detailsValue == ""
    ) {
      //alert(difficultyValue + topicList + titleValue + detailsValue);
      document.getElementById("emptyMessage")?.classList.remove("hidden");
      document.getElementById("emptyMessage")?.classList.add('visible');
      return;
    }

    console.log("can submit");
    await addQuestion(difficultyValue, topicList, titleValue, detailsValue);

    // Retrieve new question list after adding
    retrieveAndSetQuestionList();
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
            <p className="text-sm">Fill in all the fields. Click "Submit" when done.</p>
          </div>
            
          <div className="mt-3"></div>
          {/* Difficulty */}
          <div>
            <label className="font-semibold">Complexity Level</label>
            <div className="relative mt-1 shadow-md">
              <select 
                name="difficulty" id="difficulty" 
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-opacity-50 focus:ring-black sm:text-sm sm:leading-6"
                defaultValue={""}
              >
                <option value="" disabled hidden>Choose a complexity level</option>
                <option value="EASY" className="text-green ">Easy</option>
                <option value="MEDIUM" className="text-orange-500">Medium</option>
                <option value="HARD" className="text-red-700">Hard</option>
              </select>
            </div>
          </div>

          {/* Topic */}
          <div className="mt-2">
            <label className="font-semibold">Categories</label>
            <p className="text-xs text-gray-500">Separate different topic categories using commas. E.g., Arrays, Databases </p>
            <div className="relative mt-1 shadow-md">
              <input 
                type="text" name="topic" id="topic"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-opacity-50 focus:ring-black sm:text-sm sm:leading-6"
              ></input>
            </div>
          </div>

          {/* Question Title */}
          <div className="mt-2">
            <label className="font-semibold">Question Title</label>
            <div className="relative mt-1 shadow-md">
              <input
                type="text"
                name="title"
                id="title"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-opacity-50 focus:ring-black sm:text-sm sm:leading-6"
              ></input>
            </div>
          </div>

          {/* Question details */}
          <div className="mt-2">
            <label className="font-semibold">Question description</label>
            <div className="relative mt-1 shadow-md">
              <textarea
                name="details"
                id="details"
                rows={3}
                className="block w-full resize-none rounded-md border-0 px-2 py-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-opacity-50 focus:ring-black sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6">
            <p id="emptyMessage" className="flex justify-center text-red-500 hidden">* Please fill in all the empty fields. *</p>
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