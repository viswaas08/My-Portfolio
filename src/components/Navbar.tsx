import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Sparkles, 
  ChevronRight,
  PhoneCall,
  Languages
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../config/siteConfig';
import { ClientInquiryModal } from './ClientInquiryModal';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.services, path: '/services' },
    { label: t.nav.pricing, path: '/pricing' },
    { label: t.nav.demos, path: '/demos', highlight: true },
    { label: t.nav.process, path: '/#process', isHash: true },
    { label: t.nav.projects, path: '/projects' },
    { label: t.nav.faq, path: '/#faq', isHash: true },
    { label: t.nav.contact, path: '/contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, item: typeof navLinks[0]) => {
    if (item.isHash) {
      e.preventDefault();
      const hash = item.path.replace('/', '');
      if (location.pathname !== '/') {
        navigate(`/${hash}`);
      } else {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80 py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-black text-lg tracking-wider shadow-md shadow-sky-500/20 group-hover:scale-105 transition">
                V
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white leading-none">
                  {siteConfig.brand.name}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400">
                  {lang === 'ta' ? 'உள்ளூர் வணிக இணையதளம்' : 'Websites for Local Business'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    location.pathname === item.path
                      ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                  {item.highlight && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold border border-sky-500/20">
                      {t.nav.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions: Language Toggle + Theme Toggle + CTA */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Language Switcher Button */}
              <button
                onClick={toggleLang}
                title={lang === 'en' ? 'தமிழில் பார்க்க கிளிக் செய்க' : 'Switch to English'}
                aria-label="Toggle language between English and Tamil"
                className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-800/80 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Languages className="w-3.5 h-3.5 text-sky-500" />
                <span className="font-semibold">{t.nav.langToggle}</span>
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-xs cursor-pointer"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>

              {/* Consultation / CTA Button */}
              <button
                onClick={() => setModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-sky-600/20 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.nav.cta}</span>
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl px-4 py-6 space-y-4 animate-fadeIn">
            {/* Quick Lang & Theme toggles inside mobile menu */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {lang === 'ta' ? 'மொழி / Theme' : 'Language & Theme'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleLang}
                  className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-xs font-bold text-sky-700 dark:text-sky-300"
                >
                  {t.nav.langToggle}
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition ${
                    location.pathname === item.path
                      ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-md shadow-sky-600/20 transition cursor-pointer text-sm"
              >
                <Sparkles className="w-4 h-4" />
                {t.nav.cta}
              </button>

              <a
                href={`tel:${siteConfig.contact.whatsappNumber}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium"
              >
                <PhoneCall className="w-4 h-4 text-emerald-500" />
                {t.nav.callDirect} {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>
        )}
      </header>

      <ClientInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
