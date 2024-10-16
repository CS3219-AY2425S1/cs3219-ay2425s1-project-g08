import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/NavBar.tsx";
import { User } from '../types/User.tsx';
import useRetrieveUser from '../hooks/useRetrieveUser.tsx';
import EditUsernameModal from '../components/ProfileModals/EditUsernameModal.tsx';
import EditEmailModal from '../components/ProfileModals/EditEmailModal.tsx';
import EditPasswordModal from '../components/ProfileModals/EditPasswordModal.tsx';
import EditProfilePictureModal from '../components/ProfileModals/EditProfilePictureModal.tsx';
import useFetchProfilePicture from '../hooks/useFetchProfilePicture.tsx';
import { EditIcon } from '../components/EditIcon.tsx';
import { useUser } from '../context/UserContext.tsx';
import defaultprofilepicture from "../images/defaultprofilepicture.jpg";

const ProfilePage: React.FC = () => {
    // const [user, setUser] = useState<User | undefined>(undefined);
    const { user, updateUser, logoutUser } = useUser();

    const [username, setUsername] = useState<string | undefined>(undefined);

    const [isUsernameModalOpen, setUsernameModalOpen] = useState(false);
    const openUnModal = () => setUsernameModalOpen(true);
    const closeUnModal = () => setUsernameModalOpen(false);

    const [isEmailModalOpen, setEmailModalOpen] = useState(false);
    const openEmailModal = () => setEmailModalOpen(true);
    const closeEmailModal = () => setEmailModalOpen(false);

    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
    const openPwModal = () => setPasswordModalOpen(true);
    const closePwModal = () => setPasswordModalOpen(false);

    const [isProfilePictureModalOpen, setProfilePictureModalOpen] = useState(false);
    const openProfilePicModal = () => setProfilePictureModalOpen(true);
    const closeProfilePicModal = () => setProfilePictureModalOpen(false);
    // const [imageData, setImageData] = useState<string>("");
    const [uid, setUid] = useState("");
    const navigate = useNavigate();
    // useRetrieveUser(setUser);

    useEffect(() => {
        setUsername(user?.username);
      }, [user]);


    useEffect(() => {
        if (uid == "" && user) {
            setUid(user.id);
        }
    }, [user])

    useEffect(() => {
        fetchImage();
    }, [uid]);

    useEffect(() => {
        // updateNavBarProfilePicture
        closeProfilePicModal();
    }, [user]);

    const fetchImage = () => {
        if (user)
            useFetchProfilePicture(user, updateUser);
    }

    const handleLogout = () => {
        navigate('/');
        logoutUser();
    }

    return (
        <div className="bg-white w-screen h-screen">
            <Navbar />

            <div className='justify-center p-4 grid'>

                <div className='py-16 justify-center grid'>
                <h1 className="text-5xl font-bold">
                    User information
                    </h1>
                </div>
                    
                    {user?.profilePictureUrl ? (
                        <>
                            
                            <div className='flex justify-center  items-baseline'>
                            <img className="rounded-full" style={{ width: '250px', height: '250px', objectFit: 'cover' }} src={user?.profilePictureUrl} alt="Fetched" />
                            <EditIcon openModal={openProfilePicModal}/>
                            </div>
                    </>
                    ) : (
                        <div className='flex justify-center  items-baseline'>
                        <img className="rounded-full" style={{ width: '250px', height: '250px', objectFit: 'cover' }} src={defaultprofilepicture} alt="Fetched" />
                        <EditIcon openModal={openProfilePicModal}/>
                        </div>
                    )}



                <div className='py-8'>
                    Username
                    <div className="relative mb-4 grid grid-cols-8 gap-5">

                        <input
                                type="text"
                                className="p-8 block w-full px-4 py-2 bg-gray-300 rounded-md text-center col-span-7"
                                placeholder="Username" // Placeholder shows current user's username if empty
                                value={username} // If user undefined, it should fallback to the above placeholder value\
                                disabled={true}
                            />
                    
                            <EditIcon openModal={openUnModal}/>
                        
                    </div>

                        Email 
                    <div className="relative mb-4 grid grid-cols-8 gap-5">
                        <input
                            type="text"
                            className="block w-full px-4 py-2 bg-gray-300 rounded-md text-center col-span-7"
                            placeholder="Email" // Placeholder shows current user's username if empty
                            value={user?.email || ""} // You can bind this to a state variable in React
                            disabled={true}
                        />
               
                            <EditIcon openModal={openEmailModal}/>
                      
                    </div>
                    {isUsernameModalOpen && (
                            <EditUsernameModal onClose={closeUnModal} user={user} setUser={updateUser}/>
                    )}
                    {isEmailModalOpen && (
                            <EditEmailModal onClose={closeEmailModal} user={user} setUser={updateUser}/>
                    )}
                    {isPasswordModalOpen && (
                            <EditPasswordModal onClose={closePwModal} user={user} setUser={updateUser}/>
                    )}
                    {isProfilePictureModalOpen && (
                            <EditProfilePictureModal onClose={closeProfilePicModal} user={user} setUser={updateUser}/>
                    )}
                </div>


            </div>

            <div className="grid grid-cols-11 justify-center gap-4">

                <div className="col-span-4"></div>
                <button onClick={() => openPwModal()} className="bg-yellow text-black font-bold py-2 px-4 rounded-md">
                    Change Password
                </button>
                <div className="col-span-1"></div>
                <button onClick={() => handleLogout()} className="bg-black text-white font-bold py-2 px-4 rounded-md">
                    Logout
                </button>
                <div className="col-span-4"></div>

            </div>

        </div>

    );
};

export default ProfilePage;