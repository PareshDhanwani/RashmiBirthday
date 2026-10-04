import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  type: 'petal' | 'ember';
}

export const FloatingPetalsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const petalColors = ['rgba(244, 182, 194, 0.45)', 'rgba(216, 131, 152, 0.35)', 'rgba(255, 202, 212, 0.4)'];
    const emberColors = ['rgba(224, 169, 109, 0.4)', 'rgba(251, 191, 36, 0.45)', 'rgba(255, 236, 208, 0.3)'];

    const particleCount = Math.min(36, Math.floor((width * height) / 38000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isPetal = i % 3 !== 0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isPetal ? Math.random() * 8 + 6 : Math.random() * 3 + 1.5,
        speedY: isPetal ? Math.random() * 0.7 + 0.3 : -(Math.random() * 0.5 + 0.2),
        speedX: (Math.random() - 0.5) * 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.6 + 0.2,
        color: isPetal
          ? petalColors[Math.floor(Math.random() * petalColors.length)]
          : emberColors[Math.floor(Math.random() * emberColors.length)],
        type: isPetal ? 'petal' : 'ember',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.005) * 0.3;
        p.rotation += p.rotationSpeed;

        // Wrap around
        if (p.type === 'petal' && p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        } else if (p.type === 'ember' && p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'petal') {
          // Draw soft organic rose petal curve
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else {
          // Draw warm ember dot with subtle glow
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(224, 169, 109, 0.6)';
          ctx.fill();
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  );
};
