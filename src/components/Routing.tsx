import { Navigate, Route, Routes } from "react-router-dom";
import BooksPage from "../pages/BooksPage";
import BorrowPage from "../pages/BorrowPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../pages/ProtectedRoute";
import ReturnPage from "../pages/ReturnPage";
import StudentDetailPage from "../pages/StudentDetailPage";
import StudentPage from "../pages/StudentsPage";

const Routing = () => {

   return (
      <Routes>

         <Route path="/" element={<Navigate to="/login" replace />} />

         <Route path="/login" element={<LoginPage />} />


         {/* Protected routes */}
         <Route element={<ProtectedRoute />}>
            <Route path="/books" element={<BooksPage />} />
            <Route path="/students" element={<StudentPage />} />
            <Route path="/students/:id" element={<StudentDetailPage />} />
            <Route path="/borrow" element={<BorrowPage />} />
            <Route path="/return" element={<ReturnPage />} />
         </Route>

      </Routes>

   )
}

export default Routing