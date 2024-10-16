import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User } from "../types/User";

// Define the context value type
interface UserContextType {
  user: User | undefined; // Change User | undefined to User | null
  updateUser: (userData: User | undefined) => void; // Function to log in the user
  logoutUser: () => void; // Function to log out the user
}

// Create user context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    // Retrieve user from local storage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        console.log("trying");
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.log("Failed to parse user from local storage:", error);
        setUser(undefined);
      }
    }
  }, []);

  const updateUser = (userData: User | undefined) => {
    try {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Store user in local storage
    } catch (error) {
      setUser(undefined);
      console.log("Failed to update user", error);
    }
  };

  const logoutUser = () => {
    setUser(undefined);
    localStorage.removeItem('user'); // Remove user from local storage
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logoutUser}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};