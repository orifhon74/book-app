"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { generateBooks, Book } from "./utils/dataGenerator";
import {FaSyncAlt, FaThumbsUp} from "react-icons/fa";
import {faker} from "@faker-js/faker";

export default function Home() {
    const [language, setLanguage] = useState<"en-US" | "de-DE" | "ar">("en-US");
    const [seed, setSeed] = useState<number>(42);
    const [likes, setLikes] = useState<number>(5);
    const [reviews, setReviews] = useState<number>(3);
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState<number>(1);
    // const [selectedBookIndex, setSelectedBookIndex] = useState<number | null>(null);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [reviewData, setReviewData] = useState<Record<number, string[]>>({});

    // Fetch books on language, seed, or filters change
    useEffect(() => {
        const newBooks = generateBooks(seed, language, "", likes, reviews, 1);
        setBooks(newBooks);
        setPage(2);
        generateReviewData(newBooks);
    }, [language, seed, likes, reviews]);

    // Generate reviews dynamically
    const generateReviewData = (books: Book[]) => {
        const newReviewData: Record<number, string[]> = {};
        books.forEach((book) => {
            newReviewData[book.index] = Array.from({ length: book.reviews }, () => {
                const reviewer = `${faker.person.firstName()} ${faker.person.lastName()}`;
                const comment = faker.lorem.sentence();
                return `${reviewer} wrote: "${comment}"`;
            });
        });
        setReviewData((prev) => ({ ...prev, ...newReviewData }));
    };

    // Load more books for infinite scroll
    const loadMoreBooks = () => {
        const newBooks = generateBooks(seed, language, "", likes, reviews, page);
        setBooks((prevBooks) => [...prevBooks, ...newBooks]);
        setPage(page + 1);
        generateReviewData(newBooks);
    };

    // const toggleBookDetails = (index: number) => {
    //     setSelectedBookIndex((prevIndex) => (prevIndex === index ? null : index));
    // };

    return (
        <div className="container mx-auto p-4 bg-white text-black min-h-screen">
            {/* Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
                <div className="flex items-center space-x-4">
                    <label className="font-bold">Language:</label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as "en-US" | "de-DE" | "ar")}
                        className="border p-2 rounded bg-gray-100"
                    >
                        <option value="en-US">English (US)</option>
                        <option value="de-DE">German</option>
                        <option value="ar">Arabic</option>
                    </select>
                </div>
                <div className="flex items-center space-x-4">
                    <label className="font-bold">Seed:</label>
                    <input
                        type="number"
                        value={seed}
                        onChange={(e) => setSeed(Number(e.target.value))}
                        className="border p-2 rounded bg-gray-100 w-24"
                    />
                    <FaSyncAlt
                        onClick={() => setSeed(Math.floor(Math.random() * 100000))}
                        className="cursor-pointer text-blue-500 text-xl"
                        title="Randomize Seed"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <label className="font-bold">Likes:</label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={likes}
                        onChange={(e) => setLikes(Number(e.target.value))}
                        className="w-full"
                    />
                    <span>{likes.toFixed(1)}</span>
                </div>
                <div className="flex items-center space-x-4">
                    <label className="font-bold">Review:</label>
                    <input
                        type="number"
                        value={reviews}
                        onChange={(e) => setReviews(Number(e.target.value))}
                        className="border p-2 rounded bg-gray-100 w-16"
                    />
                </div>
            </div>

            {/* Table Section */}
            <div>
                <InfiniteScroll
                    dataLength={books.length}
                    next={loadMoreBooks}
                    hasMore={true}
                    loader={<h4 className="text-center mt-4">Loading more books...</h4>}
                >
                    <table className="table-auto w-full border-collapse border border-gray-600">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">#</th>
                            <th className="border p-2">ISBN</th>
                            <th className="border p-2">Title</th>
                            <th className="border p-2">Author(s)</th>
                            <th className="border p-2">Publisher</th>
                            <th className="border p-2">Likes</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map((book) => (
                            <>
                                <tr
                                    key={book.index}
                                    className="hover:bg-gray-200 cursor-pointer"
                                    onClick={() => setSelectedBook(book)}
                                >
                                    <td className="border p-2 text-center">
                                        {selectedBook?.index === book.index ? "▲" : "▼"} {book.index}
                                    </td>
                                    <td className="border p-2">{book.isbn}</td>
                                    <td className="border p-2">{book.title}</td>
                                    <td className="border p-2">{book.author}</td>
                                    <td className="border p-2">{book.publisher}</td>
                                    <td className="border p-2 text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="bg-blue-500 text-white rounded-full p-2 flex items-center">
                                                <FaThumbsUp className="mr-1" /> {book.likes}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                {selectedBook?.index === book.index && (
                                    <tr>
                                        <td colSpan={6} className="p-4 bg-gray-100">
                                            <div className="p-4 bg-gray-200 shadow rounded text-black">
                                                <h2 className="text-lg font-bold mb-2">{selectedBook.title}</h2>
                                                <p className="text-sm mb-2">
                                                    <strong>Author(s):</strong> {selectedBook.author}
                                                </p>
                                                <p className="text-sm mb-2">
                                                    <strong>Publisher:</strong> {selectedBook.publisher}
                                                </p>
                                                <p className="text-sm mb-2">
                                                    <strong>Likes:</strong>{" "}
                                                    <div className="inline-flex items-center bg-blue-500 text-white rounded-full px-2 py-1">
                                                        <FaThumbsUp className="mr-1" /> {selectedBook.likes}
                                                    </div>
                                                </p>
                                                <div className="text-sm">
                                                    <strong>Reviews:</strong>
                                                    <ul className="mt-2 list-disc list-inside">
                                                        {reviewData[selectedBook.index]?.map((review, index) => (
                                                            <li key={index}>{review}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <button
                                                    onClick={() => setSelectedBook(null)}
                                                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>
        </div>
    );
}