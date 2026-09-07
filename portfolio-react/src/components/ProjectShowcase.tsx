import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Filter } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Project, ProjectCard3D } from './ProjectCard3D';

interface ProjectShowcaseProps {
  projects: Project[];
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden glass rounded-[3rem] border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 bg-slate-900/90 backdrop-blur-sm rounded-2xl text-white hover:bg-blue-500 transition-all shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
          {/* Hero Image */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40`} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
            
            {/* Project Title Overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-slate-800/80 backdrop-blur-sm text-slate-300 text-xs font-black uppercase tracking-widest rounded-xl border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-8">
            {/* Description */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-400 mb-4">
                Overview
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Challenge */}
            {project.details?.challenge && (
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-400 mb-4">
                  The Challenge
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {project.details.challenge}
                </p>
              </div>
            )}

            {/* Solution */}
            {project.details?.solution && (
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-400 mb-4">
                  The Solution
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {project.details.solution}
                </p>
              </div>
            )}

            {/* Key Features */}
            {project.details?.features && project.details.features.length > 0 && (
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-400 mb-4">
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.details.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <span className="text-blue-400 text-xl mt-0.5">•</span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {project.details?.technologies && project.details.technologies.length > 0 && (
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-400 mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.details.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-5 py-2 bg-slate-800/50 text-slate-300 rounded-2xl border border-white/5 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-blue-500 text-white rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/50"
                >
                  <ExternalLink size={22} />
                  Visit Live Site
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold text-lg hover:bg-slate-700 transition-all hover:scale-105 shadow-lg"
              >
                <Github size={22} />
                View Source Code
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique categories from project tags
  const categories = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter));

  const handleExpandProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="relative">
      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-white/5 rounded-2xl text-white font-bold hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle filters"
          >
            <Filter size={18} />
            Filter
            <motion.span
              animate={{ rotate: showFilters ? 180 : 0 }}
              className="text-slate-400"
            >
              ▼
            </motion.span>
          </button>

          <span className="text-slate-400 text-sm font-medium">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
          </span>
        </div>

        {/* Filter Pills */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-3 w-full sm:w-auto"
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    activeFilter === category
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-slate-800/50 text-slate-400 border border-white/5 hover:bg-slate-800 hover:text-white'
                  }`}
                  aria-pressed={activeFilter === category}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Projects Grid with Staggered Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard3D
              key={project.id}
              project={project}
              index={index}
              onExpand={handleExpandProject}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* No Results Message */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <p className="text-slate-400 text-lg">
            No projects found for this filter.
          </p>
          <button
            onClick={() => setActiveFilter('All')}
            className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all"
          >
            Show All Projects
          </button>
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
};
