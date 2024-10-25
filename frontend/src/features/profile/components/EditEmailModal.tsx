import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { User } from "../../../types/User.tsx";
import useUpdateUser from "../hooks/useUpdateUser.tsx";
import { ErrorModal } from "../../dashboard";

interface EditEmailModalProps {
  onClose: () => void;
  setUser: (userData: User | undefined) => void;
  user: User | undefined;
}

const EditEmailModal: React.FC<EditEmailModalProps> = ({
  onClose,
  setUser,
  user,
}) => {
  const [email, setEmail] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [err, setErr] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<boolean>(false);

  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const openErrorModal = () => setErrorModalOpen(true);
  const closeErrorModal = () => {
    setErrorModalOpen(false);
    onClose();
  };

  useEffect(() => {
    if (user != undefined) {
      setEmail(user?.email);
    }
  }, [user]);

  useEffect(() => {
    if (err) {
      openErrorModal();
    }
  }, [err]);

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value); // Update the local state with the input value
  };
  const { updateUser, loading } = useUpdateUser(user, "email");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    if (newEmail) {
      console.log("updating email to:", newEmail);
      await updateUser(newEmail, setUser, setErr, setSuccess); // Call the custom hook function
    }
  };
  return (
    <div
      id="editEmailModal"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 text-black"
    >
      <div className="bg-off-white rounded-lg p-4 w-1/5 h-1/2 fade-in modal-context z-50">
        <div className="mb-10">
          <h1>
            <b>Change email</b>
          </h1>
          Type in your new email and click “Confirm” to change. Please remember
          to verify you new email afterwards.
        </div>
        <form className="relative mb-8">
          Old email
          <input
            type="text"
            className="p-8 block w-full px-4 py-2 bg-gray-300 rounded-md text-center"
            placeholder="Email" // Placeholder shows current user's username if empty
            value={email} // If user undefined, it should fallback to the above placeholder value
            disabled={true}
          />
        </form>

        <form onSubmit={handleSubmit} className="relative mb-8">
          New email
          <input
            type="text"
            className="p-8 block w-full px-4 py-2 bg-white rounded-md text-center"
            placeholder="New email" // Placeholder shows current user's username if empty
            value={newEmail} // If user undefined, it should fallback to the above placeholder value
            onChange={handleInputChange} // Capture the input for editing
          />
          <div className="flex gap-10 justify-center mt-20">
            <button
              type="submit"
              className="rounded-lg px-4 py-1.5 bg-green text-white  hover:bg-emerald-500"
              disabled={loading}
            >
              {loading ? "Updating..." : "Confirm"}
            </button>
            <button
              onClick={onClose}
              id="submit"
              className="rounded-lg px-4 py-1.5 bg-red-500  text-white text-lg hover:bg-red-400"
            >
              Cancel
            </button>
          </div>
          {isErrorModalOpen && (
            <ErrorModal onClose={closeErrorModal} error={err} />
          )}
        </form>
      </div>
    </div>
  );
};

export default EditEmailModal;
