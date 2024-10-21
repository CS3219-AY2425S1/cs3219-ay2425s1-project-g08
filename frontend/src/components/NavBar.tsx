import { useLocation, Link } from "react-router-dom";
import MatchButton from "./matchingModals/MatchButton";
import ProfileButton from "./ProfileButton";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import MatchingModal from "./matchingModals/MatchingModal";

const NavBar = () => {
  const location = useLocation();
  const { user } = useUser();
  const [isUserMatchingModalOpen, setIsUserMatchingModalOpen] = useState(false);

  const openMatchingModal = () => setIsUserMatchingModalOpen(true);
  const closeMatchingModal = () => setIsUserMatchingModalOpen(false);

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

      {/* ProfileButton or Enter as Admin/User buttons (Right-aligned) */}
      <div className="flex-none">
        {location.pathname === "/" ? (
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
        ) : (
          <div>
            {location.pathname === "/dashboardForUsers" && (
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <MatchButton onClick={() => openMatchingModal()} />
              </div>
            )}
            {isUserMatchingModalOpen && (
              <MatchingModal closeMatchingModal={closeMatchingModal} />
            )}
            <Link to="/profile">
              <ProfileButton currUser={user} />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
