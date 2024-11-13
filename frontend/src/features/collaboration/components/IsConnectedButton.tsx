import { useState } from "react";
import { useUser } from "../../../context/UserContext";
import StandardBigButton from "../../../components/StandardBigButton";
import LeaveRoomModal from "./LeaveRoomModal";
import apiConfig from "../../../config/config";

const IsConnectedButton: React.FC = () => {
    const { user, isConnectedToRoom, roomId } = useUser();
    const color = isConnectedToRoom ? "green" : "red";
    const label = isConnectedToRoom ? "Leave Room" : "Disconnected";
    const [leaveRoomModalIsOpen, setLeaveRoomModalIsOpen] = useState(false);

    const openLeaveRoomModal = () => setLeaveRoomModalIsOpen(true);
    const closeLeaveRoomModal = () => setLeaveRoomModalIsOpen(false);
    const onClick = () => {
        if (isConnectedToRoom) {
            openLeaveRoomModal();
        }
    };

    const [otherUserLeft, setOtherUserLeft] = useState<boolean>(false);
    const ws_url = new URL(
        `${apiConfig.collaborationWebSocketUrl}?roomId=${roomId}`,
        window.location.origin
    );
    const ws = new WebSocket(ws_url.toString());

    ws.onmessage = (message) => {
        const file = new Blob([message.data], { type: "application/json" });
        file.text()
            .then((value) => {
                const parsedData = JSON.parse(value);
                console.log(parsedData);
                if (!user) {
                    return;
                }

                if (parsedData.type === "leave-room") {
                    if (parsedData.username != user.username) {
                        setOtherUserLeft(true);
                    }
                    openLeaveRoomModal();
                }
            })
            .catch((error) => {
                console.log("Something went wrong" + error);
            });
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
