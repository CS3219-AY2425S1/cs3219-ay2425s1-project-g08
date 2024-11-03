import React, { useMemo, useState } from "react";
import { useTable, Column, Row } from "react-table"; // Import the 'Column' type
import { COLUMNS } from "./columns";
import { EditQuestionModal } from "../../questions";
import { useLocation } from "react-router-dom";
import { Question, emptyQuestion, Category } from "../../questions";
import DashboardQuestionTable from "./DashboardQuestionTable";
import { ChatBoxModal } from "../../communication";

// You can replace `any` with the actual type of questionList
interface DashboardForUsersProps {
  questions: Array<Question>;
  fetchData: () => Promise<void>;
  categories: Array<Category>;
}

const DashboardForUsers: React.FC<DashboardForUsersProps> = ({
  questions,
  fetchData,
  categories,
}) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const closeEditModal = () => setEditModalIsOpen(false);

  const [questionClicked, setQuestionClicked] = useState(emptyQuestion);

  const openEditModal = (questionClicked: Question) => {
    setEditModalIsOpen(true);
    setQuestionClicked(questionClicked);
  };

  const columns: Column<Question>[] = useMemo(() => COLUMNS, []);
  const data = useMemo(() => questions, [questions]);

  const location = useLocation();

  const onClick = (row: Row<Question>) => {
    window.location.href = `/question/${row.original.id}`;
  };
  return (
    <div className="overflow-x-auto">
      {editModalIsOpen && (
        <EditQuestionModal
          oldQuestion={questionClicked}
          onClose={closeEditModal}
          fetchData={fetchData}
          categories={categories}
        />
      )}
      <ChatBoxModal />
      {/* Use the extracted QuestionTable component */}
      <DashboardQuestionTable
        questions={questions}
        columns={columns}
        onClick={onClick}
        categories={categories}
      />
    </div>
  );
};

export default DashboardForUsers;
