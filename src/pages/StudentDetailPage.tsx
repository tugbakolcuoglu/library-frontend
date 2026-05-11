import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import UpdateStudentForm from "../components/UpdateStudentForm";
import { useStudents } from "../context/StudentContext";

function StudentDetailPage() {
  const { detailedStudent, getStudentDetail, error } = useStudents();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getStudentDetail(id);
    }
  }, [id]);

  const sortedHistory = useMemo(() => {
    if (!detailedStudent?.history) return [];

    return [...detailedStudent.history].sort(
      (a, b) =>
        new Date(b.assignedDate).getTime() -
        new Date(a.assignedDate).getTime()
    );
  }, [detailedStudent]);

  if (!detailedStudent) return <p className="error">Öğrenci bulunamadı</p>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          {detailedStudent.name} {detailedStudent.surname}
        </h1>
        <p>Öğrenci detay ve kitap geçmişi</p>
      </div>

      <UpdateStudentForm student={detailedStudent} />

      {error && <p className="error">{error}</p>}

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