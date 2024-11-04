import { Link } from "react-router-dom";
import { MatchButton } from "../../features/matching";
import ProfileButton from "../../features/profile/components/ProfileButton";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import MatchingModal from "../../features/matching/components/MatchingModal";
import PeerPrepLogo from "../PeerPrepLogo";
import { Category } from "../../features/questions";

interface UserNavBarProps {
  categoriesWithQuestions: Array<Category>;
}

const UserNavBar: React.FC<UserNavBarProps> = ({ categoriesWithQuestions }) => {
  const { user } = useUser();
  const [isUserMatchingModalOpen, setIsUserMatchingModalOpen] = useState(false);

  const openMatchingModal = () => setIsUserMatchingModalOpen(true);
  const closeMatchingModal = () => setIsUserMatchingModalOpen(false);

  return (
    <nav className="bg-off-white w-full p-4 flex items-center justify-between">
      {/* Logo or Brand */}
      <div className="container flex justify-start">
        <PeerPrepLogo />
      </div>

      {/* Match button and profile for authenticated users */}
      <div className="container text-off-white">
        <MatchButton onClick={() => openMatchingModal()} />
      </div>
      {isUserMatchingModalOpen && (
        <MatchingModal
          closeMatchingModal={closeMatchingModal}
          categoriesWithQuestions={categoriesWithQuestions}
        />
      )}
      <Link to="/historyDashboard">
        <div className="text-gray-700 font-bold hover:text-emerald-700 hover:underline">History</div>
      </Link>
      <div className="flex-none">
        <Link to="/profile">
          <ProfileButton currUser={user} />
        </Link>
      </div>
    </nav>
  );
};

export default UserNavBar;
