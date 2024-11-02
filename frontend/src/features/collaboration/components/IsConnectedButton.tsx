import { useState } from "react";
import { useUser } from "../../../context/UserContext";
import StandardBigButton from "../../../components/StandardBigButton";
import LeaveRoomModal from "./LeaveRoomModal";

interface IsConnectedButtonProps {}

const IsConnectedButton: React.FC<IsConnectedButtonProps> = () => {
    const { isConnectedToRoom, roomId } = useUser();
    console.log("isConnectedToRoom:", isConnectedToRoom);
    console.log("roomId:", roomId);
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
    return (
        <div>
            {LeaveRoomModalIsOpen && (
                <LeaveRoomModal closeLeaveRoomModal={closeLeaveRoomModal} />
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
