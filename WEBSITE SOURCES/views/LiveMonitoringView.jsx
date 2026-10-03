'use client';

import React from 'react';
import { 
  Thermometer, 
  Sun, 
  Droplets, 
  Clock, 
  Gauge, 
  MapPin, 
  Radio
} from 'lucide-react';
import DemoBadge from '@/components/DemoBadge';
import StatusBadge from '@/components/StatusBadge';
import TemperatureChart from '@/components/TemperatureChart';
import CoolingDecisionAdvisory from '@/components/CoolingDecisionAdvisory';
import { useApp } from '@/context/AppContext';

export default function LiveMonitoringView() {
  const { 
    batches, 
    selectedBatchId, 
    setSelectedBatchId, 
    produceTemp, 
    ambientTemp, 
    humidity, 
    coolingPotential
  } = useApp();

  const currentBatch = batches.find(b => b.id === selectedBatchId) || batches[0];
  const currentProduceTemp = currentBatch.id === 'AT-001' ? produceTemp : currentBatch.currentTemperature;
  const currentAmbientTemp = currentBatch.id === 'AT-001' ? ambientTemp : currentBatch.ambientTemperature;
  const currentHumidity = currentBatch.id === 'AT-001' ? humidity : currentBatch.relativeHumidity;
  const currentPotential = currentBatch.id === 'AT-001' ? coolingPotential : currentBatch.coolingPotential;
  const drop = (currentBatch.initialTemperature - currentProduceTemp).toFixed(1);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16 md:pb-8">
      {/* Top Banner with Batch Selector & Demo Status */}
      <section className="bg-[#21262D] rounded-2xl border border-[#30363D] p-6 sm:p-7 shadow-lg card-transition flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7D8790]">
              Live Telemetry Stream
            </span>
            <DemoBadge />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F0F3F0]">
            Live Monitoring
          </h1>
          <p className="text-xs sm:text-sm text-[#B8C0C7] mt-1">
            Real-time digital pulp temperature and evaporative chamber air metrics
          </p>
        </div>

        {/* Batch Selector Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="text-xs font-semibold uppercase text-[#7D8790]">Select Batch:</span>
          <div className="flex flex-wrap items-center gap-1.5 bg-[#161B22] p-1 rounded-xl border border-[#30363D]">
            {batches.slice(0, 5).map(b => (
              <button
                key={b.id}
                onClick={() => setSelectedBatchId(b.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg btn-transition cursor-pointer ${
                  selectedBatchId === b.id
                    ? 'bg-[#21262D] text-[#39FF14] font-bold border border-[#30363D]'
                    : 'text-[#B8C0C7] hover:bg-[#21262D] hover:text-[#F0F3F0]'
                }`}
              >
                {b.id} ({b.crop})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Live Sensor Display (Produce Temperature Dominates in Cyber Lime) */}
      <section className="bg-[#21262D] rounded-2xl border border-[#30363D] p-6 sm:p-8 shadow-lg card-transition relative overflow-hidden">
        <div className="relative z-10">
          {/* Header of Active Batch in monitor */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#30363D]">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#7D8790] uppercase">
                <span>Active Monitor Target</span>
                <span>•</span>
                <span className="font-mono text-[#39FF14] font-bold">{currentBatch.id}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F0F3F0] mt-0.5">
                {currentBatch.crop} <span className="text-base sm:text-lg font-normal text-[#B8C0C7]">({currentBatch.variety})</span>
              </h2>
              <div className="text-xs text-[#B8C0C7] flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#39FF14]" />
                <span>{currentBatch.collectionCentre}</span>
                <span>•</span>
                <span>{currentBatch.quantity} kg</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <StatusBadge status={currentBatch.status} size="lg" />
              <span className="text-[11px] text-[#7D8790] font-mono">
                Probe: DS18B20-PULP-A
              </span>
            </div>
          </div>

          {/* Central Produce Temperature Giant Display */}
          <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Giant Produce Temp Value */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#B8C0C7] mb-2 flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-[#39FF14]" />
                Produce Core Temperature
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-6xl sm:text-7xl font-extrabold tracking-tight text-[#39FF14] tabular-nums">
                  {currentProduceTemp.toFixed(1)}°
                </span>
                <span className="text-3xl font-medium text-[#B8C0C7]">C</span>
                <span className="bg-[#161B22] text-[#39FF14] text-xs font-bold px-2.5 py-1 rounded-md border border-[#30363D] uppercase tracking-wider">
                  Current
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#B8C0C7]">
                <span>Initial: <strong className="text-[#F0F3F0] font-semibold">{currentBatch.initialTemperature.toFixed(1)}°C</strong></span>
                <span>•</span>
                <span>Target: <strong className="text-[#F0F3F0] font-semibold">{currentBatch.targetTemperature.toFixed(1)}°C</strong></span>
                <span>•</span>
                <span className="text-[#39FF14] font-bold bg-[#161B22] px-2 py-0.5 rounded border border-[#30363D]">
                  Total Drop: -{drop}°C
                </span>
              </div>
            </div>

            {/* Smaller Environmental Secondary Readings */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
              {/* Ambient */}
              <div className="bg-[#161B22] p-4 rounded-xl border border-[#30363D] card-transition">
                <div className="flex items-center justify-between text-xs text-[#7D8790] mb-1">
                  <span className="font-semibold uppercase text-[10px]">Ambient</span>
                  <Sun className="w-3.5 h-3.5 text-[#00F0FF]" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-[#F0F3F0] tabular-nums">
                  {currentAmbientTemp.toFixed(1)}°C
                </div>
                <span className="text-[11px] text-[#7D8790] mt-0.5 block">Outside chamber air</span>
              </div>

              {/* Humidity */}
              <div className="bg-[#161B22] p-4 rounded-xl border border-[#30363D] card-transition">
                <div className="flex items-center justify-between text-xs text-[#7D8790] mb-1">
                  <span className="font-semibold uppercase text-[10px]">Humidity</span>
                  <Droplets className="w-3.5 h-3.5 text-[#00F0FF]" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-[#F0F3F0] tabular-nums">
                  {currentHumidity}%
                </div>
                <span className="text-[11px] text-[#7D8790] mt-0.5 block">Pad exhaust air</span>
              </div>

              {/* Cooling Duration */}
              <div className="bg-[#161B22] p-4 rounded-xl border border-[#30363D] card-transition">
                <div className="flex items-center justify-between text-xs text-[#7D8790] mb-1">
                  <span className="font-semibold uppercase text-[10px]">Cooling Duration</span>
                  <Clock className="w-3.5 h-3.5 text-[#39FF14]" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-[#F0F3F0]">
                  {currentBatch.coolingDurationMinutes} <span className="text-sm font-normal text-[#B8C0C7]">min</span>
                </div>
                <span className="text-[11px] text-[#7D8790] mt-0.5 block">Continuous flow</span>
              </div>

              {/* Cooling Potential */}
              <div className="bg-[#161B22] p-4 rounded-xl border border-[#30363D] card-transition">
                <div className="flex items-center justify-between text-xs text-[#7D8790] mb-1">
                  <span className="font-semibold uppercase text-[10px]">Cooling Potential</span>
                  <Gauge className="w-3.5 h-3.5 text-[#39FF14]" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-[#39FF14]">
                  {currentPotential}
                </div>
                <span className="text-[11px] text-[#7D8790] mt-0.5 block">Wet bulb active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Status Timeline & Advisory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Timeline Component */}
        <div className="lg:col-span-6 bg-[#21262D] rounded-2xl border border-[#30363D] p-6 shadow-lg card-transition">
          <div className="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-[#30363D]">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F0F3F0] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#39FF14]" />
              Live Status Timeline
            </h3>
            <span className="text-[11px] text-[#7D8790] font-mono">Batch {currentBatch.id}</span>
          </div>

          <div className="space-y-4 relative before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-0.5 before:bg-[#30363D]">
            {currentBatch.timeline?.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-3.5 pl-1">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 text-[10px] font-bold ${
                  step.status === 'completed'
                    ? 'bg-[#39FF14] text-[#0D1117]'
                    : step.status === 'active'
                    ? 'bg-[#39FF14] text-[#0D1117] ring-4 ring-[#39FF14]/20'
                    : 'bg-[#161B22] text-[#7D8790] border border-[#30363D]'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1 bg-[#161B22] p-3.5 rounded-xl border border-[#30363D]">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#F0F3F0]">
                    <span>{step.event}</span>
                    <span className="text-[11px] font-normal text-[#7D8790] font-mono">{step.time}</span>
                  </div>
                  <p className="text-xs text-[#B8C0C7] mt-1 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Cooling Advisory */}
        <div className="lg:col-span-6">
          <CoolingDecisionAdvisory className="h-full" />
        </div>
      </div>

      {/* Temperature Trajectory Chart */}
      <div>
        <TemperatureChart />
      </div>
    </div>
  );
}
