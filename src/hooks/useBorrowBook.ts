import React, { useState } from 'react';
import api from '../services/api';


type Props = {
   onBorrowSuccess: () => void;
}


export const useBorrowBook = ({ onBorrowSuccess }: Props) => {
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string>("");

   const [selectedBookId, setSelectedBookId] = useState<string>("");
   const [selectedStudentId, setSelectedStudentId] = useState<string>("");

   const [successMessage, setSuccessMessage] = useState<string>("");

   const handleBorrowSubmit = async (e: React.FormEvent) => {
      setLoading(true);
      e.preventDefault();

      if (!selectedBookId || !selectedStudentId) {
         setError("Lütfen hem öğrenci hem de kitap seçin.");
         setLoading(false);
         return;
      }

      const response = await api.post("library/borrow", {
         studentId: selectedStudentId,
         bookId: selectedBookId
      });

      if (response.status === 200 || response.status === 201) {
         setSuccessMessage("Kitap başarıyla ödünç verildi!");
         setSelectedBookId("");
         setSelectedStudentId("");
         setError("");
         onBorrowSuccess();
      } else {
         setError("Kitap ödünç verilirken bir hata oluştu. Lütfen tekrar deneyin.");
      }
      setLoading(false);
   }

   return {
      selectedBookId,
      setSelectedBookId,
      selectedStudentId,
      setSelectedStudentId,
      successMessage,
      handleBorrowSubmit,
      error,
      loading
   };

}

