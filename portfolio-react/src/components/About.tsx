import { GraduationCap, Briefcase, Award, Sparkles, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { icon: Briefcase, label: 'Experience', value: '2+ Years', bg: 'bg-pill-coral', text: 'text-white' },
  { icon: GraduationCap, label: 'Education', value: 'BSc. IS', bg: 'bg-pill-sky', text: 'text-slate-950' },
  { icon: Award, label: 'Shipped', value: '5+ Projects', bg: 'bg-pill-amber', text: 'text-slate-950' },
  { icon: Code2, label: 'Focus', value: 'Full Stack', bg: 'bg-pill-pink', text: 'text-slate-950' },
];

export default function About() {
  return (
    <section id="about" className="py-28 sm:py-36 relative bg-[#F8FAFC] bg-grid-subtle overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Framed Neobrutalist Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-[380px]">
              {/* Offset decorative backdrop shadow frame */}
              <div className="absolute inset-0 bg-[#A0E7E5] rounded-[3rem] border-2 border-slate-900 translate-x-3 translate-y-3" />

              {/* Main Photo Card */}
              <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] bg-white border-2 border-slate-900 shadow-neo-lg z-10">
                <img
                  src="/images/me1.jpg"
                  alt="Abenezer Aschalew"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Neobrutalist Experience Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="absolute -bottom-6 -right-6 bg-pill-coral text-white p-6 rounded-[2rem] border-2 border-slate-900 shadow-neo z-20 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Sparkles size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold leading-none">2+ Years</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider opacity-90 mt-1">Experience</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative & Metrics */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-800 mb-6"
            >
              <span>THE JOURNEY</span>
              <span className="text-amber-500 text-sm">✻</span>
              <span>BACKGROUND</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-slateTeal-deep mb-8 leading-[1.12] tracking-tight"
            >
              Engineering with <span className="italic font-serif">Purpose, Clarity & Rigor</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal mb-6"
            >
              I am a Full-Stack Engineer who blends creative intuition with technical discipline to construct scalable web and mobile software. 
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-base text-slate-600 leading-relaxed mb-12"
            >
              My academic background in <strong className="text-slate-900 font-semibold">Information Science from Haramaya University</strong> equipped me with foundational systems thinking and data architecture skills, which I combine with modern frameworks to engineer fluid, production-ready experiences.
            </motion.p>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`${stat.bg} ${stat.text} p-5 rounded-[1.75rem] border-2 border-slate-900 shadow-neo flex flex-col justify-between transition-transform`}
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-900/10 flex items-center justify-center mb-4">
                    <stat.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-serif font-bold leading-none mb-1">{stat.value}</p>
                    <p className="text-[11px] font-bold uppercase tracking-wider opacity-80">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
