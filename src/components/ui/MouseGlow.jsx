import { useMousePosition } from '../../hooks/useMousePosition';

const MouseGlow = () => {
  const { x, y } = useMousePosition();

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
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(124, 58, 237, 0.07), transparent 60%)`,
        transition: 'background 0.1s ease',
      }}
    />
  );
};

export default MouseGlow;
