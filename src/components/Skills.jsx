import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaJava, FaReact, FaGitAlt, FaGithub, FaDatabase, FaServer, FaCode, FaGlobe, FaBrain, FaTools, FaDesktop, FaCubes, FaRobot,
} from 'react-icons/fa';
import {
  SiSpringboot, SiSpring, SiJavascript, SiPython, SiPostgresql, SiMysql, SiMongodb,
  SiHtml5, SiCss, SiTailwindcss, SiDocker, SiApachemaven, SiScikitlearn, SiPandas, SiNumpy,
  SiNodedotjs, SiExpress, SiOpenai,
} from 'react-icons/si';
import { skillCategories } from '../data/portfolioData';

const iconMap = {
  FaCode, FaServer, FaDatabase, FaGlobe, FaBrain, FaTools, FaJava, FaReact,
  FaGit: FaGitAlt, FaGithub, FaDesktop, FaCubes, FaRobot,
  SiSpringboot, SiSpring, SiJavascript, SiPython, SiPostgresql, SiMysql, SiMongodb,
  SiHtml5, SiCss3: SiCss, SiCss, SiTailwindcss, SiDocker, SiApachemaven,
  SiScikitlearn, SiPandas, SiNumpy, SiHibernate: FaDatabase,
  SiNodedotjs, SiExpress, SiOpenai,
};

const colorMap = {
  blue:   { text: '#0ea5e9', bg: 'rgba(14,165,233,0.1)', border: 'rgba(14,165,233,0.25)', ring: '#0ea5e9' },
  purple: { text: '#7c3aed', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.25)', ring: '#7c3aed' },
  cyan:   { text: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', ring: '#10b981' },
};

const getIcon = (iconName, size = 18) => {
  const Icon = iconMap[iconName] || FaCode;
  return <Icon size={size} />;
};


/* ─── Skill Row ─────────────────────────────────────────────── */
const SkillRow = ({ skill, color, isInView, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ x: 4 }}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '10px 14px', borderRadius: 10, marginBottom: 4,
        background: 'rgba(255,255,255,0.015)',
        border: '1px solid rgba(255,255,255,0.03)',
        transition: 'all 0.2s ease',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
        <div style={{
          color, width: 16,
          filter: `drop-shadow(0 0 4px ${color})`,
        }}>
          {getIcon(skill.icon, 16)}
        </div>
        <div style={{
          color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 600,
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          {skill.name}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Category Card ─────────────────────────────────────────── */
const CategoryCard = ({ category, index, isInView }) => {
  const colors = colorMap[category.color] || colorMap.blue;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      style={{
        padding: '1.75rem',
        borderRadius: 20,
        background: 'rgba(12,12,30,0.6)',
        border: `1px solid ${hovered ? colors.border : 'rgba(255,255,255,0.06)'}`,
        backdropFilter: 'blur(24px)',
        transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
        boxShadow: hovered ? `0 20px 50px ${colors.bg}` : 'none',
        position: 'relative', overflow: 'hidden',
      }}
      className="holo-card"
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <motion.div
          animate={hovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: 44, height: 44, borderRadius: 12,
            background: colors.bg, border: `1px solid ${colors.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: colors.text,
            boxShadow: hovered ? `0 0 20px ${colors.bg}` : 'none',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {getIcon(category.icon, 20)}
        </motion.div>
        <h3 style={{
          color: '#e2e8f0', fontWeight: 700, fontSize: '0.95rem',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          {category.title}
        </h3>
      </div>

      {/* Skills */}
      <div>
        {category.skills.map((skill, i) => (
          <SkillRow
            key={skill.name}
            skill={skill}
            color={colors.ring}
            isInView={isInView}
            delay={index * 0.1 + i * 0.08}
          />
        ))}
      </div>
    </motion.div>
  );
};

/* ─── Skills Section ─────────────────────────────────────────── */
const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section id="skills" ref={ref} className="section-padding" style={{ position: 'relative', zIndex: 2 }}>
      {/* Section aura */}
      <div className="aura-blob" style={{
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)',
        top: '30%', left: '-10%',
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
            My Technical Arsenal
          </h2>
          <p style={{ color: '#475569', maxWidth: 480, margin: '0 auto', fontSize: '0.93rem' }}>
            Technologies I've mastered and continue to push further
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="skills-grid" style={{ gap: '1.5rem' }}>
          {skillCategories.map((category, i) => (
            <CategoryCard key={category.title} category={category} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Tech cloud — wave animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          style={{ marginTop: '4rem', textAlign: 'center' }}
        >
          <p style={{
            color: '#334155', fontSize: '0.8rem', marginBottom: 20,
            fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em',
          }}>
            // also familiar with
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {['JDBC', 'JPA', 'JWT', 'OAuth2', 'Linux', 'Postman', 'IntelliJ IDEA', 'VS Code', 'Jupyter Notebook', 'Agile/Scrum'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.06 }}
                whileHover={{
                  scale: 1.1, y: -3,
                  background: 'rgba(124,58,237,0.12)',
                  borderColor: 'rgba(124,58,237,0.35)',
                  color: '#a78bfa',
                }}
                style={{
                  padding: '6px 14px', borderRadius: 20,
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: '#475569', fontSize: '0.78rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: 'all 0.2s ease', cursor: 'default',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .skills-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </section>
  );
};

export default Skills;
