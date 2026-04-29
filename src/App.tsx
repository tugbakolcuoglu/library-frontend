import { BrowserRouter } from "react-router-dom";
import Routing from "./components/Routing";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";

function App() {




  return (
    <BrowserRouter>
      <AuthProvider>

        <Index >
          <Routing />
        </Index>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;