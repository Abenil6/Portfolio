import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Filter } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Project, ProjectCard3D } from "./ProjectCard3D";

interface ProjectShowcaseProps {
  projects: Project[];
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-[#122834] rounded-[2.5rem] border-2 border-slate-900 shadow-neo-lg text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 bg-slate-900 rounded-full text-white hover:bg-pill-coral transition-colors shadow-lg border border-white/10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
          {/* Header Image */}
          <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-900 border-b-2 border-slate-900">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#122834] via-[#122834]/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10">
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1 bg-slate-900/80 text-sky-200 text-xs font-semibold rounded-full border border-white/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-10 space-y-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-3">
                Overview
              </h3>
              <p className="text-slate-300 text-base leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            {project.details?.challenge && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-3">
                  The Problem & Challenge
                </h3>
                <p className="text-slate-300 text-base leading-relaxed font-normal">
                  {project.details.challenge}
                </p>
              </div>
            )}

            {project.details?.solution && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-3">
                  Engineered Solution
                </h3>
                <p className="text-slate-300 text-base leading-relaxed font-normal">
                  {project.details.solution}
                </p>
              </div>
            )}

            {project.details?.features &&
              project.details.features.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
                    Key Technical Features
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {project.details.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-slate-300 text-sm"
                      >
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {project.details?.technologies &&
              project.details.technologies.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400 mb-4">
                    Architecture & Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {project.details.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-white/10 text-white rounded-xl border border-white/10 text-xs font-bold font-sans"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 bg-pill-sky text-slate-950 rounded-full font-bold text-sm border-2 border-slate-900 shadow-neo hover:scale-[1.02] transition-transform"
                >
                  <ExternalLink size={18} />
                  Visit Live Application
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-slate-950 rounded-full font-bold text-sm border-2 border-slate-900 shadow-neo hover:scale-[1.02] transition-transform"
              >
                <Github size={18} />
                View Source Code
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All",
    ...Array.from(new Set(projects.flatMap((p) => p.tags))),
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <div className="relative">
      {/* Filter Section */}
      <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-full text-white font-semibold text-sm hover:bg-white/15 transition-all"
            aria-label="Toggle filters"
          >
            <Filter size={16} />
            Filter Stack
            <motion.span
              animate={{ rotate: showFilters ? 180 : 0 }}
              className="text-slate-400 text-xs"
            >
              ▼
            </motion.span>
          </button>

          <span className="text-slate-300 text-sm font-medium">
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "Project" : "Projects"}
          </span>
        </div>

        {/* Filter Pills */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2 w-full sm:w-auto"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all border ${
                    activeFilter === category
                      ? "bg-pill-coral text-white border-slate-900 shadow-sm"
                      : "bg-white/10 text-slate-300 border-white/10 hover:bg-white/20 hover:text-white"
                  }`}
                  aria-pressed={activeFilter === category}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard3D
            key={project.id}
            project={project}
            index={index}
            onExpand={(p) => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
