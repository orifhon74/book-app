import React from "react";
import { Book } from "../utils/dataGenerator";
import { faker } from "@faker-js/faker";

interface BookDetailsProps {
    book: Book;
    onClose: () => void;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book, onClose }) => {
    // Generate realistic reviews based on the number of reviews for the book
    const reviews = Array.from({ length: book.reviews }, () => ({
        text: faker.lorem.sentence(),
        reviewer: `${faker.person.firstName()} ${faker.person.lastName()}`,
        company: faker.company.name(),
    }));

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
                <button
                    onClick={onClose}
                    className="float-right text-red-500 font-bold"
                >
                    X
                </button>
                <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                <p className="text-gray-600 italic mb-4">by {book.author}</p>
                <p className="mb-4">Published by {book.publisher}</p>
                <p className="mb-4">
                    Likes: <span className="font-bold">{book.likes}</span>
                </p>
                <h3 className="font-bold mb-2">Reviews:</h3>
                <ul className="list-disc list-inside">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <li key={index} className="mb-2">
                                &quot;{review.text}&quot; -{" "}
                                <span className="font-bold">
                                    {review.reviewer}
                                </span>
                                , {review.company}
                            </li>
                        ))
                    ) : (
                        <p className="italic text-gray-500">No reviews yet.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default BookDetails;