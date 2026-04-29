import { BrowserRouter } from "react-router-dom";
import Routing from "./components/Routing";
import { AuthProvider } from "./context/AuthContext";
import { BooksProvider } from "./context/BooksContext";
import Index from "./pages/Index";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BooksProvider>
          <Index>
            <Routing />
          </Index>
        </BooksProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;