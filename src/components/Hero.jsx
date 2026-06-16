import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiDownload, FiArrowDown, FiMail } from 'react-icons/fi';
import { personalInfo, roles } from '../data/portfolioData';
import avatarImg from '../assets/avatar.png';

/* ─── Typing Effect ─────────────────────────────────────────── */
const TypingEffect = ({ words }) => {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => { setPause(false); setDeleting(true); }, 2000);
      return () => clearTimeout(t);
    }
    const currentWord = words[wordIdx];
    const speed = deleting ? 45 : 95;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = charIdx + 1;
        setDisplay(currentWord.slice(0, next));
        setCharIdx(next);
        if (next === currentWord.length) setPause(true);
      } else {
        const next = charIdx - 1;
        setDisplay(currentWord.slice(0, next));
        setCharIdx(next);
        if (next === 0) { setDeleting(false); setWordIdx((w) => (w + 1) % words.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, pause, wordIdx, words]);

  return (
    <span>
      <span style={{
        background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>{display}</span>
      <span style={{
        display: 'inline-block', width: 2.5, height: '1.1em',
        background: 'linear-gradient(to bottom, #7c3aed, #0ea5e9)',
        marginLeft: 3, verticalAlign: 'text-bottom', borderRadius: 1,
        animation: 'blink 1s step-end infinite',
        boxShadow: '0 0 8px rgba(124,58,237,0.8)',
      }} />
    </span>
  );
};

/* ─── Magnetic Button ───────────────────────────────────────── */
const MagneticButton = ({ children, style, href, target, rel, onClick }) => {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.3;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    el.style.transform = `translate(${x}px,${y}px)`;
  }, []);

  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  }, []);

  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...style, cursor: 'none',
        display: 'inline-flex', alignItems: 'center', gap: 8,
        textDecoration: 'none',
        transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1)',
        border: 'none',
      }}
    >
      {children}
    </Tag>
  );
};

/* ─── Floating Orb ──────────────────────────────────────────── */
const FloatingOrb = ({ size, color, x, y, duration, delay }) => (
  <motion.div
    animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size, borderRadius: '50%',
      background: `radial-gradient(circle at 30% 30%, ${color}, transparent 70%)`,
      filter: 'blur(2px)',
      opacity: 0.6,
      pointerEvents: 'none',
    }}
  />
);

/* ─── Hero ──────────────────────────────────────────────────── */
const Hero = () => {
  const scrollToNext = () =>
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      style={{
        minHeight: 'min(100vh, 850px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        padding: 'clamp(7rem,12vw,9rem) clamp(1rem,5vw,2rem) 6rem',
        overflow: 'hidden',
      }}
    >
      {/* ── Background blobs ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[
          { top: '8%',  left: '3%',  w: 500, color: '124,58,237', delay: '0s' },
          { top: '40%', right: '3%', w: 400, color: '14,165,233',  delay: '2s' },
          { bottom: '10%', left: '30%', w: 350, color: '16,185,129', delay: '4s' },
        ].map((b, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: b.top, left: b.left, right: b.right, bottom: b.bottom,
            width: b.w, height: b.w, borderRadius: '50%',
            background: `radial-gradient(circle, rgba(${b.color},0.12) 0%, transparent 70%)`,
            filter: 'blur(60px)',
            animation: `pulse-glow 5s ease-in-out infinite`,
            animationDelay: b.delay,
          }} />
        ))}
      </div>

      {/* ── Floating orbs ── */}
      <FloatingOrb size={40} color="rgba(124,58,237,0.7)" x="12%" y="20%" duration={7} delay={0} />
      <FloatingOrb size={25} color="rgba(14,165,233,0.7)" x="88%" y="15%" duration={9} delay={1} />
      <FloatingOrb size={30} color="rgba(16,185,129,0.6)" x="80%" y="70%" duration={8} delay={2} />
      <FloatingOrb size={18} color="rgba(236,72,153,0.6)" x="5%"  y="65%" duration={6} delay={1.5} />
      <FloatingOrb size={22} color="rgba(249,115,22,0.5)" x="55%" y="85%" duration={10} delay={3} />

      <div style={{ maxWidth: 1100, width: '100%', position: 'relative', zIndex: 2 }}>
        <div className="hero-grid">

          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="hero-text"
          >
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 16px', borderRadius: 20, marginBottom: 24,
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: '50%', background: '#10b981',
                boxShadow: '0 0 8px rgba(16,185,129,0.8)', flexShrink: 0,
                animation: 'pulse-glow 2s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: '#34d399', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.05em',
              }}>
                Available for opportunities
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{ color: '#64748b', fontSize: 'clamp(0.9rem,2vw,1.05rem)', marginBottom: 8 }}
            >
              Hi there 👋, I'm
            </motion.p>

            {/* Name with glitch effect */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{
                fontSize: 'clamp(2rem,6vw,4.5rem)',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                lineHeight: 1.05,
                marginBottom: 16,
                background: 'linear-gradient(135deg, #f1f5f9 30%, #a78bfa 60%, #38bdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-1px',
                position: 'relative',
              }}
              className="glitch-text"
              data-text={personalInfo.shortName}
            >
              {personalInfo.shortName}
            </motion.h1>

            {/* Typing line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              style={{
                fontSize: 'clamp(1.1rem,3vw,1.7rem)',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                marginBottom: 22,
                minHeight: '2.5rem',
                display: 'flex', alignItems: 'center', gap: 10,
                color: '#475569',
              }}
            >
              <span style={{ flexShrink: 0 }}>I'm a</span>
              <TypingEffect words={roles} />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              style={{
                color: '#64748b',
                fontSize: 'clamp(0.88rem,1.5vw,0.97rem)',
                lineHeight: 1.8, maxWidth: 520, marginBottom: 36,
              }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="hero-btns"
            >
              {/* Primary */}
              <MagneticButton
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '12px 28px', borderRadius: 12,
                  background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
                  color: 'white', fontWeight: 600, fontSize: '0.9rem',
                  boxShadow: '0 0 30px rgba(124,58,237,0.4), 0 0 60px rgba(14,165,233,0.15)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <FiDownload size={15} /> Resume
              </MagneticButton>

              <MagneticButton
                href={personalInfo.github}
                target="_blank" rel="noopener noreferrer"
                style={{
                  padding: '12px 22px', borderRadius: 12,
                  background: 'rgba(124,58,237,0.08)',
                  border: '1px solid rgba(124,58,237,0.25)',
                  color: '#a78bfa', fontWeight: 500, fontSize: '0.9rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                <FiGithub size={15} /> GitHub
              </MagneticButton>

              <MagneticButton
                href={personalInfo.linkedin}
                target="_blank" rel="noopener noreferrer"
                style={{
                  padding: '12px 22px', borderRadius: 12,
                  background: 'rgba(14,165,233,0.08)',
                  border: '1px solid rgba(14,165,233,0.25)',
                  color: '#38bdf8', fontWeight: 500, fontSize: '0.9rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                <FiLinkedin size={15} /> LinkedIn
              </MagneticButton>

              <MagneticButton
                href={`mailto:${personalInfo.email}`}
                style={{
                  padding: '12px 22px', borderRadius: 12,
                  background: 'rgba(16,185,129,0.08)',
                  border: '1px solid rgba(16,185,129,0.25)',
                  color: '#34d399', fontWeight: 500, fontSize: '0.9rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                <FiMail size={15} /> Email
              </MagneticButton>
            </motion.div>


          </motion.div>

          {/* ── Right: Avatar ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="hero-avatar-wrap"
          >
            <div className="hero-avatar-inner">
              {/* Orbit ring 1 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: -24, borderRadius: '50%',
                  border: '1px dashed rgba(124,58,237,0.3)',
                }}
              >
                {[0, 120, 240].map((deg) => (
                  <div key={deg} style={{
                    position: 'absolute', width: 10, height: 10, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
                    top: '50%', left: '50%',
                    transform: `rotate(${deg}deg) translateX(162px) translate(-50%,-50%)`,
                    boxShadow: '0 0 12px rgba(124,58,237,0.9)',
                  }} />
                ))}
              </motion.div>

              {/* Orbit ring 2 (opposite direction) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: -48, borderRadius: '50%',
                  border: '1px dashed rgba(14,165,233,0.2)',
                }}
              >
                {[60, 180, 300].map((deg) => (
                  <div key={deg} style={{
                    position: 'absolute', width: 7, height: 7, borderRadius: '50%',
                    background: '#0ea5e9',
                    top: '50%', left: '50%',
                    transform: `rotate(${deg}deg) translateX(186px) translate(-50%,-50%)`,
                    boxShadow: '0 0 10px rgba(14,165,233,0.9)',
                  }} />
                ))}
              </motion.div>

              {/* Gradient border ring */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                border: '3px solid transparent',
                background: 'linear-gradient(#050510,#050510) padding-box, linear-gradient(135deg,#7c3aed,#0ea5e9,#10b981) border-box',
                boxShadow: '0 0 60px rgba(124,58,237,0.4), 0 0 120px rgba(14,165,233,0.15)',
                zIndex: 0,
                animation: 'pulse-glow 4s ease-in-out infinite',
              }} />

              {/* Photo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  position: 'absolute', top: '-22%', left: '-4%', right: '-4%', bottom: '0%',
                  borderRadius: '50%', overflow: 'hidden', zIndex: 1,
                }}
              >
                <img
                  src={avatarImg}
                  alt="Aditya Vardhan"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center 8%',
                    display: 'block',
                    filter: 'brightness(1.08) contrast(1.06) saturate(1.1)',
                  }}
                />
                {/* Bottom vignette */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%',
                  background: 'linear-gradient(to top, rgba(5,5,16,0.6), transparent)',
                  pointerEvents: 'none',
                }} />
              </motion.div>


            </div>
          </motion.div>

        </div>
      </div>



      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        .hero-text { order: 2; }
        .hero-avatar-wrap { order: 1; display: flex; justify-content: center; align-items: center; }
        .hero-avatar-inner { position: relative; width: 260px; height: 260px; overflow: visible; }
        .hero-btns { display: flex; flex-wrap: wrap; gap: 10px; }
        @media (min-width: 768px) {
          .hero-grid { grid-template-columns: 1fr 1fr; }
          .hero-text { order: 1; }
          .hero-avatar-wrap { order: 2; }
          .hero-avatar-inner { width: 320px; height: 320px; }
        }
        @media (max-width: 400px) {
          .hero-btns > * { flex: 1 1 calc(50% - 5px); justify-content: center; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
