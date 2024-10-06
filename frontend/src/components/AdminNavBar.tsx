import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileButton from "./ProfileButton.tsx";
import AddQuestionModal from "./QuestionModals/AddQuestionModal.tsx";

interface AdminNavBarProps {
  fetchData: () => Promise<void>;
}

const AdminNavBar: React.FC<AdminNavBarProps> = ({ fetchData }) => {
  const location = useLocation();

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  return (
    <nav className="bg-off-white w-full p-4 flex items-center justify-between">
      {/* Logo or Brand */}
      <div className="container flex justify-start">
        <img
          src="/src/assets/logo.svg"
          alt="PeerPrep logo"
          className="h-16 w-64"
        />
      </div>
      {/* Conditionally render extra div based on location */}
      {location.pathname == "/question" ||
        (location.pathname == "/dashboard" && (
          <div className="container text-off-white">
            <button
              onClick={() => openAddModal()}
              className="bg-green rounded-[25px] p-4 text-2xl hover:bg-emerald-700"
            >
              Add question
            </button>
            {isAddModalOpen && (
              <AddQuestionModal fetchData={fetchData} onClose={closeAddModal} />
            )}
          </div>
        ))}
      {/* Profile button */}
      <div>
        <ProfileButton />
      </div>
    </nav>
  );
};

export default AdminNavBar;
