import React from "react";
import StandardBigButton from "../../../components/StandardBigButton";

const MatchButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <StandardBigButton onClick={onClick} label="Find Match!" color="green" />
  );
};

export default MatchButton;
