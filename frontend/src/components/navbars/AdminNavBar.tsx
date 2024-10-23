import React from "react";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import ProfileButton from "../../features/profile/components/ProfileButton.tsx";
import AddQuestionModal from "../../features/questions/components/AddQuestionModal.tsx";
import { useUser } from "../../context/UserContext.tsx";
import PeerPrepLogo from "../PeerPrepLogo.tsx";
import StandardBigButton from "../StandardBigButton.tsx";

interface AdminNavBarProps {
  fetchData: () => Promise<void>;
}

const AdminNavBar: React.FC<AdminNavBarProps> = ({ fetchData }) => {
  const location = useLocation();
  const { user } = useUser();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);
  return (
    <nav className="bg-off-white w-full p-4 flex items-center justify-between">
      {/* Logo or Brand */}
      <div className="container flex justify-start">
        <PeerPrepLogo />
      </div>
      {/* Conditionally render extra div based on location */}
      {location.pathname == "/question" ||
        (location.pathname == "/dashboard" && (
          <div className="container text-off-white">
            {/* <button
              onClick={() => openAddModal()}
              className="bg-green rounded-[25px] p-4 text-2xl hover:bg-emerald-700"
            >
              Add question
            </button> */}
            <StandardBigButton
              onClick={() => openAddModal()}
              label="Add question"
              color="green"
            />
            {isAddModalOpen && (
              <AddQuestionModal fetchData={fetchData} onClose={closeAddModal} />
            )}
          </div>
        ))}
      {/* Profile button */}
      <div className="flex-none">
        <Link to="/profile">
          <ProfileButton currUser={user} />
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavBar;
