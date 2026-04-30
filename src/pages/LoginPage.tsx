import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginSuccess = await login(username, password);

        if (loginSuccess) {
            setMessage("");
            navigate("/books");
        } else {
            setMessage("Kullanıcı adı veya şifre hatalı");
        }
    };

    return (
        <div className="login-container">
            <h1>Welcome Back</h1>

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="Kullanıcı adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Giriş Yap</button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default LoginPage;