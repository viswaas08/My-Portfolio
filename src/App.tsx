import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

// Agency Pages
import { Home } from './pages/Home';
import { ServicesPage } from './pages/ServicesPage';
import { PricingPage } from './pages/PricingPage';
import { DemosIndex } from './pages/DemosIndex';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFound } from './pages/NotFound';

// Demo Pages
import { RestaurantDemo } from './pages/demos/Restaurant';
import { CafeDemo } from './pages/demos/Cafe';
import { BakeryDemo } from './pages/demos/Bakery';
import { ShopDemo } from './pages/demos/Shop';
import { SalonDemo } from './pages/demos/Salon';
import { GymDemo } from './pages/demos/Gym';
import { TuitionDemo } from './pages/demos/Tuition';
import { ClinicDemo } from './pages/demos/Clinic';

function AppContent() {
  const location = useLocation();
  const isDemoPage = location.pathname.startsWith('/demos/');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors overflow-x-hidden w-full relative">
      <ScrollToTop />
      {!isDemoPage && <Navbar />}

      <div className="flex-1">
        <Routes>
          {/* Main Agency Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/demos" element={<DemosIndex />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* 8 Working Business Demos */}
          <Route path="/demos/restaurant" element={<RestaurantDemo />} />
          <Route path="/demos/cafe" element={<CafeDemo />} />
          <Route path="/demos/bakery" element={<BakeryDemo />} />
          <Route path="/demos/shop" element={<ShopDemo />} />
          <Route path="/demos/salon" element={<SalonDemo />} />
          <Route path="/demos/gym" element={<GymDemo />} />
          <Route path="/demos/tuition" element={<TuitionDemo />} />
          <Route path="/demos/clinic" element={<ClinicDemo />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!isDemoPage && <Footer />}
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
