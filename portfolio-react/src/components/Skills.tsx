import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'MERN & Full Stack',
    skills: [
      { name: 'MongoDB', percentage: 85, color: 'from-green-400/20 to-emerald-400/20', text: 'text-green-400', icon: '🍃' },
      { name: 'Express.js', percentage: 90, color: 'from-slate-400/20 to-slate-600/20', text: 'text-slate-400', icon: '🚂' },
      { name: 'React', percentage: 95, color: 'from-blue-400/20 to-indigo-400/20', text: 'text-blue-400', icon: '⚛️' },
      { name: 'Node.js', percentage: 88, color: 'from-green-500/20 to-lime-500/20', text: 'text-green-500', icon: '🟢' },
    ]
  },
  {
    title: 'Mobile & Systems',
    skills: [
      { name: 'Flutter', percentage: 85, color: 'from-blue-400/20 to-cyan-400/20', text: 'text-blue-400', icon: '📱' },
      { name: 'Dart', percentage: 82, color: 'from-cyan-400/20 to-blue-500/20', text: 'text-cyan-400', icon: '🎯' },
      { name: 'Java', percentage: 88, color: 'from-red-400/20 to-orange-400/20', text: 'text-red-400', icon: '☕' },
      { name: 'C++', percentage: 75, color: 'from-blue-600/20 to-indigo-600/20', text: 'text-blue-500', icon: '⚙️' },
      { name: 'C# / .NET', percentage: 78, color: 'from-purple-400/20 to-indigo-400/20', text: 'text-purple-400', icon: '💠' },
    ]
  },
  {
    title: 'Ecosystem',
    skills: [
      { name: 'TypeScript', percentage: 80, color: 'from-blue-600/20 to-cyan-600/20', text: 'text-blue-400', icon: '📘' },
      { name: 'Tailwind CSS', percentage: 92, color: 'from-cyan-400/20 to-blue-400/20', text: 'text-cyan-400', icon: '🎨' },
      { name: 'Git/DevOps', percentage: 85, color: 'from-orange-500/20 to-red-500/20', text: 'text-orange-400', icon: '🐙' },
    ]
  }
];

const SkillCard = ({ skill, index }: { skill: any, index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ y: -5 }}
    className="group relative"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    <div className="relative glass p-6 rounded-[2rem] border-white/5 flex items-center justify-between overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          {skill.icon}
        </div>
        <div>
          <h4 className="text-lg font-black text-white">{skill.name}</h4>
          <p className={`text-[10px] font-black uppercase tracking-widest ${skill.text} opacity-80`}>Expertise</p>
        </div>
      </div>
      
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-slate-800"
          />
          <motion.circle
            cx="28"
            cy="28"
            r="24"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray="150.8"
            initial={{ strokeDashoffset: 150.8 }}
            whileInView={{ strokeDashoffset: 150.8 - (150.8 * skill.percentage) / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className={skill.text}
          />
        </svg>
        <span className="absolute text-[10px] font-black text-white">{skill.percentage}%</span>
      </div>
    </div>
  </motion.div>
);

function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full mb-8"
          ></motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter"
          >
            Core <span className="text-gradient">Capabilities</span>
          </motion.h2>
        </div>

        <div className="space-y-20">
          {skillCategories.map((category, catIndex) => (
            <div key={category.title}>
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-black text-white mb-10 tracking-widest uppercase flex items-center gap-4"
              >
                <span className="text-blue-400 text-sm">0{catIndex + 1}</span>
                {category.title}
                <div className="flex-grow h-px bg-slate-800"></div>
              </motion.h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
