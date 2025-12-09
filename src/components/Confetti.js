// src/components/Confetti.js
import React, { useEffect, useState } from 'react';

function Confetti() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4ade80', '#fbbf24', '#ef4444', '#3b82f6', '#ec4899'];
    const newParticles = [];

    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 2 + Math.random() * 2,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 12,
        delay: Math.random() * 0.5
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.left}%`,
            top: '-20px',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.backgroundColor,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            animation: `fall ${particle.animationDuration}s linear ${particle.delay}s forwards`,
            opacity: 0.9
          }}
        />
      ))}
      <style>
        {`
          @keyframes fall {
            to {
              transform: translateY(110vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Confetti;