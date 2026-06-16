import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink, FiClock } from 'react-icons/fi';
import { projects } from '../data/portfolioData';

const techColors = {
  Java: '#f97316', 'Spring Boot': '#34d399', PostgreSQL: '#38bdf8',
  React: '#61dafb', 'REST API': '#a78bfa', MySQL: '#4479a1',
  JavaScript: '#f7df1e', Python: '#38bdf8', 'Scikit-learn': '#f97316',
  Pandas: '#a78bfa', NumPy: '#34d399', Matplotlib: '#0ea5e9',
  'Random Forest': '#10b981', 'Spring Security': '#34d399',
  JWT: '#f97316', 'Firebase Studio': '#FFCA28',
  'React Native': '#61dafb', SQLite: '#38bdf8',
  'Offline Storage': '#a78bfa', Analytics: '#10b981',
  'Node.js': '#68a063', 'Express.js': '#a78bfa', MongoDB: '#4db33d',
  'AI Integration': '#f97316', 'Collaborative Development': '#34d399',
  JDBC: '#38bdf8', OOP: '#a78bfa', SQL: '#0ea5e9',
};

const cardGradients = [
  { from: '#7c3aed', to: '#0ea5e9', via: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.3)' },
  { from: '#0ea5e9', to: '#10b981', via: 'rgba(14,165,233,0.08)', border: 'rgba(14,165,233,0.3)' },
  { from: '#10b981', to: '#ec4899', via: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.3)' },
];

/* ─── Specular highlight that follows mouse ──────────────────── */
const ProjectCard = ({ project, index, isInView }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const g = cardGradients[index % 3];

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
    const rx = (x - 0.5) * 10;
    const ry = (y - 0.5) * -10;
    card.style.transform = `perspective(1000px) rotateY(${rx}deg) rotateX(${ry}deg) translateZ(8px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    }
    setHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.18, duration: 0.7, ease: 'easeOut' }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: 22,
        background: 'rgba(10,10,28,0.7)',
        border: `1px solid ${hovered ? g.border : 'rgba(255,255,255,0.07)'}`,
        backdropFilter: 'blur(24px)',
        overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.23,1,0.32,1)',
        transformStyle: 'preserve-3d',
        position: 'relative',
      }}
    >
      {/* Specular highlight */}
      {hovered && (
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
            borderRadius: 22,
          }}
        />
      )}

      {/* Visual Header */}
      <div style={{
        height: 190,
        background: `linear-gradient(135deg, ${g.via}, rgba(5,5,16,0.3))`,
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Animated circuit grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }} />

        {/* Diagonal gradient sweep */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg, ${g.from}20, transparent 50%, ${g.to}15)`,
        }} />

        {/* Project number */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          padding: '3px 10px', borderRadius: 20,
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
          color: '#475569', fontSize: '0.72rem',
          fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
        }}>
          {String(project.id).padStart(2, '0')}
        </div>

        {/* Category */}
        <div style={{
          position: 'absolute', top: 14, right: 14,
          padding: '3px 10px', borderRadius: 20,
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
          color: g.from, fontSize: '0.72rem', fontWeight: 600,
          border: `1px solid ${g.border}`,
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          {project.category}
        </div>

        {/* Central icon */}
        <motion.div
          animate={hovered
            ? { scale: 1.1, rotate: [0, -5, 5, 0] }
            : { scale: [1, 1.05, 1], rotate: 0, y: [0, -8, 0] }}
          transition={hovered
            ? { duration: 0.4 }
            : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${g.border}`,
            boxShadow: `0 0 30px ${g.from}50, 0 0 60px ${g.from}20`,
            fontSize: '2rem', position: 'relative', zIndex: 1,
          }}
        >
          {project.emoji}
        </motion.div>

        {/* Duration badge */}
        <div style={{
          position: 'absolute', bottom: 14, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '3px 10px', borderRadius: 20,
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
          color: '#475569', fontSize: '0.7rem',
          fontFamily: "'JetBrains Mono', monospace",
          whiteSpace: 'nowrap',
        }}>
          <FiClock size={10} /> {project.duration}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '1.6rem' }}>
        <h3 style={{
          fontSize: '1.25rem', fontWeight: 800,
          fontFamily: "'Space Grotesk', sans-serif",
          color: '#f1f5f9', marginBottom: 10,
          background: `linear-gradient(135deg, #f1f5f9, ${g.from})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          {project.title}
        </h3>

        <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.88rem', marginBottom: 16 }}>
          {project.description}
        </p>

        {/* Tech badges — slide in */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {project.technologies.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + i * 0.05 + 0.4 }}
              style={{
                padding: '3px 10px', borderRadius: 20,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                color: techColors[tech] || '#64748b',
                fontSize: '0.73rem', fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>



        {/* Actions */}
        <div style={{ display: 'flex', gap: 10 }}>
          <motion.a
            href={project.github} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04, borderColor: g.border }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '9px 18px', borderRadius: 10,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: '#94a3b8', fontSize: '0.83rem', fontWeight: 600,
              textDecoration: 'none', cursor: 'none',
              fontFamily: "'Space Grotesk', sans-serif",
              transition: 'border-color 0.2s',
            }}
          >
            <FiGithub size={14} /> GitHub
          </motion.a>

          {project.demo && project.demo !== '#' ? (
            <motion.a
              href={project.demo} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${g.from}50` }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '9px 18px', borderRadius: 10,
                background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                border: 'none', color: 'white',
                fontSize: '0.83rem', fontWeight: 600,
                textDecoration: 'none', cursor: 'none',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <FiExternalLink size={14} /> Live Demo
            </motion.a>
          ) : (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '9px 18px', borderRadius: 10,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              color: '#334155', fontSize: '0.83rem', fontWeight: 500,
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              <span style={{
                display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px rgba(16,185,129,0.8)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }} />
              In Progress
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Projects Section ────────────────────────────────────────── */
const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section id="projects" ref={ref} className="section-padding" style={{ position: 'relative', zIndex: 2 }}>
      {/* Section aura */}
      <div className="aura-blob" style={{
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)',
        top: '10%', right: '-5%',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: 12,
          }}>
            Featured Work
          </h2>
          <p style={{ color: '#475569', maxWidth: 480, margin: '0 auto', fontSize: '0.93rem' }}>
            Projects that showcase my skills across backend development and machine learning
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }} className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} isInView={isInView} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          style={{ textAlign: 'center', marginTop: '3.5rem' }}
        >
          <motion.a
            href="https://github.com/Aditya-16-03"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(124,58,237,0.35)' }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', borderRadius: 12,
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.25)',
              color: '#a78bfa', fontWeight: 600,
              textDecoration: 'none', cursor: 'none',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.9rem',
            }}
          >
            <FiGithub size={16} /> View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
