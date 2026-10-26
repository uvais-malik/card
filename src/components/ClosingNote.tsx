import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GoldDivider } from './IslamicPattern';

gsap.registerPlugin(ScrollTrigger);

export const ClosingNote: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 40, opacity: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(transitionRef.current, {
        y: 30, opacity: 0, scale: 0.95, duration: 1.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: transitionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-container relative"
      style={{
        background: 'linear-gradient(180deg, #F8F1E5 0%, #F0E8D8 30%, #E8DFD0 60%, rgba(35, 61, 50, 0.08) 100%)',
      }}
    >
      <div ref={contentRef} className="text-center max-w-xl mx-auto">
        <p className="font-body text-gold text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
          A Blessed Journey
        </p>
        <h3 className="heading-secondary mb-8">
          A New Chapter, A Blessed Beginning
        </h3>

        <div className="text-body space-y-5">
          <p>
            As we take this beautiful step into a new chapter of our lives,
            we would be honoured to have you by our side.
          </p>
          <p>
            Your presence will make our celebration more special,
            and your duas will always hold a place in our hearts.
          </p>
          <p className="font-arabic text-lg text-burgundy/80 leading-relaxed">
            May Allah bless this union with sakinah, mawaddah, rahmah and barakah,
            and grant us a lifetime of love, understanding, happiness and togetherness.
          </p>
          <p>
            We look forward to celebrating with you.
          </p>
        </div>
      </div>

      <GoldDivider className="my-10" />

      {/* Dramatic transition text */}
      <div ref={transitionRef} className="text-center mt-4">
        <p className="font-heading text-2xl sm:text-3xl md:text-4xl text-burgundy font-light italic tracking-wide">
          And now, the moment we have been waiting for…
        </p>
      </div>
    </section>
  );
};
