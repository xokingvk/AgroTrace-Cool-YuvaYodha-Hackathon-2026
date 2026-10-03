'use client';

import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function CoolingDecisionAdvisory({ className = '' }) {
  const { activeBatch } = useApp();

  return (
    <section 
      aria-labelledby="cooling-decision-heading"
      className={`bg-[#21262D] rounded-2xl border border-[#30363D] p-5 sm:p-6 lg:p-7 shadow-lg card-transition flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Top Status Header */}
        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[#30363D]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14]" />
            <h2 id="cooling-decision-heading" className="text-xs font-semibold uppercase tracking-wider text-[#B8C0C7]">
              Cooling Decision & Advisory
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-[#39FF14] bg-[#161B22] px-2 py-0.5 rounded border border-[#30363D]">
            Advisory Interpretation
          </span>
        </div>

        {/* Primary Verdict Banner */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 mb-5 card-transition">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#21262D] border border-[#30363D] text-[#39FF14] flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-[#39FF14]" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#39FF14]">
                System Advisory
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#F0F3F0]">
                COOLING EFFECTIVE
              </h3>
              <p className="text-xs text-[#B8C0C7] mt-1 leading-relaxed">
                Produce core temperature is decreasing consistently under current evaporative conditions.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Structured Plain-Language Questions & Answers */}
        <div className="space-y-4">
          {/* Question 1: What is happening? */}
          <div className="text-xs">
            <div className="font-bold text-[#F0F3F0] flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
              What is happening?
            </div>
            <p className="text-[#B8C0C7] pl-3 leading-relaxed">
              Produce temperature has dropped from <strong className="text-[#F0F3F0] font-semibold">34.0°C to 29.0°C (<span className="text-[#39FF14]">5.0°C reduction</span>)</strong> over the last 42 minutes. Heat removal rate is steady at ~0.12°C per minute.
            </p>
          </div>

          {/* Question 2: Why? */}
          <div className="text-xs">
            <div className="font-bold text-[#F0F3F0] flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              Why?
            </div>
            <p className="text-[#B8C0C7] pl-3 leading-relaxed">
              Ambient temperature is 33.2°C with 68% relative humidity. The evaporative wet pad and ventilation fan are producing an effective air depression of ~4.2°C across the crate stacks.
            </p>
          </div>

          {/* Question 3: What should the operator know? */}
          <div className="text-xs">
            <div className="font-bold text-[#F0F3F0] flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
              What should the operator know?
            </div>
            <div className="bg-[#161B22] p-3 rounded-lg border border-[#30363D] text-[#F0F3F0] pl-3 leading-relaxed card-transition">
              No manual intervention required. Maintain crate spacing. The batch will reach its safe storage target of <strong className="text-[#39FF14] font-bold">24.0°C in approximately 35 minutes</strong>.
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Transparency Footnote */}
      <div className="mt-5 pt-3 border-t border-[#30363D] text-[11px] text-[#7D8790] flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-[#7D8790] shrink-0" />
        <span>
          Decision support based on thermal delta rates and psychrometric principles. No black-box AI claims.
        </span>
      </div>
    </section>
  );
}
