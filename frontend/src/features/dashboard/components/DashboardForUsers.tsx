import React, { useMemo } from "react";
import { Column } from "react-table"; // Import the 'Column' type
import { COLUMNS } from "./columns";
import { Question, Category } from "../../questions";
import DashboardQuestionTable from "./DashboardQuestionTable";

// You can replace `any` with the actual type of questionList
interface DashboardForUsersProps {
    questions: Array<Question>;
    categories: Array<Category>;
}

const DashboardForUsers: React.FC<DashboardForUsersProps> = ({
    questions,
    categories,
}) => {
    const columns: Column<Question>[] = useMemo(() => COLUMNS, []);

    const onClick = () => {};
    return (
        <div className="overflow-x-auto">
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
