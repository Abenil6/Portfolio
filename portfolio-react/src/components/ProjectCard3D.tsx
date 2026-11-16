import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import React from 'react';

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
  const handleClick = () => {
    if (onExpand) {
      onExpand(project);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="group relative bg-[#122834] rounded-[2.5rem] overflow-hidden border-2 border-slate-900 shadow-neo flex flex-col justify-between transition-transform duration-300"
    >
      <div>
        {/* Browser Mockup Window Header */}
        <div className="bg-[#0D1E28] px-6 py-3 border-b-2 border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-pill-coral border border-slate-900 inline-block" />
            <span className="w-3 h-3 rounded-full bg-pill-amber border border-slate-900 inline-block" />
            <span className="w-3 h-3 rounded-full bg-pill-cyan border border-slate-900 inline-block" />
          </div>
          <span className="text-[11px] font-mono text-slate-400 font-semibold tracking-wider">PROJECT 0{project.id}</span>
        </div>

        {/* Project Preview Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 border-b-2 border-slate-900 cursor-pointer" onClick={handleClick}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Quick Action Overlay Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 rounded-full bg-slate-900/90 text-white flex items-center justify-center hover:bg-slateTeal border border-white/20 transition-all shadow-md"
                aria-label={`Visit ${project.title}`}
              >
                <ExternalLink size={16} />
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 rounded-full bg-slate-900/90 text-white flex items-center justify-center hover:bg-slateTeal border border-white/20 transition-all shadow-md"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github size={16} />
            </a>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          {/* Tag Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/10 text-sky-200 text-xs font-semibold rounded-full border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3
            onClick={handleClick}
            className="text-2xl sm:text-3xl font-serif text-white mb-3 cursor-pointer group-hover:text-sky-300 transition-colors"
          >
            {project.title}
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
            {project.description}
          </p>
        </div>
      </div>

      {/* Footer / CTA trigger */}
      <div className="px-8 pb-8 pt-2">
        <button
          onClick={handleClick}
          className="w-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold py-3 px-6 rounded-full border border-white/20 flex items-center justify-center gap-2 transition-all group/btn"
        >
          Explore Case Study
          <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};
