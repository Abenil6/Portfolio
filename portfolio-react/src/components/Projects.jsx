function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Simple Student Registration App',
      description: 'A fully responsive registration platform built with React.',
      image: '/images/Haramaya_gate.jpg',
      link: 'https://student-registration-ashen.vercel.app/',
      tags: ['React'],
    },
    {
      id: 2,
      title: 'Sabana Beach Resort',
      description: 'A Simple Web App for Sabana Beach using HTML, CSS and JS',
      image: '/images/beachhh.jpg',
      link: 'https://sabana-resort.vercel.app/',
      tags: ['HTML', 'CSS', 'JS'],
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A custom portfolio website with animations and responsive design.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
      link: '#',
      tags: ['HTML/CSS', 'JavaScript', 'GSAP'],
    },
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden h-48 group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-500 bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-500 transition duration-300"
                  >
                    View Details
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
