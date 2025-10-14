import { useState, useEffect, useRef } from 'react';

function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const technicalSkills = [
    { name: 'HTML/CSS', percentage: 95 },
    { name: 'JavaScript', percentage: 90 },
    { name: 'React', percentage: 85 },
    { name: 'UI/UX', percentage: 50 },
  ];

  const professionalSkills = [
    { name: 'Communication', percentage: 90 },
    { name: 'Teamwork', percentage: 95 },
    { name: 'Problem Solving', percentage: 85 },
    { name: 'Creativity', percentage: 80 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const SkillBar = ({ name, percentage }) => (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium text-gray-700">{name}</span>
        <span className="text-gray-600">{percentage}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${percentage}%` : '0%' }}
        ></div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {technicalSkills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Professional Skills</h3>
            <div className="space-y-6">
              {professionalSkills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
