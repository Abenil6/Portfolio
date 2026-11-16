import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { getLenis } from "../hooks/useLenis";
import { useContactModal } from "../store/useContactModalStore";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Work" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useContactModal();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate(`/${href}`);
      setIsMenuOpen(false);
      return;
    }
    const element = document.querySelector(href) as HTMLElement | null;
    if (element) {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(element, { offset: -70 });
      } else {
        window.scrollTo({ top: element.offsetTop - 70, behavior: "smooth" });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F8FAFC]/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-11">
          {/* Logo with 3D Isometric Cube Icon */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="flex items-center gap-2.5 group"
            >
              {/* Geometric Isometric 3D Cube Icon */}
              <div className="w-8 h-8 relative flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                  {/* Top face */}
                  <polygon
                    points="16,3 28,10 16,17 4,10"
                    fill="#60D5E8"
                    stroke="#0F172A"
                    strokeWidth="1.5"
                  />
                  {/* Left face */}
                  <polygon
                    points="4,10 16,17 16,29 4,22"
                    fill="#D93B57"
                    stroke="#0F172A"
                    strokeWidth="1.5"
                  />
                  {/* Right face */}
                  <polygon
                    points="16,17 28,10 28,22 16,29"
                    fill="#F59E0B"
                    stroke="#0F172A"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                Abenezer
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex items-center space-x-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors relative py-1"
                  data-magnetic
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Solid Pill CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={openModal}
              className="bg-slateTeal text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:bg-slateTeal-dark shadow-sm cursor-pointer"
              data-magnetic
            >
              Contact Me
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-800 hover:text-slateTeal transition-colors rounded-xl focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#F8FAFC] border-b border-slate-200/80 shadow-lg overflow-hidden"
          >
            <div className="px-6 pt-4 pb-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:text-slateTeal rounded-xl hover:bg-slate-100 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    openModal();
                  }}
                  className="block w-full bg-slateTeal text-white text-center py-3 rounded-full text-sm font-semibold shadow-sm cursor-pointer"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
