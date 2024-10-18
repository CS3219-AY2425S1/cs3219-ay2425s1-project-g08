import { Dispatch, SetStateAction } from 'react';
import apiConfig from '../config/config';
import useFetchProfilePicture from './useFetchProfilePicture';
import { User } from '../types/User';

const useUploadProfilePicture = async (user: User, file: File, updateUser: (userData: User | undefined) => void, setErr: Dispatch<SetStateAction<string | undefined>> ) => {
    if (!file) {
        alert('Please select a file to upload.');
        return;
      }
  
    const formData = new FormData();
    formData.append('file', file); // Append the file to the form data

    try {
        const response = await fetch(`${apiConfig.profilePictureServiceUserUrl}/${user.id}/profile-picture`, {
            method: 'POST',
            mode: "cors",
            headers: {
                "Access-Control-Allow-Origin": `${apiConfig.profilePictureServiceUserUrl}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const err = await response.json();
            console.log(err);
            setErr(err.message);
            throw new Error('Failed to fetch image');
        }
        useFetchProfilePicture(user, updateUser);
    } catch (error) {
        console.error('Error fetching image:', error);
    }
};

export default useUploadProfilePicture;
