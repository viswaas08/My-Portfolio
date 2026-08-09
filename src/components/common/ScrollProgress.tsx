import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      if (documentHeight > 0) {
        const scrolled = (window.scrollY / documentHeight) * 100;
        setScrollPercentage(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-slate-950/40">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 shadow-[0_0_12px_#00f3ff]"
        style={{ width: `${scrollPercentage}%` }}
        transition={{ ease: 'easeOut', duration: 0.1 }}
      />
    </div>
  );
};
