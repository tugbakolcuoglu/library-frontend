import { useEffect, useState } from "react";
import api from "../services/api";

type Book = {
  id: string;
  title: string;
  author: string;
  isAvailable: boolean;
}; /* Kitap bilgilerini tutan tip tanımı */ 

function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchBooks = async () => {
    try {
      const response = await api.get<Book[]>("/books");
      setBooks(response.data);
      setError("");
    } catch (error: any) {
      console.log(error);
      setError("Kitaplar API'den alınamadı");
    } finally {
      setLoading(false);
    }
  }; /* Kitapları API üzerinden çekmek için kullanılan fonksiyon, hata durumunda error state'ini günceller */ 

  useEffect(() => {
    fetchBooks();
  }, []); 

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