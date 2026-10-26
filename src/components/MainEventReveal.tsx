import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { wedding } from '../data/wedding';
import { Countdown } from './Countdown';
import { EventLocation } from './EventLocation';
import { CornerOrnament, GoldDivider, IslamicPattern } from './IslamicPattern';

gsap.registerPlugin(ScrollTrigger);

export const MainEventReveal: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const mainEvent = wedding.events.find((e) => e.id === wedding.mainEventId);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        y: 20, opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(cardRef.current, {
        y: 80, opacity: 0, scale: 0.9, duration: 1.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      if (detailsRef.current) {
        const children = detailsRef.current.children;
        gsap.from(children, {
          y: 25, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: {
            trigger: detailsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!mainEvent) return null;

  return (
    <section ref={sectionRef} className="bg-forest/[0.03] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <IslamicPattern size={100} color="#233D32" />
      </div>

      <div className="section-container">
        {/* Section label */}
        <p
          ref={labelRef}
          className="font-body text-gold text-xs sm:text-sm tracking-[0.4em] uppercase mb-6"
        >
          The Wedding Celebration
        </p>

        {/* Main reveal card */}
        <div
          ref={cardRef}
          className="relative max-w-lg w-full mx-auto glow-warm"
        >
          {/* Arch-framed card */}
          <div className="arch-frame bg-ivory-light/80 backdrop-blur-sm text-center">
            {/* Corner ornaments */}
            <CornerOrnament className="absolute top-3 left-3 opacity-20 w-10 h-10" />
            <CornerOrnament className="absolute top-3 right-3 opacity-20 w-10 h-10 -scale-x-100" />

            <div ref={detailsRef}>
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl text-burgundy font-semibold mb-2">
                The Nikah Ceremony
              </h3>

              <GoldDivider className="mx-auto my-5" width={150} />

              <p className="font-body text-gold text-xs tracking-[0.2em] uppercase mb-4">
                {mainEvent.title}
              </p>

              <p className="font-heading text-3xl sm:text-4xl md:text-5xl text-burgundy font-bold mb-3">
                {mainEvent.displayDate}
              </p>

              <p className="font-body text-dark text-lg mb-6">
                {mainEvent.displayTime}
              </p>

              <GoldDivider className="mx-auto my-5" width={100} />

              <p className="font-heading text-xl sm:text-2xl text-burgundy-light mb-2">
                {mainEvent.venueName}
              </p>

              <p className="font-body text-dark/70 text-sm leading-relaxed mb-4">
                {mainEvent.address}
              </p>

              <a
                href={mainEvent.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 border border-burgundy/50 rounded-full
                           text-burgundy font-body text-xs tracking-widest uppercase
                           hover:bg-burgundy hover:text-ivory transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown */}
      <Countdown dateTimeISO={mainEvent.dateTimeISO} />

      {/* Location */}
      <EventLocation event={mainEvent} />
    </section>
  );
};
