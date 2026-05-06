import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import api from "../services/api";

export type Book = {
    id: number;
    title: string;
    author: string;
    isAvailable: boolean;
};

type BooksContextType = {
    books: Book[];
    availableBooks: Book[]; /* Müsait kitapları tutan ayrı bir state */
    loading: boolean;
    error: string;
    getBooks: () => Promise<void>;
    addBook: (book: Omit<Book, "id">) => Promise<void>;
    deleteBook: (id: number) => Promise<void>;
};

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider = ({ children }: { children: ReactNode }) => {
    const [books, setBooks] = useState<Book[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<string>("");

    const getBooks = async () => {
        setLoading(true);

        const response = await api.get("/books");

        if (response.status === 200) {
            setError("");
            setBooks(response.data);
        } else {
            setError("Kitaplar alınamadı");
            setBooks([]);
        }

        setLoading(false);
    };

    const addBook = async (book: Omit<Book, "id">) => {
        setLoading(true);
        const response = await api.post("/books", book);

        if (response.status === 201 || response.status === 200) {
            setBooks((prevBooks) => [...prevBooks, response.data]);
            setError("");
        } else {
            setError("Kitap eklenemedi");
        }

        setLoading(false);
    };

    const deleteBook = async (id: number) => {
        setLoading(true);
        const response = await api.delete(`/books/${id}`);

        if (response.status === 200 || response.status === 204) {
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            setError("");
        } else {
            setError("Kitap silinemedi");
        }

        setLoading(false);
    };

    useEffect(() => {
        const fetchInitialBooks = async () => {
            await getBooks();
        };
        fetchInitialBooks();
    }, []);

    // const availableBooks = books.filter((book) => book.isAvailable); /* Müsait kitapları filtreler */

    const availableBooks = useMemo(() => books.filter((book) => book.isAvailable),
        [books]);

    const values: BooksContextType = {
        books,
        availableBooks,
        loading,
        error,
        getBooks,
        addBook,
        deleteBook
    };

    return (
        <BooksContext.Provider value={values}>
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