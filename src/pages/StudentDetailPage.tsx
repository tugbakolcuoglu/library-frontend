import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

type StudentHistoryItem = {
  assignmentHistoryId: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  assignedDate: string;
  returnedDate: string | null;
};

type StudentDetail = {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  history: StudentHistoryItem[];
};

function StudentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const fetchStudentDetail = async () => {
    try {
      const response = await api.get<StudentDetail>(`/student/${id}`);
      setStudent(response.data);

      setName(response.data.name);
      setSurname(response.data.surname);
      setPhoneNumber(response.data.phoneNumber);
      setEmail(response.data.email);
    } catch (error: any) {
      setError(error.response?.data || "Öğrenci detayı alınamadı");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentDetail();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await api.put("/student", {
        id,
        name,
        surname,
        phoneNumber: phoneNumber.replace(/\s/g, ""),
        email,
      });

      setMessage("Öğrenci bilgileri güncellendi");
      fetchStudentDetail();
    } catch (error: any) {
      setMessage(error.response?.data || "Öğrenci güncellenemedi");
    }
  };

  const sortedHistory = useMemo(() => {
    if (!student?.history) return [];

    return [...student.history].sort(
      (a, b) =>
        new Date(b.assignedDate).getTime() - new Date(a.assignedDate).getTime()
    );
  }, [student]);

  if (loading) return <p className="loading">Yükleniyor...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!student) return <p className="error">Öğrenci bulunamadı</p>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          {student.name} {student.surname}
        </h1>
        <p>Öğrenci detay ve kitap geçmişi</p>
      </div>

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

        {message && <p className="message">{message}</p>}

        <button className="back-btn" onClick={() => navigate("/students")}>
          Geri Dön
        </button>
      </div>

      <div className="form-card">
        <h2>Kitap Geçmişi</h2>

        {sortedHistory.length === 0 ? (
          <p>Bu öğrencinin kitap geçmişi yok.</p>
        ) : (
          <div className="history-list">
            {sortedHistory.map((item) => (
              <div key={item.assignmentHistoryId} className="history-card">
                <div className="history-card-top">
                  <h3>{item.bookTitle}</h3>
                  <span
                    className={
                      item.returnedDate
                        ? "history-status returned"
                        : "history-status active"
                    }
                  >
                    {item.returnedDate ? "İade Edildi" : "Ödünçte"}
                  </span>
                </div>

                <p>
                  <strong>Yazar:</strong> {item.bookAuthor}
                </p>
                <p>
                  <strong>Alınma Tarihi:</strong>{" "}
                  {new Date(item.assignedDate).toLocaleString()}
                </p>
                <p>
                  <strong>İade Tarihi:</strong>{" "}
                  {item.returnedDate
                    ? new Date(item.returnedDate).toLocaleString()
                    : "Henüz iade edilmedi"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDetailPage;