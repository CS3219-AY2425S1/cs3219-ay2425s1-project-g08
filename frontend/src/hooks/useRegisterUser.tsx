import { Dispatch, SetStateAction, useState } from 'react';
import { UserResponse } from '../types/UserResponse';
import { User } from '../types/User';

const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const registerUser = async (
    usernameValue: string,
    emailValue: string,
    passwordValue: string,
    setNewUser: Dispatch<SetStateAction<User | undefined>>,
    setSuccess: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    setShowErrorMessage: Dispatch<SetStateAction<boolean>>
  ) => {

    setLoading(true);
    setShowErrorMessage(false);

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": usernameValue,
            "email": emailValue,
            "password": passwordValue
        }),
      });

      if (!response.ok) {
        /* Failed to create new user */
        const err = await response.json();
        console.log(err);
        setErrorMessage("Failed to create new user: " + err.message);
        setShowErrorMessage(true);
        setSuccess(false);
        throw new Error('Failed to create new user ' + usernameValue);
      }

      const newUser: UserResponse = await response.json();
      console.log('Updated ', usernameValue, ':', newUser);
      setNewUser(newUser.data);
      setShowErrorMessage(false);
      setSuccess(true);
      return newUser; // Return new user if successful
    } catch (e: any) {
      console.error('Error updating ', ':', e);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  return { registerUser, loading };
};

export default useRegisterUser;
