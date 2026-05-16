import { GraduationCap, Briefcase, Award, Heart, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  const stats = [
    { icon: Briefcase, label: 'Experience', value: '2+ Years', color: 'from-blue-500 to-indigo-500' },
    { icon: GraduationCap, label: 'Education', value: 'BSc. IS', color: 'from-indigo-500 to-purple-500' },
    { icon: Award, label: 'Certifications', value: '5+ Verified', color: 'from-purple-500 to-pink-500' },
    { icon: Heart, label: 'Passion', value: 'Full Stack', color: 'from-rose-500 to-orange-500' },
  ];

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:flex lg:items-center lg:gap-24">
          <motion.div 
            style={{ scale, rotate }}
            className="lg:w-2/5 mb-20 lg:mb-0 relative"
          >
            <div className="relative">
              {/* Animated Glow Border */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-700"></div>
              
              <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl border border-white/5">
                <img
                  src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Creative"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
              </div>
              
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-10 -right-10 glass p-8 rounded-[2.5rem] shadow-3xl"
              >
                <Sparkles className="text-blue-400 mb-2" size={32} />
                <p className="text-4xl font-black text-gradient">2+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Years Exp</p>
              </motion.div>
            </div>
          </motion.div>

          <div className="lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-4 mb-6">
                <span className="text-sm font-black uppercase tracking-[0.4em] text-blue-400">The Journey</span>
                <div className="h-px w-20 bg-blue-500/20"></div>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter">
                Crafting With <span className="text-gradient">Purpose</span>
              </h2>
              
              <p className="text-2xl text-slate-200 mb-8 leading-relaxed font-bold">
                A Junior Full Stack Developer with a vision for <span className="text-blue-400">exceptional digital products.</span>
              </p>
              
              <p className="text-lg text-slate-400 mb-12 leading-relaxed max-w-2xl font-medium">
                I combine technical discipline with creative intuition to build software that not only works 
                but feels right. My background in Information Science from Haramaya University provides the 
                theoretical foundation for my practical engineering skills.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -10 }}
                    className="group flex flex-col items-center text-center p-6 rounded-[2rem] glass transition-all duration-500 hover:shadow-blue-500/10 hover:shadow-2xl"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <stat.icon size={28} />
                    </div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-sm font-black text-white">{stat.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
