import React, { useState } from 'react';
import { 
  Send, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Phone, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';

export const ContactSection: React.FC = () => {
  const { t, lang } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    businessType: 'Restaurant',
    whatsapp: '',
    email: '',
    requirements: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.whatsapp.trim()) {
      setError(lang === 'ta' ? 'தயவுசெய்து உங்கள் பெயர் மற்றும் வாட்ஸ்அப் எண்ணை உள்ளிடவும்.' : 'Please provide your name and WhatsApp contact number.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const getDirectMessage = () => {
    return `Hello Viswaas,\n\nI want to discuss a website for my business:\n- Name: ${formData.name || 'Interested Business'}\n- Business: ${formData.businessName || 'Local Business'}\n- Type: ${formData.businessType}\n- WhatsApp: ${formData.whatsapp}\n- Email: ${formData.email || 'N/A'}\n- Requirements: ${formData.requirements || 'Standard setup'}`;
  };

  const handleWhatsAppClick = () => {
    const url = getWhatsAppUrl(getDirectMessage());
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                {t.contact.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t.contact.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {t.contact.subtitle}
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <a
                href={getWhatsAppUrl("Hi Viswaas, I'd like to consult with you about building a website for my business.")}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm flex items-center justify-between hover:border-emerald-500/50 hover:shadow-md transition group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                      {t.contact.fastestResponse}
                    </span>
                    <strong className="text-sm text-slate-900 dark:text-white font-semibold">
                      {t.contact.chatDirect}
                    </strong>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                  {t.contact.openChat}
                </span>
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm flex items-center justify-between hover:border-sky-500/50 hover:shadow-md transition group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                      {t.contact.emailInquiries}
                    </span>
                    <strong className="text-sm text-slate-900 dark:text-white font-semibold">
                      {siteConfig.contact.email}
                    </strong>
                  </div>
                </div>
                <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
                  {t.contact.sendEmail}
                </span>
              </a>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                    {t.contact.baseLocation}
                  </span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t.contact.locationVal}
                  </span>
                </div>
              </div>
            </div>

            {/* Social links row */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                {t.contact.devProfiles}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={siteConfig.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-500" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 p-6 sm:p-8 lg:p-10 shadow-lg">
              {submitted ? (
                <div className="py-8 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {t.contact.successTitle} {formData.name}!
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto">
                    {t.contact.successDesc}
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleWhatsAppClick}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-600/20 transition cursor-pointer text-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      {t.contact.whatsappBtn}
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition text-sm"
                    >
                      {t.contact.submitAnother}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700/60">
                    <Sparkles className="w-4 h-4 text-sky-500" />
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {t.contact.formTitle}
                    </h3>
                  </div>

                  {error && (
                    <div className="p-3 text-xs rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.contact.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={lang === 'ta' ? "உதாரணம்: ரமேஷ் குமார்" : "e.g. Ramesh Kumar"}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.contact.businessNameLabel}
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder={lang === 'ta' ? "உதாரணம்: அன்னபூர்ணா கஃபே" : "e.g. Annapoorna Cafe"}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.contact.businessTypeLabel}
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Restaurant">{lang === 'ta' ? "உணவகம் (Restaurant)" : "Restaurant"}</option>
                        <option value="Cafe">{lang === 'ta' ? "கஃபே (Cafe / Coffee)" : "Cafe / Coffee Shop"}</option>
                        <option value="Bakery">{lang === 'ta' ? "பேக்கரி (Bakery)" : "Bakery / Patisserie"}</option>
                        <option value="Retail Shop">{lang === 'ta' ? "சில்லறை கடை (Retail Store)" : "Retail Store / Supermarket"}</option>
                        <option value="Salon">{lang === 'ta' ? "சலூன் & ஸ்பா (Salon / Spa)" : "Salon & Beauty Spa"}</option>
                        <option value="Gym">{lang === 'ta' ? "ஜிம் (Gym & Fitness)" : "Gym & Fitness Centre"}</option>
                        <option value="Tuition Centre">{lang === 'ta' ? "டியூஷன் மையம் (Tuition / Academy)" : "Tuition Centre / Academy"}</option>
                        <option value="Clinic">{lang === 'ta' ? "மருத்துவமனை / கிளினிக் (Clinic)" : "Clinic / Healthcare"}</option>
                        <option value="Other Local Business">{lang === 'ta' ? "பிற வணிகங்கள் (Other Business)" : "Other Local Business"}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.contact.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {t.contact.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="owner@yourbusiness.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {t.contact.reqLabel}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder={lang === 'ta' ? "உதாரணம்: எனக்கு மெனு கார்டு மற்றும் வாட்ஸ்அப் ஆர்டர் வசதியுடன் கூடிய 5 பக்க இணையதளம் தேவை..." : "e.g. We want a 5-page website with a digital food menu, WhatsApp takeaway ordering, and our Google Maps location..."}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-md shadow-sky-600/25 transition cursor-pointer text-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t.contact.sendBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppClick}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition cursor-pointer text-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{t.contact.whatsappBtn}</span>
                    </button>
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400 dark:text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{t.contact.privacyNote}</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
