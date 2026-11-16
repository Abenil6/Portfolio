import { ReactNode } from 'react';
import { motion } from 'framer-motion';

// Real SVG Logos for Tech Stacks
function NextjsLogo() {
  return (
    <svg viewBox="0 0 180 180" className="w-8 h-8">
      <mask height="180" id="nextMask" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
        <circle cx="90" cy="90" fill="black" r="90" />
      </mask>
      <g mask="url(#nextMask)">
        <circle cx="90" cy="90" fill="#000000" r="90" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="url(#nextLinear1)"
        />
        <rect fill="url(#nextLinear2)" height="72" width="12" x="115" y="54" />
      </g>
      <defs>
        <linearGradient id="nextLinear1" gradientUnits="userSpaceOnUse" x1="109" x2="144.5" y1="116.5" y2="160.5">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nextLinear2" gradientUnits="userSpaceOnUse" x1="121" x2="120.799" y1="54" y2="106.875">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function NestjsLogo() {
  return (
    <svg viewBox="0 0 256 256" className="w-8 h-8">
      <path fill="#EA284E" d="M226.7 87.2c-5.1-13.6-14-25.1-25.5-33.1L128 0 54.8 54.1C43.3 62.1 34.4 73.6 29.3 87.2c-5.3 14.1-5.7 29.6-1.1 44.1 4.5 14.5 13.9 26.9 26.7 35.1L128 214l73.1-47.6c12.8-8.2 22.2-20.6 26.7-35.1 4.6-14.5 4.2-30-1.1-44.1z" />
      <path fill="#FFF" d="M128 29.5l56.8 42c8.9 6.2 15.8 15.1 19.8 25.7 3.9 11 3.5 22.9-.1 34.1-3.6 11.2-10.9 20.8-20.8 27.2L128 194.5l-55.7-36c-9.9-6.4-17.2-16-20.8-27.2-3.6-11.2-4-23.1-.1-34.1 4-10.6 10.9-19.5 19.8-25.7L128 29.5z" />
      <path fill="#EA284E" d="M128 58l40.3 29.8c6.3 4.4 11.2 10.7 14 18.2 2.8 7.8 2.5 16.2-.1 24.2-2.6 7.9-7.7 14.7-14.7 19.3L128 175l-39.5-25.5c-7-4.6-12.1-11.4-14.7-19.3-2.6-8-2.9-16.4-.1-24.2 2.8-7.5 7.7-13.8 14-18.2L128 58z" />
    </svg>
  );
}

function TanStackLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <defs>
        <linearGradient id="tanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="50%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="url(#tanGrad)" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="url(#tanGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function DockerLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#2496ED">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185zm-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.186.186 0 00-.184.185v1.888c0 .102.083.185.185.185zm-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m21.758 1.485c-.328-.205-.98-.316-1.637-.234-.176-.71-.62-1.34-1.228-1.745l-.46-.307-.323.449c-.58.805-.83 1.796-.697 2.766-.465.18-1.425.297-2.176.314H.924a.89.89 0 00-.895.894 10.97 10.97 0 002.664 7.202 12.02 12.02 0 007.87 3.992c6.43.58 12.18-3.41 13.916-9.528.02-.07.03-.133.03-.186 0-.256-.255-.472-.544-.617z" />
    </svg>
  );
}

function PostgresLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <path
        fill="#336791"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.8 15.6c-1.2.6-2.6.9-4 .9-3.8 0-6.8-2.6-7.5-6.2-.2-1.1-.1-2.2.3-3.2.7-1.7 2.2-3 4-3.6 1.4-.5 3-.4 4.3.2 2 1 3.4 2.8 3.7 5.1.1 1.2-.2 2.4-.8 3.4l1.3 1.3-1.3 2.1z"
      />
      <path
        fill="#FFFFFF"
        d="M11.5 6.5c-2.8 0-5 2.2-5 5 0 2.2 1.4 4 3.4 4.7l1.1-1.8c-1.2-.4-2-1.5-2-2.9 0-1.7 1.3-3 3-3s3 1.3 3 3c0 .8-.3 1.5-.8 2l1.4 1.4c1.1-1 1.9-2.5 1.9-4.2 0-2.8-2.5-4.2-6-4.2z"
      />
    </svg>
  );
}

function ReactLogo() {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function TypeScriptLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path d="M11.5 13.5H9.7v5.5H8.2v-5.5H6.5V12h5v1.5zm6.3 3.6c0 1.2-.9 2.1-2.4 2.1-1.3 0-2.3-.7-2.6-1.7l1.3-.7c.2.6.7 1 1.3 1 .6 0 1-.3 1-.8 0-.5-.4-.8-1.2-1.1-1.4-.5-2.1-1.1-2.1-2.1 0-1.2.9-2 2.2-2 1.1 0 1.9.5 2.3 1.3l-1.2.7c-.2-.5-.6-.7-1.1-.7-.5 0-.8.3-.8.7 0 .4.3.7 1.1 1 1.5.5 2.2 1.1 2.2 2.2z" fill="#FFF" />
    </svg>
  );
}

function NodejsLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#539E43">
      <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2zm0 2.2L4.8 8.4v7.3L12 19.9l7.2-4.2V8.4L12 4.2z" />
    </svg>
  );
}

function TailwindLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#38BDF8">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  );
}

function MongoDBLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <path fill="#13AA52" d="M12 1.5C11.5 2 7 8 7 13.5c0 3.5 2.2 6.5 5 7.5v-18c.5-.5 0-1 0-1.5z" />
      <path fill="#116149" d="M12 1.5C12.5 2 17 8 17 13.5c0 3.5-2.2 6.5-5 7.5v-18c-.5-.5 0-1 0-1.5z" />
    </svg>
  );
}

function ExpressLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <rect width="24" height="24" rx="5" fill="#1E293B" stroke="#475569" strokeWidth="1" />
      <text x="12" y="16" fill="#F8FAFC" fontSize="10.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
        EX
      </text>
    </svg>
  );
}

function APILogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="#60D5E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-6.5l-2.1 2.1m-8.8 8.8l-2.1 2.1m0-13l2.1 2.1m8.8 8.8l2.1 2.1" />
    </svg>
  );
}

function FlutterLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <path fill="#02569B" d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37z" />
      <path fill="#0175C2" d="M14.286 11.286L8.57 17l5.716 5.714h7.414l-9.428-9.428h-2.57z" />
      <path fill="#29B6F6" d="M14.286 22.714l4.286-4.286 4.286 4.286h-8.572z" />
    </svg>
  );
}

function DartLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <path fill="#0175C2" d="M4.1 3.2L12 11.1l7.9-7.9H4.1z" />
      <path fill="#02569B" d="M12 11.1L4.1 19h15.8L12 11.1z" />
      <path fill="#29B6F6" d="M4.1 3.2L12 11.1 4.1 19V3.2z" />
    </svg>
  );
}

function JavaLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <path fill="#EA2D2E" d="M8.5 16.5c-2.5-.2-4.5.3-4.5.3s1.5.8 4.2.8c3.2 0 5.2-.8 5.2-.8s-1.8-.1-4.9-.3zm-1.2-3.2c-2.1-.2-3.7.2-3.7.2s1.2.7 3.5.7c2.6 0 4.3-.6 4.3-.6s-1.5-.1-4.1-.3zm4.5-5.5c.3.5.7 1 1 1.7 1.5 2.7-1 4.5-1 4.5s2.4-1.3 1.2-3.7c-1-2-1.2-2.5-1.2-2.5zm-2.4 1.2s-1.6 1.8.8 3.5c1.8 1.3 1.5 2.1 1.5 2.1s.6-.9-.8-2.2c-1.6-1.5-.5-2.7-.5-2.7s-1-.3-1-.7z" />
    </svg>
  );
}

function CppLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <path fill="#00599C" d="M12 2L2 7.8v11.4L12 25l10-5.8V7.8L12 2zm-1.5 14.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5c1.8 0 3.3 1.1 4 2.6l-2 .8c-.4-.9-1.2-1.5-2-1.5-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5c.8 0 1.6-.6 2-1.5l2 .8c-.7 1.6-2.2 2.7-4 2.7zm6-4.5h1.5v-1.5H18V9h-1.5v1.5H15v1.5h1.5V13.5H18V12zm4 0h1.5v-1.5H22V9h-1.5v1.5H19v1.5h1.5V13.5H22V12z" />
    </svg>
  );
}

function GitLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <path fill="#F05032" d="M21.7 10.3l-8-8c-.4-.4-1.1-.4-1.5 0l-1.9 1.9 2.5 2.5c.4-.1.9 0 1.2.3.5.5.5 1.3 0 1.8-.3.3-.8.4-1.2.3l-2.4 2.4v5.3c.3.1.6.4.8.7.5.5.5 1.3 0 1.8-.5.5-1.3.5-1.8 0-.5-.5-.5-1.3 0-1.8.2-.2.5-.4.8-.4v-5.4c-.3-.1-.6-.3-.8-.5-.5-.5-.5-1.3 0-1.8.3-.3.8-.4 1.2-.3l2.4-2.4-1.9-1.9L2.3 12.2c-.4.4-.4 1.1 0 1.5l8 8c.4.4 1.1.4 1.5 0l9.9-9.9c.4-.4.4-1.1 0-1.5z" />
    </svg>
  );
}

function ThreejsLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <polygon points="12,2 22,20 2,20" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <polygon points="12,7 18,18 6,18" fill="#FFFFFF" fillOpacity="0.3" />
    </svg>
  );
}

interface SkillItem {
  name: string;
  category: string;
  Logo: () => ReactNode;
}

const skillCategories = [
  {
    title: 'Modern Web & Full-Stack',
    badgeColor: 'bg-pill-coral text-white',
    accentColor: '#D93B57',
    skills: [
      { name: 'Next.js', category: 'Framework', Logo: NextjsLogo },
      { name: 'React', category: 'Library', Logo: ReactLogo },
      { name: 'TanStack Start', category: 'Full-Stack', Logo: TanStackLogo },
      { name: 'TypeScript', category: 'Language', Logo: TypeScriptLogo },
      { name: 'Tailwind CSS', category: 'Styling', Logo: TailwindLogo },
      { name: 'Node.js', category: 'Runtime', Logo: NodejsLogo },
    ],
  },
  {
    title: 'Backend & Infrastructure',
    badgeColor: 'bg-pill-sky text-slate-950',
    accentColor: '#60D5E8',
    skills: [
      { name: 'Nest.js', category: 'Backend', Logo: NestjsLogo },
      { name: 'PostgreSQL', category: 'Database', Logo: PostgresLogo },
      { name: 'Docker', category: 'DevOps', Logo: DockerLogo },
      { name: 'MongoDB', category: 'Database', Logo: MongoDBLogo },
      { name: 'Express.js', category: 'API Engine', Logo: ExpressLogo },
      { name: 'REST APIs', category: 'Architecture', Logo: APILogo },
    ],
  },
  {
    title: 'Mobile, Systems & Tools',
    badgeColor: 'bg-pill-amber text-slate-950',
    accentColor: '#F59E0B',
    skills: [
      { name: 'Flutter', category: 'Cross-Platform', Logo: FlutterLogo },
      { name: 'Dart', category: 'Language', Logo: DartLogo },
      { name: 'Java', category: 'Language', Logo: JavaLogo },
      { name: 'C++', category: 'Systems', Logo: CppLogo },
      { name: 'Git & GitHub', category: 'Version Control', Logo: GitLogo },
      { name: 'Three.js', category: '3D Graphics', Logo: ThreejsLogo },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 sm:py-36 bg-slateTeal text-white relative overflow-hidden bg-grid-dark border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-4"
            >
              <span>TECHNICAL ARSENAL</span>
              <span className="text-amber-400 text-sm">✻</span>
              <span>STACK</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.12]"
            >
              Core Technologies &amp; <br />
              <span className="italic font-serif text-sky-300">Engineering Stack</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 max-w-md leading-relaxed font-normal"
          >
            The specialized frameworks, languages, databases, and DevOps tools I employ to engineer performant, resilient systems.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.15, duration: 0.6 }}
              className="bg-[#122834] rounded-[2.5rem] p-8 border-2 border-slate-900 shadow-neo flex flex-col justify-between"
            >
              <div>
                <div
                  className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-8 border border-slate-900 shadow-sm font-sans"
                  style={{
                    backgroundColor: category.accentColor,
                    color: catIndex === 0 ? '#FFFFFF' : '#0F172A',
                  }}
                >
                  {category.title}
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.04, y: -2 }}
                      className="bg-white/[0.08] hover:bg-white/[0.14] p-4 rounded-2xl border border-white/10 flex flex-col justify-between transition-all min-h-[96px] group"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110">
                          <skill.Logo />
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                          {skill.category}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                          {skill.name}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
