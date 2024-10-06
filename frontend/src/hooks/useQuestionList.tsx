import { Dispatch, SetStateAction, useState, useCallback } from "react";
import { Question } from "../types/Question";

// React hook to fetch a list of questions
// pass in the setQuestions function to update the state of the questions

const useQuestionList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/questions", {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
      });
      const data = await response.json();
      setQuestions(data._embedded.questionList);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return { questions, fetchData };
};

export default useQuestionList;
