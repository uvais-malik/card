import React from 'react';

interface IslamicPatternProps {
  className?: string;
  color?: string;
  opacity?: number;
  size?: number;
}

export const IslamicPattern: React.FC<IslamicPatternProps> = ({
  className = '',
  color = '#B99A59',
  opacity = 0.08,
  size = 60,
}) => {
  const patternId = `islamic-pattern-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          {/* Eight-pointed star geometric pattern */}
          <g fill="none" stroke={color} strokeWidth="0.5" opacity={opacity}>
            {/* Central star */}
            <polygon points={`${size/2},${size*0.15} ${size*0.6},${size*0.4} ${size*0.85},${size/2} ${size*0.6},${size*0.6} ${size/2},${size*0.85} ${size*0.4},${size*0.6} ${size*0.15},${size/2} ${size*0.4},${size*0.4}`} />
            {/* Inner star rotated */}
            <polygon points={`${size/2},${size*0.25} ${size*0.55},${size*0.45} ${size*0.75},${size/2} ${size*0.55},${size*0.55} ${size/2},${size*0.75} ${size*0.45},${size*0.55} ${size*0.25},${size/2} ${size*0.45},${size*0.45}`} />
            {/* Connecting lines */}
            <circle cx={size/2} cy={size/2} r={size*0.2} />
            <circle cx={size/2} cy={size/2} r={size*0.35} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

/* Corner ornament for decorative framing */
export const CornerOrnament: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#B99A59',
}) => (
  <svg
    className={className}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
  >
    <path
      d="M0 0 L40 0 Q20 5 15 15 Q10 25 10 40 L0 40 Z"
      fill={color}
      opacity="0.15"
    />
    <path
      d="M0 0 L30 0 Q15 5 10 12 Q5 20 5 30 L0 30 Z"
      fill={color}
      opacity="0.1"
    />
    <path
      d="M0 0 C30 0 40 10 40 40"
      stroke={color}
      strokeWidth="1"
      opacity="0.4"
    />
    <path
      d="M0 0 C20 0 28 8 28 28"
      stroke={color}
      strokeWidth="0.5"
      opacity="0.3"
    />
    <circle cx="5" cy="5" r="2" fill={color} opacity="0.3" />
  </svg>
);

/* Decorative gold divider with diamond */
export const GoldDivider: React.FC<{ className?: string; width?: number }> = ({
  className = '',
  width = 200,
}) => (
  <svg
    className={className}
    viewBox="0 0 200 20"
    width={width}
    height="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="0" y1="10" x2="85" y2="10" stroke="#B99A59" strokeWidth="0.5" opacity="0.5" />
    <polygon points="100,3 107,10 100,17 93,10" fill="#B99A59" opacity="0.4" />
    <polygon points="100,6 104,10 100,14 96,10" fill="#B99A59" opacity="0.6" />
    <line x1="115" y1="10" x2="200" y2="10" stroke="#B99A59" strokeWidth="0.5" opacity="0.5" />
  </svg>
);
