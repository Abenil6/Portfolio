import { Twitter, Linkedin, Github, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import { scrollToHash } from '../hooks/useLenis';
import { useContactModal } from '../store/useContactModalStore';

const socialLinks = [
  { icon: Twitter, href: 'https://x.com/abenezer74807', label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/abenezer-aschalew-ab17ab261/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Abenil6', label: 'GitHub' },
  { icon: Instagram, href: 'https://www.instagram.com/_whosabeni/', label: 'Instagram' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { openModal } = useContactModal();

  return (
    <footer className="bg-[#0D1E28] text-white pt-20 pb-12 border-t-2 border-slate-900 relative z-10 bg-grid-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash('#home');
                }}
                className="flex items-center gap-3 mb-6 group inline-flex"
              >
                {/* Geometric Isometric 3D Cube Icon */}
                <div className="w-8 h-8 relative flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                  <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                    <polygon points="16,3 28,10 16,17 4,10" fill="#60D5E8" stroke="#0F172A" strokeWidth="1.5" />
                    <polygon points="4,10 16,17 16,29 4,22" fill="#D93B57" stroke="#0F172A" strokeWidth="1.5" />
                    <polygon points="16,17 28,10 28,22 16,29" fill="#F59E0B" stroke="#0F172A" strokeWidth="1.5" />
                  </svg>
                </div>
                <span className="text-2xl font-serif font-bold text-white tracking-tight">
                  Abenezer Aschalew
                </span>
              </a>

              <p className="text-slate-400 max-w-md text-base leading-relaxed font-normal mb-8">
                Engineering digital experiences with architectural intention, high-performance web code, and editorial craft.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slateTeal hover:bg-slateTeal-light border border-sky-400/30 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <Mail size={14} className="text-sky-300" />
                <span>abenilee740@gmail.com</span>
                <ArrowUpRight size={13} className="text-slate-400" />
              </button>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available worldwide
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400 mb-6 font-sans">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home', isAction: false },
                { label: 'About', href: '#about', isAction: false },
                { label: 'Skills', href: '#skills', isAction: false },
                { label: 'Featured Work', href: '#projects', isAction: false },
                { label: 'Get in Touch', href: '#contact', isAction: true },
              ].map((item) => (
                <li key={item.label}>
                  {item.isAction ? (
                    <button
                      onClick={openModal}
                      className="text-slate-300 hover:text-white transition-colors text-sm font-semibold inline-block py-1 cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToHash(item.href);
                      }}
                      className="text-slate-300 hover:text-white transition-colors text-sm font-semibold inline-block py-1"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Profiles */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400 mb-6 font-sans">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/20 hover:scale-110 hover:bg-pill-coral transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Addis Ababa, Ethiopia <br />
              GMT+3 Timezone
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
          <p>© {currentYear} Abenezer Aschalew. All rights reserved.</p>
          <p className="font-serif italic text-slate-400 text-sm">Designed & Engineered with Editorial Finesse</p>
        </div>

      </div>
    </footer>
  );
}
