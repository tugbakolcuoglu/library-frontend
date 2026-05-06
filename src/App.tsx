import { BrowserRouter } from "react-router-dom";
import Routing from "./components/Routing";
import { AuthProvider } from "./context/AuthContext";
import { BooksProvider } from "./context/BooksContext";
import { StudentProvider } from "./context/StudentContext";
import Index from "./pages/Index";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BooksProvider>
          <StudentProvider>
            <Index>
              <Routing />
            </Index>
          </StudentProvider>
        </BooksProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;