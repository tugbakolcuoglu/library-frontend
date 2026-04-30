import { createContext, useContext, useState, type ReactNode } from "react";
import api from "../services/api";

type AuthContextType = {
   isLoggedIn: boolean;
   login: (username: string, password: string) => Promise<boolean>;
   logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

   const login = async (username: string, password: string): Promise<boolean> => {
      if (username === "admin" && password === "admin") {
         setIsLoggedIn(true);
         return true;
      }

      return false;
   };

   const logout = () => {
      const confirmLogout = window.confirm("Çıkış yapmak istediğinize emin misiniz?");

      if (confirmLogout) {
         setIsLoggedIn(false);
      }
   };

   return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
   }

   return context;
};