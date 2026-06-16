import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaJava, FaBrain, FaTrophy, FaCode } from 'react-icons/fa';
import { FiAward, FiCalendar } from 'react-icons/fi';
import { achievements } from '../data/portfolioData';

const iconMap = { FaJava, FaBrain, FaTrophy, FaCode };

const colorMap = {
  blue:   { text: '#0ea5e9', bg: 'rgba(14,165,233,0.1)',  border: 'rgba(14,165,233,0.25)',  glow: 'rgba(14,165,233,0.2)' },
  green:  { text: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.25)',  glow: 'rgba(16,185,129,0.2)' },
  purple: { text: '#7c3aed', bg: 'rgba(124,58,237,0.1)',  border: 'rgba(124,58,237,0.25)',  glow: 'rgba(124,58,237,0.2)' },
  orange: { text: '#f97316', bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.25)',  glow: 'rgba(249,115,22,0.2)' },
  cyan:   { text: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.25)',  glow: 'rgba(16,185,129,0.2)' },
  yellow: { text: '#eab308', bg: 'rgba(234,179,8,0.1)',   border: 'rgba(234,179,8,0.25)',   glow: 'rgba(234,179,8,0.2)' },
};

/* ─── Confetti burst on hover ────────────────────────────────── */
const ConfettiBurst = ({ active, color }) => {
  if (!active) return null;
  const pieces = Array.from({ length: 12 });
  const colorVariants = [color, '#f1f5f9', '#a78bfa', '#38bdf8', '#34d399', '#f97316'];

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 5, borderRadius: 'inherit' }}>
      {pieces.map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 60 + 20}%`,
            width: `${Math.random() * 6 + 4}px`,
            height: `${Math.random() * 6 + 4}px`,
            background: colorVariants[i % colorVariants.length],
            borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '2px' : '0',
            animation: `confetti-fall ${0.5 + Math.random() * 0.4}s ease-out forwards`,
            animationDelay: `${Math.random() * 0.2}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
};

/* ─── Achievement Card ───────────────────────────────────────── */
const AchievementCard = ({ achievement, index, isInView }) => {
  const colors = colorMap[achievement.color] || colorMap.blue;
  const Icon = iconMap[achievement.icon] || FiAward;
  const [hovered, setHovered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleHoverStart = useCallback(() => {
    setHovered(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 900);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.14, duration: 0.65, ease: 'easeOut' }}
      onHoverStart={handleHoverStart}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10, borderColor: colors.border }}
      style={{
        padding: '1.75rem',
        borderRadius: 20,
        background: 'rgba(10,10,28,0.65)',
        border: `1px solid ${hovered ? colors.border : 'rgba(255,255,255,0.07)'}`,
        backdropFilter: 'blur(24px)',
        transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
        cursor: 'default', position: 'relative', overflow: 'hidden',
        boxShadow: hovered ? `0 20px 50px ${colors.glow}` : 'none',
      }}
      className="holo-card"
    >
      <ConfettiBurst active={showConfetti} color={colors.text} />

      {/* Background corner glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 130, height: 130,
        background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
        pointerEvents: 'none', opacity: hovered ? 1 : 0.4,
        transition: 'opacity 0.3s ease',
      }} />

      {/* Animated gradient left border */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: 3, height: '100%',
        background: `linear-gradient(to bottom, ${colors.text}, ${colors.text}00)`,
        borderRadius: '3px 0 0 3px',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }} />

      {/* Icon badge — bounces in */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.14 + 0.3, type: 'spring', stiffness: 300, damping: 15 }}
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
        style={{
          width: 54, height: 54, borderRadius: 16,
          background: colors.bg, border: `1px solid ${colors.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: colors.text, marginBottom: 18,
          boxShadow: hovered ? `0 0 24px ${colors.glow}` : `0 0 12px ${colors.glow}`,
          transition: 'box-shadow 0.3s ease',
          position: 'relative', zIndex: 1,
        }}
      >
        <Icon size={23} />
      </motion.div>

      {/* Title */}
      <h3 style={{
        color: '#f1f5f9', fontWeight: 800, fontSize: '1rem', marginBottom: 8, lineHeight: 1.3,
        fontFamily: "'Space Grotesk', sans-serif",
        position: 'relative', zIndex: 1,
      }}>
        {achievement.title}
      </h3>

      {/* Issuer & Date */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        <span style={{
          color: colors.text, fontSize: '0.8rem', fontWeight: 700,
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          {achievement.issuer}
        </span>
        <span style={{ color: '#1e293b', fontSize: '0.75rem' }}>•</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#334155', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
          <FiCalendar size={11} /> {achievement.date}
        </span>
      </div>

      {/* Description */}
      <p style={{
        color: '#475569', fontSize: '0.84rem', lineHeight: 1.65,
        position: 'relative', zIndex: 1,
      }}>
        {achievement.description}
      </p>

      {/* Animated badge */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.14 + 0.5 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 16,
          padding: '4px 12px', borderRadius: 20,
          background: colors.bg, border: `1px solid ${colors.border}`,
          color: colors.text, fontSize: '0.73rem', fontWeight: 700,
          fontFamily: "'JetBrains Mono', monospace",
          position: 'relative', zIndex: 1,
        }}
      >
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ✓
        </motion.span>
        Achieved
      </motion.div>
    </motion.div>
  );
};

/* ─── Achievements Section ────────────────────────────────────── */
const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <section id="achievements" ref={ref} className="section-padding" style={{ position: 'relative', zIndex: 2 }}>
      {/* Section aura */}
      <div className="aura-blob" style={{
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
        top: '20%', right: '-5%',
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
            Certifications & Awards
          </h2>
          <p style={{ color: '#475569', maxWidth: 480, margin: '0 auto', fontSize: '0.93rem' }}>
            Credentials that validate my expertise and commitment to continuous learning
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: '1.5rem',
        }}>
          {achievements.map((achievement, i) => (
            <AchievementCard key={achievement.id} achievement={achievement} index={i} isInView={isInView} />
          ))}
        </div>


      </div>
    </section>
  );
};

export default Achievements;
