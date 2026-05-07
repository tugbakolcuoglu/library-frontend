import { useBooks } from "../context/BooksContext";
import { useStudents } from "../context/StudentContext";
import { useBorrowBook } from "../hooks/useBorrowBook";


function BorrowPage() {

    const { availableBooks, loading: booksLoading, error: booksError, getBooks: refetch } = useBooks();

    const { students, loading: studentsLoading, error: studentsError } = useStudents();

    const {
        selectedBookId,
        selectedStudentId,
        setSelectedBookId,
        setSelectedStudentId,
        successMessage,
        handleBorrowSubmit,
        error: submitError,
        loading: submitLoading
    } = useBorrowBook({ onBorrowSuccess: refetch });

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Borrow Book</h1>
                <p>Öğrenci ve kitabı listeden seç.</p>
            </div>

            <div className="form-card">
                <h2>Ödünç Verme</h2>

                <form onSubmit={handleBorrowSubmit} className="custom-form">
                    {submitError && <p className="error">{submitError}</p>} {/* Form submit hatasını gösterir */}

                    <select
                        value={selectedStudentId}
                        onChange={(e) => setSelectedStudentId(e.target.value)}
                        disabled={studentsLoading || students.length === 0}
                    >
                        <option value="">Öğrenci seçin</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name} {student.surname}
                            </option>
                        ))}
                    </select>
                    {studentsError && <p className="error">{studentsError}</p>} {/* Hata mesajını gösterir */}

                    <select
                        value={selectedBookId}
                        onChange={(e) => setSelectedBookId(e.target.value)}
                        disabled={booksLoading || availableBooks.length === 0}
                    >
                        <option value="">Kitap seçin</option>
                        {availableBooks.map((book) => (
                            <option key={book.id} value={book.id}>
                                {book.title} - {book.author}
                            </option>
                        ))}
                    </select> {/* Öğrencileri ve kitapları dropdown olarak gösterir, kullanıcı seçim yapabilir */}
                    {booksError && <p className="error">{booksError}</p>} {/* Hata mesajını gösterir */}

                    <button
                        type="submit"
                        disabled={!selectedBookId || !selectedStudentId || submitLoading}
                    >
                        Ödünç Ver
                    </button>
                    {successMessage && <p className="success">{successMessage}</p>} {/* Başarı mesajını gösterir */}
                </form>
            </div>
        </div>
    );
}

export default BorrowPage;