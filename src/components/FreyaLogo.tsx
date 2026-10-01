import React from 'react';

interface FreyaLogoProps {
  className?: string;
  variant?: 'full' | 'symbol' | 'compact';
  color?: string;
}

export const FreyaLogo: React.FC<FreyaLogoProps> = ({
  className = 'h-10 w-auto',
  variant = 'full',
}) => {
  // Client's exact Nordic Fehu Rune icon
  const renderRuneIcon = (iconClass: string = 'h-10 w-8 shrink-0') => (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClass}
      aria-hidden="true"
    >
      <defs>
        {/* Client's metallic rose-gold / mauve copper gradient */}
        <linearGradient id="freyaClientRuneGrad" x1="25%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#E4A9B4" />
          <stop offset="35%" stopColor="#B87584" />
          <stop offset="70%" stopColor="#884555" />
          <stop offset="100%" stopColor="#58202D" />
        </linearGradient>
      </defs>

      {/* 
        Exact Client Icon from Artwork: 
        Nordic Fehu Rune with vertical spine and two parallel upward diagonal branches.
        100% crisp solid vector geometry with perpendicular flat cuts and metallic gradient.
      */}
      <g fill="url(#freyaClientRuneGrad)">
        {/* Main Vertical Spine (flat horizontal top and bottom) */}
        <rect x="32" y="12" width="12" height="96" />

        {/* Upper Diagonal Branch (approx 45° angle, flush with top of spine y=12, perpendicular flat cut) */}
        <polygon points="44,44 76,12 84.5,20.5 44,61" />

        {/* Lower Diagonal Branch (strictly parallel, perpendicular flat cut) */}
        <polygon points="44,72 70,46 78.5,54.5 44,89" />
      </g>
    </svg>
  );

  if (variant === 'symbol') {
    return renderRuneIcon(className);
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Client's Fehu Rune Icon */}
      {renderRuneIcon('h-10 w-8 shrink-0')}

      {/* Official Business Name & Subtitle */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-serif text-xl lg:text-2xl font-bold tracking-[0.1em] bg-gradient-to-r from-[#D499A4] via-[#9E6370] to-[#6E3340] bg-clip-text text-transparent">
            FREYA
          </span>
          {variant === 'full' && (
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-[#806B55] pl-1.5 border-l border-[#806B55]/30">
              ACADEMY
            </span>
          )}
        </div>
        {variant === 'full' && (
          <span className="text-[8px] tracking-[0.22em] uppercase font-mono text-[#806B55]/75 -mt-0.5">
            FORMACIÓN MÉDICA REAL
          </span>
        )}
      </div>
    </div>
  );
};

