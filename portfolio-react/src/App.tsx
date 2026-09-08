import { useLenis } from "./hooks/useLenis";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import ServicesManagement from "./pages/ServicesManagement";
import CustomCursor from "./components/CustomCursor";
import { CursorProvider } from "./hooks/useCursor";
import "./App.css";

function App() {
  useLenis();

  return (
    <CursorProvider>
      <CustomCursor />
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin/services" element={<ServicesManagement />} />
        </Routes>
      </Router>
    </CursorProvider>
  );
}

export default App;
