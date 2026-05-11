import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../context/StudentContext";

type Student = {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
};

type UpdateStudentFormProps = {
  student: Student;
};

const UpdateStudentForm = ({ student }: UpdateStudentFormProps) => {
  const navigate = useNavigate();

  const { updateStudent, loading } = useStudents();

  const [name, setName] = useState<string>(student.name);
  const [surname, setSurname] = useState<string>(student.surname);
  const [phoneNumber, setPhoneNumber] = useState<string>(student.phoneNumber);
  const [email, setEmail] = useState<string>(student.email);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !surname || !phoneNumber || !email) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    await updateStudent({
      id: student.id,
      name,
      surname,
      phoneNumber: phoneNumber.replace(/\s/g, ""),
      email,
    });

  };

  return (
    <div className="form-card">
      <h2>Öğrenci Bilgileri</h2>

      <form onSubmit={handleUpdate} className="custom-form">
        <input
          disabled={loading}
          type="text"
          placeholder="Ad"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          disabled={loading}
          type="text"
          placeholder="Soyad"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />

        <input
          disabled={loading}
          type="text"
          placeholder="Telefon"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <input
          disabled={loading}
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button disabled={loading} type="submit">
          Güncelle
        </button>


      </form>

      <button
        disabled={loading}
        className="back-btn"
        onClick={() => navigate("/students")}
      >
        Geri Dön
      </button>

    </div>
  );
};

export default UpdateStudentForm;