import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import PageTransition from '../components/PageTransition';
import ScrollProgress from '../components/ScrollProgress';

function Portfolio() {
  return (
    <PageTransition transitionType="default">
      <div className="min-h-screen">
        <ScrollProgress />
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
        <BackToTop />
      </div>
    </PageTransition>
  );
}

export default Portfolio;
