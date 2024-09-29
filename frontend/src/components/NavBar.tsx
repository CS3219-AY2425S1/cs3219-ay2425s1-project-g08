import React from "react";
import { useLocation, Link } from "react-router-dom";
import IsConnected from "./IsConnected";
import ProfileButton from "./ProfileButton";


const NavBar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="bg-off-white w-full p-4 flex items-center justify-evenly">
      {/* Logo or Brand */}
      <div className="container flex justify-start">
        <img
          src="/src/assets/logo.svg"
          alt="PeerPrep logo"
          className="h-16 w-64"
        />
      </div>
      {/* Conditionally render extra div based on location */}
      <IsConnected isConnected={false} />
      {location.pathname === "/" ? (
        <div className="container flex space-x-8 justify-end text-2xl text-off-white">
          <Link to="/dashboard">
            <button className="bg-black rounded-[25px] p-4">Register</button>
          </Link>
          <Link to="/question">
            <button className="bg-yellow rounded-[25px] p-4">Login</button>
          </Link>
        </div>
      ) : (
        <ProfileButton />
      )}
    </nav>
  );
};

export default NavBar;