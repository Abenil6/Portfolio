import { useLenis } from "./hooks/useLenis";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Portfolio from "./pages/Portfolio";
import CustomCursor from "./components/CustomCursor";
import { CursorProvider } from "./hooks/useCursor";
import { getLenis } from "./hooks/useLenis";
import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  useLenis();

  return (
    <CursorProvider>
      <CustomCursor />
      <Router>
        <AnimatedRoutes />
      </Router>
    </CursorProvider>
  );
}

export default App;
