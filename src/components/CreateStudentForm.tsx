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

      try {
         await addStudent({
            name,
            surname,
            phoneNumber: phoneNumber.replace(/\s/g, ""),
            email,
         });

         // başarılıysa inputları temizle
         setName("");
         setSurname("");
         setPhoneNumber("");
         setEmail("");

         setSuccessMessage("Öğrenci başarıyla eklendi!");
      } catch (error: any) {
         alert(error.response?.data || "Öğrenci eklenemedi");
      }
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

         </form>

         {successMessage && <p className="success-message">{successMessage}</p>}

      </div>
   )
}

export default CreateStudentForm