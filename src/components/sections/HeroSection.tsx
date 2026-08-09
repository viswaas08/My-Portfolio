import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalData } from '../../data/personal';
import { MagneticButton } from '../common/MagneticButton';
import { FloatingQuantumCore } from '../3d/FloatingQuantumCore';
import { Mail, FileText, ArrowRight, Sparkles, Code2, Download } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';
import { audioSynth } from '../../utils/audioSynthesizer';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResumeModal }) => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect logic
  useEffect(() => {
    const fullText = personalData.titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentTitleIndex((prev: number) => (prev + 1) % personalData.titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTitleIndex]);

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background radial spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-500/15 via-purple-500/15 to-emerald-500/10 rounded-full blur-[120px] pointer-events-none animate-aurora" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border-cyan-500/30 shadow-[0_0_20px_rgba(0,243,255,0.2)]"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono text-cyan-300 font-semibold tracking-wider uppercase">
                {personalData.availability}
              </span>
            </motion.div>

            {/* Name Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none"
            >
              Hi, I'm <span className="text-gradient-quantum">{personalData.name}</span>
            </motion.h1>

            {/* Title Cycling Typing Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-12 flex items-center justify-center lg:justify-start"
            >
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-200 font-mono tracking-tight flex items-center">
                I am a{' '}
                <span className="text-cyan-400 ml-2 border-b-2 border-cyan-400">
                  {displayedText}
                </span>
                <span className="w-0.5 h-7 bg-purple-400 ml-1 animate-pulse" />
              </span>
            </motion.div>

            {/* Bio Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0 font-sans"
            >
              {personalData.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <MagneticButton
                onClick={() => {
                  audioSynth.playClick();
                  onOpenResumeModal();
                }}
                variant="primary"
                className="glow-cyan"
              >
                <FileText className="w-5 h-5" />
                Download Resume
              </MagneticButton>

              <MagneticButton
                href="#projects"
                variant="glass"
              >
                View Projects
                <ArrowRight className="w-4 h-4 ml-1 text-cyan-400" />
              </MagneticButton>
            </motion.div>

            {/* Social Buttons Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-4 pt-4 text-slate-400"
            >
              <a
                href={personalData.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl glass-pill hover:text-cyan-300 hover:border-cyan-400/50 transition-all hover:scale-110"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalData.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl glass-pill hover:text-cyan-300 hover:border-cyan-400/50 transition-all hover:scale-110"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalData.email}`}
                className="p-3 rounded-2xl glass-pill hover:text-cyan-300 hover:border-cyan-400/50 transition-all hover:scale-110"
                title="Send Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <FloatingQuantumCore />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
