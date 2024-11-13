import apiConfig from "../../../config/config";

const useEditQuestion = () => {
    /* PUT request to API to edit question */
  const editQuestion = async (
    questionID: string,
    complexityValue: string,
    categoryValue: string[],
    titleValue: string,
    descriptionValue: string,
    closeEditConfirmationModal: () => void,
    onClose: () => void,
    fetchData: () => Promise<void>,
    setIsDuplicateWarningVisible: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    await fetch(
      `${apiConfig.questionbankServiceBaseUrl}/questions/${questionID}`,
      {
        mode: "cors",
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": `${apiConfig.questionbankServiceBaseUrl}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: questionID,
          title: titleValue,
          description: descriptionValue,
          categories: categoryValue,
          complexity: complexityValue,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Title already exists");
        } else {
          response.json();
          closeEditConfirmationModal();
          onClose();
          fetchData();
        }
      })
      .catch((error) => {
        console.error(error);
        setIsDuplicateWarningVisible(true);
        closeEditConfirmationModal();
      });
  };

  return { editQuestion };
};

export default useEditQuestion;