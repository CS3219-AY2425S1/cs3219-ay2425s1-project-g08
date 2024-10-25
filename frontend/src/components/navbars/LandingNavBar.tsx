import { Link } from "react-router-dom";
import PeerPrepLogo from "../PeerPrepLogo";
import StandardBigButton from "../StandardBigButton";

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
          <StandardBigButton label="Register" color="black" />
        </Link>
        <Link to="/login">
          <StandardBigButton label="Login" color="yellow" />
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavBar;
