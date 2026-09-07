import { useLenis } from "./hooks/useLenis";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Portfolio from "./pages/Portfolio";
import ServicesManagement from "./pages/ServicesManagement";
import { PageLoadingBar } from "./components/PageLoader";
import { getLenis } from "./hooks/useLenis";
import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Start transition
    setIsTransitioning(true);

    // Get Lenis instance and scroll to top
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback if Lenis is not available
      window.scrollTo(0, 0);
    }

    // End transition after animation completes
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 400);

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
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
