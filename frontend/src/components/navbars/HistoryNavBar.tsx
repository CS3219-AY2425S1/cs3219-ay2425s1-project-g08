import { Link } from "react-router-dom";
import ProfileButton from "../../features/profile/components/ProfileButton";
import { useUser } from "../../context/UserContext";
import PeerPrepLogo from "../PeerPrepLogo";

// Consider removing this and renaming ProfileNavBar
const HistoryNavBar = () => {
  const { user } = useUser();

  return (
    <nav className="bg-off-white w-full p-4 flex items-center justify-between">
      <div className="container flex justify-start">
        <PeerPrepLogo />
      </div>
      <div className="flex-none">
        <Link to="/profile">
          <ProfileButton currUser={user} />
        </Link>
      </div>
    </nav>
  );
};

export default HistoryNavBar;
