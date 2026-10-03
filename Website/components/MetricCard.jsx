'use client';

import React from 'react';

export default function MetricCard({ 
  icon: Icon, 
  value, 
  unit = '', 
  label, 
  context = '', 
  accentColor = 'forest',
  className = '' 
}) {
  return (
    <div className={`bg-[#21262D] rounded-xl border border-[#30363D] p-4 sm:p-5 shadow-md card-transition hover:border-[#39FF14]/40 flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-[#B8C0C7]">
          {label}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center border bg-[#161B22] border-[#30363D] text-[#39FF14]">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F0F3F0] tabular-nums">
          {value}
        </span>
        {unit && (
          <span className="text-sm font-medium text-[#B8C0C7]">
            {unit}
          </span>
        )}
      </div>

      {context && (
        <div className="text-xs text-[#7D8790] mt-2 pt-2 border-t border-[#30363D]">
          {context}
        </div>
      )}
    </div>
  );
}
