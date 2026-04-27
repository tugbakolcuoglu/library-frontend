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
  const { id } = useParams(); /* URL parametresinden öğrenci ID'sini almak için kullanılan hook */
  const navigate = useNavigate(); /* Sayfalar arası geçiş yapmak için kullanılan hook */

  const [student, setStudent] = useState<StudentDetail | null>(null); /* Öğrenci detay bilgilerini tutan state, başlangıçta null olarak tanımlanır */
  const [loading, setLoading] = useState<boolean>(true); /* Veri yüklenme durumunu tutan state */
  const [error, setError] = useState<string>(""); /* Hata mesajını tutan state */

  const fetchStudentDetail = async () => {
    try {
      const response = await api.get<StudentDetail>(`/student/${id}`);
      setStudent(response.data);
    } catch (error: any) {
      setError(error.response?.data || "Öğrenci detayı alınamadı");
    } finally {
      setLoading(false);
    }
  }; /* Öğrenci detayını API üzerinden çekmek için kullanılan fonksiyon, hata durumunda error state'ini günceller */

  useEffect(() => {
    fetchStudentDetail();
  }, [id]); /* Sayfa yüklendiğinde veya ID değiştiğinde öğrenci detayını çekmek için useEffect kullanılır */

  const sortedHistory = useMemo(() => {
    if (!student?.history) return []; /* Öğrenci veya geçmiş bilgisi yoksa boş bir dizi döndür */

    return [...student.history].sort(
      (a, b) =>
        new Date(b.assignedDate).getTime() - new Date(a.assignedDate).getTime()
    ); /* Öğrencinin kitap geçmişini alınma tarihine göre sıralar */
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
        <p>
          <strong>Ad:</strong> {student.name}
        </p>
        <p>
          <strong>Soyad:</strong> {student.surname}
        </p>
        <p>
          <strong>Telefon:</strong> {student.phoneNumber}
        </p>
        <p>
          <strong>E-posta:</strong> {student.email}
        </p>

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
                      item.returnedDate ? "history-status returned" : "history-status active"
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
              </div> /* Öğrencinin kitap geçmişini listelemek için kullanılan bölüm, her bir kitap için detay bilgileri gösterilir */
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDetailPage;