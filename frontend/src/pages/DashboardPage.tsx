import { useEffect } from "react";
import AdminNavBar from "../components/AdminNavBar.tsx";
import Dashboard from "../components/Dashboard/Dashboard.tsx";
import useQuestionList from "../hooks/useQuestionList.tsx";

const DashboardPage: React.FC = () => {
  const { questions, fetchData } = useQuestionList();

  useEffect(() => {
    fetchData();
  }, []); // IMPT Do not put fetchData in the dependency array so as to avoid infinite renders

  return (
    <div className="w-screen h-screen flex flex-col">
      <AdminNavBar fetchData={fetchData} />
      <Dashboard questions={questions} fetchData={fetchData} />
    </div>
  );
};

export default DashboardPage;
