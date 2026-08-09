import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = 'center'
}) => {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-2xl'}`}
    >
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-[0_0_15px_rgba(0,243,255,0.2)] ${
          isCenter ? 'mx-auto' : ''
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        {badge}
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
        {title}
      </h2>
      <p className="text-slate-400 text-base md:text-lg leading-relaxed">
        {subtitle}
      </p>
    </motion.div>
  );
};
