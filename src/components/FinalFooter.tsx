import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { wedding } from '../data/wedding';
import { GoldDivider, IslamicPattern } from './IslamicPattern';

gsap.registerPlugin(ScrollTrigger);

export const FinalFooter: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const groomFirst = wedding.couple.groom.name.split(' ')[0];
  const brideFirst = wedding.couple.bride.name.split(' ')[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 40, opacity: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `You are cordially invited to the wedding of ${wedding.couple.groom.name} & ${wedding.couple.bride.name}. View our invitation: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-burgundy text-ivory">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <IslamicPattern size={80} color="#F8F1E5" />
      </div>

      <div className="section-container relative z-10 min-h-[80vh]">
        <div ref={contentRef} className="text-center max-w-xl mx-auto">
          <p className="font-body text-gold text-xs sm:text-sm tracking-[0.3em] uppercase mb-6">
            With Love &amp; Duas
          </p>

          <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl text-ivory font-light mb-8">
            Until We Celebrate Together
          </h3>

          <GoldDivider className="mx-auto my-8" />

          <div className="space-y-5 text-ivory/80 text-body">
            <p>Thank you for being a part of our story.</p>
            <p>
              May Allah fill our lives with barakah and bring happiness, peace
              and blessings to every home represented here.
            </p>
            <p>We look forward to creating beautiful memories with you.</p>
          </div>

          <GoldDivider className="mx-auto my-8" />

          <p className="font-body text-ivory/60 text-sm mb-2">With love and duas,</p>
          <p className="font-heading text-2xl sm:text-3xl text-gold">
            {groomFirst} &amp; {brideFirst}
          </p>

          {/* Final line */}
          <p className="font-heading text-lg text-ivory/50 italic mt-10">
            Bismillah — our forever begins.
          </p>

          {/* WhatsApp share */}
          <button
            onClick={shareOnWhatsApp}
            className="mt-10 inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-body text-sm
                       font-medium tracking-wider uppercase rounded-sm hover:bg-[#20BD5A] transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Share on WhatsApp
          </button>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="font-body text-ivory/30 text-xs">
            Made with love for a beautiful new beginning.
          </p>
        </div>
      </div>
    </section>
  );
};
