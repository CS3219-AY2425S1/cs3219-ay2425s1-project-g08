import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useUser } from "../../../context/UserContext.tsx";

interface LeaveRoomModalProps {
    closeLeaveRoomModal: () => void;
}

const LeaveRoomModal: React.FC<LeaveRoomModalProps> = ({
    closeLeaveRoomModal,
}) => {
    const [showLeaveAlert, setShowLeaveAlert] = useState(false);
    const navigate = useNavigate();
    const { setRoomId } = useUser();

    const handleLeaveRoom = async () => {
        try {
            // Add logic to leave the room, e.g., API call to notify server
            setRoomId("undefined");
            setShowLeaveAlert(true);
            setTimeout(() => {
                navigate("/dashBoardForUsers"); // Navigate to home or another page after leaving the room
            }, 2000);
        } catch (error) {
            console.error("Error leaving room:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-60">
            <div className="relative p-6 bg-white rounded-lg shadow-lg space-y-6">
            <button
                onClick={closeLeaveRoomModal}
                className="absolute top-2 right-2 px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-full"
            >
                X
            </button>
            {showLeaveAlert ? (
                <Alert key="success" variant="success">
                You have left the room successfully!
                </Alert>
            ) : (
                <></>
            )}
            <div className="flex flex-col space-y-4">
                <p className="text-black">Are you sure you want to leave the room?</p>
                <div className="flex justify-center mt-4">
                <button
                    onClick={handleLeaveRoom}
                    className="px-6 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                >
                    Leave Room
                </button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default LeaveRoomModal;
