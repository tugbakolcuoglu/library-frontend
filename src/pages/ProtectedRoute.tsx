import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



function ProtectedRoute() {

    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
} {/* Eğer kullanıcı giriş yapmamışsa login sayfasına yönlendirir, aksi halde children bileşenleri render eder */ }

export default ProtectedRoute;