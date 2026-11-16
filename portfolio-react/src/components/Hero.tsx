import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { scrollToHash } from '../hooks/useLenis';
import { useContactModal } from '../store/useContactModalStore';

export default function Hero() {
  const { openModal } = useContactModal();
  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden pt-28">
      {/* Upper Canvas: Light Off-White with Subtle Grid */}
      <div className="absolute top-0 left-0 right-0 h-[58%] bg-[#F8FAFC] bg-grid-subtle -z-10" />

      {/* Lower Canvas: Deep Slate-Teal Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-[42%] bg-slateTeal -z-10 bg-grid-dark" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-between z-10">
        {/* Main Grid: Headline Left, Arch Portal Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4 lg:pt-8">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Serif Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-6xl lg:text-[4.75rem] font-normal leading-[1.08] tracking-tight text-slateTeal-deep mb-6"
            >
              Full stack engineer <br className="hidden sm:inline" />
              <span className="italic font-serif">based in Ethiopia Addis ababa</span>
            </motion.h1>

            {/* Discipline Ticker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 text-sm sm:text-base font-bold tracking-wider uppercase text-slate-800 mb-8"
            >
              <span>BACKEND</span>
              <span className="text-amber-500 text-lg">✻</span>
              <span className="font-serif capitalize text-lg font-normal tracking-normal text-slate-700">Frontend</span>
              <span className="text-amber-500 text-lg">✻</span>
              <span>MOBILE &amp; APIs</span>
            </motion.div>

            {/* CTA Button Group */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 mb-8 sm:mb-12"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash('#projects');
                }}
                className="bg-slateTeal hover:bg-slateTeal-dark text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:scale-[1.02]"
                data-magnetic
              >
                Get a project
              </a>

              <button
                type="button"
                onClick={openModal}
                className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-900/80 px-8 py-3.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
                data-magnetic
              >
                Let's talk
              </button>
            </motion.div>
          </div>

          {/* Right Hero Column: Cutout Portrait & Badges */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative items-end">
            <div className="relative w-[300px] sm:w-[360px] md:w-[410px] flex justify-center items-end">
              
              {/* Cutout Portrait without frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full flex justify-center items-end"
              >
                <img
                  src="/images/memain.png"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/me1.jpg';
                  }}
                  alt="Abenezer Aschalew"
                  className="w-full max-h-[460px] sm:max-h-[500px] lg:max-h-[540px] object-contain object-bottom filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]"
                />
              </motion.div>

              {/* Rotating Circular "HIRE ME" Stamp Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 180 }}
                className="absolute -left-4 sm:-left-8 bottom-6 sm:bottom-10 z-30 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center cursor-pointer group"
                onClick={openModal}
              >
                {/* Rotating SVG with Circular Text */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="w-full h-full absolute inset-0"
                >
                  <svg viewBox="0 0 120 120" className="w-full h-full fill-current text-white">
                    <circle cx="60" cy="60" r="54" fill="#0D1E28" stroke="#38BDF8" strokeWidth="1.5" />
                    <defs>
                      <path
                        id="circlePath"
                        d="M 60, 60 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                      />
                    </defs>
                    <text fontSize="10.5" fontWeight="bold" letterSpacing="2.5">
                      <textPath href="#circlePath" fill="#F8FAFC">
                        • HIRE ME • HIRE ME • HIRE ME
                      </textPath>
                    </text>
                  </svg>
                </motion.div>

                {/* Central Arrow Button */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slateTeal flex items-center justify-center text-sky-300 shadow-inner group-hover:scale-110 transition-transform z-10 border border-sky-400/40">
                  <ArrowDown size={20} className="stroke-[2.5]" />
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Lower Shelf: Interactive Draggable Floating Colored Pills on Deep Slate-Teal Canvas */}
        <div className="pt-12 pb-14 sm:pb-16">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 max-w-4xl">
            {/* Pill 1: Backend (Coral) */}
            <motion.div
              drag
              dragConstraints={{ top: -15, bottom: 15, left: -25, right: 25 }}
              dragElastic={0.2}
              whileHover={{ scale: 1.08, rotate: -8 }}
              whileDrag={{ scale: 1.12, cursor: 'grabbing' }}
              className="bg-pill-coral text-white font-bold text-base sm:text-lg px-8 py-3.5 rounded-full border-2 border-slate-900 shadow-neo -rotate-[10deg] cursor-grab active:cursor-grabbing select-none"
            >
              Backend
            </motion.div>

            {/* Pill 2: Frontend (Sky Aqua) */}
            <motion.div
              drag
              dragConstraints={{ top: -15, bottom: 15, left: -25, right: 25 }}
              dragElastic={0.2}
              whileHover={{ scale: 1.08, rotate: 6 }}
              whileDrag={{ scale: 1.12, cursor: 'grabbing' }}
              className="bg-pill-sky text-slate-950 font-bold text-base sm:text-lg px-8 py-3.5 rounded-full border-2 border-slate-900 shadow-neo rotate-[6deg] cursor-grab active:cursor-grabbing select-none"
            >
              Frontend
            </motion.div>

            {/* Pill 3: Mobile (Amber) */}
            <motion.div
              drag
              dragConstraints={{ top: -15, bottom: 15, left: -25, right: 25 }}
              dragElastic={0.2}
              whileHover={{ scale: 1.08, rotate: -12 }}
              whileDrag={{ scale: 1.12, cursor: 'grabbing' }}
              className="bg-pill-amber text-slate-950 font-bold text-base sm:text-lg px-8 py-3.5 rounded-full border-2 border-slate-900 shadow-neo -rotate-[12deg] cursor-grab active:cursor-grabbing select-none"
            >
              Mobile
            </motion.div>

            {/* Pill 4: APIs (Caramel/Teal) */}
            <motion.div
              drag
              dragConstraints={{ top: -15, bottom: 15, left: -25, right: 25 }}
              dragElastic={0.2}
              whileHover={{ scale: 1.08, rotate: 5 }}
              whileDrag={{ scale: 1.12, cursor: 'grabbing' }}
              className="bg-pill-caramel text-white font-bold text-base sm:text-lg px-8 py-3.5 rounded-full border-2 border-slate-900 shadow-neo rotate-[5deg] cursor-grab active:cursor-grabbing select-none"
            >
              APIs
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
