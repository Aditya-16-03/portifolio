import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiUser, FiTarget, FiHeart, FiMapPin, FiMail } from 'react-icons/fi';
import { personalInfo, stats } from '../data/portfolioData';

/* ─── Animated Counter with particle burst ────────────────── */
const AnimatedCounter = ({ target, suffix, isVisible, color, gradient }) => {
  const [count, setCount] = useState(0);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
        setBurst(true);
        setTimeout(() => setBurst(false), 800);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ 
        fontFamily: "'JetBrains Mono', monospace",
        ...(gradient ? {
          background: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        } : { color })
      }}>
        {count}{suffix}
      </span>
      {burst && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: '50%', top: '50%',
                width: 6, height: 6,
                background: color,
                borderRadius: i % 2 === 0 ? '50%' : 2,
                animationDelay: `${i * 0.05}s`,
                transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Flip Card ──────────────────────────────────────────────── */
const FlipCard = ({ icon: Icon, title, color, children, delay, isInView }) => (
  <motion.div
    initial={{ opacity: 0, rotateY: 90, perspective: 1000 }}
    animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
    transition={{ delay, duration: 0.7, type: 'spring', stiffness: 100, damping: 20 }}
    whileHover={{ y: -6, scale: 1.02, borderColor: `${color}80`, boxShadow: `0 10px 30px -10px ${color}40` }}
    style={{
      padding: '1.75rem',
      borderRadius: 18,
      background: 'rgba(12,12,30,0.5)',
      border: '1px solid rgba(255,255,255,0.06)',
      backdropFilter: 'blur(24px)',
      marginBottom: '1.25rem',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    }}
    className="holo-card"
  >
    {/* Corner glow */}
    <div style={{
      position: 'absolute', top: -20, right: -20,
      width: 100, height: 100, borderRadius: '50%',
      background: `radial-gradient(circle, ${color}20, transparent 70%)`,
      pointerEvents: 'none',
    }} />

    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, position: 'relative', zIndex: 1 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: `${color}18`,
        border: `1px solid ${color}35`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color,
        boxShadow: `0 0 16px ${color}25`,
      }}>
        <Icon size={18} />
      </div>
      <h3 style={{
        color: '#e2e8f0', fontWeight: 700, fontSize: '1rem',
        fontFamily: "'Space Grotesk', sans-serif",
      }}>{title}</h3>
    </div>
    <div style={{ position: 'relative', zIndex: 1 }}>
      {children}
    </div>
  </motion.div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const statColors = ['#7c3aed', '#0ea5e9', '#10b981', '#ec4899'];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="section-padding" style={{ position: 'relative', zIndex: 2 }}>
      {/* Section aura */}
      <div className="aura-blob" style={{
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
        top: '20%', left: '60%',
        animationDelay: '1s',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            About Me
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'start' }} className="about-grid">
          {/* Left: Flip Cards */}
          <div>
            <FlipCard icon={FiUser} title="Who I Am" color="#7c3aed" delay={0.2} isInView={isInView}>
              <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '0.93rem' }}>
                {personalInfo.bio}
              </p>
            </FlipCard>

            <FlipCard icon={FiTarget} title="My Goal" color="#0ea5e9" delay={0.35} isInView={isInView}>
              <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '0.93rem' }}>
                Seeking impactful Software Development and AI/ML opportunities where I can contribute to innovative
                products, grow professionally, and work with talented teams solving real-world problems at scale.
              </p>
            </FlipCard>

            <FlipCard icon={FiHeart} title="What I Love" color="#10b981" delay={0.5} isInView={isInView}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Backend Architecture', 'API Design', 'ML Experiments', 'Problem Solving', 'Open Source', 'Learning New Tech'].map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.06 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    style={{
                      padding: '5px 12px', borderRadius: 20,
                      background: 'rgba(16,185,129,0.07)',
                      border: '1px solid rgba(16,185,129,0.18)',
                      color: '#34d399', fontSize: '0.78rem',
                      fontFamily: "'JetBrains Mono', monospace",
                      cursor: 'default',
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </FlipCard>
          </div>

          {/* Right: Stats + Info */}
          <motion.div
            variants={fadeUp} initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.4 }}
          >
            {/* Stats Grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '1rem', marginBottom: '2rem',
            }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.7, y: 30 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 200, damping: 15 }}
                  whileHover={{ y: -8, scale: 1.05, borderColor: `${statColors[i]}80`, boxShadow: `0 15px 30px -15px ${statColors[i]}50` }}
                  style={{
                    padding: '1.5rem',
                    borderRadius: 16,
                    background: 'rgba(12,12,30,0.5)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    textAlign: 'center',
                    backdropFilter: 'blur(16px)',
                    transition: 'all 0.3s ease',
                    position: 'relative', overflow: 'hidden',
                  }}
                  className="holo-card"
                >
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(circle at 50% 0%, ${statColors[i]}10, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />
                  <div style={{
                    fontSize: '2.4rem', fontWeight: 800,
                    lineHeight: 1.2, marginBottom: 8,
                    position: 'relative', zIndex: 1,
                  }}>
                    <AnimatedCounter 
                      target={stat.value} 
                      suffix={stat.suffix} 
                      isVisible={isInView} 
                      color={statColors[i]}
                      gradient={`linear-gradient(135deg, ${statColors[i]}, ${statColors[(i + 1) % 4]})`} 
                    />
                  </div>
                  <div style={{
                    color: '#475569', fontSize: '0.78rem', fontWeight: 600,
                    position: 'relative', zIndex: 1,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              style={{
                padding: '1.75rem', borderRadius: 18,
                background: 'rgba(12,12,30,0.5)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(24px)',
              }}
              className="holo-card"
            >
              <h3 style={{
                color: '#e2e8f0', fontWeight: 700, marginBottom: 20,
                fontSize: '0.95rem', fontFamily: "'Space Grotesk', sans-serif",
              }}>
                Quick Info
              </h3>
              {[
                { label: 'Location',  value: '📍 Nellimarla, Vizianagaram, AP' },
                { label: 'Education', value: '🎓 B.Tech CSE AI&ML (2023–2027)' },
                { label: 'CGPA',      value: '⭐ 9.23 / 10' },
                { label: 'Focus',     value: '⚡ Backend + AI/ML' },
                { label: 'Status',    value: '🟢 Open to Opportunities' },
                { label: 'Email',     value: '✉️ badityavardhan21@gmail.com' },
              ].map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.75 + i * 0.07 }}
                  whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.03)' }}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 10px',
                    borderRadius: 8,
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    cursor: 'default',
                    transition: 'background-color 0.2s',
                  }}
                >
                  <span style={{
                    color: '#334155', fontSize: '0.82rem',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{label}</span>
                  <span style={{
                    color: '#64748b', fontSize: '0.82rem', fontWeight: 500,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>{value}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .about-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
