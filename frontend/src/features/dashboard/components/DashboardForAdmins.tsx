import React, { useMemo, useState } from "react";
import { useTable, Column, Row } from "react-table"; // Import the 'Column' type
import { COLUMNS } from "./columns";
import { EditQuestionModal } from "../../questions";
import { useLocation } from "react-router-dom";
import { Question, emptyQuestion } from "../../questions";
import DashboardQuestionTable from "./DashboardQuestionTable";

// You can replace `any` with the actual type of questionList
interface DashboardForAdminsProps {
  questions: Array<Question>;
  fetchData: () => Promise<void>;
}

const DashboardForAdmins: React.FC<DashboardForAdminsProps> = ({
  questions,
  fetchData,
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

  const tableInstance = useTable({
    columns: columns,
    data: data,
  });

  const location = useLocation();

  const onClick = (row: Row<Question>) => {
    const questionClicked: Question = {
      id: row.original.id,
      title: row.values.title,
      description: row.values.description,
      categories: row.values.categories,
      complexity: row.values.complexity,
    };
    openEditModal(questionClicked);
  };
  return (
    <div className="overflow-x-auto">
      {editModalIsOpen && (
        <EditQuestionModal
          oldQuestion={questionClicked}
          onClose={closeEditModal}
          fetchData={fetchData}
        />
      )}
      {/* Use the extracted QuestionTable component */}
      <DashboardQuestionTable
        questions={questions}
        columns={columns}
        onClick={onClick}
      />
    </div>
  );
};

export default DashboardForAdmins;
