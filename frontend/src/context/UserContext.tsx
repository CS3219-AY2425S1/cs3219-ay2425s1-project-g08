import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { User } from "../types/User";

// Define the context value type
interface UserContextType {
    user: User | undefined; // Change User | undefined to User | null
    updateUser: (userData: User | undefined) => void; // Function to log in the user
    logoutUser: () => void; // Function to log out the user
    roomId: string; // Room ID for the user when they are matched with another user
    //setRoomId: React.Dispatch<React.SetStateAction<string>>;
    updateRoomId: (roomId: string | undefined) => void;
    clearRoomId: () => void;
    isConnectedToRoom: boolean;
    updatePartnerMessages: (partnerMessages: { text: string; isUser: boolean }[]) => void;
    getPartnerMessages: () => { text: string, isUser: boolean }[]
}

// Create user context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [roomId, setRoomId] = useState<string>("");

    useEffect(() => {
        // Retrieve user from local storage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.log("Failed to parse user from local storage:", error);
                setUser(undefined);
            }
        }

        const storedRoomId = localStorage.getItem("roomId");
        if (storedRoomId) {
            setRoomId(storedRoomId);
        } else {
            setRoomId("");
        }
    }, []);

    const updateUser = (userData: User | undefined) => {
        try {
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData)); // Store user in local storage
        } catch (error) {
            setUser(undefined);
            console.log("Failed to update user", error);
        }
    };

    const logoutUser = () => {
        setUser(undefined);
        localStorage.removeItem("user"); // Remove user from local storage
    };

    const updateRoomId = (roomId: string | undefined) => {
        roomId = roomId ?? "";
        try {
            setRoomId(roomId);
        localStorage.setItem("roomId", roomId);
        } catch (error) {
            setRoomId("");
            console.log("Failed to update roomId", error);
        }
    }

    const updatePartnerMessages = (partnerMessages: { text: string; isUser: boolean }[]) => {
        try {
            localStorage.setItem("partnerMessages", JSON.stringify(partnerMessages));
        } catch (error) {
            console.log("Failed to update partnerMessages", error);
        }
    }

    const getPartnerMessages = () => {
        const partnerMessages = localStorage.getItem("partnerMessages");
        //console.log("MSGS " + partnerMessages);
        if (partnerMessages) {
            try {
                //console.log("Parsed MSGS " + partnerMessages);
                const parsedMessages: {text: string, isUser: boolean}[] = JSON.parse(partnerMessages);
                //console.log("Parsed MSGS " + JSON.stringify(parsedMessages));
                return parsedMessages;
            } catch (error) {
                console.log("Failed to parse partnerMessages", error);
                return [];
            }
        } else {
            return [];
        }
    }

    const clearRoomId = () => {
        try {
            setRoomId("");
            localStorage.setItem("roomId", "");
            localStorage.setItem("partnerMessages", ""); // Clear potential temporary message storage
        } catch (error) {
            console.log("Failed to update roomId", error);
        }
    };

    const isConnectedToRoom = roomId !== "" || roomId !== undefined;

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                logoutUser,
                roomId,
                //setRoomId,
                updateRoomId,
                clearRoomId,
                isConnectedToRoom,
                updatePartnerMessages,
                getPartnerMessages
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
