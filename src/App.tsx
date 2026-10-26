import React from 'react';
import { CurtainIntro } from './components/CurtainIntro';
import { RoyalInvitationDeck } from './components/RoyalInvitationDeck';
import { FinalFooter } from './components/FinalFooter';
import { MusicToggle } from './components/MusicToggle';
import { ScrollProgress } from './components/ScrollProgress';
import { FloatingFlowers } from './components/FloatingFlowers';

const App: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#FAF7F2] text-[#2C1810] selection:bg-gold/30 selection:text-burgundy">
      {/* Scroll indicator bar */}
      <ScrollProgress />

      {/* Floating flower petals and golden sparkles animation */}
      <FloatingFlowers />

      {/* Audio player toggle */}
      <MusicToggle />

      {/* 1. Grand Royal Curtains with Automatic Sliding Unveil */}
      <CurtainIntro />

      {/* 2. Interactive 3-Card Royal Wedding Deck with Slide, Tabs & Swipe */}
      <RoyalInvitationDeck />

      {/* 3. Refined Ivory & Gold Royal Signature Footer */}
      <FinalFooter />
    </div>
  );
};

export default App;
