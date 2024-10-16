import { Dispatch, SetStateAction, useEffect } from "react";
import { User, userToString } from "../types/User";
import { UserResponse } from "../types/UserResponse";
import apiConfig from "../config/config";
import { useUser } from "../context/UserContext";

const useRetrieveUser = (
    setUser: Dispatch<SetStateAction<User | undefined>>
) => {
    const { user } = useUser();
    console.log('USER' + userToString(user));

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${apiConfig.userServiceAuthUrl}/verify-token`, {
                mode: "cors",
                headers: {
                    "Access-Control-Allow-Origin": `${apiConfig.userServiceBaseUrl}`,
                    // Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Authorization: `Bearer ${apiConfig.token}`
                },
            });
            const result: UserResponse = await response.json();
            const userData = result.data;
            if (userData == undefined) {
                console.log("User data undefined, API response:", result);
            }
            setUser(userData);
        } catch (error) {
            console.log("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return fetchUserData;
};

export default useRetrieveUser;
