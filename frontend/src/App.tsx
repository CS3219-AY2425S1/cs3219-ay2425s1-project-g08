import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuestionPage from "./pages/QuestionPage";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardPageForUsers from "./pages/DashBoardForUsersPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/question/:title" element={<QuestionPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboardForUsers" element={<DashboardPageForUsers />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
