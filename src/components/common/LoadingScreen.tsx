import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 bg-[#07080c] flex flex-col items-center justify-center p-4 overflow-hidden"
    >
      {/* Background ambient radial lights */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-glow delay-500" />

      {/* Logo & Morph Box */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 p-0.5 shadow-[0_0_40px_rgba(0,243,255,0.5)] flex items-center justify-center"
        >
          <div className="w-full h-full bg-[#07080c] rounded-[14px] flex items-center justify-center">
            <Code2 className="w-8 h-8 text-cyan-400" />
          </div>
        </motion.div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-white font-mono tracking-wider flex items-center gap-2">
            QUANTUM<span className="text-cyan-400">.OS</span> <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
          </h2>
          <span className="text-xs text-slate-400 font-mono tracking-widest uppercase block">
            Initializing Viswaas Portfolio & GitHub Telemetry
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/10 relative">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 transition-all duration-100 shadow-[0_0_15px_#00f3ff]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-xs font-mono text-cyan-300 font-bold">
          {progress}%
        </span>
      </div>
    </motion.div>
  );
};
