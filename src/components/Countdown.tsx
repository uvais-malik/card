import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCountdown } from '../hooks/useCountdown';
import { GoldDivider } from './IslamicPattern';

gsap.registerPlugin(ScrollTrigger);

interface CountdownProps {
  dateTimeISO: string;
}

export const Countdown: React.FC<CountdownProps> = ({ dateTimeISO }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { days, hours, minutes, seconds, isExpired } = useCountdown(dateTimeISO);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 40, opacity: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <div ref={sectionRef} className="py-16 sm:py-20 px-4">
      <div ref={contentRef} className="max-w-2xl mx-auto text-center">
        <p className="font-body text-gold text-xs sm:text-sm tracking-[0.3em] uppercase mb-6">
          The Celebration Begins In
        </p>

        {isExpired ? (
          <div className="space-y-4">
            <p className="font-heading text-2xl sm:text-3xl text-burgundy font-semibold">
              Alhamdulillah, the day has arrived!
            </p>
            <p className="text-body">
              We cannot wait to celebrate with you.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-center gap-3 sm:gap-5 mb-8">
              {units.map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-burgundy/5 border border-gold/20 rounded-sm
                                  flex items-center justify-center mb-2 backdrop-blur-sm">
                    <span className="font-heading text-2xl sm:text-3xl md:text-4xl text-burgundy font-bold">
                      {String(value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="font-body text-xs text-dark/50 tracking-widest uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-body text-dark/60 italic">
              Every passing moment brings us closer to our special day.
            </p>
          </>
        )}

        <GoldDivider className="mt-10" />
      </div>
    </div>
  );
};
