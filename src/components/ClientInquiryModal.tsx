import React, { useState } from 'react';
import { X, Send, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';

interface ClientInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBusinessType?: string;
  defaultPackage?: string;
}

export const ClientInquiryModal: React.FC<ClientInquiryModalProps> = ({
  isOpen,
  onClose,
  defaultBusinessType = 'Restaurant',
  defaultPackage = 'Business (₹9,999)',
}) => {
  const { t, lang } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    businessType: defaultBusinessType,
    phone: '',
    email: '',
    websiteNeed: 'New Website from Scratch',
    selectedPackage: defaultPackage,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError(lang === 'ta' ? 'தயவுசெய்து உங்கள் பெயர் மற்றும் தொடர்பு எண்ணை உள்ளிடவும்.' : 'Please provide your name and WhatsApp/Phone number.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const getWhatsAppMessage = () => {
    return `Hello Viswaas,\n\nI am interested in getting a website for my business:\n- *Name*: ${formData.name}\n- *Business*: ${formData.businessName || 'N/A'}\n- *Type*: ${formData.businessType}\n- *Phone*: ${formData.phone}\n- *Email*: ${formData.email || 'N/A'}\n- *Scope*: ${formData.websiteNeed}\n- *Package*: ${formData.selectedPackage}\n- *Notes*: ${formData.message || 'Standard setup'}`;
  };

  const handleWhatsAppDirect = () => {
    const url = getWhatsAppUrl(getWhatsAppMessage());
    window.open(url, '_blank');
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                {t.modal.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.modal.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mb-2">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.modal.successTitle}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                {lang === 'ta' ? (
                  <>நன்றி, <strong>{formData.name}</strong>. வாட்ஸ்அப்பில் உங்கள் திட்டத்தைப் பற்றி உடனடியாகப் பேசுவோம்.</>
                ) : (
                  <>Thank you, <strong>{formData.name}</strong>. Let's fast-track your project discussion directly on WhatsApp right now.</>
                )}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                <p><strong>{lang === 'ta' ? 'வணிகம்:' : 'Business:'}</strong> {formData.businessName || 'Local Business'} ({formData.businessType})</p>
                <p><strong>{lang === 'ta' ? 'பேக்கேஜ்:' : 'Package:'}</strong> {formData.selectedPackage}</p>
                <p><strong>{lang === 'ta' ? 'வாட்ஸ்அப்:' : 'WhatsApp:'}</strong> {formData.phone}</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-md shadow-emerald-600/20 transition cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  {t.modal.chatWhatsapp}
                </button>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  {t.modal.close}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-xs rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t.modal.name}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'ta' ? "உதாரணம்: ரமேஷ் குமார்" : "e.g. Ramesh Kumar"}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t.modal.businessName}
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder={lang === 'ta' ? "உதாரணம்: அன்னபூர்ணா கஃபே" : "e.g. Annapoorna Cafe"}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t.modal.businessType}
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Restaurant">{lang === 'ta' ? "உணவகம் (Restaurant)" : "Restaurant"}</option>
                    <option value="Cafe">{lang === 'ta' ? "கஃபே (Cafe / Coffee)" : "Cafe / Coffee House"}</option>
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
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t.modal.phone}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t.modal.email}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@business.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t.modal.packageLabel}
                  </label>
                  <select
                    value={formData.selectedPackage}
                    onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Starter (₹4,999)">Starter (₹4,999) — 1–3 Pages</option>
                    <option value="Business (₹9,999)">Business (₹9,999) — Most Popular</option>
                    <option value="Pro Web App (₹19,999+)">Pro Web App (₹19,999+) — Custom Software</option>
                    <option value="Need Advice">{lang === 'ta' ? "ஆலோசனை தேவை / முடிவு செய்யவில்லை" : "Not sure yet / Need recommendation"}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t.modal.message}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'ta' ? "உதாரணம்: காந்திபுரத்தில் உள்ள எங்கள் கஃபேக்கு ஆன்லைன் மெனு மற்றும் வாட்ஸ்அப் ஆர்டர் வசதியுடன் கூடிய தளம் தேவை..." : "e.g. We need a digital menu with online table booking and WhatsApp orders for our cafe in Gandhipuram..."}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-md shadow-sky-600/20 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {t.modal.submit}
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  {t.modal.chatWhatsapp}
                </button>
              </div>

              <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                Zero spam. Directly handled by developer Viswaas ({siteConfig.contact.phoneDisplay}).
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
