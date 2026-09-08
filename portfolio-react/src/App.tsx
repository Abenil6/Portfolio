import { useLenis } from "./hooks/useLenis";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Portfolio from "./pages/Portfolio";
import ServicesManagement from "./pages/ServicesManagement";
import CustomCursor from "./components/CustomCursor";
import { CursorProvider } from "./hooks/useCursor";
import { PageLoadingBar } from "./components/PageLoader";
import { getLenis } from "./hooks/useLenis";
import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    const timer = setTimeout(() => setIsTransitioning(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <PageLoadingBar isLoading={isTransitioning} duration={400} />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin/services" element={<ServicesManagement />} />
        </Routes>
      </AnimatePresence>
    </>
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
