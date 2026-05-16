import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // For looping the animation
  const [loopKey, setLoopKey] = useState(0);
  const titleText = "Engineering Midnight Magic";

  useEffect(() => {
    const interval = setInterval(() => {
      setLoopKey(prev => prev + 1);
    }, 8000); // Reset every 8 seconds
    return () => clearInterval(interval);
  }, []);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.05, 
        delayChildren: 0.2 
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const character: Variants = {
    visible: {
      opacity: 1,
      display: "inline-block",
      transition: { duration: 0.01 },
    },
    hidden: {
      opacity: 0,
      display: "none",
    },
  };

  const fadeUp: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: 0.5
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Blue-Black Midnight Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 150, 0], 
            y: [0, 100, 0],
            scale: [1, 1.3, 1] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-blue-900/10 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0], 
            y: [0, 80, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] -right-[20%] w-[60%] h-[60%] bg-indigo-900/10 rounded-full blur-[150px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:flex lg:items-center lg:justify-between gap-16">
          <motion.div 
            style={{ y: y1, opacity }}
            className="lg:w-3/5 text-center lg:text-left"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-black uppercase tracking-widest text-blue-400 bg-blue-950/40 border border-white/5 rounded-2xl backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Available for New Projects
              </div>

              {/* Looping Typewriter Container */}
              <motion.h1 
                key={loopKey}
                initial="hidden"
                animate="visible"
                variants={container}
                className="text-5xl md:text-[4.5rem] font-black text-white mb-8 tracking-tighter leading-[0.9] min-h-[1.7em]"
              >
                {titleText.split("").map((char, index) => {
                  const isMidnightMagic = index >= 12;
                  return (
                    <motion.span
                      variants={character}
                      key={index}
                      className={isMidnightMagic ? "text-gradient italic" : ""}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  );
                })}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-1 h-10 md:h-16 bg-blue-500 ml-1 align-middle"
                />
              </motion.h1>
              
              <motion.p 
                variants={fadeUp}
                className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
              >
                Hi, I'm <span className="text-white font-bold decoration-blue-500 underline underline-offset-8 decoration-2">Abenezer</span>. 
                A Junior Full Stack Developer crafting high-performance, 
                Blue-Black digital experiences that stand out.
              </motion.p>

              <motion.div 
                variants={fadeUp}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
              >
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(37, 99, 235, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="group w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg flex items-center justify-center transition-all shadow-blue-glow"
                >
                  Start a Project
                  <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects"
                  className="w-full sm:w-auto glass px-10 py-5 rounded-[2rem] font-black text-lg flex items-center justify-center transition-all"
                >
                  View Work
                </motion.a>
              </motion.div>

              <motion.div 
                variants={fadeUp}
                className="mt-16 flex items-center justify-center lg:justify-start space-x-8"
              >
                {[
                  { icon: Github, href: "https://github.com/Abenil6" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/abenezer-aschalew-ab17ab261/" },
                  { icon: Twitter, href: "https://x.com/abenezer74807" }
                ].map((social, i) => (
                  <motion.a 
                    key={i}
                    whileHover={{ y: -5, color: "#3b82f6" }}
                    href={social.href}
                    target="_blank"
                    className="text-slate-500 transition-colors"
                  >
                    <social.icon size={28} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring" }}
            className="lg:w-2/5 mt-20 lg:mt-0 relative"
          >
            <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] mx-auto">
              {/* Deep Blue Aura */}
              <div className="absolute inset-0 bg-blue-600/20 rounded-[4rem] rotate-12 blur-[60px] animate-pulse" />
              
              <div className="relative w-full h-full p-4 glass rounded-[4.5rem] overflow-hidden group">
                <img
                  src="/images/me1.jpg"
                  alt="Abenezer"
                  className="w-full h-full object-cover rounded-[3.5rem] grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010409] via-transparent to-transparent opacity-90" />
              </div>

              {/* Status Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 glass p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center font-bold">
                    🚀
                  </div>
                  <div>
                    <p className="text-sm font-black text-white">5+ Real World</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Projects Done</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
