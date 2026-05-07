import { useEffect, useState } from "react";
import api from "../services/api";

type Student = {
    id: string;
    name: string;
    surname: string;
};

type StudentHistoryItem = {
    assignmentHistoryId: string;
    bookId: string;
    bookTitle: string;
    bookAuthor: string;
    assignedDate: string;
    returnedDate: string | null;
};

type StudentDetail = {
    id: string;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    history: StudentHistoryItem[];
};

function ReturnPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudentId, setSelectedStudentId] = useState<string>("");
    const [borrowedBooks, setBorrowedBooks] = useState<StudentHistoryItem[]>([]);
    const [selectedBookId, setSelectedBookId] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get<Student[]>("/student");

                const sortedStudents = [...response.data].sort((a, b) =>
                    `${a.name} ${a.surname}`.localeCompare(
                        `${b.name} ${b.surname}`,
                        "tr"
                    )
                );

                setStudents(sortedStudents);
            } catch (error: any) {
                setMessage(error.response?.data || "Öğrenciler alınamadı");
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleStudentChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const studentId = e.target.value;

        setSelectedStudentId(studentId);
        setSelectedBookId("");
        setBorrowedBooks([]);
        setMessage("");

        if (!studentId) return;

        try {
            const response = await api.get<StudentDetail>(`/student/${studentId}`);

            const activeBorrowedBooks = (response.data.history || []).filter(
                (item) => item.returnedDate === null || item.returnedDate === undefined
            );

            setBorrowedBooks(activeBorrowedBooks);

            if (activeBorrowedBooks.length === 0) {
                setMessage("Bu öğrencinin iade edilecek aktif kitabı yok.");
            }
        } catch (error: any) {
            setMessage(error.response?.data || "Öğrenci geçmişi alınamadı");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedStudentId || !selectedBookId) {
            setMessage("Lütfen öğrenci ve kitap seçin");
            return;
        }

        try {
            await api.post("/library/return", {
                studentId: selectedStudentId,
                bookId: selectedBookId,
            });

            setMessage("Kitap başarıyla iade edildi");
            setSelectedBookId("");

            const response = await api.get<StudentDetail>(
                `/student/${selectedStudentId}`
            );

            const activeBorrowedBooks = (response.data.history || []).filter(
                (item) => item.returnedDate === null || item.returnedDate === undefined
            );

            setBorrowedBooks(activeBorrowedBooks);
        } catch (error: any) {
            setMessage(error.response?.data || "İade işlemi başarısız");
        }
    };

    if (loading) return <p className="loading">Yükleniyor...</p>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Return Book</h1>
                <p>Öğrenci seç, sonra iade edilecek kitabı seç.</p>
            </div>

            <div className="form-card">
                <h2>Kitap İade Et</h2>

                <form onSubmit={handleSubmit} className="custom-form">
                    <select value={selectedStudentId} onChange={handleStudentChange}>
                        <option value="">Öğrenci seçin</option>

                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name} {student.surname}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedBookId}
                        onChange={(e) => setSelectedBookId(e.target.value)}
                        disabled={borrowedBooks.length === 0}
                    >
                        <option value="">İade edilecek kitabı seçin</option>

                        {borrowedBooks.map((book) => (
                            <option key={book.assignmentHistoryId} value={book.bookId}>
                                {book.bookTitle} - {book.bookAuthor}
                            </option>
                        ))}
                    </select>

                    <button type="submit">İade Et</button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}

export default ReturnPage;