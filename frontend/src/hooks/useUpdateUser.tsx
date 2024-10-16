import { Dispatch, SetStateAction, useState } from 'react';
import { User } from '../types/User';
import { UserResponse } from '../types/UserResponse';
import apiConfig from '../config/config';

const useUpdateUser = (user : User | undefined, key: string) => {
  const [loading, setLoading] = useState(false);
  const updateUser = async (value: string, setUser: (userData: User | undefined) => void, setErr: Dispatch<SetStateAction<string | undefined>>, setSuccess: Dispatch<SetStateAction<boolean>>) => {
    setLoading(true);

    try {
      const response = await fetch(`${apiConfig.userServiceUserUrl}/${user?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
          Authorization: `Bearer ${user?.accessToken}`
        },
        body: JSON.stringify({ [key]: value }),
      });

      if (!response.ok) {
        const err = await response.json();
        console.log(err);
        setErr(err.message);
        // console.log(err.message);
        throw new Error('Failed to update ' + key);
      }

      const updatedUser: UserResponse = await response.json();
      console.log('Updated ', key, ':', updatedUser);
      if (key == "username" || key == "email") {
        if (user)
          setUser({...user, // Keep other fields unchanged
            [key]: updatedUser.data[key]});
      }
      setSuccess(true);
      return updatedUser; // Return updated user if needed
    } catch (e: any) {
      console.error('Error updating ', key, ':', e);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  return { updateUser, loading };
};

export default useUpdateUser;
