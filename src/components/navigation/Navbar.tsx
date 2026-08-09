import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Volume2, VolumeX, Sparkles, Menu, X, Code2, Briefcase, Settings } from 'lucide-react';
import { Linkedin } from '../common/Icons';
import { personalData } from '../../data/personal';
import { audioSynth } from '../../utils/audioSynthesizer';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenAiWidget: () => void;
  onOpenRecruiterPanel: () => void;
  onOpenAdminEditor: () => void;
}

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'GitHub', href: '#github' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' }
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenAiWidget,
  onOpenRecruiterPanel,
  onOpenAdminEditor
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section intersection detection
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const status = audioSynth.toggleMute();
    setIsMuted(status);
    if (!status) audioSynth.playClick();
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'glass-panel border-white/10 shadow-2xl shadow-cyan-950/30'
              : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group cursor-pointer"
            onClick={() => audioSynth.playClick()}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-slate-950 font-extrabold shadow-[0_0_20px_rgba(0,243,255,0.4)] group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 text-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-white tracking-wider font-mono flex items-center gap-1">
                VISWAA S<span className="text-cyan-400">.DEV</span>
              </span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">
                Quantum OS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 glass-pill px-3 py-1.5 rounded-full border-white/10">
            {NAV_LINKS.map(link => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => audioSynth.playClick()}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    isActive ? 'text-cyan-300' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-cyan-500/20 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,243,255,0.3)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Utility Actions */}
          <div className="flex items-center gap-2">
            {/* Recruiter Quick View Button */}
            <button
              onClick={() => {
                audioSynth.playClick();
                onOpenRecruiterPanel();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono hover:bg-purple-500/30"
              title="Recruiter Executive Hub"
            >
              <Briefcase className="w-3.5 h-3.5 text-purple-400" />
              <span>Recruiter Panel</span>
            </button>

            {/* LinkedIn Icon */}
            <a
              href={personalData.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl glass-pill text-cyan-400 hover:text-white transition-all hidden md:flex"
              title="Viswaa S LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                audioSynth.playClick();
                onOpenCommandPalette();
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl glass-pill hover:border-cyan-400/40 text-slate-300 text-xs transition-all hover:bg-cyan-950/30"
              title="Global Search & Commands (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] font-mono bg-white/10 rounded border border-white/10 text-cyan-300">
                ⌘K
              </kbd>
            </button>

            {/* Admin Live Editor Trigger */}
            <button
              onClick={() => {
                audioSynth.playClick();
                onOpenAdminEditor();
              }}
              className="p-2 rounded-xl glass-pill text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-all"
              title="Admin Live Content Editor (Ctrl + Shift + A)"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl glass-pill text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-all"
              title={isMuted ? 'Unmute Audio Chimes' : 'Mute Audio Chimes'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl glass-pill text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden glass-panel mx-4 mt-2 rounded-2xl overflow-hidden border-cyan-500/30"
          >
            <div className="p-5 flex flex-col gap-3">
              {NAV_LINKS.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    audioSynth.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2.5 text-sm font-medium rounded-xl text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRecruiterPanel();
                }}
                className="w-full py-2.5 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-mono"
              >
                Recruiter Executive Panel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
