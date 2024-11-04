import { useState } from "react";
import { useUser } from "../../../context/UserContext";
import StandardBigButton from "../../../components/StandardBigButton";
import LeaveRoomModal from "./LeaveRoomModal";
import apiConfig from "../../../config/config";
import io from "socket.io-client";

interface IsConnectedButtonProps {}

const COLLAB_WEBSOCKET_URL = apiConfig.collaborationWebSocketUrl;

const IsConnectedButton: React.FC<IsConnectedButtonProps> = () => {
    const { isConnectedToRoom } = useUser();
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

    const ws = new WebSocket(COLLAB_WEBSOCKET_URL);

    ws.onopen = () => {
        console.log("Connected to WebSocket server");
    };

    ws.onmessage = (message) => {
        console.log("Received message from server:", message);
        let file = new Blob([message.data], { type: "application/json" });
        file.text()
            .then((value) => {
                const parsedData = JSON.parse(value);
                console.log(parsedData);
                if (parsedData.type === "leave-room") {
                    setOtherUserLeft(true);
                    openLeaveRoomModal();
                }
            })
            .catch((error) => {
                console.log("Something went wrong" + error);
            });
    };

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
