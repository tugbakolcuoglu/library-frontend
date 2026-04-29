import { useEffect, useState } from "react";
import api from "../services/api";

type Student = {
    id: string;
    name: string;
    surname: string;
};

type Book = {
    id: string;
    title: string;
    author: string;
    isAvailable: boolean;
};

function BorrowPage() {

    const [students, setStudents] = useState<Student[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [studentId, setStudentId] = useState<string>("");
    const [bookId, setBookId] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            const [studentsRes, booksRes] = await Promise.all([
                api.get<Student[]>("/student"),
                api.get<Book[]>("/books"),
            ]); /* Öğrencileri ve kitapları API üzerinden eş zamanlı olarak çekmek için Promise.all kullanılır, hata durumunda message state'ini günceller */

            const sortedStudents = [...studentsRes.data].sort((a, b) =>
                `${a.name} ${a.surname}`.localeCompare(`${b.name} ${b.surname}`, "tr")
            ); /* Öğrencileri isim ve soyisimlerine göre sıralar */

            const availableBooks = booksRes.data
                .filter((book) => book.isAvailable)
                .sort((a, b) => a.title.localeCompare(b.title, "tr")); /* Sadece müsait olan kitapları filtreler ve başlığa göre sıralar */

            setStudents(sortedStudents); /* Sıralanmış öğrencileri ve müsait kitapları state'e kaydeder */
            setBooks(availableBooks); /* Sıralanmış öğrencileri ve müsait kitapları state'e kaydeder */
        } catch (error: any) {
            setMessage(error.response?.data || "Veriler alınamadı");
        } finally {
            setLoading(false); /* Veri yüklenme durumunu günceller */

        }
    }; /* Öğrencileri ve kitapları API üzerinden çekmek için kullanılan fonksiyon, hata durumunda message state'ini günceller */

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!studentId || !bookId) {
            setMessage("Lütfen öğrenci ve kitap seçin");
            return;
        }

        try {
            await api.post("/library/borrow", {
                studentId,
                bookId,
            });

            setMessage("Kitap ödünç verildi");
            setStudentId("");
            setBookId("");
            fetchData();
        } catch (error: any) {
            setMessage(error.response?.data || "Ödünç verme işlemi başarısız");
        }
    }; /* Kitap ödünç verme işlemini gerçekleştirmek için kullanılan fonksiyon, hata durumunda message state'ini günceller */

    if (loading) return <p className="loading">Yükleniyor...</p>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Borrow Book</h1>
                <p>Öğrenci ve kitabı listeden seç.</p>
            </div>

            <div className="form-card">
                <h2>Ödünç Verme</h2>

                <form onSubmit={handleSubmit} className="custom-form">
                    <select
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    >
                        <option value="">Öğrenci seçin</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name} {student.surname}
                            </option>
                        ))}
                    </select>

                    <select
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                    >
                        <option value="">Kitap seçin</option>
                        {books.map((book) => (
                            <option key={book.id} value={book.id}>
                                {book.title} - {book.author}
                            </option>
                        ))}
                    </select> {/* Öğrencileri ve kitapları dropdown olarak gösterir, kullanıcı seçim yapabilir */}

                    <button type="submit">Ödünç Ver</button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}

export default BorrowPage;