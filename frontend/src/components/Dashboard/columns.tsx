import { Column } from "react-table";
import { Question } from "../../types/Question"; 

export const COLUMNS: Column<Question>[] = [
    // {
    //     Header: 'Id',
    //     accessor: 'id'
    // },
    {
        Header: 'Title',
        accessor: 'title'
    },
    {
        Header: 'Description',
        accessor: 'description'
    },
    {
        Header: 'Categories',
        accessor: 'categories'

    },
    {
        Header: 'Complexity',
        accessor: 'complexity'
    },
];