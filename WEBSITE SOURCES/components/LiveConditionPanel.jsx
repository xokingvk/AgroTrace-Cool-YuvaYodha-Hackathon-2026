'use client';

import React from 'react';
import { Thermometer, Sun, Droplets, Gauge } from 'lucide-react';
import DemoBadge from './DemoBadge';
import { useApp } from '@/context/AppContext';

export default function LiveConditionPanel({ className = '' }) {
  const { produceTemp, ambientTemp, humidity, coolingPotential } = useApp();

  return (
    <section 
      aria-labelledby="env-conditions-heading" 
      className={`bg-[#21262D] rounded-2xl border border-[#30363D] p-5 sm:p-6 lg:p-7 shadow-lg card-transition ${className}`}
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-[#30363D]">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#39FF14] animate-pulse" />
          <h2 id="env-conditions-heading" className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F0F3F0]">
            Current Environmental Conditions
          </h2>
        </div>
        <DemoBadge />
      </div>

      {/* 4-Column Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {/* Metric 1: Produce Temperature (Primary Metric - Cyber Lime) */}
        <div className="bg-[#161B22] rounded-xl p-5 border border-[#30363D] flex flex-col justify-between card-transition">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B8C0C7]">
              Produce Temperature
            </span>
            <Thermometer className="w-4 h-4 text-[#39FF14] shrink-0" />
          </div>

          <div className="my-3 flex items-baseline gap-1.5">
            <span className="text-4xl sm:text-5xl font-extrabold text-[#39FF14] tabular-nums tracking-tight">
              {produceTemp.toFixed(1)}°
            </span>
            <span className="text-xl sm:text-2xl font-semibold text-[#B8C0C7]">
              C
            </span>
          </div>

          <div className="text-xs text-[#7D8790] pt-2 border-t border-[#30363D]">
            Current batch core temperature
          </div>
        </div>

        {/* Metric 2: Ambient Temperature (Secondary Metric) */}
        <div className="bg-[#161B22] rounded-xl p-5 border border-[#30363D] flex flex-col justify-between card-transition">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B8C0C7]">
              Ambient Temperature
            </span>
            <Sun className="w-4 h-4 text-[#00F0FF] shrink-0" />
          </div>

          <div className="my-3 flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-bold text-[#F0F3F0] tabular-nums">
              {ambientTemp.toFixed(1)}°
            </span>
            <span className="text-lg sm:text-xl font-medium text-[#B8C0C7]">
              C
            </span>
          </div>

          <div className="text-xs text-[#7D8790] pt-2 border-t border-[#30363D]">
            Chamber ambient air
          </div>
        </div>

        {/* Metric 3: Relative Humidity (Secondary Metric) */}
        <div className="bg-[#161B22] rounded-xl p-5 border border-[#30363D] flex flex-col justify-between card-transition">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B8C0C7]">
              Relative Humidity
            </span>
            <Droplets className="w-4 h-4 text-[#00F0FF] shrink-0" />
          </div>

          <div className="my-3 flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-bold text-[#F0F3F0] tabular-nums">
              {humidity}
            </span>
            <span className="text-lg sm:text-xl font-medium text-[#B8C0C7]">
              %
            </span>
          </div>

          <div className="text-xs text-[#7D8790] pt-2 border-t border-[#30363D]">
            Current environment
          </div>
        </div>

        {/* Metric 4: Cooling Potential (Favorable = Cyber Lime) */}
        <div className="bg-[#161B22] rounded-xl p-5 border border-[#30363D] flex flex-col justify-between card-transition">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B8C0C7]">
              Cooling Potential
            </span>
            <Gauge className="w-4 h-4 text-[#39FF14] shrink-0" />
          </div>

          <div className="my-3">
            <span className="text-2xl sm:text-3xl font-bold text-[#39FF14] tracking-tight">
              {coolingPotential}
            </span>
          </div>

          <div className="text-xs text-[#7D8790] pt-2 border-t border-[#30363D] leading-snug">
            Conditions are supportive of evaporative cooling.
          </div>
        </div>
      </div>
    </section>
  );
}
