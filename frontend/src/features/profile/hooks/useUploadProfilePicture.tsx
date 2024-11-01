import { Dispatch, SetStateAction } from "react";
import apiConfig from "../../../config/config";
import useFetchProfilePicture from "./useFetchProfilePicture";
import { User } from "../../../types/User";

const useUploadProfilePicture = async (
  user: User,
  file: File,
  updateUser: (userData: User | undefined) => void,
  setErr: Dispatch<SetStateAction<string | undefined>>
) => {
  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file); // Append the file to the form data

  try {
    const response = await fetch(
      `${apiConfig.profilePictureServiceBaseUrl}/users/${user.id}/profile-picture`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }
    useFetchProfilePicture(user, updateUser);
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};

export default useUploadProfilePicture;
