import React from 'react';
import { Hero } from '../components/Hero';
import { ProblemSection } from '../components/ProblemSection';
import { ServicesSection } from '../components/ServicesSection';
import { PricingSection } from '../components/PricingSection';
import { DemosSection } from '../components/DemosSection';
import { ProcessSection } from '../components/ProcessSection';
import { WhyChooseMe } from '../components/WhyChooseMe';
import { ProjectsSection } from '../components/ProjectsSection';
import { FAQSection } from '../components/FAQSection';
import { ContactSection } from '../components/ContactSection';

export const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <ServicesSection />
      <PricingSection />
      <DemosSection />
      <ProcessSection />
      <WhyChooseMe />
      <ProjectsSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
};
