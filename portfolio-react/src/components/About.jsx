import { GraduationCap, Briefcase } from 'lucide-react';

function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>
        <div className="md:flex md:items-center md:space-x-12">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <img
              src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="About"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div className="md:w-2/3">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Who I Am</h3>
            <p className="text-gray-600 mb-6">
              I'm a passionate MERN Stack Developer with 2+ years of experience building full-stack 
              web applications. I specialize in MongoDB, Express.js, React, and Node.js, along with 
              modern tools and technologies for creating scalable and efficient solutions.
            </p>
            <p className="text-gray-600 mb-6">
              My approach combines strong backend development with modern frontend practices, ensuring 
              that the applications I build are robust, secure, performant, and deliver excellent user experiences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <GraduationCap className="text-blue-500" size={24} />
                  </div>
                  <h4 className="font-medium text-gray-800">Education</h4>
                </div>
                <p className="text-gray-600">
                  Bachelor's in Information Science from Haramaya University (2023-2026)
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Briefcase className="text-blue-500" size={24} />
                  </div>
                  <h4 className="font-medium text-gray-800">Experience</h4>
                </div>
                <p className="text-gray-600">2+ years building full-stack applications and working on diverse projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
