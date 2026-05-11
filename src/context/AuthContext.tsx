import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
   isLoggedIn: boolean;
   login: (username: string, password: string) => Promise<boolean>;
   logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

   // TODO: Api endpointi mevcut, api istegi atilarak login yapilmasi lazim. 
   const login = async (username: string, password: string): Promise<boolean> => {
      const isValidUser =
         username.trim() === "admin" &&
         password.trim() === "admin";

      if (isValidUser) {
         setIsLoggedIn(true);
         return true;
      }

      return false;
   };

   const logout = () => {
      setIsLoggedIn(false);
   };

   return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
   }

   return context;
};