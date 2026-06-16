import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiStar, FiCode, FiAward, FiTrendingUp, FiExternalLink } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { leetcodeStats } from '../data/portfolioData';

const StatCard = ({ icon: Icon, label, value, color, delay, isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
    transition={{ delay, duration: 0.6, type: 'spring', stiffness: 200 }}
    whileHover={{ y: -6, borderColor: `${color}50`, boxShadow: `0 16px 40px ${color}20` }}
    style={{
      padding: '1.5rem',
      borderRadius: 18,
      background: 'rgba(10,10,28,0.65)',
      border: '1px solid rgba(255,255,255,0.07)',
      textAlign: 'center',
      backdropFilter: 'blur(24px)',
      transition: 'all 0.3s ease',
      position: 'relative', overflow: 'hidden',
    }}
    className="holo-card"
  >
    <div style={{
      position: 'absolute', top: 0, right: 0,
      width: 80, height: 80,
      background: `radial-gradient(circle, ${color}20, transparent 70%)`,
      pointerEvents: 'none',
    }} />
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      style={{
        width: 46, height: 46, borderRadius: 14,
        background: `${color}15`,
        border: `1px solid ${color}35`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color, margin: '0 auto 14px',
        boxShadow: `0 0 16px ${color}25`,
      }}
    >
      <Icon size={20} />
    </motion.div>
    <div style={{
      fontSize: '1.9rem', fontWeight: 800,
      background: `linear-gradient(135deg, ${color}, #f1f5f9)`,
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      marginBottom: 6,
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      {value}
    </div>
    <div style={{ color: '#334155', fontSize: '0.78rem', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{label}</div>
  </motion.div>
);

const ContributionGraph = ({ isInView }) => {
  const weeks = 52;
  const days = 7;
  const levels = [0, 1, 2, 3, 4];
  const levelColors = [
    'rgba(255,255,255,0.04)',
    'rgba(34,197,94,0.25)',
    'rgba(34,197,94,0.5)',
    'rgba(34,197,94,0.75)',
    '#22c55e',
  ];

  const cells = Array.from({ length: weeks * days }, (_, i) => {
    const rand = Math.random();
    if (rand < 0.4) return 0;
    if (rand < 0.65) return 1;
    if (rand < 0.82) return 2;
    if (rand < 0.93) return 3;
    return 4;
  });

  return (
    <div style={{ overflow: 'auto', paddingBottom: 8 }}>
      <div style={{ display: 'flex', gap: 3, minWidth: 'fit-content' }}>
        {Array.from({ length: weeks }, (_, w) => (
          <div key={w} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {Array.from({ length: days }, (_, d) => {
              const level = cells[w * days + d];
              return (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: (w * days + d) * 0.002, duration: 0.3 }}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: levelColors[level],
                    border: level > 0 ? `1px solid ${levelColors[level]}60` : '1px solid rgba(255,255,255,0.04)',
                  }}
                  title={`${level * 2} contributions`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, justifyContent: 'flex-end' }}>
        <span style={{ color: '#475569', fontSize: '0.75rem' }}>Less</span>
        {levelColors.map((c, i) => (
          <div key={i} style={{
            width: 10, height: 10, borderRadius: 2,
            background: c,
            border: `1px solid ${c}60`,
          }} />
        ))}
        <span style={{ color: '#475569', fontSize: '0.75rem' }}>More</span>
      </div>
    </div>
  );
};

const GitHubSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const statCards = [
    { icon: FiCode,       label: 'Problems Solved', value: leetcodeStats.solved,        color: '#eab308', delay: 0.1 },
    { icon: FiStar,       label: 'Contest Rating',  value: leetcodeStats.contestRating, color: '#0ea5e9', delay: 0.2 },
    { icon: FiAward,      label: 'Badges Earned',   value: leetcodeStats.badges,        color: '#7c3aed', delay: 0.3 },
    { icon: FiTrendingUp, label: 'Max Streak',      value: leetcodeStats.maxStreak,     color: '#22c55e', delay: 0.4 },
  ];

  return (
    <section id="github" ref={ref} className="section-padding" style={{ position: 'relative', zIndex: 2 }}>
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
            Coding Activity
          </h2>
        </motion.div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          {statCards.map((s) => (
            <StatCard key={s.label} {...s} isInView={isInView} />
          ))}
        </div>

        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            padding: '2rem', borderRadius: 20,
            background: 'rgba(10,10,28,0.65)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(24px)',
            marginBottom: '1.5rem',
          }}
          className="holo-card"
        >
          <h3 style={{
            color: '#475569', fontWeight: 700, marginBottom: 20, fontSize: '0.88rem',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {leetcodeStats.submissions}+ submissions in the past one year
          </h3>
          <ContributionGraph isInView={isInView} />
        </motion.div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          style={{
            padding: '1.75rem 2rem', borderRadius: 20,
            background: 'rgba(10,10,28,0.65)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(24px)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.5rem',
          }}
          className="holo-card"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 54, height: 54, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1e0a40, #0a1a30)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid rgba(124,58,237,0.45)',
              boxShadow: '0 0 24px rgba(124,58,237,0.25)',
              color: 'white', fontWeight: 800, fontSize: '1rem',
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              AV
            </div>
            <div>
              <div style={{ color: '#f1f5f9', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>Aditya Vardhan</div>
              <div style={{ color: '#334155', fontSize: '0.82rem', fontFamily: "'JetBrains Mono', monospace" }}>@{leetcodeStats.handle}</div>
            </div>
          </div>

          <motion.a
            href={`https://leetcode.com/u/${leetcodeStats.handle}`}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(234,179,8,0.35)' }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 22px', borderRadius: 12,
              background: 'rgba(234,179,8,0.08)',
              border: '1px solid rgba(234,179,8,0.25)',
              color: '#eab308', fontWeight: 600,
              textDecoration: 'none', cursor: 'none',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.88rem',
            }}
          >
            <SiLeetcode size={15} />
            Visit LeetCode Profile
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
