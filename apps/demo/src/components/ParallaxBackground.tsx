import React, { useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
  isDark: boolean;
}

export function ParallaxBackground({ isDark }: ParallaxBackgroundProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bgColor = isDark ? '#0f172a' : '#f0f9ff';
  const skyGradient = isDark
    ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 40%, #334155 100%)'
    : 'linear-gradient(180deg, #e0f2fe 0%, #bae6fd 40%, #7dd3fc 100%)';

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
        overflow: 'hidden',
      }}
    >
      {/* Sky background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: skyGradient,
        }}
      />

      {/* Far mountains - slowest parallax */}
      <svg
        viewBox="0 0 1200 400"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '100%',
          transform: `translateY(${offset * 0.15}px)`,
          transition: 'transform 0.1s ease-out',
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M0,250 Q300,100 600,250 T1200,250 L1200,400 L0,400 Z"
          fill={isDark ? '#0c4a6e' : '#0284c7'} opacity="0.3" />
      </svg>

      {/* Mid-range mountains - medium parallax */}
      <svg
        viewBox="0 0 1200 400"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '100%',
          transform: `translateY(${offset * 0.35}px)`,
          transition: 'transform 0.1s ease-out',
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M0,300 Q200,150 400,280 T800,300 T1200,280 L1200,400 L0,400 Z"
          fill={isDark ? '#164e63' : '#0369a1'} opacity="0.5" />
      </svg>

      {/* Foreground hills - fastest parallax */}
      <svg
        viewBox="0 0 1200 400"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '100%',
          transform: `translateY(${offset * 0.55}px)`,
          transition: 'transform 0.1s ease-out',
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M0,320 Q150,200 300,310 T600,330 T900,310 T1200,320 L1200,400 L0,400 Z"
          fill={isDark ? '#1e3a8a' : '#0ea5e9'} opacity="0.7" />
      </svg>

      {/* Floating orbs - animated */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: '200px',
          height: '200px',
          background: isDark
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          transform: `translateY(${offset * 0.2}px)`,
          animation: 'float 8s ease-in-out infinite',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: '250px',
          height: '250px',
          background: isDark
            ? 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          transform: `translateY(${offset * 0.25}px)`,
          animation: 'float 10s ease-in-out infinite 2s',
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
