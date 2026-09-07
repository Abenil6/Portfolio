import { motion } from 'framer-motion';
import React from 'react';
import { ProjectShowcase } from './ProjectShowcase';
import { Project } from './ProjectCard3D';

const projects: Project[] = [
  {
    id: 1,
    title: 'Student Information Management System',
    description: 'A fully developed Secure web-based system for student registration, academic records, and school communication.',
    image: '/images/husims .png',
    github: 'https://github.com/Abenil6/HU-SIMS',
    link: 'https://hunb-sims.vercel.app/',
    tags: ['React', 'Node.js', 'MongoDB', 'Express.js', 'JWT', 'bcrypt'],
    color: 'from-blue-500 to-indigo-500',
    details: {
      challenge: 'Educational institutions needed a centralized system to manage student information, academic records, and communications securely and efficiently.',
      solution: 'Built a comprehensive MERN stack application with JWT authentication, role-based access control, and a responsive interface for administrators, teachers, and students.',
      features: [
        'Secure user authentication with JWT tokens',
        'Role-based access control for different user types',
        'Student registration and profile management',
        'Academic records and grade tracking',
        'Real-time communication system',
        'Responsive design for all devices'
      ],
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'bcrypt', 'REST API']
    }
  },
  {
    id: 2,
    title: 'Gebeya Media CMS',
    description: 'A professional media content management system designed for Gebeya media studios Ethiopia.',
    image: '/images/gmedia.png',
    github: 'https://github.com/Abenil6/Gebeya-Media-MERN',
    tags: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    color: 'from-purple-500 to-pink-500',
    details: {
      challenge: 'Media studios required a custom CMS to manage diverse content types, collaborate with teams, and streamline their production workflow.',
      solution: 'Developed a feature-rich content management system with intuitive UI, media asset management, and collaborative tools tailored for media production.',
      features: [
        'Media asset library with advanced search',
        'Content creation and editing interface',
        'User roles and permissions management',
        'Project collaboration tools',
        'Media preview and metadata management',
        'Dashboard analytics'
      ],
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Multer', 'AWS S3']
    }
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
    details: {
      challenge: 'The resort needed an elegant, immersive website to showcase their facilities and capture booking inquiries from potential guests.',
      solution: 'Created a visually stunning landing page with smooth GSAP animations, interactive elements, and an integrated booking inquiry form.',
      features: [
        'Smooth scroll animations with GSAP',
        'Parallax effects and interactive elements',
        'Custom booking inquiry form',
        'Gallery showcase with lightbox',
        'Mobile-responsive design',
        'Optimized performance and loading'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'ScrollTrigger', 'Responsive Design']
    }
  },
];

function Projects() {
  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
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

        <ProjectShowcase projects={projects} />
      </div>
    </section>
  );
}

export default Projects;
