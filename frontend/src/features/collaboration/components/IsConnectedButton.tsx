import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import StandardBigButton from "../../../components/StandardBigButton";
import LeaveRoomModal from "./LeaveRoomModal";
import apiConfig from "../../../config/config";

interface IsConnectedButtonProps {}

const COLLAB_WEBSOCKET_URL = apiConfig.collaborationWebSocketUrl;

const IsConnectedButton: React.FC<IsConnectedButtonProps> = () => {
    const { isConnectedToRoom, clientWebSocket } = useUser();
    const color = isConnectedToRoom ? "green" : "red";
    const label = isConnectedToRoom ? "Connected" : "Disconnected";
    const [LeaveRoomModalIsOpen, setLeaveRoomModalIsOpen] = useState(false);
    const openLeaveRoomModal = () => setLeaveRoomModalIsOpen(true);
    const closeLeaveRoomModal = () => setLeaveRoomModalIsOpen(false);
    const onClick = () => {
        if (isConnectedToRoom) {
            openLeaveRoomModal();
        }
    };

    const [otherUserLeft, setOtherUserLeft] = useState<boolean>(false);

    useEffect(() => {
        if (clientWebSocket?.otherUserLeft) {
            setOtherUserLeft(clientWebSocket.otherUserLeft);
        }
    });

    return (
        <div>
            {LeaveRoomModalIsOpen && (
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
