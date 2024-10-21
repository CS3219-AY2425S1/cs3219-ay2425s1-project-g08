import React, { useMemo, useState } from "react";
import { useTable, Column, Row } from "react-table"; // Import the 'Column' type
import { COLUMNS } from "./columns";
import EditQuestionModal from "../QuestionModals/EditQuestionModal";
import { useLocation } from "react-router-dom";
import { Question, emptyQuestion } from "../../types/Question";

// You can replace `any` with the actual type of questionList
interface DashboardProps {
  questions: Array<Question>;
  fetchData: () => Promise<void>;
}

const Dashboard: React.FC<DashboardProps> = ({ questions, fetchData }) => {
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const location = useLocation();

  const onClick = (row: Row<Question>) => {
    if (location.pathname === "/dashboard") {
      const questionClicked: Question = {
        id: row.original.id,
        title: row.values.title,
        description: row.values.description,
        categories: row.values.categories,
        complexity: row.values.complexity
      }
      openEditModal(
        questionClicked
      );
    } else if (location.pathname === "/dashboardForUsers") {
      window.location.href = `/question/${row.original.id}`;
    }
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
      {/* Add your table or other components here */}
      <table
        {...getTableProps()}
        className="min-w-full bg-off-white shadow-md rounded-lg"
      >
        <thead className="bg-white text-gray-700 uppercase text-sm leading-normal">
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroup.id}
              className="py-3 px-6 text-left font-medium tracking-wider border-t border-b border-gray-200"
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                  className="py-2 pl-2"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="text-gray-600 text-sm font-light"
        >
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={row.id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={cell.column.id}
                      className="py-3 px-6 text-left"
                      onClick={() => onClick(row)}
                    >
                      {cell.column.Header === "Categories"
                        ? (cell.value.reduce(
                            (total: string, category: string) =>
                              total + category + "\n",
                            ""
                          ) as string)
                        : cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
