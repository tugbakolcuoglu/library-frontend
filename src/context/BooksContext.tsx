import { createContext, useContext, useState, type ReactNode } from "react";
import api from "../services/api";

export type Book = {
    id: number;
    title: string;
    author: string;
};

type BooksContextType = {
    books: Book[];
    getBooks: () => Promise<void>;
    addBook: (book: Omit<Book, "id">) => Promise<boolean>;
    deleteBook: (id: number) => Promise<boolean>;
};

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider = ({ children }: { children: ReactNode }) => {
    const [books, setBooks] = useState<Book[]>([]);

    const getBooks = async () => {
        const response = await api.get("/books");

        if (response.status === 200) {
            setBooks(response.data);
        }
    };

    const addBook = async (book: Omit<Book, "id">): Promise<boolean> => {
        const response = await api.post("/books", book);

        if (response.status === 201 || response.status === 200) {
            setBooks((prevBooks) => [...prevBooks, response.data]);
            return true;
        }

        return false;
    };

    const deleteBook = async (id: number): Promise<boolean> => {
        const response = await api.delete(`/books/${id}`);

        if (response.status === 200 || response.status === 204) {
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            return true;
        }

        return false;
    };

    return (
        <BooksContext.Provider value={{ books, getBooks, addBook, deleteBook }}>
            {children}
        </BooksContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBooks = () => {
    const context = useContext(BooksContext);

    if (!context) {
        throw new Error("useBooks must be used within a BooksProvider");
    }

    return context;
};