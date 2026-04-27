import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    isLoggedIn: boolean;
    children: React.ReactNode;
};{/* Giriş yapılıp yapılmadığını kontrol eden ve buna göre yönlendirme yapan bir bileşen */ }

function ProtectedRoute({ isLoggedIn, children }: ProtectedRouteProps) {
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}{/* Eğer kullanıcı giriş yapmamışsa login sayfasına yönlendirir, aksi halde children bileşenleri render eder */ }

export default ProtectedRoute;