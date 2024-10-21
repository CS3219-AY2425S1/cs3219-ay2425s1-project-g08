import React from "react";

interface MatchButtonProps {
    onClick: () => void;
}

const MatchButton: React.FC<MatchButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={() => onClick()}
            className="bg-green rounded-[25px] p-4 text-2xl hover:bg-emerald-700"
        >
            Find Match!
        </button>
    );
}

export default MatchButton;