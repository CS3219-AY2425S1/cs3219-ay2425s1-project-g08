import React from "react";
import StandardBigButton from "../../../components/StandardBigButton";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";

const BackToRoomButton: React.FC = () => {
    const navigate = useNavigate();
    const { questionId } = useUser();

    const onClick = () => {
        navigate(`/question/${questionId}`);
    }

  return (
    <StandardBigButton onClick={onClick} label="Back to Room" color="green" />
  );
};

export default BackToRoomButton;
