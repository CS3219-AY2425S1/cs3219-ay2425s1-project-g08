import apiConfig from "../../../config/config";

const useDeleteQuestion = () => {
    const deleteQuestion = async (
        questionID: string,
        fetchData: () => Promise<void>
    ) => {
        try {
            //console.log("deleting question");
            const response = await fetch(
            `${apiConfig.questionbankServiceBaseUrl}/questions/${questionID}`,
            {
                mode: "cors",
                method: "DELETE",
                headers: {
                "Access-Control-Allow-Origin": `${apiConfig.questionbankServiceBaseUrl}`,
                "Content-Type": "application/json",
                },
            }
            );

            if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            fetchData();
        } catch (error) {
            alert("Error deleting question. Please try again.");
            console.error("Error deleting question:", error);
        }
    };

      return { deleteQuestion };
};

export default useDeleteQuestion;