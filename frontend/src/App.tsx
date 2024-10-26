import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuestionPage from "./pages/QuestionPage";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { UserProvider } from "./context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import HistoryAttemptPage from "./pages/HistoryDashboardPage";
import HistoryPage from "./pages/HistoryPage";

const App: React.FC = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/question/:title" element={<QuestionPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/historyDashboard" element={<HistoryAttemptPage />} />
          <Route path="/historyAttempt/:attemptId" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
