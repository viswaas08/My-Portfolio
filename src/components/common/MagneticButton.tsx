import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { audioSynth } from '../../utils/audioSynthesizer';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'glass' | 'outline';
  href?: string;
  download?: boolean | string;
  target?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  href,
  download,
  target
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = () => {
    audioSynth.playClick();
    if (onClick) onClick();
  };

  const handleMouseEnter = () => {
    audioSynth.playHover();
  };

  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-xl px-6 py-3 transition-all duration-300 overflow-hidden cursor-pointer select-none text-sm md:text-base";

  const variantStyles = {
    primary: "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_25px_rgba(0,243,255,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] border border-cyan-300/30",
    secondary: "bg-slate-900/80 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/40 shadow-lg",
    glass: "glass-panel text-slate-100 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-white/10",
    outline: "border border-white/20 text-slate-200 hover:border-white/50 hover:bg-white/5"
  }[variant];

  const content = (
    <motion.span
      className="relative z-10 flex items-center gap-2"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        className={`${baseStyles} ${variantStyles} ${className}`}
        whileTap={{ scale: 0.95 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      {content}
    </motion.button>
  );
};
