import { useUser } from "../context/UserContext"; // Assuming you have a context providing the user
import HistoryNavBar from "../components/navbars/HistoryNavBar";
import HistoryAttemptTable from "../features/history/HistoryAttemptTable";
import { Column } from "react-table";
import { HistoryAttempt, HistoryTableHeaders } from "../features/questions/types/HistoryAttempt";

// Sample data
const attempts: HistoryAttempt[] = [
  {
    attemptId: "1",
    title: "Java Basics Quiz",
    category: "Programming",
    complexity: "Beginner",
    datetimeAttempted: "2023-10-25T12:34:00Z",
    attemptText: "Example text of the attempt",
  },
  {
    attemptId: "2",
    title: "React Intermediate",
    category: "Programming",
    complexity: "Intermediate",
    datetimeAttempted: "2023-10-26T15:45:00Z",
    attemptText: "Another attempt text",
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

// onClick handler
const handleRowClick = (attempt: HistoryAttempt) => {
  console.log("Attempt clicked:", attempt);
  // You could route to another page or perform any action with the attempt data here
};

const HistoryPage: React.FC = () => {

  const { user } = useUser();
  
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
        onClick={handleRowClick}
      />
    </div>
  );
};

export default HistoryPage;
