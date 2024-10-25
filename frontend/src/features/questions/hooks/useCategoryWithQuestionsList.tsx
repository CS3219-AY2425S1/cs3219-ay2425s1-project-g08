import { useState, useCallback } from "react";
import apiConfig from "../../../config/config";
import { Category } from "..";

const useCategoryWithQuestionsList = () => {
  const [categoriesWithQuestions, setCategoriesWithQuestions] = useState<
    Category[]
  >([]);

  const fetchCategoriesWithQuestions = async () => {
    try {
      const response = await fetch(
        `${apiConfig.questionbankServiceBaseUrl}/categories/with-questions`,
        {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": `${apiConfig.questionbankServiceBaseUrl}`,
          },
        }
      );
      const data = await response.json();
      setCategoriesWithQuestions(data._embedded.categoryDtoList);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return { categoriesWithQuestions, fetchCategoriesWithQuestions };
};

export default useCategoryWithQuestionsList;
