import { Link } from "react-router-dom";
import PeerPrepLogo from "./PeerPrepLogo";

const LandingNavBar = () => {
  return (
    <nav className="bg-off-white w-full p-4 flex items-center justify-between">
      {/* Logo or Brand */}
      <div className="container flex justify-start">
        <PeerPrepLogo />
      </div>

      {/* Register and Login buttons for unauthenticated users */}
      <div className="flex space-x-8 text-2xl">
        <Link to="/register">
          <button className="bg-black text-off-white rounded-[25px] p-4 whitespace-nowrap">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-yellow text-black rounded-[25px] p-4 whitespace-nowrap">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavBar;
