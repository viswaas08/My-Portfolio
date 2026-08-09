import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { audioSynth } from '../../utils/audioSynthesizer';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'violet' | 'emerald' | 'rose';
  enableTilt?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  enableTilt = true,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !enableTilt) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -6; // max 6 deg tilt
    const rY = ((x - centerX) / centerX) * 6;

    setRotateX(rX);
    setRotateY(rY);
    setLightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    audioSynth.playHover();
  };

  const glowBorderClass = {
    cyan: 'hover:border-cyan-400/40 hover:shadow-[0_15px_40px_rgba(0,243,255,0.15)]',
    violet: 'hover:border-purple-400/40 hover:shadow-[0_15px_40px_rgba(168,85,247,0.15)]',
    emerald: 'hover:border-emerald-400/40 hover:shadow-[0_15px_40px_rgba(16,185,129,0.15)]',
    rose: 'hover:border-rose-400/40 hover:shadow-[0_15px_40px_rgba(244,63,94,0.15)]'
  }[glowColor];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={() => {
        if (onClick) {
          audioSynth.playClick();
          onClick();
        }
      }}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
      className={`glass-card relative rounded-2xl p-6 overflow-hidden cursor-pointer ${glowBorderClass} ${className}`}
    >
      {/* Specular Mouse Light Tracking */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${lightPos.x}% ${lightPos.y}%, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />
      {children}
    </motion.div>
  );
};
