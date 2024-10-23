import React, { useEffect, useState } from "react";
import useFetchProfilePicture from "../hooks/useFetchProfilePicture";
import { User } from "../../../types/User";
import defaultprofilepicture from "../../../images/defaultprofilepicture.jpg";

interface ProfileButtonProps {
  currUser: User | undefined;
}
const ProfileButton: React.FC<ProfileButtonProps> = ({ currUser }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (!user && currUser) setUser(currUser);
  }, [currUser]);

  useEffect(() => {
    if (currUser) useFetchProfilePicture(currUser, setUser);
  }, [currUser]);

  return (
    <>
      <div className="container">
        {user?.profilePictureUrl ? (
          <>
            <div className="">
              <img
                className="rounded-full"
                style={{ width: "50px", height: "50px" }}
                src={user?.profilePictureUrl}
                alt="Fetched"
              />
            </div>
          </>
        ) : (
          <div className="">
            <img
              className="rounded-full"
              style={{ width: "50px", height: "50px" }}
              src={defaultprofilepicture}
              alt="Fetched"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileButton;
