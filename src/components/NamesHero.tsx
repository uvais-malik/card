import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { wedding } from '../data/wedding';
import { CornerOrnament, GoldDivider } from './IslamicPattern';

gsap.registerPlugin(ScrollTrigger);

export const NamesHero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const groomRef = useRef<HTMLHeadingElement>(null);
  const ampersandRef = useRef<HTMLSpanElement>(null);
  const brideRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.from(groomRef.current, {
        y: 40, opacity: 0, duration: 1.2, ease: 'power3.out',
      });
      tl.from(ampersandRef.current, {
        scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(1.7)',
      }, '-=0.6');
      tl.from(brideRef.current, {
        y: 40, opacity: 0, duration: 1.2, ease: 'power3.out',
      }, '-=0.4');
      tl.from(subtitleRef.current, {
        y: 20, opacity: 0, duration: 0.8, ease: 'power2.out',
      }, '-=0.3');
      tl.from(taglineRef.current, {
        y: 15, opacity: 0, duration: 0.8, ease: 'power2.out',
      }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-container bg-ivory relative"
    >
      {/* Decorative corners */}
      <CornerOrnament className="absolute top-6 left-6 opacity-30" />
      <CornerOrnament className="absolute top-6 right-6 opacity-30 -scale-x-100" />
      <CornerOrnament className="absolute bottom-6 left-6 opacity-30 -scale-y-100" />
      <CornerOrnament className="absolute bottom-6 right-6 opacity-30 -scale-x-100 -scale-y-100" />

      {/* Small heading */}
      <p className="font-body text-gold text-xs sm:text-sm tracking-[0.3em] uppercase mb-8">
        With the Blessings of Allah (SWT)
      </p>

      {/* Groom name */}
      <h2
        ref={groomRef}
        className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-burgundy font-light tracking-wide"
      >
        {wedding.couple.groom.name}
      </h2>

      {/* Ampersand */}
      <span
        ref={ampersandRef}
        className="block font-heading text-3xl sm:text-4xl text-gold my-4 sm:my-6"
      >
        &amp;
      </span>

      {/* Bride name */}
      <h2
        ref={brideRef}
        className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-burgundy font-light tracking-wide"
      >
        {wedding.couple.bride.name}
      </h2>

      <GoldDivider className="my-8" />

      {/* Subtitle */}
      <div ref={subtitleRef} className="text-center max-w-md">
        <p className="text-body">
          Together with their families,<br />
          we invite you to share in the joy of our wedding.
        </p>
      </div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="font-body text-gold/70 text-sm tracking-widest mt-8 italic"
      >
        Two families. Two hearts. One blessed beginning.
      </p>
    </section>
  );
};
