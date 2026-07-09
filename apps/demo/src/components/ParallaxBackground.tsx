import React, { useEffect, useState } from 'react';

export function ParallaxBackground() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      {/* Layer 1 - Slowest (background) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200%',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          transform: `translateY(${offset * 0.2}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* Layer 2 - Medium speed */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '250%',
          background: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)
          `,
          transform: `translateY(${offset * 0.4}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* Layer 3 - Faster */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '300%',
          backgroundImage: `
            linear-gradient(45deg, transparent 30%, rgba(99, 102, 241, 0.02) 30.5%, rgba(99, 102, 241, 0.02) 60%, transparent 60.5%),
            linear-gradient(-45deg, transparent 30%, rgba(139, 92, 246, 0.02) 30.5%, rgba(139, 92, 246, 0.02) 60%, transparent 60.5%)
          `,
          backgroundSize: '40px 40px',
          transform: `translateY(${offset * 0.6}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* Floating orbs - animated */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          transform: `translateY(${offset * 0.3}px)`,
          animation: 'float 8s ease-in-out infinite',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          transform: `translateY(${offset * 0.25}px)`,
          animation: 'float 10s ease-in-out infinite 2s',
        }}
      />

      {/* Subtle noise texture */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23000' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")
          `,
          backgroundSize: '400px 400px',
          opacity: 0.5,
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }
      `}</style>
    </div>
  );
}
