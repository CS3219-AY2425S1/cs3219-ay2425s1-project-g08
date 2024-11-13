import { useState } from "react";
import { Question } from "../types/Question";
import apiConfig from "../../../config/config";

// React hook to fetch a list of questions with a given category and complexity
// pass in the setQuestions function to update the state of the questions

const useQuestionWithCategoryAndComplexityList = (
  category: string | undefined,
  complexity: string | undefined
) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchQuestionList = async () => {
    try {
      const response = await fetch(
        `${apiConfig.questionbankServiceBaseUrl}/questions/category-and-complexity/all/${category}/${complexity}`,
        {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": `${apiConfig.questionbankServiceBaseUrl}`,
          },
        }
      );
      const data = await response.json();

      // Check if data contains questions in the expected format
      if (data._embedded && data._embedded.questionList) {
        setQuestions(data._embedded.questionList);
      } else {
        console.warn(
          "No questions found for the specified category and complexity."
        );
        setQuestions([]); // Reset questions to an empty array if none are found
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return { questions, fetchQuestionList };
};

export default useQuestionWithCategoryAndComplexityList;
