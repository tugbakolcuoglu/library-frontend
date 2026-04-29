import useGetBooks from "../hooks/useGetBooks";

/* Kitap bilgilerini tutan tip tanımı */

function BooksPage() {

  const { books, loading, error } = useGetBooks();

  if (loading) return <p className="loading">Yükleniyor...</p>;
  if (error) return <p className="error">{error}</p>; /* Yüklenme ve hata durumlarını kullanıcıya göstermek için koşullu render kullanılır */

  return (
    <div className="books-container">
      <h1>Library Books</h1>

      {books.length === 0 ? (
        <p className="empty-text">Henüz kitap yok</p>
      ) : (
        books.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>
              <strong>Yazar:</strong> {book.author}
            </p>
            <p className={book.isAvailable ? "available" : "not-available"}>
              {book.isAvailable ? "Müsait" : "Ödünçte"}
            </p>
          </div>
        ))
      )}
    </div> /* Kitapları listelemek için kullanılan container */
  );
}

export default BooksPage;