import { Dispatch, SetStateAction, useState } from "react";
import { User } from "../../types/User";
import apiConfig from "../../config/config";

const useUpdateEmail = (userId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateEmail = async (
    newEmail: string,
    setUser: Dispatch<SetStateAction<User | undefined>>
  ) => {
    setLoading(true);
    setError(null); // Reset error before a new request

    try {
      const response = await fetch(
        `${apiConfig.userServiceBaseUrl}/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDEwNDZhNWUwZGFhODQzNmEyMjRlNSIsImlhdCI6MTcyODYxMjIyNiwiZXhwIjoxNzI4Njk4NjI2fQ.05NJAatEoT0JcwOUtP4UShFxfISuIpnzKIfRFwGqghk`,
          },
          body: JSON.stringify({ email: newEmail }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update email");
      }

      const updatedUser = await response.json();
      console.log("Updated email:", updatedUser);
      setUser(updatedUser.data);
      return updatedUser; // Return updated user if needed
    } catch (e: any) {
      setError(e.message); // Set the error message to display to the user
      console.error("Error updating email:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return { updateEmail, loading };
};

export default useUpdateEmail;
