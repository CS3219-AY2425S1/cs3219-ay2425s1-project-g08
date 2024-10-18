import { Dispatch, SetStateAction, useState } from 'react';
import { UserResponse } from '../types/UserResponse';
import { useUser } from '../context/UserContext';

const useLoginUser = () => {
  const [loading, setLoading] = useState(false);
  const { updateUser } = useUser();
  const loginUser = async (
    emailValue: string,
    passwordValue: string,
    setSuccess: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setShowErrorMessage: Dispatch<SetStateAction<boolean>>
  ) => {

    setLoading(true);
    setShowErrorMessage(false);

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": emailValue,
            "password": passwordValue
        }),
      });

      if (!response.ok) {
        /* Failed to create new user */
        const err = await response.json();
        console.log(err);
        setErrorMessage("Login failed: " + err.message);
        setShowErrorMessage(true);
        setSuccess(false);
        throw new Error('Login failed ' + emailValue);
      }

      const loggedInUser: UserResponse = await response.json();
      console.log('Logged in', emailValue, ':', loggedInUser);
      updateUser(loggedInUser.data);
      setShowErrorMessage(false);
      // setSuccess(true);
      return loggedInUser; // Return new user if successful
    } catch (e: any) {
      console.error('Error updating ', ':', e);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  return { loginUser, loading };
};

export default useLoginUser;
