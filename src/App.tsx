import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from '@/hooks/useLanguage';
import Navbar from '@/sections/Navbar';
import HeroSection from '@/sections/HeroSection';
import ResearchSection from '@/sections/ResearchSection';
import PresentationsSection from '@/sections/PresentationsSection';
import ExperienceSection from '@/sections/ExperienceSection';
import EducationSection from '@/sections/EducationSection';
import SkillsSection from '@/sections/SkillsSection';
import Footer from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <div style={{ backgroundColor: '#F5F0EB', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <HeroSection />
        <ResearchSection />
        <PresentationsSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
