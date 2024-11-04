import { useState } from "react";
import apiConfig from "../../../config/config";
import { Category } from "..";

const useCategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${apiConfig.questionbankServiceBaseUrl}/categories`,
        {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": `${apiConfig.questionbankServiceBaseUrl}`,
          },
        }
      );
      const data = await response.json();
      setCategories(data._embedded.categoryDtoList);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return { categories, fetchCategories };
};

export default useCategoryList;
