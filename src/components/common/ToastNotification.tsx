import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

interface ToastNotificationProps {
  message: string | null;
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-panel px-5 py-3 rounded-2xl border-cyan-400/50 shadow-2xl flex items-center gap-3 text-white text-xs md:text-sm font-mono"
      >
        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 animate-pulse" />
        <span>{message}</span>
        <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white ml-2">
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
