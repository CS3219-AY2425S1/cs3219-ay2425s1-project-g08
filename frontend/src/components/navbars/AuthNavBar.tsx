import React from "react";
import PeerPrepLogo from "../PeerPrepLogo";

const AuthNavBar: React.FC = () => {
  return (
    <nav className="bg-off-white w-full p-4 flex items-center justify-between relative">
      {/* Logo or Brand (Left-aligned) */}
      <div className="container flex justify-start">
        <PeerPrepLogo />
      </div>
    </nav>
  );
};

export default AuthNavBar;
