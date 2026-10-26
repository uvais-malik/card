import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { wedding } from '../data/wedding';
import { CornerOrnament, GoldDivider, IslamicPattern } from './IslamicPattern';
import '../styles/animations.css';

gsap.registerPlugin(ScrollTrigger);

export const CurtainIntro: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef<HTMLDivElement>(null);

  const handleOpenInvitation = () => {
    // Scroll smoothly to reveal the opened curtains and floating names
    window.scrollTo({ top: window.innerHeight * 1.1, behavior: 'smooth' });
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.4,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(curtainLeftRef.current, { xPercent: -102, ease: 'power2.inOut' }, 0);
      tl.to(curtainRightRef.current, { xPercent: 102, ease: 'power2.inOut' }, 0);
      tl.to(contentRef.current, { opacity: 0, scale: 0.92, pointerEvents: 'none' }, 0);
      tl.fromTo(
        revealedRef.current,
        { opacity: 0.2, scale: 0.95 },
        { opacity: 1, scale: 1, ease: 'power2.out' },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[130vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* REVEALED SCENE BEHIND CURTAINS */}
        <div
          ref={revealedRef}
          className="absolute inset-0 z-10 revealed-royal-bg flex flex-col items-center justify-center text-center px-4 sm:px-6 relative overflow-hidden"
        >
          {/* Subtle Islamic pattern background */}
          <div className="absolute inset-0 opacity-[0.06]">
            <IslamicPattern size={75} color="#B99A59" />
          </div>

          {/* Floating golden sparkle particles */}
          <div className="absolute top-1/4 left-1/6 w-2 h-2 rounded-full bg-gold/60 animate-sparkle-1 blur-[1px]" />
          <div className="absolute top-1/3 right-1/5 w-3 h-3 rounded-full bg-gold/40 animate-sparkle-2 blur-[1px]" />
          <div className="absolute bottom-1/3 left-1/5 w-2 h-2 rounded-full bg-gold/50 animate-sparkle-3 blur-[1px]" />
          <div className="absolute top-2/3 right-1/4 w-2.5 h-2.5 rounded-full bg-gold/50 animate-sparkle-1 blur-[1px]" />

          {/* Corner ornaments */}
          <CornerOrnament className="absolute top-5 left-5 opacity-40 w-12 h-12 sm:w-16 sm:h-16" color="#B99A59" />
          <CornerOrnament className="absolute top-5 right-5 opacity-40 w-12 h-12 sm:w-16 sm:h-16 -scale-x-100" color="#B99A59" />
          <CornerOrnament className="absolute bottom-5 left-5 opacity-40 w-12 h-12 sm:w-16 sm:h-16 -scale-y-100" color="#B99A59" />
          <CornerOrnament className="absolute bottom-5 right-5 opacity-40 w-12 h-12 sm:w-16 sm:h-16 -scale-x-100 -scale-y-100" color="#B99A59" />

          {/* Content container */}
          <div className="relative z-20 max-w-3xl mx-auto py-8">
            {/* Small divine blessings header */}
            <p className="font-body text-gold text-xs sm:text-sm md:text-base tracking-[0.35em] uppercase mb-4 sm:mb-6 font-medium">
              With the Blessings of Allah (SWT)
            </p>

            <GoldDivider className="mx-auto mb-6 sm:mb-8 opacity-70" width={160} />

            {/* Groom's floating name */}
            <div className="animate-name-groom">
              <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ivory font-light tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                {wedding.couple.groom.name}
              </h2>
            </div>

            {/* Floating 'weds' connecting element */}
            <div className="animate-weds my-3 sm:my-5 flex items-center justify-center gap-4">
              <span className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold/70" />
              <span className="font-heading italic text-2xl sm:text-3xl md:text-4xl text-gold font-light tracking-widest px-2 drop-shadow-[0_0_10px_rgba(185,154,89,0.5)]">
                weds
              </span>
              <span className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold/70" />
            </div>

            {/* Bride's floating name */}
            <div className="animate-name-bride">
              <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ivory font-light tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                {wedding.couple.bride.name}
              </h2>
            </div>

            <GoldDivider className="mx-auto my-6 sm:my-8 opacity-70" width={160} />

            {/* Subtitle invitation */}
            <div className="text-center max-w-lg mx-auto px-4">
              <p className="font-body text-ivory/85 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                Together with their families,<br />
                we invite you to share in the joy of our wedding.
              </p>
            </div>

            {/* Tagline */}
            <p className="font-body text-gold/80 text-xs sm:text-sm tracking-[0.25em] uppercase mt-6 sm:mt-8 italic">
              Two families · Two hearts · One blessed beginning
            </p>
          </div>

          {/* Gentle scroll indicator to next section */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
            <span className="font-body text-[10px] sm:text-xs text-gold/80 tracking-widest uppercase">
              Scroll to explore
            </span>
            <svg className="w-4 h-4 text-gold animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* LEFT VELVET CURTAIN PANEL */}
        <div ref={curtainLeftRef} className="curtain-panel curtain-left" />

        {/* RIGHT VELVET CURTAIN PANEL */}
        <div ref={curtainRightRef} className="curtain-panel curtain-right" />

        {/* CONTENT ON CLOSED CURTAINS */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6"
        >
          <p className="font-arabic text-2xl sm:text-3xl md:text-4xl text-gold mb-3 leading-relaxed" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="font-body text-ivory/70 text-xs sm:text-sm tracking-widest uppercase mb-6 sm:mb-8">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>

          <div className="gold-divider !bg-gold/40 !w-16 !my-4 sm:!my-6" />

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory font-light tracking-wide mb-6">
            A beautiful new chapter begins…
          </h1>

          <button
            onClick={handleOpenInvitation}
            className="mt-4 px-8 py-3.5 border border-gold/70 bg-burgundy-dark/60 text-gold font-body text-sm tracking-widest uppercase
                       rounded-sm hover:bg-gold hover:text-burgundy-dark transition-all duration-300 shadow-lg hover:shadow-gold/20"
          >
            Open Invitation
          </button>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 scroll-indicator flex flex-col items-center gap-2">
            <p className="font-body text-ivory/50 text-xs tracking-widest uppercase">
              Scroll to unveil
            </p>
            <svg className="w-5 h-5 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
