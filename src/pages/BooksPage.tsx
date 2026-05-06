import { useBooks } from "../context/BooksContext";

function BooksPage() {

  const { books, loading, error } = useBooks();

  if (loading) return <p className="loading">Yükleniyor...</p>;
  if (error) return <p className="error">{error}</p>; /* Yüklenme ve hata durumlarını kullanıcıya göstermek için koşullu render kullanılır */
  if (books.length === 0) return <p className="empty-text">Henüz kitap yok</p>; /* Kitap listesi boşsa kullanıcıya bilgi vermek için */

  return (
    <div className="books-container">
      <h1>Library Books</h1>

      {books.map((book) => (
        <div key={book.id} className="book-card">
          <h3>{book.title}</h3>
          <p>
            <strong>Yazar:</strong> {book.author}
          </p>
          <p className={book.isAvailable ? "available" : "not-available"}>
            {book.isAvailable ? "Müsait" : "Ödünçte"}
          </p>
        </div>
      ))}
    </div> /* Kitapları listelemek için kullanılan container */
  );
}

export default BooksPage;