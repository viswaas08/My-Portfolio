import { ArrowUp, Mail, Code2, Heart } from 'lucide-react';
import { Github, Linkedin, Twitter } from '../common/Icons';
import { personalData } from '../../data/personal';
import { audioSynth } from '../../utils/audioSynthesizer';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    audioSynth.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 pt-16 pb-12 overflow-hidden bg-slate-950/80">
      {/* Background glow layer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-slate-950 font-bold">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white font-mono tracking-wider">
                VISWAAS<span className="text-cyan-400">.DEV</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              {personalData.bio}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {personalData.availability}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold font-mono uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#about" className="hover:text-cyan-300 transition-colors">About Story</a></li>
              <li><a href="#skills" className="hover:text-cyan-300 transition-colors">Skill Matrix</a></li>
              <li><a href="#projects" className="hover:text-cyan-300 transition-colors">Featured Projects</a></li>
              <li><a href="#github" className="hover:text-cyan-300 transition-colors">GitHub API Sync</a></li>
              <li><a href="#blog" className="hover:text-cyan-300 transition-colors">Technical Writings</a></li>
            </ul>
          </div>

          {/* Socials & Back To Top */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold font-mono uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={personalData.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl glass-pill flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalData.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl glass-pill flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              {personalData.twitterUrl && (
                <a
                  href={personalData.twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl glass-pill flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              <a
                href={`mailto:${personalData.email}`}
                className="w-10 h-10 rounded-xl glass-pill flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-panel text-xs text-cyan-300 hover:border-cyan-400 transition-all cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
              Back to Top
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-mono">
          <p>
            © {new Date().getFullYear()} Viswaas. Engineered with Quantum Glass UI & React.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for recruiters & founders.
          </p>
        </div>
      </div>
    </footer>
  );
};
