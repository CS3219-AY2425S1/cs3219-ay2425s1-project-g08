// QuestionTable.tsx
import React, { useMemo } from "react";
import { useTable, Column, Row } from "react-table"; // Import the 'Column' type
import { Question } from "../../questions";
import { useLocation } from "react-router-dom";

// Define the props for the table
interface DashboardQuestionTableProps {
  questions: Array<Question>;
  columns: Column<Question>[];
  onClick: (row: Row<Question>) => void;
}

const DashboardQuestionTable: React.FC<DashboardQuestionTableProps> = ({
  questions,
  columns,
  onClick,
}) => {
  const data = useMemo(() => questions, [questions]);
  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
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
              {row.cells.map((cell) => (
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
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DashboardQuestionTable;
