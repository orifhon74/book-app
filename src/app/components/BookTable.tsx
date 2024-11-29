import React from "react";
import { Book } from "../utils/dataGenerator";

interface BookTableProps {
    book: Book;
}

const BookTable: React.FC<BookTableProps> = ({ book }) => {
    return (
        <tr>
            <td>{book.index}</td>
            <td>{book.isbn}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publisher}</td>
        </tr>
    );
};

export default BookTable;