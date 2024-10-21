import { Dispatch, SetStateAction } from "react";
import { UserResponse } from "../types/UserResponse";
import apiConfig from "../config/config";
import { useUser } from "../context/UserContext";

const useAuthenticateUser = () => {
    const { user } = useUser();
    const authenticateUser = async (setSuccess: Dispatch<SetStateAction<boolean>>) => {
        try {
            console.log("user access token sent for verification : ", user);
            const response = await fetch(`${apiConfig.userServiceAuthUrl}/verify-token`, {
                mode: "cors",
                headers: {
                    "Access-Control-Allow-Origin": `${apiConfig.userServiceBaseUrl}`,
                    // Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Authorization: `Bearer ${user?.accessToken}`
                },
            });
            const result: UserResponse = await response.json();
            const userData = result.data;
            if (userData == undefined) {
                console.log("User data undefined, API response:", result);
                setSuccess(false);
            } else {
                setSuccess(true);
            }
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    }
    return { authenticateUser };
};

export default useAuthenticateUser;
