import { Link } from "react-router-dom";
import ProfileButton from "../../features/profile/components/ProfileButton";
import { useUser } from "../../context/UserContext";
import PeerPrepLogo from "../PeerPrepLogo";
import { IsConnectedButton } from "../../features/collaboration/index";

interface CollabNavBarProps {}

const CollabNavBar: React.FC<CollabNavBarProps> = () => {
    const { user } = useUser();

    return (
        <nav className="bg-off-white w-full p-4 flex items-center justify-between">
            {/* Logo or Brand */}
            <div className="container flex justify-start">
                <PeerPrepLogo />
            </div>

            {/* Match button and profile for authenticated users */}
            <div className="container flex justify-center text-off-white">
              <IsConnectedButton />
            </div>
            <div className="container flex justify-end">
                <Link to="/historyDashboard">
                    <div
                        className="text-gray-700 font-bold hover:text-emerald-700 hover:underline mt-3
                "
                    >
                        History
                    </div>
                </Link>
                <div className="flex-none ml-4">
                    <Link to="/profile">
                        <ProfileButton currUser={user} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default CollabNavBar;
