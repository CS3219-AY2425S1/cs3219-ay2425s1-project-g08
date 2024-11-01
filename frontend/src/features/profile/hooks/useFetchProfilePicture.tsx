import apiConfig from "../../../config/config";
import { User } from "../../../types/User";

const useFetchProfilePicture = async (
  user: User,
  updateUser: (userData: User | undefined) => void
) => {
  if (user.id == "") {
    console.error("UserId is empty, likely not logged in");
    return;
  }
  try {
    const response = await fetch(`${apiConfig.profilePictureServiceBaseUrl}/users/${user.id}/profile-picture`);

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const result = await response.json();
    const url: string = result.imageUrl;
    updateUser({ ...user, profilePictureUrl: url });
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};

export default useFetchProfilePicture;
