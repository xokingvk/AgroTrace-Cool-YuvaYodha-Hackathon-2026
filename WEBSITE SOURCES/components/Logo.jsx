'use client';

import React from 'react';

export default function Logo({ size = 'md', showTagline = false, className = '' }) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Minimal Agricultural Symbol: Fresh leaf contour + cooling thermal drop */}
      <div className={`relative flex items-center justify-center rounded-xl bg-[#21262D] border border-[#30363D] text-[#39FF14] shadow-soft-sm ${iconSizes[size] || iconSizes.md} p-1.5 transition-transform duration-200 hover:scale-[1.02]`}>
        <svg viewBox="0 0 32 32" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Natural organic leaf curve */}
          <path
            d="M7 25C7 25 8.5 17 14 12C19.5 7 25 7 25 7C25 7 25 12.5 20 18C15 23.5 7 25 7 25Z"
            fill="#39FF14"
            fillOpacity="0.15"
          />
          <path
            d="M7 25C13 22 18 17 21 11"
            stroke="#39FF14"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Cooling wave / droplet curve */}
          <path
            d="M17 19C17 21.2 18.8 23 21 23C23.2 23 25 21.2 25 19C25 16.5 21 14 21 14C21 14 17 16.5 17 19Z"
            fill="#161B22"
            stroke="#00F0FF"
            strokeWidth="1.2"
          />
          {/* Frost/cool dot */}
          <circle cx="21" cy="19.5" r="1.2" fill="#00F0FF" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <div className={`font-semibold tracking-tight text-[#F0F3F0] leading-none ${textSizes[size] || textSizes.md}`}>
          AgroTrace <span className="font-medium text-[#39FF14]">Cool</span>
        </div>
        {showTagline && (
          <span className="text-[11px] tracking-wide text-[#7D8790] mt-1 font-normal">
            Cool the Produce. Preserve the Freshness.
          </span>
        )}
      </div>
    </div>
  );
}
