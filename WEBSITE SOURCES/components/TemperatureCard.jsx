'use client';

import React from 'react';
import { ArrowDownRight, Clock, MapPin, Thermometer, User } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useApp } from '@/context/AppContext';

export default function TemperatureCard({ batch, className = '' }) {
  const { produceTemp, setCurrentScreen, setSelectedBatchId } = useApp();

  if (!batch) return null;

  const currentTemp = batch.id === 'AT-001' ? produceTemp : batch.currentTemperature;
  const tempReduction = (batch.initialTemperature - currentTemp).toFixed(1);

  return (
    <section 
      aria-labelledby="current-batch-heading"
      className={`bg-[#21262D] rounded-2xl border border-[#30363D] p-5 sm:p-6 lg:p-7 shadow-lg card-transition relative overflow-hidden ${className}`}
    >
      {/* Subtle top accent bar - Cyber Lime */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#39FF14]" />

      {/* Header section with Batch identity & Status badge */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-[#30363D]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B8C0C7]">
              Current Batch
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
            <span className="font-mono font-semibold text-[#F0F3F0] text-sm">
              {batch.id}
            </span>
          </div>

          <h2 id="current-batch-heading" className="text-2xl sm:text-3xl font-bold text-[#F0F3F0] flex flex-wrap items-center gap-2.5">
            <span>{batch.crop}</span>
            <span className="text-xs sm:text-sm font-normal text-[#B8C0C7] bg-[#161B22] px-3 py-1 rounded-full border border-[#30363D]">
              {batch.quantity} kg
            </span>
          </h2>

          <div className="flex items-center gap-1.5 text-xs text-[#B8C0C7] mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#39FF14] shrink-0" />
            <span>{batch.collectionCentre}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={batch.status} size="md" />
        </div>
      </div>

      {/* Dominant Produce Temperature & Supporting Key Metrics */}
      <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Dominant Produce Core Temperature (Cyber Lime) */}
        <div className="md:col-span-6 flex flex-col justify-center">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#B8C0C7] mb-1.5 flex items-center gap-1.5">
            <Thermometer className="w-4 h-4 text-[#39FF14]" />
            Produce Temperature
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#39FF14] tabular-nums">
              {currentTemp.toFixed(1)}°
            </span>
            <span className="text-2xl font-semibold text-[#B8C0C7]">
              C
            </span>
            <span className="ml-2 text-xs font-semibold text-[#39FF14] bg-[#161B22] px-2.5 py-0.5 rounded-md border border-[#30363D]">
              Current
            </span>
          </div>

          <div className="mt-2 text-xs text-[#B8C0C7] flex flex-wrap items-center gap-2">
            <span>Target: <strong className="text-[#F0F3F0] font-semibold">{batch.targetTemperature.toFixed(1)}°C</strong></span>
            <span>•</span>
            <span className="font-mono text-[11px] text-[#7D8790]">DS18B20 Core Pulp Probe</span>
          </div>
        </div>

        {/* 3 Key Operational Numbers: Initial, Reduction, Duration */}
        <div className="md:col-span-6 grid grid-cols-3 gap-2.5 sm:gap-4 bg-[#161B22] p-4 rounded-xl border border-[#30363D]">
          {/* Initial Temp */}
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#B8C0C7]">
              Initial Temp
            </span>
            <div className="text-xl sm:text-2xl font-bold text-[#F0F3F0] mt-1">
              {batch.initialTemperature.toFixed(1)}°C
            </div>
            <span className="text-[10px] text-[#7D8790] mt-0.5">
              At intake
            </span>
          </div>

          {/* Temperature Reduction */}
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#B8C0C7] flex items-center gap-0.5">
              <ArrowDownRight className="w-3.5 h-3.5 text-[#39FF14]" />
              Reduction
            </span>
            <div className="text-xl sm:text-2xl font-bold text-[#39FF14] mt-1">
              {tempReduction}°C
            </div>
            <span className="text-[10px] text-[#7D8790] mt-0.5">
              Removed
            </span>
          </div>

          {/* Cooling Duration */}
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#B8C0C7] flex items-center gap-0.5">
              <Clock className="w-3.5 h-3.5 text-[#39FF14]" />
              Duration
            </span>
            <div className="text-xl sm:text-2xl font-bold text-[#F0F3F0] mt-1">
              {batch.coolingDurationMinutes}<span className="text-xs font-normal text-[#B8C0C7] ml-0.5">min</span>
            </div>
            <span className="text-[10px] text-[#7D8790] mt-0.5">
              Elapsed
            </span>
          </div>
        </div>
      </div>

      {/* Footer Details */}
      <div className="pt-4 border-t border-[#30363D] flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-[#B8C0C7]">
          Supplier: <strong className="text-[#F0F3F0] font-medium">{batch.farmerSupplier}</strong>
        </span>

        <button
          onClick={() => {
            setSelectedBatchId(batch.id);
            setCurrentScreen('monitor');
          }}
          className="text-[#39FF14] hover:text-[#32e612] font-semibold flex items-center gap-1 hover:underline cursor-pointer btn-transition"
        >
          Open Live Telemetry Monitor →
        </button>
      </div>
    </section>
  );
}
