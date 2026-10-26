import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { wedding } from '../data/wedding';
import { GoldDivider } from './IslamicPattern';

gsap.registerPlugin(ScrollTrigger);

type AttendanceStatus = '' | 'accept' | 'decline';
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'declined' | 'error';

export const RSVPForm: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState('');
  const [attendance, setAttendance] = useState<AttendanceStatus>('');
  const [guestCount, setGuestCount] = useState('1');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEventToggle = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !attendance) return;

    setSubmitStatus('submitting');

    try {
      const formData = new FormData();
      formData.append('access_key', wedding.rsvp.web3formsKey);
      formData.append('subject', `Wedding RSVP: ${fullName}`);
      formData.append('Full Name', fullName);
      formData.append('Attendance', attendance === 'accept' ? 'Joyfully Accepts' : 'Regretfully Declines');
      if (attendance === 'accept') {
        formData.append('Number of Guests', guestCount);
        formData.append('Events Attending', selectedEvents.join(', ') || 'All');
      }
      if (message.trim()) {
        formData.append('Message / Dua', message);
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitStatus(attendance === 'accept' ? 'success' : 'declined');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  if (!wedding.rsvp.enabled) return null;

  return (
    <section
      ref={sectionRef}
      className="section-container"
      style={{
        background: 'linear-gradient(180deg, #F8F1E5 0%, #F0E8D8 50%, #F8F1E5 100%)',
      }}
    >
      <div ref={formRef} className="max-w-xl w-full mx-auto">
        <div className="text-center mb-10">
          <p className="font-body text-gold text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
            RSVP
          </p>
          <h3 className="heading-primary mb-4">Will You Join Us?</h3>
          <p className="text-body max-w-md mx-auto">
            Your presence would mean the world to us. Kindly let us know whether
            you will be joining us so we can make the necessary arrangements.
          </p>
        </div>

        {submitStatus === 'success' ? (
          <div className="card-elegant text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-forest/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="heading-secondary mb-4">Thank You!</h4>
            <p className="text-body">
              We are grateful for your wishes and look forward to sharing this
              special occasion with you.
            </p>
          </div>
        ) : submitStatus === 'declined' ? (
          <div className="card-elegant text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-burgundy/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h4 className="heading-secondary mb-4">We Will Miss You</h4>
            <p className="text-body">
              Thank you for letting us know. Your wishes and duas mean a great deal to us.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card-elegant space-y-6">
            {/* Full name */}
            <div>
              <label className="block font-body text-sm text-dark/70 mb-2 tracking-wide">
                Your Full Name <span className="text-burgundy">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-ivory border border-gold/20 rounded-sm font-body text-dark
                           focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Attendance */}
            <div>
              <label className="block font-body text-sm text-dark/70 mb-3 tracking-wide">
                Will you be attending? <span className="text-burgundy">*</span>
              </label>
              <div className="flex gap-4">
                <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border rounded-sm cursor-pointer transition-all
                  ${attendance === 'accept' ? 'border-forest bg-forest/5 text-forest' : 'border-gold/20 text-dark/60 hover:border-gold/40'}`}>
                  <input
                    type="radio"
                    name="attendance"
                    value="accept"
                    checked={attendance === 'accept'}
                    onChange={() => setAttendance('accept')}
                    className="sr-only"
                  />
                  <span className="font-body text-sm">Joyfully Accept</span>
                </label>
                <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border rounded-sm cursor-pointer transition-all
                  ${attendance === 'decline' ? 'border-burgundy bg-burgundy/5 text-burgundy' : 'border-gold/20 text-dark/60 hover:border-gold/40'}`}>
                  <input
                    type="radio"
                    name="attendance"
                    value="decline"
                    checked={attendance === 'decline'}
                    onChange={() => setAttendance('decline')}
                    className="sr-only"
                  />
                  <span className="font-body text-sm">Regretfully Decline</span>
                </label>
              </div>
            </div>

            {/* Guest count (only if accepting) */}
            {attendance === 'accept' && (
              <>
                <div>
                  <label className="block font-body text-sm text-dark/70 mb-2 tracking-wide">
                    Number of Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-4 py-3 bg-ivory border border-gold/20 rounded-sm font-body text-dark
                               focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                {/* Event selection */}
                <div>
                  <label className="block font-body text-sm text-dark/70 mb-3 tracking-wide">
                    Which events will you attend?
                  </label>
                  <div className="space-y-2">
                    {wedding.events.map((event) => (
                      <label
                        key={event.id}
                        className={`flex items-center gap-3 px-4 py-3 border rounded-sm cursor-pointer transition-all
                          ${selectedEvents.includes(event.id) ? 'border-gold bg-gold/5' : 'border-gold/20 hover:border-gold/40'}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedEvents.includes(event.id)}
                          onChange={() => handleEventToggle(event.id)}
                          className="w-4 h-4 accent-burgundy"
                        />
                        <span className="font-body text-sm text-dark">{event.title}</span>
                        <span className="font-body text-xs text-dark/40 ml-auto">{event.displayDate}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Message */}
            <div>
              <label className="block font-body text-sm text-dark/70 mb-2 tracking-wide">
                A Message or Dua for the Couple (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-ivory border border-gold/20 rounded-sm font-body text-dark
                           focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all resize-none"
                placeholder="Share your wishes or a special dua..."
              />
            </div>

            {/* RSVP deadline */}
            <p className="font-body text-xs text-dark/40 text-center">
              Please respond by {wedding.rsvp.deadline}
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={!fullName.trim() || !attendance || submitStatus === 'submitting'}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitStatus === 'submitting' ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Your RSVP'
              )}
            </button>

            {submitStatus === 'error' && (
              <p className="font-body text-sm text-burgundy text-center">
                Something went wrong. Please try again or contact us directly.
              </p>
            )}
          </form>
        )}

        <GoldDivider className="mt-12" />
      </div>
    </section>
  );
};
