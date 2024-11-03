import React, { useMemo, useState } from "react";
import { Column, Row } from "react-table"; // Import the 'Column' type
import { COLUMNS } from "./columns";
import { Category, EditQuestionModal } from "../../questions";
import { Question, emptyQuestion } from "../../questions";
import DashboardQuestionTable from "./DashboardQuestionTable";

// You can replace `any` with the actual type of questionList
interface DashboardForAdminsProps {
  questions: Array<Question>;
  fetchData: () => Promise<void>;
  categories: Array<Category>;
}

const DashboardForAdmins: React.FC<DashboardForAdminsProps> = ({
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
          categories={categories}
        />
      )}
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

export default DashboardForAdmins;
