import { useEffect, useRef } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useMousePosition();
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${mousePos.x}px`;
        dotRef.current.style.top = `${mousePos.y}px`;
      }

      ringPos.current.x += (mousePos.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.y - ringPos.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mousePos]);

  useEffect(() => {
    const handleMouseEnter = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%, -50%) scale(1.8)';
        ringRef.current.style.borderColor = 'rgba(14, 165, 233, 0.8)';
        ringRef.current.style.background = 'rgba(124, 58, 237, 0.08)';
      }
    };
    const handleMouseLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        ringRef.current.style.borderColor = 'rgba(124, 58, 237, 0.6)';
        ringRef.current.style.background = 'transparent';
      }
    };

    const interactiveEls = document.querySelectorAll('a, button, [data-cursor="hover"]');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  });

  return (
    <>
      <div ref={dotRef} className="custom-cursor cursor-dot" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 99999 }} />
      <div ref={ringRef} className="custom-cursor cursor-ring" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 99998 }} />
    </>
  );
};

export default CustomCursor;
