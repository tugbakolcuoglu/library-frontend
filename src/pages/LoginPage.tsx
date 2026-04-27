import { useNavigate } from "react-router-dom";
import { useState } from "react";

type LoginPageProps = {
    onLogin: () => void;
}; /* Giriş yapıldığında çağrılacak fonksiyon */

function LoginPage({ onLogin }: LoginPageProps) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username === "admin" && password === "1234") {
            onLogin();
            setMessage("Giriş başarılı");
            navigate("/books");
        } else {
            setMessage("Kullanıcı adı veya şifre hatalı");
        }
    }; {/* Kullanıcı adı ve şifre kontrolü yapar, başarılıysa onLogin fonksiyonunu çağırır ve kitaplar sayfasına yönlendirir, başarısızsa hata mesajı gösterir */ }

    return (
        <div className="login-container">
            <h1>Welcome Back</h1>

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="Kullanıcı adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /> {/* Kullanıcı adı girişi için input alanı */ }

                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> {/* Şifre girişi için input alanı */ }

                <button type="submit">Giriş Yap</button>
            </form>

            {message && <p className="message">{message}</p>}
        </div> 
    );
}

export default LoginPage;