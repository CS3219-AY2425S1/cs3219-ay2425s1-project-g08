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
    fetchData: () => Promise<void>
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
        alert(
          "Error adding question. Your newly edited question may be a duplicate (having the same title as an existing question). Please try again."
        );
        closeEditConfirmationModal();
      });
  };

  return { editQuestion };
};

export default useEditQuestion;