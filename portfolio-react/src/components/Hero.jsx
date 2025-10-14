function Hero() {
  return (
    <section id="home" className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Hi, I'm <span className="text-blue-500">Abenezer</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-6">
              MERN Stack Developer
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg">
              I am a passionate MERN Stack Developer with 2+ years of experience building full-stack web applications. 
              I specialize in MongoDB, Express.js, React, and Node.js, creating scalable, responsive, and user-friendly 
              solutions. I enjoy transforming ideas into robust applications with clean code and modern best practices.
            </p>
            <div className="flex space-x-4">
              <a
                href="#contact"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
              >
                Contact Me
              </a>
              <a
                href="#projects"
                className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition duration-300"
              >
                View Work
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 transform -rotate-12"></div>
              <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 transform rotate-12"></div>
              <img
                src="/images/me1.jpg"
                alt="Profile"
                className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
