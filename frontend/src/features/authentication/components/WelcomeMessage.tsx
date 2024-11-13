import React from "react";
import { useLocation } from "react-router-dom";

const WelcomeMessage: React.FC = () => {
    const location = useLocation().pathname;

  return (
    <div className="flex flex-row text-4xl mt-4 text-right font-semibold items-center">
        <h2 className="text-blue-900 mr-2">
        {location=="/login" ? "Welcome back to" : "Welcome to"}
        </h2>
        <h2 className="text-black">
        Peer
        </h2>
        <h2 className="text-yellow">
        Prep
        </h2>
        <h2 className="text-blue-900">
        !
        </h2>
    </div>
  );
};

export default WelcomeMessage;
