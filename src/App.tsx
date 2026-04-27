import { BrowserRouter, NavLink, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import BooksPage from "./pages/BooksPage";
import StudentPage from "./pages/StudentsPage";
import BorrowPage from "./pages/BorrowPage";
import ReturnPage from "./pages/ReturnPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
  const confirmLogout = window.confirm("Çıkış yapmak istediğinize emin misiniz?"); 

  if (confirmLogout) {
    setIsLoggedIn(false);
  }
};/* Çıkış yapmadan önce kullanıcıya onay sorarak yanlışlıkla çıkış yapılmasını engeller */

  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
          Login
        </NavLink> {/* Login sayfası her zaman görünür, ancak giriş yapıldıktan sonra diğer sayfalara erişim sağlanır */}

        {isLoggedIn && (
          <>
            <NavLink to="/books" className={({ isActive }) => (isActive ? "active" : "")}>
              Books
            </NavLink>

            <NavLink to="/students" className={({ isActive }) => (isActive ? "active" : "")}>
              Students
            </NavLink>

            <NavLink to="/borrow" className={({ isActive }) => (isActive ? "active" : "")}>
              Borrow
            </NavLink>

            <NavLink to="/return" className={({ isActive }) => (isActive ? "active" : "")}>
              Return
            </NavLink>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        <Route
          path="/books"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <BooksPage />
            </ProtectedRoute>
          }
        /> {/* Kitaplar sayfası sadece giriş yapıldıktan sonra erişilebilir, aksi halde kullanıcı login sayfasına yönlendirilir */}

        <Route
          path="/students"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <StudentPage />
            </ProtectedRoute>
          }
        /> 

        <Route
          path="/students/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <StudentDetailPage />
            </ProtectedRoute>
          }
        /> 

        <Route
          path="/borrow"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <BorrowPage />
            </ProtectedRoute>
          }
        /> 

        <Route
          path="/return"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ReturnPage />
            </ProtectedRoute>
          }
        /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;