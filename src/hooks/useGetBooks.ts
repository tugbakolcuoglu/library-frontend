import { useEffect, useState } from "react";
import api from "../services/api";

type Book = {
   id: string;
   title: string;
   author: string;
   isAvailable: boolean;
};

const useGetBooks = () => {
   const [books, setBooks] = useState<Book[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string>("");

   const fetchBooks = async () => {
      console.log("1 - fetchBooks başladı");

      try {
         console.log("2 - API isteği atılıyor");

         const response = await api.get<Book[]>("/books");

         console.log("3 - API cevap verdi:", response.data);

         setBooks(response.data);
         setError("");
      } catch (err) {
         console.error("4 - API hatası:", err);
         setError("Kitaplar alınamadı");
      } finally {
         console.log("5 - loading kapatılıyor");
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchBooks();
   }, []);

   return { books, loading, error };
};

export default useGetBooks;