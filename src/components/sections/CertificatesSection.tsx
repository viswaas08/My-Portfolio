import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { certificatesData } from '../../data/certificates';
import { CertificateItem } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { Award, ExternalLink, Eye, ShieldCheck } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynthesizer';

interface CertificatesSectionProps {
  onOpenLightbox: (imageUrl: string, title: string) => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ onOpenLightbox }) => {
  return (
    <section id="certificates" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Verified Credentials"
          title="Industry Certifications & Accreditation"
          subtitle="Meta, AWS, and MongoDB engineering credentials validating technical proficiency."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificatesData.map(cert => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard glowColor="violet" className="flex flex-col justify-between h-full space-y-4">
                <div className="space-y-3">
                  {/* Image Cover */}
                  <div className="relative h-44 rounded-xl overflow-hidden border border-white/10 group">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          audioSynth.playClick();
                          onOpenLightbox(cert.image, cert.title);
                        }}
                        className="p-3 rounded-full bg-cyan-500/80 text-white hover:bg-cyan-400 transition-colors shadow-lg"
                        title="Preview Certificate Lightbox"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> {cert.issuer} • {cert.issueDate}
                    </span>
                    <h3 className="text-lg font-extrabold text-white tracking-tight mt-1">
                      {cert.title}
                    </h3>
                  </div>

                  {/* Verified Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map(s => (
                      <span
                        key={s}
                        className="px-2.5 py-0.5 rounded-md glass-pill text-[10px] font-mono text-slate-300 border-white/10"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Link */}
                {cert.credentialUrl && (
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 truncate">
                      ID: {cert.credentialId || 'Verified'}
                    </span>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl glass-pill text-xs font-mono text-cyan-300 hover:border-cyan-400 flex items-center gap-1"
                    >
                      Verify <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
