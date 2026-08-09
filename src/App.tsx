import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLenis } from './hooks/useLenis';
import { ParticleBackground } from './components/3d/ParticleBackground';
import { CustomCursor } from './components/common/CustomCursor';
import { ScrollProgress } from './components/common/ScrollProgress';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { LinkedinCard } from './components/linkedin/LinkedinCard';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceTimelineSection } from './components/sections/ExperienceTimelineSection';
import { CertificatesSection } from './components/sections/CertificatesSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { GithubSection } from './components/sections/GithubSection';
import { BlogSection } from './components/sections/BlogSection';
import { ContactSection } from './components/sections/ContactSection';
import { CommandPalette } from './components/common/CommandPalette';
import { AiAssistantWidget } from './components/ai/AiAssistantWidget';
import { ToastNotification } from './components/common/ToastNotification';
import { LightboxModal } from './components/common/LightboxModal';
import { ResumeModal } from './components/common/ResumeModal';
import { ProjectModal } from './components/common/ProjectModal';
import { RecruiterPanel } from './components/recruiter/RecruiterPanel';
import { AdminEditorModal } from './components/admin/AdminEditorModal';
import { LoadingScreen } from './components/common/LoadingScreen';
import { ProjectItem } from './types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

const PortfolioContent: React.FC = () => {
  useLenis();

  const [isLoading, setIsLoading] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [aiWidgetOpen, setAiWidgetOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [recruiterPanelOpen, setRecruiterPanelOpen] = useState(false);
  const [adminEditorOpen, setAdminEditorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);
  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectItem | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProjectModal(project);
  };

  return (
    <div className="relative min-h-screen bg-[#07080c] text-slate-100 overflow-x-hidden">
      {/* Page Startup Splash Loader */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Global Interactive Layers */}
      <ParticleBackground />
      <CustomCursor />
      <ScrollProgress />

      {/* Navigation */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenAiWidget={() => setAiWidgetOpen(true)}
        onOpenRecruiterPanel={() => setRecruiterPanelOpen(true)}
        onOpenAdminEditor={() => setAdminEditorOpen(true)}
      />

      {/* Main Page Content Sections */}
      <main className="relative z-10 space-y-12">
        <HeroSection onOpenResumeModal={() => setResumeModalOpen(true)} />
        <AboutSection />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LinkedinCard />
        </div>

        <SkillsSection />
        <ProjectsSection onSelectProject={handleSelectProject} />
        <GithubSection onShowToast={showToast} />
        <ExperienceTimelineSection />
        <CertificatesSection onOpenLightbox={(url, title) => setLightboxImage({ url, title })} />
        <AchievementsSection />
        <BlogSection />
        <ContactSection onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Global Widgets & Modals */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      <AiAssistantWidget
        isOpen={aiWidgetOpen}
        onClose={() => setAiWidgetOpen(false)}
      />

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        onShowToast={showToast}
      />

      <RecruiterPanel
        isOpen={recruiterPanelOpen}
        onClose={() => setRecruiterPanelOpen(false)}
        onShowToast={showToast}
      />

      <AdminEditorModal
        isOpen={adminEditorOpen}
        onClose={() => setAdminEditorOpen(false)}
        onShowToast={showToast}
      />

      <ProjectModal
        project={selectedProjectModal}
        onClose={() => setSelectedProjectModal(null)}
      />

      <LightboxModal
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />

      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioContent />
    </QueryClientProvider>
  );
}
