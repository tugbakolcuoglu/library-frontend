import { useState } from "react";
import { useStudents } from "../context/StudentContext";


const CreateStudentForm = () => {
   const [name, setName] = useState("");
   const [surname, setSurname] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [email, setEmail] = useState("");

   const [successMessage, setSuccessMessage] = useState("");

   const { addStudent, loading, error } = useStudents();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!name || !surname || !phoneNumber || !email) {
         alert("Lütfen tüm alanları doldurun.");
         return;
      }

      await addStudent({ name, surname, phoneNumber, email });

      // error var forma dokunmadan cik
      if (error) {
         return;
      }

      // error yok formu temizle islem basarili
      setName("");
      setSurname("");
      setPhoneNumber("");
      setEmail("");
      setSuccessMessage("Öğrenci başarıyla eklendi!");
   };

   return (
      <div className="form-card">
         <h2>Yeni Öğrenci Ekle</h2>

         <form onSubmit={handleSubmit} className="custom-form">
            <input
               type="text"
               placeholder="Ad"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />

            <input
               type="text"
               placeholder="Soyad"
               value={surname}
               onChange={(e) => setSurname(e.target.value)}
            />

            <input
               type="text"
               placeholder="Telefon Numarası"
               value={phoneNumber}
               onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <input
               type="email"
               placeholder="E-posta"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />

            <button
               type="submit"
               disabled={loading}
            >
               Öğrenci Ekle
            </button>

            {error && <p className="error-message">{error}</p>}
         </form>

         {successMessage && <p className="success-message">{successMessage}</p>}

      </div>
   )
}

export default CreateStudentForm