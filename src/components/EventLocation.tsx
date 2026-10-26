import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { WeddingEvent } from '../data/wedding';

gsap.registerPlugin(ScrollTrigger);

interface EventLocationProps {
  event: WeddingEvent;
}

export const EventLocation: React.FC<EventLocationProps> = ({ event }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 30, opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-12 sm:py-16 px-4">
      <div ref={contentRef} className="max-w-lg mx-auto text-center">
        <p className="font-body text-gold text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
          Join Us at the Venue
        </p>
        <p className="text-body text-dark/70 mb-8">
          We look forward to welcoming you. Use the map below to find the venue and plan your journey.
        </p>

        {/* Venue card */}
        <div className="card-elegant mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg className="w-5 h-5 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h4 className="font-heading text-xl text-burgundy font-semibold">
              {event.venueName}
            </h4>
          </div>
          <p className="font-body text-dark/70 text-sm leading-relaxed mb-1">
            {event.address}
          </p>
          {event.notes && (
            <p className="font-body text-dark/50 text-xs italic mt-2">
              {event.notes}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary justify-center"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Open in Google Maps
          </a>
          <a
            href={event.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline justify-center"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
};
