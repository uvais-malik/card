import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { wedding } from '../data/wedding';
import { GoldDivider } from './IslamicPattern';

gsap.registerPlugin(ScrollTrigger);

export const FamilyDirectory: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(boxRef.current, {
        y: 50, opacity: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-container bg-ivory-dark/20"
    >
      <div className="text-center mb-8">
        <p className="font-body text-gold text-xs sm:text-sm tracking-[0.3em] uppercase mb-3">
          Shared with love
        </p>
        <h3 className="heading-primary mb-3">Our Families</h3>
        <p className="text-body max-w-lg mx-auto text-sm">
          This invitation is sent with the warmth and prayers of our extended families.
        </p>
      </div>

      {/* Family Directory Box */}
      <div
        ref={boxRef}
        className="max-w-2xl mx-auto bg-ivory-light/80 border border-gold/30 rounded-lg px-6 py-7 shadow-sm relative"
      >
        {wedding.familyGroups.map((group, gi) => (
          <React.Fragment key={group.heading}>
            {gi > 0 && (
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                <span className="text-gold text-xs">✦</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-transparent" />
              </div>
            )}
            <div className="text-center">
              <p className="font-body text-[10px] sm:text-xs tracking-[0.25em] uppercase text-burgundy font-semibold mb-2">
                {group.heading}
              </p>
              <p className="font-body text-sm sm:text-base text-dark/80 leading-relaxed">
                {group.names.map((name, ni) => (
                  <React.Fragment key={name}>
                    {ni > 0 && (
                      <span className="mx-2 text-gold/60">•</span>
                    )}
                    <span>{name}</span>
                  </React.Fragment>
                ))}
              </p>
            </div>
          </React.Fragment>
        ))}

        {/* Divider before firm brand */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <span className="text-gold text-xs">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-transparent" />
        </div>

        {/* Firm branding — right-aligned */}
        <div className="text-right">
          <p className="font-body text-xs sm:text-sm font-bold text-burgundy tracking-wide">
            {wedding.firmBranding.name}
          </p>
          <p className="font-body text-xs text-dark/60">
            {wedding.firmBranding.phones.join(' | ')}
          </p>
        </div>
      </div>
    </section>
  );
};
