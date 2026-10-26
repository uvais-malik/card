import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { wedding, WeddingEvent } from '../data/wedding';
import { CornerOrnament, GoldDivider } from './IslamicPattern';

gsap.registerPlugin(ScrollTrigger);

const ReceptionCard: React.FC<{ event: WeddingEvent }> = ({ event }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 50, opacity: 0, scale: 0.95, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="card-elegant relative max-w-lg mx-auto">
      {/* Corner ornaments */}
      <CornerOrnament className="absolute top-2 left-2 opacity-20 w-8 h-8" />
      <CornerOrnament className="absolute top-2 right-2 opacity-20 w-8 h-8 -scale-x-100" />

      <div className="text-center">
        <p className="font-body text-gold text-xs tracking-[0.2em] uppercase mb-3">
          {event.title}
        </p>

        <h4 className="font-heading text-2xl sm:text-3xl text-burgundy font-semibold mb-4">
          {event.displayDate}
        </h4>

        <p className="font-body text-dark text-base mb-4">
          {event.displayTime}
        </p>

        <GoldDivider className="mx-auto my-5" width={120} />

        <div className="flex items-center justify-center gap-2 mb-2">
          <svg className="w-4 h-4 text-burgundy/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="font-heading text-lg text-burgundy">
            {event.venueName}
          </p>
        </div>

        <p className="font-body text-dark/60 text-sm mb-4">
          {event.address}
        </p>

        {event.message && (
          <p className="text-body text-dark/70 italic text-sm mb-6 max-w-md mx-auto">
            {event.message}
          </p>
        )}

        {event.notes && (
          <p className="font-body text-dark/40 text-xs italic mb-6">
            {event.notes}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs justify-center"
          >
            View Location
          </a>
          <a
            href={event.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs justify-center"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
};

export const ReceptionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const receptions = wedding.events.filter((e) => e.type === 'reception');

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (receptions.length === 0) return null;

  return (
    <section ref={sectionRef} className="section-container bg-ivory">
      <div ref={headingRef} className="text-center mb-12">
        <p className="font-body text-gold text-xs sm:text-sm tracking-[0.4em] uppercase mb-4">
          The Celebrations Continue
        </p>
        <h3 className="heading-primary mb-6">
          Join Us for the Celebrations
        </h3>
        <p className="text-body max-w-lg mx-auto">
          The joy of this occasion would be incomplete without sharing it with our
          family and friends. We would be delighted to celebrate with you at the
          following gatherings.
        </p>
      </div>

      <div className="w-full max-w-xl mx-auto space-y-8">
        {receptions.map((event) => (
          <ReceptionCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};
