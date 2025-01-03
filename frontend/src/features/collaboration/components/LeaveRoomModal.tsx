import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { useUser } from "../../../context/UserContext.tsx";
import apiConfig from "../../../config/config.ts";
import { useSaveHistory } from "../../../context/SaveHistoryContext.tsx";

interface LeaveRoomModalProps {
    closeLeaveRoomModal: () => void;
    otherUserLeft: boolean;
}

const LeaveRoomModal: React.FC<LeaveRoomModalProps> = ({
    closeLeaveRoomModal,
    otherUserLeft,
}) => {
    const saveHistoryCallback = useSaveHistory();
    const [showLeaveAlert, setShowLeaveAlert] = useState<boolean>(false);
    const [ showLeaveRoomResponse, setShowLeaveRoomResponse ] = useState<boolean>(false);
    const navigate = useNavigate();
    const { user, roomId, clearRoomId } = useUser();

    const ws_url = new URL(
        `${apiConfig.collaborationWebSocketUrl}?roomId=${roomId}`,
        window.location.origin
    );
    const ws = new WebSocket(ws_url.toString());
    const leaveRoomData = {
        type: "leave-room",
        username: user?.username,
        roomId: roomId,
    };

    const handleLeaveRoom = async () => {
        try {
            const saveHistory = await saveHistoryCallback;
            saveHistory();
            // Add logic to leave the room, e.g., API call to notify server
            clearRoomId(); // set the room ID to ""
            setShowLeaveAlert(true);
            console.log("Leaving room...");
            setShowLeaveRoomResponse(true);
            ws.send(JSON.stringify(leaveRoomData));
            // Ensure WebSocket is open before sending message
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(leaveRoomData));
            } else {
                console.warn("WebSocket is not open. Message not sent.");
            }
            setTimeout(() => {
                navigate("/dashboard"); // Navigate to  dashboard page after leaving the room
            }, 2000);
        } catch (error) {
            console.error("Error leaving room:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-60">
            <div className="relative p-6 bg-white rounded-lg shadow-lg space-y-6">
                {
                    showLeaveRoomResponse 
                    ? <></>
                    : (
                        <button
                        onClick={closeLeaveRoomModal}
                        className="absolute top-2 right-2 px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-full"
                        >
                            X
                        </button>
                    )
                }
                {showLeaveAlert ? (
                    <Alert key="success" variant="success">
                        You have ended the session!
                    </Alert>
                ) : (
                    <div className="flex flex-col space-y-4">
                        {!otherUserLeft ? (
                            <p className="text-black">
                                Are you sure you want to end the session?
                            </p>
                        ) : (
                            <p className="text-black">
                                The other user has left the session. Would you like to leave
                                the session as well?
                            </p>
                        )}
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleLeaveRoom}
                                className="px-6 py-2 text-white bg-rose-600 rounded hover:bg-red-700"
                            >
                                End Session
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeaveRoomModal;
