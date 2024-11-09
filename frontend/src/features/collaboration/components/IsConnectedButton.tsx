import { useState } from "react";
import { useUser } from "../../../context/UserContext";
import StandardBigButton from "../../../components/StandardBigButton";
import LeaveRoomModal from "./LeaveRoomModal";
import apiConfig from "../../../config/config";

const IsConnectedButton: React.FC = () => {
    const { user, isConnectedToRoom, roomId } = useUser();
    const color = isConnectedToRoom ? "green" : "red";
    const label = isConnectedToRoom ? "Connected" : "Disconnected";
    const [leaveRoomModalIsOpen, setLeaveRoomModalIsOpen] = useState(false);
    
    const openLeaveRoomModal = () => setLeaveRoomModalIsOpen(true);
    const closeLeaveRoomModal = () => setLeaveRoomModalIsOpen(false);
    const onClick = () => {
        if (isConnectedToRoom) {
            openLeaveRoomModal();
        }
    };

    const [otherUserLeft, setOtherUserLeft] = useState<boolean>(false);
    const ws_url = new URL(`${apiConfig.collaborationWebSocketUrl}?roomId=${roomId}`, window.location.origin);
    const ws = new WebSocket(ws_url.toString());

    ws.onmessage = (message) => {
        const parsedData = JSON.parse(message.data);
        console.log("Received message:", parsedData);
        if (!user) {
            return;
        }
        if (parsedData.type === "leave-room") {
            openLeaveRoomModal();
            if (parsedData.username != user.username) {
                setOtherUserLeft(true);
            }
        }
    };

    return (
        <div>
            {leaveRoomModalIsOpen && (
                <LeaveRoomModal
                    closeLeaveRoomModal={closeLeaveRoomModal}
                    otherUserLeft={otherUserLeft}
                />
            )}
            {location.pathname !== "/" && (
                <StandardBigButton
                    onClick={onClick}
                    label={label}
                    color={color}
                />
            )}
        </div>
    );
};

export default IsConnectedButton;
