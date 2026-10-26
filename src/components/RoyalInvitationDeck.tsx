import React, { useState, useRef } from 'react';
import { wedding } from '../data/wedding';
import { useCountdown } from '../hooks/useCountdown';
import '../styles/animations.css';

export const RoyalInvitationDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'slider' | 'scroll'>('slider');

  const mainEvent = wedding.events[0];
  const countdown = useCountdown(mainEvent.dateTimeISO);

  const totalCards = 3;

  // Swipe detection for mobile devices
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && currentSlide < totalCards - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide < totalCards - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const createGoogleCalendarLink = () => {
    const title = encodeURIComponent('Wedding: Haider Ali & Lubna Naaz');
    const details = encodeURIComponent(
      'The Nikah Ceremony of Haider Ali & Lubna Naaz at King Palace, Meerut.'
    );
    const location = encodeURIComponent('King Palace, Hapur Road, Phaphunda, Meerut, Uttar Pradesh');
    // 2026-11-13 19:00 IST -> 13:30 UTC
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261113T133000Z/20261113T183000Z&details=${details}&location=${location}`;
  };

  return (
    <section id="invitation-deck" className="relative w-full py-12 sm:py-20 px-3 sm:px-6 bg-[#FAF7F2] overflow-hidden">
      {/* Background paper texture & watermarked Islamic pattern */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#B99A59_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold-dark text-xs sm:text-sm font-cinzel font-semibold tracking-[0.2em] uppercase mb-3 shadow-sm">
            <span>✦</span>
            <span>Sacred Nuptial Suite</span>
            <span>✦</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl text-burgundy font-normal tracking-wide">
            The Wedding Invitation
          </h2>
          <p className="font-body text-dark/60 text-xs sm:text-sm tracking-widest uppercase mt-2">
            Swipe or use tabs below to navigate through the 3-page royal suite
          </p>

          {/* Luxury Tab Navigation & View Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 max-w-2xl mx-auto">
            {/* 3 Gold Pill Tabs */}
            <div className="flex items-center justify-center p-1 bg-ivory-dark/40 rounded-full border border-gold/30 shadow-inner w-full sm:w-auto">
              <button
                onClick={() => {
                  setViewMode('slider');
                  setCurrentSlide(0);
                }}
                className={`flex-1 sm:flex-initial px-3 sm:px-5 py-2 rounded-full text-xs font-cinzel font-semibold tracking-wider transition-all duration-300 ${
                  viewMode === 'slider' && currentSlide === 0
                    ? 'bg-burgundy text-gold shadow-md scale-102'
                    : 'text-dark/70 hover:text-burgundy'
                }`}
              >
                1. Invitation
              </button>
              <button
                onClick={() => {
                  setViewMode('slider');
                  setCurrentSlide(1);
                }}
                className={`flex-1 sm:flex-initial px-3 sm:px-5 py-2 rounded-full text-xs font-cinzel font-semibold tracking-wider transition-all duration-300 ${
                  viewMode === 'slider' && currentSlide === 1
                    ? 'bg-burgundy text-gold shadow-md scale-102'
                    : 'text-dark/70 hover:text-burgundy'
                }`}
              >
                2. Nikah &amp; Venue
              </button>
              <button
                onClick={() => {
                  setViewMode('slider');
                  setCurrentSlide(2);
                }}
                className={`flex-1 sm:flex-initial px-3 sm:px-5 py-2 rounded-full text-xs font-cinzel font-semibold tracking-wider transition-all duration-300 ${
                  viewMode === 'slider' && currentSlide === 2
                    ? 'bg-burgundy text-gold shadow-md scale-102'
                    : 'text-dark/70 hover:text-burgundy'
                }`}
              >
                3. Family
              </button>
            </div>

            {/* Slider / Continuous Scroll Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'slider' ? 'scroll' : 'slider')}
                className="px-4 py-2 rounded-full border border-gold/50 bg-white/80 hover:bg-gold/15 text-dark/80 text-xs font-body tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                title="Toggle between slider cards and full continuous scroll"
              >
                {viewMode === 'slider' ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span>View All (Scroll)</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    <span>Slide Mode</span>
                  </>
                )}
              </button>

              {/* Download PDF button */}
              <a
                href="/invitation.pdf"
                download="Haider-Ali-Lubna-Naaz-Wedding-Invitation.pdf"
                className="px-4 py-2 rounded-full bg-gold/20 hover:bg-gold border border-gold/70 text-burgundy font-cinzel font-semibold text-xs tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                title="Download original 3-page PDF"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>PDF Card</span>
              </a>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SLIDER VIEW MODE
            ══════════════════════════════════════════════════════════ */}
        {viewMode === 'slider' ? (
          <div
            className="relative w-full"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Floating Previous Arrow */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              aria-label="Previous card"
              className={`absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-ivory-light/95 border border-gold/60 text-burgundy flex items-center justify-center shadow-xl transition-all duration-300 ${
                currentSlide === 0
                  ? 'opacity-20 cursor-not-allowed'
                  : 'hover:bg-gold hover:text-white hover:scale-110 active:scale-95 cursor-pointer'
              }`}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Floating Next Arrow */}
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalCards - 1}
              aria-label="Next card"
              className={`absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-ivory-light/95 border border-gold/60 text-burgundy flex items-center justify-center shadow-xl transition-all duration-300 ${
                currentSlide === totalCards - 1
                  ? 'opacity-20 cursor-not-allowed'
                  : 'hover:bg-gold hover:text-white hover:scale-110 active:scale-95 cursor-pointer'
              }`}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Card Window */}
            <div className="overflow-hidden rounded-2xl shadow-2xl border border-gold/40 bg-white">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* ───────────────── SLIDE 1: MAIN INVITATION ───────────────── */}
                <div className="w-full flex-shrink-0">
                  <CardOneContent />
                </div>

                {/* ───────────────── SLIDE 2: NIKAH CEREMONY & VENUE ───────── */}
                <div className="w-full flex-shrink-0">
                  <CardTwoContent
                    mainEvent={mainEvent}
                    countdown={countdown}
                    calendarLink={createGoogleCalendarLink()}
                  />
                </div>

                {/* ───────────────── SLIDE 3: FAMILY & COMPLIMENTS ──────────── */}
                <div className="w-full flex-shrink-0">
                  <CardThreeContent />
                </div>
              </div>
            </div>

            {/* Bottom Slider Dots & Indicator */}
            <div className="flex items-center justify-center gap-3 mt-6">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === idx
                      ? 'w-8 h-2.5 bg-burgundy shadow-md'
                      : 'w-2.5 h-2.5 bg-gold/40 hover:bg-gold'
                  }`}
                  aria-label={`Go to card ${idx + 1}`}
                />
              ))}
              <span className="font-cinzel text-xs text-dark/60 ml-2 font-medium">
                Page {currentSlide + 1} of 3
              </span>
            </div>
          </div>
        ) : (
          /* ══════════════════════════════════════════════════════════
              CONTINUOUS SCROLL MODE (ALL 3 CARDS IN HARMONY)
              ══════════════════════════════════════════════════════════ */
          <div className="space-y-12">
            <div className="overflow-hidden rounded-2xl shadow-2xl border border-gold/40 bg-white">
              <CardOneContent />
            </div>

            <div className="overflow-hidden rounded-2xl shadow-2xl border border-gold/40 bg-white">
              <CardTwoContent
                mainEvent={mainEvent}
                countdown={countdown}
                calendarLink={createGoogleCalendarLink()}
              />
            </div>

            <div className="overflow-hidden rounded-2xl shadow-2xl border border-gold/40 bg-white">
              <CardThreeContent />
            </div>
          </div>
        )}

        {/* Quick Share / RSVP Action Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-ivory-light via-white to-ivory-light border border-gold/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-cinzel text-base font-bold text-burgundy">
              Honour Us With Your Presence &amp; Duas
            </h4>
            <p className="font-body text-xs text-dark/70 mt-0.5">
              Friday, 13 November 2026 • King Palace, Meerut
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href={mainEvent.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full border border-burgundy/60 bg-burgundy/5 hover:bg-burgundy hover:text-white text-burgundy font-cinzel text-xs font-semibold tracking-wider transition-all"
            >
              📍 Open Location
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                'Wedding Invitation: You are cordially invited to celebrate the Nikah Ceremony of Lubna Naaz & Haider Ali on Friday, 13 November 2026 at King Palace, Meerut. View complete invitation: ' +
                  window.location.href
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-body text-xs font-medium tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Share on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════
// CARD 1 COMPONENT: MAIN INVITATION
// ══════════════════════════════════════════════════════════════
const CardOneContent: React.FC = () => {
  return (
    <div
      className="relative w-full min-h-[640px] sm:min-h-[750px] p-6 sm:p-12 md:p-16 flex flex-col items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: 'url(/background_image_one.jpg)',
        backgroundColor: '#FFFDF9',
      }}
    >
      {/* Semi-transparent inner parchment panel for perfect readability */}
      <div className="w-full max-w-xl mx-auto py-8 px-5 sm:px-10 rounded-2xl bg-white/75 backdrop-blur-[4px] border border-gold/40 shadow-lg relative">
        {/* Divine blessing */}
        <p className="font-heading italic text-sm sm:text-base text-dark/70 mb-2">
          With the divine blessings of Almighty Allah,
        </p>

        {/* Grandfather / Host */}
        <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-extrabold text-burgundy tracking-[0.14em] uppercase mb-3">
          HAJI ANWAR AHMED
        </h3>

        <p className="font-heading text-xs sm:text-sm text-dark/80 leading-relaxed max-w-md mx-auto mb-2">
          cordially requests the pleasure of your company and prayers on the auspicious occasion of the
          wedding ceremony of his beloved
        </p>

        <p className="font-cinzel text-xs sm:text-sm font-bold text-gold-dark tracking-[0.25em] uppercase my-2">
          GRANDDAUGHTER
        </p>

        {/* Bride's Name */}
        <h2 className="font-calligraphy text-4xl sm:text-5xl md:text-6xl text-burgundy font-normal my-1 drop-shadow-sm">
          Lubna Naaz
        </h2>

        <p className="font-heading text-xs sm:text-sm text-dark/80 font-medium">
          Daughter of Haji Sarfraz Ali
        </p>
        <p className="font-body text-[10px] sm:text-xs text-dark/60 tracking-wider">
          R/o 783/3A, Zaidi Nagar Society, Meerut
        </p>

        {/* Connecting with */}
        <div className="my-3 flex items-center justify-center gap-3">
          <span className="w-10 sm:w-16 h-px bg-gold/40" />
          <span className="font-calligraphy text-xl sm:text-2xl text-gold-dark italic px-2">
            — with —
          </span>
          <span className="w-10 sm:w-16 h-px bg-gold/40" />
        </div>

        {/* Groom's Name */}
        <h2 className="font-calligraphy text-4xl sm:text-5xl md:text-6xl text-burgundy font-normal my-1 drop-shadow-sm">
          Haider Ali
        </h2>

        <p className="font-heading text-xs sm:text-sm text-dark/80 font-medium">
          Son of Mohd Naim Ahmed
        </p>
        <p className="font-body text-[10px] sm:text-xs text-dark/60 tracking-wider mb-6">
          R/o 696, Siyana, Bulandshahr, Uttar Pradesh
        </p>

        {/* Quranic / Wedding Dua */}
        <div className="pt-4 border-t border-gold/30">
          <p className="font-arabic text-xl sm:text-2xl text-burgundy leading-loose" dir="rtl">
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className="font-heading italic text-xs sm:text-sm text-dark/70 mt-1 max-w-md mx-auto">
            “May Allah bless you both, shower His bounties upon you, and unite you in goodness.”
          </p>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// CARD 2 COMPONENT: NIKAH CEREMONY & VENUE
// ══════════════════════════════════════════════════════════════
interface CardTwoProps {
  mainEvent: typeof wedding.events[0];
  countdown: ReturnType<typeof useCountdown>;
  calendarLink: string;
}

const CardTwoContent: React.FC<CardTwoProps> = ({ mainEvent, countdown, calendarLink }) => {
  return (
    <div
      className="relative w-full min-h-[640px] sm:min-h-[750px] p-6 sm:p-12 md:p-16 flex flex-col items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: 'url(/background_image_two.jpg)',
        backgroundColor: '#FFFDF9',
      }}
    >
      <div className="w-full max-w-xl mx-auto py-8 px-5 sm:px-10 rounded-2xl bg-white/80 backdrop-blur-[4px] border border-gold/40 shadow-lg">
        {/* Celebration Title */}
        <p className="font-cinzel text-xs sm:text-sm font-bold text-gold-dark tracking-[0.24em] uppercase mb-1">
          THE WEDDING CELEBRATION
        </p>
        <h2 className="font-heading text-2xl sm:text-4xl text-burgundy font-bold tracking-wide">
          Lubna Naaz &amp; Haider Ali
        </h2>
        <p className="font-heading italic text-xs sm:text-sm text-dark/70 mt-0.5 mb-5">
          Two families · Two hearts · One blessed beginning
        </p>

        {/* Ceremony Card Box */}
        <div className="p-5 sm:p-6 rounded-xl bg-ivory-light/90 border border-gold/45 shadow-sm my-4">
          <p className="font-cinzel text-xs sm:text-sm font-bold text-burgundy tracking-[0.22em] uppercase pb-2 border-b border-gold/30 mb-4">
            THE NIKAH CEREMONY
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Day & Date */}
            <div>
              <p className="font-cinzel text-[10px] sm:text-xs font-semibold text-gold-dark tracking-[0.2em] uppercase mb-1">
                DAY &amp; DATE
              </p>
              <p className="font-heading text-xl sm:text-2xl md:text-3xl text-burgundy font-bold leading-tight">
                Friday, 13 November 2026
              </p>
            </div>

            {/* Time */}
            <div className="sm:border-l sm:border-gold/35 sm:pl-4">
              <p className="font-cinzel text-[10px] sm:text-xs font-semibold text-gold-dark tracking-[0.2em] uppercase mb-1">
                TIME
              </p>
              <p className="font-heading text-lg sm:text-2xl text-burgundy font-bold">
                7:00 PM Onwards
              </p>
            </div>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="my-5">
          <p className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-dark/60 mb-2">
            Countdown to the Blessed Union
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Mins', value: countdown.minutes },
              { label: 'Secs', value: countdown.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="w-14 sm:w-16 py-2 rounded-lg bg-burgundy/10 border border-gold/40 flex flex-col items-center"
              >
                <span className="font-cinzel text-base sm:text-xl font-bold text-burgundy">
                  {unit.value}
                </span>
                <span className="font-body text-[9px] uppercase tracking-wider text-dark/60">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Venue Spotlight */}
        <div className="pt-3 border-t border-gold/30">
          <p className="font-cinzel text-[10px] sm:text-xs font-semibold text-gold-dark tracking-[0.22em] uppercase mb-1">
            VENUE
          </p>
          <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-burgundy tracking-wider uppercase">
            KING PALACE
          </h3>
          <p className="font-body text-xs sm:text-sm text-dark/75 max-w-sm mx-auto leading-relaxed mt-1 mb-4">
            Hapur Road, Phaphunda, Meerut, Uttar Pradesh 245206
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href={mainEvent.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full border border-burgundy bg-burgundy/5 hover:bg-burgundy hover:text-white text-burgundy font-body text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Google Maps</span>
            </a>
            <a
              href={calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full border border-gold/60 bg-gold/10 hover:bg-gold hover:text-white text-burgundy font-body text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Add to Calendar</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// CARD 3 COMPONENT: FAMILY & COMPLIMENTS
// ══════════════════════════════════════════════════════════════
const CardThreeContent: React.FC = () => {
  return (
    <div
      className="relative w-full min-h-[640px] sm:min-h-[750px] p-6 sm:p-12 md:p-16 flex flex-col items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: 'url(/background_image_three.jpg)',
        backgroundColor: '#FFFDF9',
      }}
    >
      <div className="w-full max-w-xl mx-auto py-8 px-5 sm:px-10 rounded-2xl bg-white/80 backdrop-blur-[4px] border border-gold/40 shadow-lg relative">
        {/* Arabic Bismillah */}
        <p className="font-arabic text-2xl sm:text-3xl text-burgundy mb-4" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        {/* Family Sections Box */}
        <div className="space-y-4">
          {/* 1. FROM */}
          <div>
            <p className="font-cinzel text-[11px] sm:text-xs font-bold text-burgundy tracking-[0.24em] uppercase mb-1">
              FROM
            </p>
            <p className="font-heading text-sm sm:text-base text-dark/85 font-medium leading-relaxed">
              Zulfukar Ali <span className="text-gold">·</span> Haji Sarfraz Ali{' '}
              <span className="text-gold">·</span> Javed Ali <span className="text-gold">·</span> Haji Parvez Ali
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 w-3/4 mx-auto">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <span className="text-gold text-xs">✦</span>
            <span className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-transparent" />
          </div>

          {/* 2. WITH THE BEST COMPLIMENTS FROM */}
          <div>
            <p className="font-cinzel text-[11px] sm:text-xs font-bold text-burgundy tracking-[0.24em] uppercase mb-1">
              WITH THE BEST COMPLIMENTS FROM
            </p>
            <p className="font-heading text-sm sm:text-base text-dark/85 font-medium leading-relaxed">
              Mehraj Malik <span className="text-gold">·</span> Haji Jameel Malik{' '}
              <span className="text-gold">·</span> Faisal Malik <span className="text-gold">·</span> Mohd Uvais{' '}
              <span className="text-gold">·</span> Junaid Ali <span className="text-gold">·</span> Abaan Ali
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 w-3/4 mx-auto">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <span className="text-gold text-xs">✦</span>
            <span className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-transparent" />
          </div>

          {/* 3. BHAATI */}
          <div>
            <p className="font-cinzel text-[11px] sm:text-xs font-bold text-burgundy tracking-[0.24em] uppercase mb-1">
              BHAATI
            </p>
            <p className="font-heading text-sm sm:text-base text-dark/85 font-medium leading-relaxed">
              Dr Sageer Ahmed <span className="text-gold">·</span> Kadeer Ahmed{' '}
              <span className="text-gold">·</span> Late Nafees Ahmed{' '}
              <span className="text-gold">·</span> Late Haji Shabbir Ahmed{' '}
              <span className="text-gold">·</span> Suleman (Guddu)
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 w-3/4 mx-auto">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <span className="text-gold text-xs">✦</span>
            <span className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-transparent" />
          </div>

          {/* 4. BICHOLIYA */}
          <div>
            <p className="font-cinzel text-[11px] sm:text-xs font-bold text-burgundy tracking-[0.24em] uppercase mb-1">
              BICHOLIYA
            </p>
            <p className="font-heading text-sm sm:text-base text-dark/85 font-medium leading-relaxed">
              Yaseen Malik <span className="text-gold">·</span> Haji Jameel Malik
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 w-3/4 mx-auto">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <span className="text-gold text-xs">✦</span>
            <span className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-transparent" />
          </div>

          {/* Firm Branding (Right-aligned) */}
          <div className="text-right pt-1">
            <p className="font-cinzel text-xs sm:text-sm font-bold text-burgundy tracking-wider">
              {wedding.firmBranding.name}
            </p>
            <p className="font-heading text-xs text-dark/70">
              {wedding.firmBranding.phones.join(' | ')}
            </p>
          </div>
        </div>

        {/* Jazakum Allahu Khayran */}
        <div className="mt-8 pt-4 border-t border-gold/30">
          <p className="font-arabic text-lg sm:text-xl text-burgundy" dir="rtl">
            جَزَاكُمُ اللهُ خَيْرًا
          </p>
          <p className="font-heading italic text-xs text-dark/60 mt-0.5">
            Jazakum Allahu Khayran
          </p>
        </div>
      </div>
    </div>
  );
};
