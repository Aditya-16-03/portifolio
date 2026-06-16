import { motion } from 'framer-motion';

const shapes = [
  { type: 'circle', size: 80, top: '10%', left: '5%', delay: 0, color: 'blue', duration: 8 },
  { type: 'square', size: 60, top: '20%', right: '8%', delay: 1, color: 'purple', duration: 10 },
  { type: 'triangle', size: 70, bottom: '25%', left: '10%', delay: 2, color: 'cyan', duration: 12 },
  { type: 'circle', size: 40, top: '50%', right: '5%', delay: 0.5, color: 'purple', duration: 9 },
  { type: 'hexagon', size: 90, bottom: '10%', right: '15%', delay: 1.5, color: 'blue', duration: 11 },
  { type: 'square', size: 35, top: '70%', left: '3%', delay: 3, color: 'cyan', duration: 7 },
];

const colorMap = {
  blue: { border: 'rgba(14,165,233,0.2)', bg: 'rgba(14,165,233,0.04)', glow: 'rgba(14,165,233,0.15)' },
  purple: { border: 'rgba(124,58,237,0.2)', bg: 'rgba(124,58,237,0.04)', glow: 'rgba(124,58,237,0.15)' },
  cyan: { border: 'rgba(16,185,129,0.2)', bg: 'rgba(16,185,129,0.04)', glow: 'rgba(16,185,129,0.15)' },
};

const ShapeEl = ({ type, size, color }) => {
  const c = colorMap[color];
  const commonStyle = {
    width: size,
    height: size,
    border: `1px solid ${c.border}`,
    background: c.bg,
    boxShadow: `0 0 20px ${c.glow}`,
  };

  if (type === 'circle') {
    return <div style={{ ...commonStyle, borderRadius: '50%' }} />;
  }
  if (type === 'square') {
    return <div style={{ ...commonStyle, borderRadius: '8px', transform: 'rotate(45deg)' }} />;
  }
  if (type === 'triangle') {
    return (
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid ${c.border}`,
          filter: `drop-shadow(0 0 8px ${c.glow})`,
        }}
      />
    );
  }
  if (type === 'hexagon') {
    return (
      <div
        style={{
          width: size,
          height: size * 0.577,
          background: c.bg,
          border: `1px solid ${c.border}`,
          position: 'relative',
          boxShadow: `0 0 20px ${c.glow}`,
        }}
      />
    );
  }
  return null;
};

const FloatingShapes = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            rotate: [0, 10, -5, 8, 0],
            opacity: [0.4, 0.7, 0.5, 0.8, 0.4],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ShapeEl type={shape.type} size={shape.size} color={shape.color} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingShapes;
