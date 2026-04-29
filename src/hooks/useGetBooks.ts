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
      setLoading(true);

      const response = await api.get<Book[]>("/books");

      if (response.status !== 200) {
         setError("Kitaplar API'den alınamadı");
         setLoading(false);
         return;
      }

      setBooks(response.data);
      setError("");

      setLoading(false);

   };

   useEffect(() => {
      const run = async () => await fetchBooks();

      run();
   }, []);


   return ({ books, loading, error })
}

export default useGetBooks