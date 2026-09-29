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
  if (variant === 'symbol') {
    return (
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id="freyaCopperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A3AD" />
            <stop offset="50%" stopColor="#A66B77" />
            <stop offset="100%" stopColor="#7E4250" />
          </linearGradient>
        </defs>
        {/* Freya Rune-F Symbol */}
        <path
          d="M38 15V105"
          stroke="url(#freyaCopperGrad)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M40 38L78 20"
          stroke="url(#freyaCopperGrad)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M40 65L78 47"
          stroke="url(#freyaCopperGrad)"
          strokeWidth="11"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Symbol Rune */}
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-8 shrink-0"
      >
        <defs>
          <linearGradient id="freyaLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2B4BD" />
            <stop offset="50%" stopColor="#B37885" />
            <stop offset="100%" stopColor="#874756" />
          </linearGradient>
        </defs>
        <path
          d="M36 15V105"
          stroke="url(#freyaLogoGrad)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M38 38L78 20"
          stroke="url(#freyaLogoGrad)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M38 65L78 47"
          stroke="url(#freyaLogoGrad)"
          strokeWidth="11"
          strokeLinecap="round"
        />
      </svg>

      {/* Typographic Lockup */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-display text-xl lg:text-2xl font-bold tracking-[0.08em] bg-gradient-to-r from-[#D4A3AD] via-[#9E6370] to-[#7E4250] bg-clip-text text-transparent">
            FREYA
          </span>
          {variant === 'full' && (
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-medium text-[#806B55] pl-1.5 border-l border-[#806B55]/30">
              ACADEMY
            </span>
          )}
        </div>
        {variant === 'full' && (
          <span className="text-[8px] tracking-[0.22em] uppercase font-mono text-[#806B55]/70 -mt-0.5">
            FORMACIÓN MÉDICA REAL
          </span>
        )}
      </div>
    </div>
  );
};
