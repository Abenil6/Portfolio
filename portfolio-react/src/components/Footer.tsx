import { Twitter, Linkedin, Github, Instagram, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  { icon: Twitter, href: 'https://x.com/abenezer74807', label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/abenezer-aschalew-ab17ab261/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/Abenil6', label: 'GitHub' },
  { icon: Instagram, href: 'https://www.instagram.com/_whosabeni/', label: 'Instagram' },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#010409] pt-24 pb-12 border-t border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <a href="#home" className="text-3xl font-black tracking-tighter mb-8 block">
              <span className="text-gradient">
                A.A.
              </span>
            </a>
            <p className="text-slate-500 max-w-xs leading-relaxed text-lg">
              Engineering premium digital solutions with a deep focus on performance, 
              usability, and results.
            </p>
          </div>
          
          <div className="flex flex-col space-y-6">
            <h4 className="text-sm font-black text-white uppercase tracking-[0.2em]">Quick Access</h4>
            <div className="flex flex-col space-y-3">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-slate-500 hover:text-blue-400 transition-colors font-bold text-sm tracking-wide"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            <h4 className="text-sm font-black text-white uppercase tracking-[0.2em]">Network</h4>
            <div className="flex space-x-5">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5, color: '#3b82f6' }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-[#050a1f] border border-white/5 flex items-center justify-center text-slate-500 transition-all shadow-xl"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-slate-600 font-medium">
              Addis Ababa, Ethiopia • Available Globally
            </p>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-600 text-sm font-bold tracking-tight">
            © {currentYear} ABENEZER ASCHALEW.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
