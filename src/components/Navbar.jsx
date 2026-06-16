import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'Home',         href: '#hero' },
  { label: 'About',        href: '#about' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Education',    href: '#education' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Coding Activity', href: '#github' },
  { label: 'Contact',      href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobile]   = useState(false);
  const [active, setActive]       = useState('hero');
  const [hoveredIdx, setHovered]  = useState(null);
  const pillRef = useRef({});

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      // Update active section
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Navigate ── */
  const navigate = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobile(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: '0 clamp(1rem, 5vw, 2.5rem)',
          height: scrolled ? 60 : 72,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled
            ? 'rgba(5, 5, 16, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(124,58,237,0.12)'
            : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        {/* Logo */}
        <motion.button
          onClick={() => navigate('#hero')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'none', border: 'none', cursor: 'none',
            display: 'flex', alignItems: 'center', gap: 10,
          }}
        >
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800, fontSize: '0.85rem', color: 'white',
            boxShadow: '0 0 16px rgba(124,58,237,0.4)',
          }}>
            AV
          </div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: '1rem',
            background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Aditya Vardhan
          </span>
        </motion.button>

        {/* Desktop Links */}
        <div style={{ alignItems: 'center', gap: 4 }} className="nav-desktop">
          {NAV_LINKS.map((link, i) => {
            const id = link.href.replace('#', '');
            const isActive = active === id;
            return (
              <motion.button
                key={link.label}
                onClick={() => navigate(link.href)}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                style={{
                  position: 'relative',
                  background: 'none', border: 'none', cursor: 'none',
                  padding: '6px 12px', borderRadius: 8,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.85rem', fontWeight: 500,
                  color: isActive ? '#a78bfa' : '#64748b',
                  transition: 'color 0.2s',
                }}
              >
                <AnimatePresence>
                  {(isActive || hoveredIdx === i) && (
                    <motion.div
                      key="pill"
                      layoutId="nav-active-pill"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      style={{
                        position: 'absolute', inset: 0,
                        borderRadius: 8,
                        background: isActive
                          ? 'rgba(124,58,237,0.15)'
                          : 'rgba(255,255,255,0.04)',
                        border: isActive
                          ? '1px solid rgba(124,58,237,0.3)'
                          : '1px solid rgba(255,255,255,0.07)',
                      }}
                    />
                  )}
                </AnimatePresence>
                <span style={{ position: 'relative', zIndex: 1 }}>
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-dot"
                    style={{
                      position: 'absolute', bottom: 1, left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4, height: 4, borderRadius: '50%',
                      background: '#7c3aed',
                      boxShadow: '0 0 8px rgba(124,58,237,0.8)',
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Mobile menu toggle */}
        <motion.button
          className="nav-mobile-toggle"
          onClick={() => setMobile(!mobileOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, width: 38, height: 38,
            display: 'none', alignItems: 'center', justifyContent: 'center',
            color: '#94a3b8', cursor: 'none',
          }}
        >
          {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </motion.button>
      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scaleY: 0.8 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -20, scaleY: 0.8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed', top: 60, left: 0, right: 0,
              zIndex: 999, transformOrigin: 'top',
              background: 'rgba(5,5,16,0.97)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(124,58,237,0.15)',
              padding: '1.25rem 1.5rem',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            {NAV_LINKS.map((link, i) => {
              const id = link.href.replace('#', '');
              const isActive = active === id;
              return (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => navigate(link.href)}
                  style={{
                    background: isActive ? 'rgba(124,58,237,0.12)' : 'none',
                    border: isActive ? '1px solid rgba(124,58,237,0.25)' : '1px solid transparent',
                    borderRadius: 8, padding: '10px 14px', cursor: 'none',
                    color: isActive ? '#a78bfa' : '#64748b',
                    fontSize: '0.9rem', fontWeight: 500, textAlign: 'left',
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {link.label}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-desktop { display: none; }
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
