import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../context/StudentContext";


const UpdateStudentForm = () => {

  const navigate = useNavigate();
  const { detailedStudent, updateStudent } = useStudents()

  const [name, setName] = useState<string>(detailedStudent?.name || "");
  const [surname, setSurname] = useState<string>(detailedStudent?.surname || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(detailedStudent?.phoneNumber || "");
  const [email, setEmail] = useState<string>(detailedStudent?.email || "");


  // TODO: tipki createStunednForm compoentinda oldugu gibi  update islemi icin ari bir form olustur, burdaki datayi oraya gecir, ve o form update isleminden sorumlu olsun. bu sayfa sadece o formu cagiran parent olarak kalsin.
  const handleUpdate = async () => {
    // try {
    //updateStudent .... bla bla bla
    //   await api.put("/student", {
    //     id,
    //     name,
    //     surname,
    //     phoneNumber: phoneNumber.replace(/\s/g, ""),
    //     email,
    //   });

    //   setMessage("Öğrenci bilgileri güncellendi");
    //   fetchStudentDetail();
    // } catch (error: any) {
    //   setMessage(error.response?.data || "Öğrenci güncellenemedi");
    // }
  };



  if (!detailedStudent) {
    return <p>Öğrenci bulunamadı</p>
  }
  return (
    <div className="form-card">
      <h2>Öğrenci Bilgileri</h2>

      <div className="custom-form">
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
          placeholder="Telefon"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="button" onClick={handleUpdate}>
          Güncelle
        </button>
      </div>



      <button className="back-btn" onClick={() => navigate("/students")}>
        Geri Dön
      </button>
    </div>
  )
}

export default UpdateStudentForm