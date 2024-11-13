import React from "react";
import LandingNavBar from "../components/navbars/LandingNavBar.tsx";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-tr from-[#E0EFEF] via-[#8E9AA1] to-[#3D4553] w-screen h-screen flex flex-col overflow-y-auto">
      <LandingNavBar />
      <div className="flex flex-col items-center justify-center text-off-white flex-grow">
        <div>
          <h1 className="text-8xl font-bold mt-4">
            Tech <br />
            Interview <br />
            Prep.
          </h1>
          <h2 className="text-4xl mt-4 text-black text-right">
            With a <br />
            friend.
          </h2>
        </div>
        <p className="text-2xl text-black text-center mt-4">
          Ace your tech interview by collaborating with a <br />
          peer matched specifically to you.
        </p>
        <Link to="/register">
          <button className="bg-black rounded-[25px] p-4 mt-4 mb-4">
            Find your match!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
