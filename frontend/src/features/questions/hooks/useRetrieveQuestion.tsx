import { Dispatch, SetStateAction } from "react";
import { Question } from "../types/Question";
import apiConfig from "../../../config/config";

// React hook to fetch a list of questions
// pass in the setQuestions function to update the state of the questions

const useRetrieveQuestion = (
  id: string | undefined,
  setQuestion: Dispatch<SetStateAction<Question | undefined>>
) => {
  const fetchQuestion = async () => {
    try {
      const response = await fetch(
        `${apiConfig.questionbankServiceBaseUrl}/questions/${id}`,
        {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": `${apiConfig.questionbankServiceBaseUrl}`,
          },
        }
      );
      const data = await response.json();
      setQuestion(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return fetchQuestion;
};

export default useRetrieveQuestion;
