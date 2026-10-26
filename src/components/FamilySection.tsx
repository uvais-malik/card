import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { wedding } from '../data/wedding';
import { GoldDivider, IslamicPattern } from './IslamicPattern';

gsap.registerPlugin(ScrollTrigger);

export const FamilySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const groomFamilyRef = useRef<HTMLDivElement>(null);
  const brideFamilyRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 30, opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(groomFamilyRef.current, {
        x: -60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: groomFamilyRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(brideFamilyRef.current, {
        x: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: brideFamilyRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(dividerRef.current, {
        scaleY: 0, opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: dividerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-container bg-ivory relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <IslamicPattern size={80} />
      </div>

      {/* Host line */}
      <div ref={headingRef} className="text-center mb-3 relative z-10">
        <p className="font-body text-gold text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
          With the divine blessings of Almighty Allah
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-burgundy font-semibold mb-1">
          {wedding.host.name}
        </h2>
        <p className="font-body text-sm text-dark/60 italic mb-8">
          cordially requests the pleasure of your company and prayers on the auspicious occasion of
          the wedding ceremony of his beloved granddaughter
        </p>
        <GoldDivider className="mx-auto mb-10" width={180} />
      </div>

      {/* Family columns */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 relative">

          {/* Bride's family */}
          <div ref={brideFamilyRef} className="text-center px-6 md:px-10 py-8">
            <div className="arch-frame inline-block bg-ivory-light/70 shadow-sm">
              <p className="font-body text-gold text-xs tracking-[0.2em] uppercase mb-3 font-medium">
                The Bride
              </p>
              <h4 className="font-heading text-3xl sm:text-4xl text-burgundy font-semibold mb-1">
                {wedding.couple.bride.name}
              </h4>
              <p className="font-body text-sm text-gold-dark font-medium tracking-wide mb-1">
                Daughter of {wedding.couple.bride.father}
              </p>
              <p className="font-body text-xs text-dark/50 mb-4">
                {wedding.brideAddress}
              </p>
              <GoldDivider className="mx-auto mb-5" width={120} />
              <p className="text-body text-xs sm:text-sm text-dark/70 uppercase tracking-wider mb-2 font-medium">
                Beloved Daughter of
              </p>
              <p className="font-heading text-xl sm:text-2xl text-burgundy font-medium">
                {wedding.couple.bride.father}
              </p>
            </div>
          </div>

          {/* Center divider (desktop) */}
          <div
            ref={dividerRef}
            className="hidden md:block absolute left-1/2 top-8 bottom-8 -translate-x-1/2"
          >
            <div className="w-px h-full bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
          </div>

          {/* Mobile divider */}
          <div className="md:hidden flex justify-center">
            <GoldDivider width={150} />
          </div>

          {/* Groom's family */}
          <div ref={groomFamilyRef} className="text-center px-6 md:px-10 py-8">
            <div className="arch-frame inline-block bg-ivory-light/70 shadow-sm">
              <p className="font-body text-gold text-xs tracking-[0.2em] uppercase mb-3 font-medium">
                The Groom
              </p>
              <h4 className="font-heading text-3xl sm:text-4xl text-burgundy font-semibold mb-1">
                {wedding.couple.groom.name}
              </h4>
              <p className="font-body text-sm text-gold-dark font-medium tracking-wide mb-1">
                Son of {wedding.couple.groom.father}
              </p>
              <p className="font-body text-xs text-dark/50 mb-4">
                {wedding.groomAddress}
              </p>
              <GoldDivider className="mx-auto mb-5" width={120} />
              <p className="text-body text-xs sm:text-sm text-dark/70 uppercase tracking-wider mb-2 font-medium">
                Beloved Son of
              </p>
              <p className="font-heading text-xl sm:text-2xl text-burgundy font-medium">
                {wedding.couple.groom.father}
              </p>
            </div>
          </div>
        </div>

        {/* Dua */}
        <div className="text-center mt-10 px-4">
          <GoldDivider className="mx-auto mb-6" width={180} />
          <p
            className="font-arabic text-2xl sm:text-3xl text-burgundy leading-loose mb-3"
            dir="rtl"
          >
            {wedding.dua.arabic}
          </p>
          <p className="font-body italic text-sm text-dark/60 max-w-md mx-auto">
            "{wedding.dua.english}"
          </p>
        </div>
      </div>
    </section>
  );
};
