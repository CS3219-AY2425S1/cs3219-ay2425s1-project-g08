// QuestionTable.tsx
import React, { useMemo } from "react";
import { useTable, Column } from "react-table";
import { HistoryTableData, HistoryTableHeaders } from "../questions/types/HistoryAttempt";

// Define the props for the table
interface HistoryQuestionTableProps {
  attempts: Array<HistoryTableData>;
  columns: Column<HistoryTableHeaders>[];
  onClick: (row: HistoryTableData) => void;
}

const HistoryAttemptTable: React.FC<HistoryQuestionTableProps> = ({
  attempts,
  columns,
  onClick,
}) => {
  const data = useMemo(() => attempts, [attempts]);
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
                  onClick={() => {
                    const attempt = row.original as HistoryTableData
                    onClick(attempt);
                  }}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};



export default HistoryAttemptTable;