import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUpRight 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-black text-base shadow-sm">
                V
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                {siteConfig.brand.name}
              </span>
            </Link>

            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm leading-relaxed">
              Modern websites for ambitious local businesses. Fast loading, mobile-first, and designed to turn online searches into paying customers.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={getWhatsAppUrl("Hi Viswaas, I want to inquire about a website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center hover:scale-105 transition"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800/60 flex items-center justify-center hover:scale-105 transition"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:scale-105 transition"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center hover:scale-105 transition"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link to="/demos" className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition">
                  Demo Showroom
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition">
                  Technical Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition">
                  Contact & Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Demos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Working Demos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/demos/restaurant" className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition flex items-center justify-between">
                  <span>Restaurant (Spice Route)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/demos/cafe" className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition flex items-center justify-between">
                  <span>Cafe (Brew & Bean)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/demos/bakery" className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition flex items-center justify-between">
                  <span>Bakery (Sweet Crumbs)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/demos/salon" className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition flex items-center justify-between">
                  <span>Salon (Glow Studio)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/demos/gym" className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition flex items-center justify-between">
                  <span>Gym (Forge Fitness)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/demos/clinic" className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition flex items-center justify-between">
                  <span>Clinic (CarePoint)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                <span>{siteConfig.contact.phoneDisplay}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                <span className="truncate">{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                <span>{siteConfig.contact.location}</span>
              </li>
              <li className="pt-2">
                <a
                  href={getWhatsAppUrl("Hi Viswaas, I would like to schedule a quick call about my website.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold hover:bg-emerald-600/20 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp Direct Chat
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 Viswaa Web. All rights reserved.</p>
          <p>
            Architected & Built by{' '}
            <strong className="text-slate-700 dark:text-slate-200">
              {siteConfig.brand.developer}
            </strong>{' '}
            • Full-Stack Developer for Local Businesses
          </p>
        </div>
      </div>
    </footer>
  );
};
