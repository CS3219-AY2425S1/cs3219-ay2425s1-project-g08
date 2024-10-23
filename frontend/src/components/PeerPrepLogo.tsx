import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PeerPrepLogo: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // Define a click handler for the logo
  const handleLogoClick = () => {
    if (user) {
      // If authenticated, navigate to the dashboard
      navigate("/dashboard");
    } else {
      // If not authenticated, navigate to the landing page
      navigate("/");
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleLogoClick}>
      <img
        src="/src/assets/logo.svg"
        alt="PeerPrep Logo"
        className="h-16 w-64"
      />
    </div>
  );
};

export default PeerPrepLogo;
