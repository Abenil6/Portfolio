import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '../hooks/useGSAP';
import { getLenis } from '../hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Student Information Management System',
    description: 'A fully developed Secure web-based system for student registration, academic records, and school communication.',
    image: '/images/husims .png',
    github: 'https://github.com/Abenil6/HU-SIMS',
    link: 'https://hunb-sims.vercel.app/',
    tags: ['React', 'Node.js', 'MongoDB', 'Express.js', 'JWT', 'bcrypt'],
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 2,
    title: 'Gebeya Media CMS',
    description: 'A professional media content management system designed for Gebeya media studios Ethiopia.',
    image: '/images/gmedia.png',
    github: 'https://github.com/Abenil6/Gebeya-Media-MERN',
    tags: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'Sabana Beach Resort',
    description: 'A premium landing page for a beach resort with custom booking inquiry system and smooth scroll animations.',
    image: '/images/beachhh.jpg',
    link: 'https://sabana-resort.vercel.app/',
    github: 'https://github.com/Abenil6/Web_Project_Fullstack',
    tags: ['HTML5', 'CSS3', 'JS', 'GSAP'],
    color: 'from-orange-500 to-amber-500',
  },
];

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // GSAP parallax effect on image
  useGSAP(() => {
    if (imageRef.current && cardRef.current) {
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, { scope: cardRef, dependencies: [project.id] });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group h-full"
    >
      <div className="h-full glass rounded-[3rem] overflow-hidden border-white/5 flex flex-col transition-all duration-500 group-hover:shadow-blue-500/10 group-hover:shadow-[0_20px_80px_-20px_rgba(59,130,246,0.15)]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out scale-125"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
          
          <div className="absolute top-6 right-6 flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            {project.link && (
              <a href={project.link} target="_blank" className="p-3 bg-slate-900/90 rounded-2xl text-white hover:bg-blue-500 transition-all shadow-xl">
                <ExternalLink size={20} />
              </a>
            )}
            <a href={project.github} target="_blank" className="p-3 bg-slate-900/90 rounded-2xl text-white hover:bg-blue-500 transition-all shadow-xl">
              <Github size={20} />
            </a>
          </div>
        </div>

        <div className="p-10 flex-grow flex flex-col" style={{ transform: "translateZ(50px)" }}>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string) => (
              <span key={tag} className="px-4 py-1.5 bg-slate-800/50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/5">
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="text-2xl font-black text-white mb-4 group-hover:text-gradient transition-all duration-300">
            {project.title}
          </h3>
          
          <p className="text-slate-400 leading-relaxed mb-8 text-sm font-medium">
            {project.description}
          </p>

          <div className="mt-auto">
            <a 
              href={project.link || project.github} 
              target="_blank"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-blue-400 hover:gap-4 transition-all"
            >
              Case Study <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  // Horizontal scroll with pinning
  useGSAP(() => {
    if (!horizontalRef.current || !sectionRef.current) return;

    const lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
    }

    const cards = horizontalRef.current.querySelectorAll('.project-card');
    const totalWidth = horizontalRef.current.scrollWidth - window.innerWidth;

    // Only apply horizontal scroll on larger screens
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1024px)", () => {
      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
          anticipatePin: 1,
        },
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section id="projects" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="h-px w-12 bg-blue-500"></div>
                <span className="text-sm font-black uppercase tracking-[0.3em] text-blue-400">Portfolio</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-black text-white tracking-tighter"
              >
                Featured <span className="text-gradient">Creations</span>
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-lg text-slate-400 max-w-sm font-medium leading-relaxed"
            >
              A collection of digital solutions where design meets functionality to create impactful experiences.
            </motion.p>
          </div>
        </div>

        {/* Horizontal scrolling container for desktop, normal grid for mobile */}
        <div className="lg:overflow-hidden">
          <div 
            ref={horizontalRef}
            className="lg:flex lg:flex-nowrap lg:w-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-none gap-12 px-4 sm:px-6 lg:px-8"
          >
            {projects.map((project, index) => (
              <div key={project.id} className="project-card lg:w-[500px] lg:flex-shrink-0 lg:first:ml-[max(2rem,calc((100vw-1280px)/2))] lg:last:mr-[max(2rem,calc((100vw-1280px)/2))]">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
