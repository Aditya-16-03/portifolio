import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socials = [
    { icon: FiGithub,   href: personalInfo.github,                label: 'GitHub',   color: '#94a3b8' },
    { icon: FiLinkedin, href: personalInfo.linkedin,              label: 'LinkedIn', color: '#0ea5e9' },
    { icon: FiMail,     href: `mailto:${personalInfo.email}`,     label: 'Email',    color: '#a78bfa' },
  ];

  return (
    <footer style={{
      position: 'relative', zIndex: 2,
      borderTop: '1px solid rgba(124,58,237,0.1)',
      background: 'rgba(5,5,16,0.95)',
      backdropFilter: 'blur(24px)',
    }}>
      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: 1,
        background: 'linear-gradient(to right, transparent, rgba(124,58,237,0.5), rgba(14,165,233,0.5), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3.5rem 1.5rem 3.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800, fontSize: '0.9rem', color: 'white',
                boxShadow: '0 0 20px rgba(124,58,237,0.45)',
              }}>
                AV
              </div>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700, fontSize: '1.1rem',
                background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Aditya Vardhan
              </span>
            </div>
            <p style={{
              color: '#334155', fontSize: '0.86rem', lineHeight: 1.7,
              maxWidth: 270, margin: '0 auto 22px',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              CS Undergraduate passionate about building scalable backends and intelligent systems.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
              {socials.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#475569', textDecoration: 'none', cursor: 'none',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.borderColor = `${color}40`;
                    e.currentTarget.style.boxShadow = `0 0 16px ${color}30`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#475569';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.12, boxShadow: '0 0 24px rgba(124,58,237,0.4)', y: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
            style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(124,58,237,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'none', color: '#a78bfa',
              transition: 'all 0.2s ease',
              marginTop: '0.5rem',
            }}
          >
            <FiArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
