import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { wedding } from '../data/wedding';
import { CornerOrnament, GoldDivider, IslamicPattern } from './IslamicPattern';
import '../styles/animations.css';

// Gentle synthetic harp/chime sound on open (no external audio required)
const playRoyalChime = () => {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + idx * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.8);
    });
  } catch {
    // Audio optional fallback
  }
};

export const CurtainIntro: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenInvitation = () => {
    if (isOpened) {
      scrollToDeck();
      return;
    }
    setIsOpened(true);
    playRoyalChime();

    // Cinematic curtain slide animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Automatically glide to the invitation deck smoothly after curtains part
        setTimeout(() => {
          scrollToDeck();
        }, 900);
      },
    });

    tl.to(
      curtainLeftRef.current,
      {
        xPercent: -105,
        duration: 1.4,
        ease: 'power3.inOut',
      },
      0
    )
      .to(
        curtainRightRef.current,
        {
          xPercent: 105,
          duration: 1.4,
          ease: 'power3.inOut',
        },
        0
      )
      .to(
        contentRef.current,
        {
          opacity: 0,
          scale: 0.9,
          duration: 0.7,
          ease: 'power2.out',
          pointerEvents: 'none',
        },
        0
      )
      .fromTo(
        revealedRef.current,
        { opacity: 0.4, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' },
        0.2
      );
  };

  const scrollToDeck = () => {
    const deck = document.getElementById('invitation-deck');
    if (deck) {
      deck.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Also listen to scroll down to open curtains automatically
    const handleScroll = () => {
      if (!isOpened && window.scrollY > 40) {
        handleOpenInvitation();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpened]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#24080D] select-none"
    >
      {/* ══════════════════════════════════════════════════════════
          REVEALED ROYAL STAGE (EXACT EQUAL SIZE UNDER CURTAINS)
          ══════════════════════════════════════════════════════════ */}
      <div
        ref={revealedRef}
        className="absolute inset-0 z-10 w-full h-full min-h-[100dvh] revealed-royal-bg flex flex-col items-center justify-between text-center px-4 sm:px-6 py-6 sm:py-10 overflow-hidden"
      >
        {/* Subtle royal Islamic arabesque backdrop */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <IslamicPattern size={80} color="#B99A59" />
        </div>

        {/* Ambient floating gold sparkles */}
        <div className="absolute top-1/4 left-1/6 w-2.5 h-2.5 rounded-full bg-gold/70 animate-sparkle-1 blur-[0.5px]" />
        <div className="absolute top-1/3 right-1/5 w-3 h-3 rounded-full bg-gold/50 animate-sparkle-2 blur-[0.5px]" />
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 rounded-full bg-gold/60 animate-sparkle-3 blur-[0.5px]" />
        <div className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-gold/60 animate-sparkle-1 blur-[0.5px]" />

        {/* Corner filigree ornaments */}
        <CornerOrnament className="absolute top-4 left-4 opacity-40 w-12 h-12 sm:w-16 sm:h-16" color="#B99A59" />
        <CornerOrnament className="absolute top-4 right-4 opacity-40 w-12 h-12 sm:w-16 sm:h-16 -scale-x-100" color="#B99A59" />
        <CornerOrnament className="absolute bottom-4 left-4 opacity-40 w-12 h-12 sm:w-16 sm:h-16 -scale-y-100" color="#B99A59" />
        <CornerOrnament className="absolute bottom-4 right-4 opacity-40 w-12 h-12 sm:w-16 sm:h-16 -scale-x-100 -scale-y-100" color="#B99A59" />

        {/* Left Hanging Royal Lantern (Fanoos) */}
        <div className="absolute top-0 left-6 sm:left-14 w-10 sm:w-14 z-20 pointer-events-none animate-sway-left hidden xs:block">
          <svg viewBox="0 0 50 140" fill="none" className="w-full h-auto drop-shadow-[0_0_15px_rgba(218,186,122,0.8)]">
            {/* Chain */}
            <line x1="25" y1="0" x2="25" y2="45" stroke="#B99A59" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Lantern Cap */}
            <path d="M12 45 L25 35 L38 45 L34 50 L16 50 Z" fill="#B99A59" />
            {/* Glass body with inner golden glow */}
            <path d="M16 50 L10 80 L25 105 L40 80 L34 50 Z" fill="rgba(218,186,122,0.25)" stroke="#B99A59" strokeWidth="1.2" />
            <circle cx="25" cy="75" r="7" fill="#FFF5C2" className="animate-pulse" filter="drop-shadow(0 0 8px #FFD700)" />
            {/* Bottom finial */}
            <path d="M25 105 L25 120" stroke="#B99A59" strokeWidth="1.5" />
            <circle cx="25" cy="122" r="2.5" fill="#B99A59" />
          </svg>
        </div>

        {/* Right Hanging Royal Lantern (Fanoos) */}
        <div className="absolute top-0 right-6 sm:right-14 w-10 sm:w-14 z-20 pointer-events-none animate-sway-right hidden xs:block">
          <svg viewBox="0 0 50 140" fill="none" className="w-full h-auto drop-shadow-[0_0_15px_rgba(218,186,122,0.8)]">
            <line x1="25" y1="0" x2="25" y2="40" stroke="#B99A59" strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M12 40 L25 30 L38 40 L34 45 L16 45 Z" fill="#B99A59" />
            <path d="M16 45 L10 75 L25 100 L40 75 L34 45 Z" fill="rgba(218,186,122,0.25)" stroke="#B99A59" strokeWidth="1.2" />
            <circle cx="25" cy="70" r="7" fill="#FFF5C2" className="animate-pulse" filter="drop-shadow(0 0 8px #FFD700)" />
            <path d="M25 100 L25 115" stroke="#B99A59" strokeWidth="1.5" />
            <circle cx="25" cy="117" r="2.5" fill="#B99A59" />
          </svg>
        </div>

        {/* Top Header: Bismillah */}
        <div className="relative z-20 pt-2 sm:pt-4">
          <p className="font-arabic text-2xl sm:text-3xl text-gold animate-pulse-glow" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="font-body text-gold/80 text-[10px] sm:text-xs tracking-[0.3em] uppercase mt-1">
            With the divine blessings of Almighty Allah
          </p>
        </div>

        {/* Center Royal Arch & Grand Names */}
        <div className="relative z-20 w-full max-w-2xl mx-auto py-2 flex flex-col items-center justify-center">
          {/* Ornate Arch Frame Outline */}
          <div className="w-full px-4 py-6 sm:py-8 rounded-t-[140px] border border-gold/30 bg-burgundy-dark/40 backdrop-blur-[2px] shadow-[0_0_40px_rgba(0,0,0,0.4)]">
            {/* The Groom's Name */}
            <div className="animate-name-groom mb-1">
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl text-ivory font-normal tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                {wedding.couple.groom.name}
              </h1>
            </div>

            {/* Connecting 'weds' */}
            <div className="my-2 sm:my-3 flex items-center justify-center gap-3">
              <span className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold" />
              <span className="font-calligraphy text-2xl sm:text-3xl text-gold font-normal px-2 drop-shadow-[0_0_10px_rgba(218,186,122,0.8)]">
                weds
              </span>
              <span className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold" />
            </div>

            {/* The Bride's Name */}
            <div className="animate-name-bride mt-1">
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl text-ivory font-normal tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                {wedding.couple.bride.name}
              </h1>
            </div>

            <GoldDivider className="mx-auto my-3 sm:my-4 opacity-80" width={140} />

            <p className="font-body text-gold/90 text-[11px] sm:text-xs tracking-[0.25em] uppercase italic">
              Two families · Two hearts · One blessed beginning
            </p>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="relative z-20 pb-4 sm:pb-6 flex flex-col items-center gap-2">
          <button
            onClick={scrollToDeck}
            className="group px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-gold/70 bg-gold/15 hover:bg-gold text-gold hover:text-burgundy-dark
                       transition-all duration-300 shadow-[0_0_20px_rgba(185,154,89,0.3)] hover:shadow-[0_0_30px_rgba(185,154,89,0.6)]
                       flex items-center gap-2 text-xs sm:text-sm font-cinzel font-semibold tracking-widest uppercase cursor-pointer"
          >
            <span>Explore Invitation Cards</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-y-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          <span className="font-body text-[10px] text-ivory/50 tracking-widest uppercase">
            Tap or scroll to view 3-page wedding suite
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          VELVET CURTAIN PANELS (SLIDE LEFT & RIGHT ON CLICK)
          ══════════════════════════════════════════════════════════ */}
      {/* Left Velvet Curtain */}
      <div
        ref={curtainLeftRef}
        className="curtain-panel curtain-left w-[52%] h-full absolute top-0 left-0 z-30"
      />

      {/* Right Velvet Curtain */}
      <div
        ref={curtainRightRef}
        className="curtain-panel curtain-right w-[52%] h-full absolute top-0 right-0 z-30"
      />

      {/* ══════════════════════════════════════════════════════════
          FRONT CONTENT ON CLOSED CURTAINS
          ══════════════════════════════════════════════════════════ */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-6 pointer-events-auto"
      >
        <div className="max-w-md mx-auto flex flex-col items-center">
          {/* Bismillah */}
          <p className="font-arabic text-2xl sm:text-3xl md:text-4xl text-gold mb-3 leading-relaxed drop-shadow-[0_0_12px_rgba(218,186,122,0.6)]" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="font-body text-ivory/80 text-[10px] sm:text-xs tracking-widest uppercase mb-5">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>

          <div className="w-16 h-px bg-gold/50 my-3" />

          {/* Invitation Intro Title */}
          <h2 className="font-heading text-2xl sm:text-4xl text-ivory font-light tracking-wide mb-2">
            Wedding Invitation
          </h2>
          <p className="font-cinzel text-xs sm:text-sm text-gold tracking-[0.2em] uppercase mb-8">
            Lubna Naaz &amp; Haider Ali
          </p>

          {/* Interactive Open Invitation Button */}
          <button
            onClick={handleOpenInvitation}
            className="group relative px-8 py-3.5 sm:px-10 sm:py-4 rounded-full border-2 border-gold bg-gradient-to-r from-burgundy-dark/90 via-burgundy/80 to-burgundy-dark/90 text-gold
                       hover:text-burgundy-dark hover:bg-gold transition-all duration-500 shadow-[0_0_25px_rgba(185,154,89,0.45)]
                       hover:shadow-[0_0_40px_rgba(218,186,122,0.85)] cursor-pointer overflow-hidden transform hover:scale-105 active:scale-95"
            aria-label="Open wedding invitation"
          >
            {/* Shimmer overlay */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gold/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            <div className="relative flex items-center gap-3 font-cinzel text-xs sm:text-sm font-bold tracking-[0.25em] uppercase">
              <span className="text-base">✦</span>
              <span>Open Invitation</span>
              <span className="text-base">✦</span>
            </div>
          </button>

          <p className="font-body text-ivory/50 text-[10px] tracking-widest uppercase mt-6 animate-pulse">
            Click to part the royal curtains
          </p>
        </div>
      </div>
    </section>
  );
};
