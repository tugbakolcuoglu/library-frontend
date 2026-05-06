import { useNavigate } from "react-router-dom";
import CreateStudentForm from "../components/CreateStudentForm";
import { useStudents } from "../context/StudentContext";

function StudentPage() {
    const navigate = useNavigate();


    const { students, deleteStudent } = useStudents();

    if (students.length === 0) return (
        <div className="page-container">
            <div className="page-header">
                <h1>Students</h1>
                <p>Öğrenci ekleme ve listeleme ekranı</p>
            </div>

            <CreateStudentForm />

            <p className="empty-text">Öğrenci bulunamadı</p>
        </div>
    );


    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Students</h1>
                <p>Öğrenci ekleme ve listeleme ekranı</p>
            </div>

            <CreateStudentForm />

            <div className="list-section">
                {students.map((student) => (
                    <div key={student.id} className="info-card">
                        <div
                            className="clickable-info"
                            onClick={() => navigate(`/students/${student.id}`)}
                        >
                            <h3>
                                {student.name} {student.surname}
                            </h3>
                            <p>{student.phoneNumber}</p>
                            <p>{student.email}</p>
                        </div>

                        <button
                            className="delete-btn"
                            onClick={() => deleteStudent(student.id)}
                        >
                            Sil
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentPage;