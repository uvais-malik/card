import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { wedding } from '../data/wedding';
import { CornerOrnament, GoldDivider } from './IslamicPattern';
import '../styles/animations.css';

gsap.registerPlugin(ScrollTrigger);

export const OpeningLetter: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLElement | null)[]>([]);

  const setLineRef = (index: number) => (el: HTMLElement | null) => {
    linesRef.current[index] = el;
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Card entrance
      gsap.from(cardRef.current, {
        y: 60, opacity: 0, scale: 0.96, duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Stagger text lines
      const lines = linesRef.current.filter(Boolean);
      gsap.from(lines, {
        y: 20, opacity: 0, duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const groomFirst = wedding.couple.groom.name.split(' ')[0];
  const brideFirst = wedding.couple.bride.name.split(' ')[0];

  return (
    <section ref={sectionRef} className="section-container bg-ivory-dark/30">
      <div ref={cardRef} className="letter-card max-w-2xl w-full mx-auto p-8 sm:p-12 md:p-16 relative">
        {/* Corner ornaments */}
        <CornerOrnament className="absolute top-3 left-3 opacity-25 w-12 h-12 sm:w-14 sm:h-14" />
        <CornerOrnament className="absolute top-3 right-3 opacity-25 w-12 h-12 sm:w-14 sm:h-14 -scale-x-100" />
        <CornerOrnament className="absolute bottom-3 left-3 opacity-25 w-12 h-12 sm:w-14 sm:h-14 -scale-y-100" />
        <CornerOrnament className="absolute bottom-3 right-3 opacity-25 w-12 h-12 sm:w-14 sm:h-14 -scale-x-100 -scale-y-100" />

        {/* Heading */}
        <h3 ref={setLineRef(0)} className="heading-secondary text-center mb-8">
          A Note From Our Hearts
        </h3>

        <GoldDivider className="mb-8" />

        {/* Letter body */}
        <div className="text-body text-center space-y-5 leading-relaxed">
          <p ref={setLineRef(1)} className="font-medium text-burgundy">
            Dear Family and Friends,
          </p>
          <p ref={setLineRef(2)}>
            Some moments become memories that we carry in our hearts forever.
            With immense gratitude and happiness, we invite you to be part of
            one of the most meaningful chapters of our lives.
          </p>
          <p ref={setLineRef(3)}>
            As we prepare to begin our journey together, your presence, prayers
            and blessings would mean more to us than words can express.
          </p>
          <p ref={setLineRef(4)}>
            It would be our greatest joy to celebrate this special occasion
            surrounded by the people who have made our lives so beautiful.
          </p>
        </div>

        <GoldDivider className="my-8" />

        {/* Signature */}
        <div ref={setLineRef(5)} className="text-center">
          <p className="text-body text-dark/70 mb-2">With love and gratitude,</p>
          <p className="font-heading text-xl sm:text-2xl text-burgundy">
            {groomFirst} &amp; {brideFirst}
          </p>
        </div>

        {/* Decorative wax seal */}
        <div ref={setLineRef(6)} className="flex justify-center mt-8">
          <div className="w-16 h-16 rounded-full bg-burgundy/10 border border-gold/30 flex items-center justify-center">
            <span className="font-heading text-gold text-xl">
              {groomFirst.charAt(0)}&amp;{brideFirst.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
