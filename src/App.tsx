import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CurtainIntro } from './components/CurtainIntro';
import { OpeningLetter } from './components/OpeningLetter';
import { FamilySection } from './components/FamilySection';
import { MainEventReveal } from './components/MainEventReveal';
import { FamilyDirectory } from './components/FamilyDirectory';
import { FinalFooter } from './components/FinalFooter';
import { MusicToggle } from './components/MusicToggle';
import { ScrollProgress } from './components/ScrollProgress';
import { FloatingFlowers } from './components/FloatingFlowers';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <ScrollProgress />
      <FloatingFlowers />
      <MusicToggle />

      {/* Scene 1 & 2: Opening Curtains revealing Floating Names */}
      <CurtainIntro />

      {/* Scene 3: Opening Letter */}
      <OpeningLetter />

      {/* Scene 4: Bride & Groom + Host + Dua */}
      <FamilySection />

      {/* Scene 5: Wedding Date & Venue */}
      <MainEventReveal />

      {/* Scene 6: Family Directory */}
      <FamilyDirectory />

      {/* Scene 7: Final Thank You */}
      <FinalFooter />
    </div>
  );
};

export default App;
