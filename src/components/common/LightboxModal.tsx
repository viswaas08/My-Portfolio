import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface LightboxModalProps {
  image: { url: string; title: string } | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-4xl max-h-[90vh] glass-panel rounded-3xl overflow-hidden border-cyan-500/40 shadow-2xl p-2 z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl glass-pill text-white hover:bg-white/20 z-20"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={image.url}
            alt={image.title}
            className="max-h-[80vh] w-auto mx-auto object-contain rounded-2xl"
          />
          <div className="p-3 text-center text-xs font-mono text-cyan-300">
            {image.title}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
