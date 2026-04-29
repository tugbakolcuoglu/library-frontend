import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {

   const { logout, isLoggedIn } = useAuth();

   const navigate = useNavigate();


   const handleLogout = () => {
      logout();
      navigate("/login");
   }

   if (!isLoggedIn) {
      return (
         <nav>
            <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
               Login
            </NavLink>
         </nav>
      )
   }

   return (
      <nav>
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
      </nav>
   )
}