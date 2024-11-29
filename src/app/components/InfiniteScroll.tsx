import React, { useState, useEffect } from "react";

interface InfiniteScrollProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => JSX.Element;
}

const InfiniteScroll = <T,>({ items, renderItem }: InfiniteScrollProps<T>) => {
    const [visibleItems, setVisibleItems] = useState<T[]>(items.slice(0, 20));

    useEffect(() => {
        const onScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
                const nextBatch = visibleItems.length + 10;
                setVisibleItems(items.slice(0, nextBatch));
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [items, visibleItems]);

    return (
        <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
            <tr>
                <th className="border border-gray-300 p-2">Index</th>
                <th className="border border-gray-300 p-2">ISBN</th>
                <th className="border border-gray-300 p-2">Title</th>
                <th className="border border-gray-300 p-2">Author</th>
                <th className="border border-gray-300 p-2">Publisher</th>
            </tr>
            </thead>
            <tbody>{visibleItems.map(renderItem)}</tbody>
        </table>
    );
};

export default InfiniteScroll;