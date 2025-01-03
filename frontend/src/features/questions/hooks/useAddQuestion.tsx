import apiConfig from "../../../config/config";

const useAddQuestion = () => {
  /* POST request to API to add question */
  
  const addQuestion = async (
    complexityValue: string,
    categoryList: string[],
    titleValue: string,
    descriptionValue: string,
    onClose: () => void,
    fetchData: () => Promise<void>,
    setIsDuplicateWarningVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const response = await fetch(
        `${apiConfig.questionbankServiceBaseUrl}/questions`,
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": `${apiConfig.questionbankServiceBaseUrl}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: titleValue,
            description: descriptionValue,
            categories: categoryList,
            complexity: complexityValue,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        throw new Error("Title already exists");
      } else {
        onClose();
        fetchData();
      }
    } catch (error) {
      setIsDuplicateWarningVisible(true);
      console.error("Error adding question:", error);
    }
  };

  return { addQuestion };
};

export default useAddQuestion;
