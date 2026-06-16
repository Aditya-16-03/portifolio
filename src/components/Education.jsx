import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiBookOpen, FiMapPin, FiCalendar, FiBriefcase, FiShield } from 'react-icons/fi';
import { education, internships } from '../data/portfolioData';

/* ─── Timeline Node ───────────────────────────────────────────── */
const TimelineNode = ({ color, delay, isInView }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={isInView ? { scale: 1, opacity: 1 } : {}}
    transition={{ delay, duration: 0.4, type: 'spring', stiffness: 300 }}
    style={{
      width: 16, height: 16, borderRadius: '50%',
      background: color,
      border: '3px solid rgba(5,5,16,1)',
      boxShadow: `0 0 12px ${color}, 0 0 24px ${color}60`,
      flexShrink: 0,
      animation: isInView ? 'neural-pulse 2.5s ease-in-out infinite' : 'none',
      animationDelay: `${delay}s`,
      position: 'relative', zIndex: 2,
    }}
  />
);

/* ─── Timeline Card ───────────────────────────────────────────── */
const TimelineCard = ({ children, color, delay, isInView, side = 'left' }) => (
  <motion.div
    initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ delay, duration: 0.7, ease: 'easeOut' }}
    whileHover={{ y: -4, borderColor: `${color}50` }}
    style={{
      padding: 'clamp(1.25rem,3vw,1.75rem)',
      borderRadius: 18,
      background: 'rgba(10,10,28,0.65)',
      border: '1px solid rgba(255,255,255,0.07)',
      backdropFilter: 'blur(24px)',
      transition: 'all 0.3s ease',
      position: 'relative', overflow: 'hidden',
    }}
    className="holo-card"
  >
    <div style={{
      position: 'absolute', top: 0, left: 0,
      width: 3, height: '100%',
      background: `linear-gradient(to bottom, ${color}, ${color}00)`,
      borderRadius: '3px 0 0 3px',
    }} />
    {children}
  </motion.div>
);

const MetaRow = ({ icon: Icon, text }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#334155', fontSize: '0.78rem', fontFamily: "'JetBrains Mono', monospace" }}>
    <Icon size={11} />{text}
  </span>
);

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  const colorMap = {
    blue:   '#0ea5e9',
    purple: '#7c3aed',
    cyan:   '#10b981',
  };

  return (
    <section id="education" ref={ref} className="section-padding" style={{ position: 'relative', zIndex: 2 }}>
      {/* Section aura */}
      <div className="aura-blob" style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)',
        bottom: '10%', right: '5%',
      }} />

      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >

          <h2 style={{
            fontSize: 'clamp(1.8rem,4vw,3.2rem)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Academic Journey
          </h2>
        </motion.div>

        {/* ── EDUCATION section ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: '#0ea5e9',
              boxShadow: '0 0 10px rgba(14,165,233,0.8)',
            }} />
            <span style={{
              padding: '3px 14px', borderRadius: 20,
              background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)',
              color: '#38bdf8', fontSize: '0.76rem', fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em',
            }}>
              EDUCATION
            </span>
          </div>
        </motion.div>

        {/* Vertical Timeline */}
        <div style={{ position: 'relative', paddingLeft: 32 }}>
          {/* Animated vertical line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ delay: 0.3, duration: 1.5, ease: 'easeOut' }}
            style={{
              position: 'absolute', left: 7, top: 0,
              width: 2,
              background: 'linear-gradient(to bottom, #0ea5e9, #7c3aed, #10b981)',
              borderRadius: 1,
              boxShadow: '0 0 8px rgba(14,165,233,0.5)',
            }}
          />

          {education.map((edu, i) => {
            const color = colorMap[edu.color] || '#0ea5e9';
            return (
              <div key={edu.id} style={{ position: 'relative', marginBottom: '2rem', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <TimelineNode color={color} delay={0.2 + i * 0.15} isInView={isInView} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <TimelineCard color={color} delay={0.3 + i * 0.15} isInView={isInView}>
                    <div className="edu-header">
                      <h3 style={{
                        color: '#f1f5f9', fontWeight: 700,
                        fontSize: 'clamp(0.9rem,2vw,1.05rem)', lineHeight: 1.3,
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}>
                        {edu.degree}
                      </h3>
                      <span style={{
                        padding: '4px 12px', borderRadius: 20, flexShrink: 0,
                        background: `${color}20`, border: `1px solid ${color}40`,
                        color, fontSize: '0.78rem', fontWeight: 700,
                        fontFamily: "'JetBrains Mono', monospace",
                        whiteSpace: 'nowrap',
                        boxShadow: `0 0 12px ${color}30`,
                      }}>
                        {edu.grade}
                      </span>
                    </div>

                    <div style={{ color, fontWeight: 600, fontSize: '0.88rem', margin: '8px 0 10px', fontFamily: "'Space Grotesk', sans-serif" }}>
                      {edu.institution}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginBottom: 12 }}>
                      <MetaRow icon={FiCalendar} text={edu.duration} />
                      <MetaRow icon={FiMapPin} text={edu.location} />
                    </div>

                    <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>
                      {edu.description}
                    </p>
                  </TimelineCard>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── INTERNSHIPS section ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4 }}
          style={{ marginTop: '3rem', marginBottom: 24 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: '#7c3aed',
              boxShadow: '0 0 10px rgba(124,58,237,0.8)',
            }} />
            <span style={{
              padding: '3px 14px', borderRadius: 20,
              background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)',
              color: '#a78bfa', fontSize: '0.76rem', fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em',
            }}>
              EXPERIENCE
            </span>
          </div>
        </motion.div>

        <div style={{ position: 'relative', paddingLeft: 32 }}>
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
            style={{
              position: 'absolute', left: 7, top: 0,
              width: 2,
              background: 'linear-gradient(to bottom, #7c3aed, #ec4899)',
              borderRadius: 1,
              boxShadow: '0 0 8px rgba(124,58,237,0.5)',
            }}
          />

          {internships.map((item, i) => {
            const color = colorMap[item.color] || '#7c3aed';
            return (
              <div key={item.id} style={{ position: 'relative', marginBottom: '2rem', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <TimelineNode color={color} delay={0.5 + i * 0.15} isInView={isInView} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <TimelineCard color={color} delay={0.6 + i * 0.15} isInView={isInView} side="right">
                    <div className="edu-header">
                      <h3 style={{
                        color: '#f1f5f9', fontWeight: 700,
                        fontSize: 'clamp(0.9rem,2vw,1.05rem)', lineHeight: 1.3,
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}>
                        {item.role}
                      </h3>
                      <span style={{
                        padding: '3px 10px', borderRadius: 20, flexShrink: 0,
                        background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
                        color: '#34d399', fontSize: '0.73rem', fontWeight: 700,
                        fontFamily: "'JetBrains Mono', monospace",
                        whiteSpace: 'nowrap',
                      }}>
                        Internship
                      </span>
                    </div>

                    <div style={{ color, fontWeight: 600, fontSize: '0.88rem', margin: '6px 0 10px', fontFamily: "'Space Grotesk', sans-serif" }}>
                      {item.company}
                      <span style={{ color: '#334155', fontWeight: 400, fontSize: '0.82rem' }}> — {item.type}</span>
                    </div>

                    <div style={{ marginBottom: 10 }}>
                      <MetaRow icon={FiCalendar} text={item.duration} />
                    </div>

                    <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: 12 }}>
                      {item.description}
                    </p>

                    <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
                      {item.points.map((pt, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.7 + j * 0.08 }}
                          style={{ color: '#475569', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: 6 }}
                        >
                          {pt}
                        </motion.li>
                      ))}
                    </ul>
                  </TimelineCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .edu-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 4px;
        }
      `}</style>
    </section>
  );
};

export default Education;
