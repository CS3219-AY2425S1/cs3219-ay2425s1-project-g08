import { useUser } from "../context/UserContext"; // Assuming you have a context providing the user
import HistoryNavBar from "../components/navbars/HistoryNavBar";
import HistoryAttemptTable from "../features/history/HistoryAttemptTable";
import { Column } from "react-table";
import { HistoryTableData, HistoryTableHeaders } from "../features/questions/types/HistoryAttempt";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const attempts: HistoryTableData[] = [
  {
    attemptId: "1",
    title: "Java Basics Quiz",
    category: "Programming",
    complexity: "Beginner",
    datetimeAttempted: "2023-10-25T12:34:00Z",
  },
  {
    attemptId: "12413",
    title: "React Intermediate",
    category: "Programming",
    complexity: "Intermediate",
    datetimeAttempted: "2023-10-26T15:45:00Z",
  },
];

const columns: Array<Column<HistoryTableHeaders>> = [
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "Complexity",
    accessor: "complexity",
  },
  {
    Header: "Date Attempted",
    accessor: "datetimeAttempted",
  },
];

const handleRowClick = (attempt: HistoryTableData, navigate: NavigateFunction) => {
  navigate(`/historyAttempt/${attempt.attemptId}`);
};

type Question = {
  id: string,
  title: string,
  description: string,
  categories: string[],
  complexity: string
}

const HistoryAttemptPage: React.FC = () => {

  const { user } = useUser();
  const [attempts, setAttempts] = useState<HistoryTableData[]>([]);
  const navigate = useNavigate();
  const historyServiceUrl = "http://localhost:9090"

  useEffect(() => {
    fetch(`${historyServiceUrl}/user123/attempts`,
      { 
        mode: "cors",
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": `${historyServiceUrl}`,
        },
      }
    ).then(res => {
      if (!res.ok) {
        throw new Error(`Error: Failed to fetch your attempt records!`);
      }
      res.json()
        .then(data => {
          const tableDatas: HistoryTableData[] = data.map(attempt => ({
            attemptId: attempt.id,
            title: "Testing",
            category: "easy",
            complexity: "shagaf",
            datetimeAttempted: attempt.attemptDate
          }));
          console.log(tableDatas);
          setAttempts(tableDatas);
        }
      );
    })
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <HistoryNavBar />
      <div className="flex flex-row justify-center">
        <div className="text-center text-3xl py-10 font-bold">Your Attempt History</div>
      </div>
      <HistoryAttemptTable
        attempts={attempts}
        columns={columns}
        onClick={(row) => (handleRowClick(row, navigate))}
      />
    </div>
  );
};

export default HistoryAttemptPage;
