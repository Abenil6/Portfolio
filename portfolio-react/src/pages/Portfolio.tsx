import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import ContactModal from '../components/ContactModal';
import ScrollProgress from '../components/ScrollProgress';
import PageTransition from '../components/PageTransition';

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
        <Footer />
        <BackToTop />
        <ContactModal />
      </div>
    </PageTransition>
  );
}

export default Portfolio;
