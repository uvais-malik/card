import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  type: 'petal' | 'flower' | 'sparkle';
  color: string;
}

export const FloatingFlowers: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(142, 28, 44, ',   // Deep velvet burgundy / rose
      'rgba(185, 40, 60, ',   // Rich maroon
      'rgba(212, 110, 125, ', // Soft rose petal
      'rgba(185, 154, 89, ',  // Royal antique gold
      'rgba(218, 186, 122, ', // Warm gold highlight
    ];

    const particleCount = Math.min(28, Math.floor(width / 45));
    const particles: Petal[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    function createParticle(initial = false): Petal {
      const typeRand = Math.random();
      const type: Petal['type'] = typeRand < 0.65 ? 'petal' : typeRand < 0.88 ? 'flower' : 'sparkle';
      const baseColor = colors[Math.floor(Math.random() * colors.length)];

      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : -30,
        size: type === 'flower' ? 12 + Math.random() * 8 : type === 'petal' ? 8 + Math.random() * 9 : 3 + Math.random() * 3,
        speedY: 0.5 + Math.random() * 1.2,
        speedX: -0.4 + Math.random() * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.015 + Math.random() * 0.025,
        opacity: 0.35 + Math.random() * 0.45,
        type,
        color: baseColor,
      };
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.sin(p.flip), 1);

      ctx.beginPath();
      // Draw smooth organic petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, -p.size / 3, p.size, p.size * 0.6);
      ctx.bezierCurveTo(p.size * 0.7, p.size * 1.2, -p.size * 0.2, p.size * 1.1, 0, 0);

      ctx.fillStyle = `${p.color}${p.opacity})`;
      ctx.fill();

      // Subtle petal vein
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(p.size * 0.4, p.size * 0.3, p.size * 0.7, p.size * 0.7);
      ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.4})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.restore();
    };

    const drawFlower = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.cos(p.flip) * 0.3 + 0.7, 1);

      const petals = 5;
      const petalRadius = p.size * 0.55;

      for (let i = 0; i < petals; i++) {
        const angle = (i * 2 * Math.PI) / petals;
        ctx.save();
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, petalRadius, petalRadius * 0.5, petalRadius * 0.9, 0, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity * 0.9})`;
        ctx.fill();
        ctx.restore();
      }

      // Golden flower center
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(218, 186, 122, ${p.opacity + 0.2})`;
      ctx.fill();

      ctx.restore();
    };

    const drawSparkle = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      const sparkleOpacity = p.opacity * Math.abs(Math.sin(p.flip));
      ctx.fillStyle = `rgba(218, 186, 122, ${sparkleOpacity})`;

      // 4-point star
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 2);
      ctx.quadraticCurveTo(0, 0, p.size * 2, 0);
      ctx.quadraticCurveTo(0, 0, 0, p.size * 2);
      ctx.quadraticCurveTo(0, 0, -p.size * 2, 0);
      ctx.quadraticCurveTo(0, 0, 0, -p.size * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.015) * 0.6 + p.speedX;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (p.type === 'flower') {
          drawFlower(p);
        } else if (p.type === 'sparkle') {
          drawSparkle(p);
        } else {
          drawPetal(p);
        }

        // Reset when out of viewport
        if (p.y > height + 40 || p.x < -40 || p.x > width + 40) {
          particles[idx] = createParticle(false);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-1000"
      style={{ mixBlendMode: 'normal' }}
      aria-hidden="true"
    />
  );
};
