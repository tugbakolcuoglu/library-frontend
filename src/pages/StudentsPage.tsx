import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

type Student = {
    id: string;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
};

function StudentPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    const fetchStudents = async () => {
        try {
            const response = await api.get<Student[]>("/student");
            setStudents(response.data);
        } catch (error: any) {
            setMessage(error.response?.data || "Öğrenciler alınamadı");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const cleanedPhoneNumber = phoneNumber.replace(/\s/g, "");

        try {
            await api.post("/student", {
                // name,
                // surname,
                // phoneNumber: cleanedPhoneNumber,
                // email,
            });

            setMessage("Öğrenci eklendi");
            setName("");
            setSurname("");
            setPhoneNumber("");
            setEmail("");
            fetchStudents();
        } catch (error: any) {
            setMessage(error.response?.data || "Öğrenci eklenemedi");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/student/${id}`);
            setMessage("Öğrenci silindi");
            fetchStudents();
        } catch (error: any) {
            setMessage(error.response?.data || "Öğrenci silinemedi");
        }
    };

    if (loading) return <p className="loading">Yükleniyor...</p>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Students</h1>
                <p>Öğrenci ekleme ve listeleme ekranı</p>
            </div>

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

                    <button type="submit">Öğrenci Ekle</button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>

            <div className="list-section">
                {students.length === 0 ? (
                    <p className="empty-text">Öğrenci bulunamadı</p>
                ) : (
                    students.map((student) => (
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
                                onClick={() => handleDelete(student.id)}
                            >
                                Sil
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default StudentPage;