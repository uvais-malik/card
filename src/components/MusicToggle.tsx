import React, { useState, useRef, useEffect } from 'react';

export const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/music/background.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.addEventListener('error', () => setHasAudio(false));
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setHasAudio(false));
    }
    setIsPlaying(!isPlaying);
  };

  if (!hasAudio) return null;

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-burgundy/90 backdrop-blur-sm
                 text-ivory flex items-center justify-center shadow-lg hover:bg-burgundy
                 transition-all duration-300 hover:scale-110 group"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      title={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      )}
      {isPlaying && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-gold" />
        </span>
      )}
    </button>
  );
};
