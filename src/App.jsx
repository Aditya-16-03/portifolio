import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';

// UI Components
import CustomCursor from './components/ui/CustomCursor';
import ParticleBackground from './components/ui/ParticleBackground';
import ScrollProgress from './components/ui/ScrollProgress';
import MouseGlow from './components/ui/MouseGlow';
import FloatingShapes from './components/ui/FloatingShapes';

// Page Components
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import GitHubSection from './components/GitHubSection';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis smooth scrolling after loading
  useEffect(() => {
    if (loading) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Global UI */}
          <CustomCursor />
          <ParticleBackground />
          <MouseGlow />
          <FloatingShapes />
          <ScrollProgress />

          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main style={{ position: 'relative', zIndex: 2 }}>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Education />
            <Achievements />
            <GitHubSection />
            <Contact />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
