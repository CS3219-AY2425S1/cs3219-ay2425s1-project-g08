import { useState, useEffect } from "react";
import AdminNavBar from "../components/AdminNavBar.tsx";
import Dashboard from "../components/Dashboard/Dashboard.tsx";
import useQuestionList from "../hooks/useQuestionList.tsx";
import {Question} from "../types/Question.tsx";

const DashboardPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const fetchData = useQuestionList(setQuestions);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col">
      <AdminNavBar fetchData={fetchData} />
      <Dashboard questions={questions} fetchData={fetchData} />
    </div>
  );
};

export default DashboardPage;
