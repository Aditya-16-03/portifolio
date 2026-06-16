import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    // Circuit paths
    const nodes = [
      { x: cx, y: cy },
      { x: cx - 120, y: cy - 60 },
      { x: cx + 120, y: cy - 60 },
      { x: cx - 80, y: cy + 80 },
      { x: cx + 80, y: cy + 80 },
      { x: cx - 200, y: cy },
      { x: cx + 200, y: cy },
      { x: cx, y: cy - 140 },
      { x: cx, y: cy + 140 },
    ];

    const edges = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [1, 5], [2, 6], [1, 7], [2, 7],
      [3, 5], [4, 6], [3, 8], [4, 8],
    ];

    let progress = 0;
    let raf;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, W, H);

      // Grid lines
      ctx.strokeStyle = 'rgba(124,58,237,0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      const p = Math.min(progress / 100, 1);

      // Draw circuit edges
      edges.forEach(([a, b], i) => {
        const edgeP = Math.max(0, Math.min(1, (p * edges.length - i) ));
        if (edgeP <= 0) return;
        const n1 = nodes[a], n2 = nodes[b];
        const ex = n1.x + (n2.x - n1.x) * edgeP;
        const ey = n1.y + (n2.y - n1.y) * edgeP;

        const grad = ctx.createLinearGradient(n1.x, n1.y, ex, ey);
        grad.addColorStop(0, 'rgba(124,58,237,0.8)');
        grad.addColorStop(1, 'rgba(14,165,233,0.8)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(ex, ey);
        ctx.stroke();

        // Glow effect at tip
        ctx.beginPath();
        ctx.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#7c3aed';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#7c3aed';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw nodes
      nodes.forEach((n, i) => {
        const nodeP = Math.max(0, Math.min(1, (p * nodes.length - i)));
        if (nodeP <= 0) return;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 5 * nodeP, 0, Math.PI * 2);
        ctx.fillStyle = i === 0 ? '#7c3aed' : 'rgba(14,165,233,0.8)';
        ctx.shadowBlur = 16;
        ctx.shadowColor = i === 0 ? '#7c3aed' : '#0ea5e9';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      progress += 1.2;
      if (progress < 110) {
        raf = requestAnimationFrame(draw);
      }
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#050510',
        overflow: 'hidden',
      }}
    >
      {/* Canvas background */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />

      {/* Center content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 200 }}
          style={{
            width: 80, height: 80, borderRadius: 20, margin: '0 auto 24px',
            background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800, fontSize: '1.8rem', color: 'white',
            boxShadow: '0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(14,165,233,0.2)',
          }}
        >
          AV
        </motion.div>

        {/* Name with stagger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1.4rem, 4vw, 2rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #a78bfa, #38bdf8, #34d399)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 8,
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
            fontSize: '0.8rem',
            color: '#475569',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 40,
          }}
        >
          &lt; Loading Portfolio... /&gt;
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ width: 220, margin: '0 auto' }}
        >
          <div style={{
            height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden',
          }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1.8, ease: [0.4, 0, 0.2, 1], onComplete: onComplete }}
              style={{
                height: '100%',
                background: 'linear-gradient(to right, #7c3aed, #0ea5e9, #10b981)',
                borderRadius: 2,
                transformOrigin: 'left',
                boxShadow: '0 0 12px rgba(124,58,237,0.8)',
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
