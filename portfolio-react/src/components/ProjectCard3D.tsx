import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, X } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  github: string;
  link?: string;
  tags: string[];
  color: string;
  details?: {
    challenge?: string;
    solution?: string;
    technologies?: string[];
    features?: string[];
  };
}

interface ProjectCard3DProps {
  project: Project;
  index: number;
  onExpand?: (project: Project) => void;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({ project, index, onExpand }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth animations
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Transform for 3D rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  // Shine effect position
  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    
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

  const handleClick = () => {
    if (onExpand) {
      onExpand(project);
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, type: 'spring' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isTouchDevice ? 0 : rotateX,
        rotateY: isTouchDevice ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group h-full perspective-1000"
    >
      {/* Card Container with Flip Animation */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="h-full glass rounded-[3rem] overflow-hidden border-white/5 flex flex-col transition-all duration-500 group-hover:shadow-blue-500/10 group-hover:shadow-[0_20px_80px_-20px_rgba(59,130,246,0.15)] relative">
            {/* Shine Effect Overlay */}
            {!isTouchDevice && (
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(600px circle at ${shineX} ${shineY}, rgba(255,255,255,0.15), transparent 40%)`,
                }}
              />
            )}

            {/* Image Section with Depth */}
            <div 
              className="relative aspect-[16/10] overflow-hidden"
              style={{ transform: "translateZ(20px)" }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                style={{ transform: "translateZ(10px)" }}
              />
              
              {/* Action Buttons */}
              <div 
                className="absolute top-6 right-6 flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100"
                style={{ transform: "translateZ(40px)" }}
              >
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-slate-900/90 backdrop-blur-sm rounded-2xl text-white hover:bg-blue-500 transition-all shadow-xl hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Visit ${project.title} website`}
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900/90 backdrop-blur-sm rounded-2xl text-white hover:bg-blue-500 transition-all shadow-xl hover:scale-110"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github size={20} />
                </a>
              </div>
            </div>

            {/* Content Section with Depth */}
            <div 
              className="p-10 flex-grow flex flex-col"
              style={{ transform: "translateZ(50px)" }}
            >
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag: string) => (
                  <span 
                    key={tag} 
                    className="px-4 py-1.5 bg-slate-800/50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/5"
                  >
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
                <button
                  onClick={handleClick}
                  onKeyDown={handleKeyDown}
                  className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-blue-400 hover:gap-4 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg px-2 py-1"
                  aria-label={`View more details about ${project.title}`}
                  tabIndex={0}
                >
                  Learn More <ArrowUpRight size={18} />
                </button>
              </div>
            </div>

            {/* Depth Shadow - Responds to tilt */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                translateX: useTransform(mouseXSpring, [-0.5, 0.5], ["-20px", "20px"]),
                translateY: useTransform(mouseYSpring, [-0.5, 0.5], ["-20px", "20px"]),
              }}
            />
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="h-full glass rounded-[3rem] overflow-hidden border-white/5 flex flex-col p-10 relative">
            <button
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              className="absolute top-6 right-6 p-3 bg-slate-800/80 backdrop-blur-sm rounded-2xl text-white hover:bg-blue-500 transition-all shadow-xl z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close details"
              tabIndex={0}
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-black text-white mb-6">
              Project Details
            </h3>

            <div className="space-y-6 overflow-y-auto flex-grow">
              {project.details?.challenge && (
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-blue-400 mb-3">
                    Challenge
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.details.challenge}
                  </p>
                </div>
              )}

              {project.details?.solution && (
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-blue-400 mb-3">
                    Solution
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.details.solution}
                  </p>
                </div>
              )}

              {project.details?.features && project.details.features.length > 0 && (
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-blue-400 mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.details.features.map((feature, idx) => (
                      <li key={idx} className="text-slate-400 text-sm flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t border-white/5">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={18} />
                  Visit Site
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={18} />
                View Code
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
