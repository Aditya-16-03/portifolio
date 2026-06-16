import { motion } from 'framer-motion';

const rings = [
  { rx: 65, ry: 25, duration: 2.5, color: '#7c3aed', size: 160 },
  { rx: 55, ry: -45, duration: 3.2, color: '#0ea5e9', size: 220 },
  { rx: 75, ry: 60, duration: 4.1, color: '#10b981', size: 280 },
  { rx: 45, ry: -75, duration: 5.5, color: '#ec4899', size: 340 },
];

const LoadingScreen = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(15px)', scale: 1.1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#050510',
        overflow: 'hidden',
        perspective: '1000px',
      }}
    >
      {/* Dynamic Ambient Background */}
      <motion.div
        animate={{ 
          background: [
            'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(14,165,233,0.08) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 60%)'
          ] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', inset: 0 }}
      />

      {/* 3D Orbital Rings */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        {rings.map((ring, i) => (
          <motion.div
            key={i}
            initial={{ rotateX: ring.rx, rotateY: ring.ry, rotateZ: 0 }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: ring.size, height: ring.size,
              marginLeft: -ring.size / 2,
              marginTop: -ring.size / 2,
              borderRadius: '50%',
              border: `1px solid ${ring.color}15`,
              borderTop: `2px solid ${ring.color}`,
              borderRight: `2px solid ${ring.color}70`,
              transformStyle: 'preserve-3d',
              boxShadow: `0 0 20px ${ring.color}30, inset 0 0 15px ${ring.color}20`,
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        {/* Core Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.9, type: 'spring', stiffness: 120 }}
          whileHover={{ scale: 1.05 }}
          style={{
            width: 85, height: 85, borderRadius: '50%', margin: '0 auto 24px',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.05), rgba(14,165,233,0.05))',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800, fontSize: '2rem', color: 'white',
            boxShadow: '0 0 40px rgba(124,58,237,0.4), inset 0 0 20px rgba(14,165,233,0.3)',
            position: 'relative',
          }}
        >
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'linear-gradient(135deg, #f1f5f9, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AV
          </motion.span>

          {/* Inner pulse */}
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(14,165,233,0.5))',
              zIndex: -1,
            }}
          />
        </motion.div>

        {/* Name with stagger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.5rem, 4.5vw, 2.2rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #f8fafc, #a78bfa, #38bdf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 10,
            letterSpacing: '-0.5px',
          }}
        >
          Aditya Vardhan
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.85rem',
            color: '#64748b',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 45,
          }}
        >
          &lt; System Initializing... /&gt;
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ width: 240, margin: '0 auto' }}
        >
          <div style={{
            height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden',
          }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1.8, ease: [0.4, 0, 0.2, 1], onComplete: onComplete }}
              style={{
                height: '100%',
                background: 'linear-gradient(to right, #7c3aed, #0ea5e9, #10b981)',
                borderRadius: 3,
                transformOrigin: 'left',
                boxShadow: '0 0 15px rgba(124,58,237,0.9)',
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
