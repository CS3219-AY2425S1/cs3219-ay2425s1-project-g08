import React from "react";

const AuthNavBar: React.FC = () => {
  return (
    <nav className="bg-off-white w-full p-4 flex items-center justify-between relative">
      {/* Logo or Brand (Left-aligned) */}
      <div className="flex-none">
        <img
          src="/src/assets/logo.svg"
          alt="PeerPrep logo"
          className="h-16 w-64"
        />
      </div>
    </nav>
  );
};

export default AuthNavBar;
