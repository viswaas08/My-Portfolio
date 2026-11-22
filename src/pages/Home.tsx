import React from 'react';
import { Hero } from '../components/Hero';
import { DemosSection } from '../components/DemosSection';
import { PricingSection } from '../components/PricingSection';
import { ProcessSection } from '../components/ProcessSection';
import { WhyChooseMe } from '../components/WhyChooseMe';
import { FAQSection } from '../components/FAQSection';
import { ContactSection } from '../components/ContactSection';

export const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <DemosSection />
      <PricingSection />
      <ProcessSection />
      <WhyChooseMe />
      <FAQSection />
      <ContactSection />
    </main>
  );
};
