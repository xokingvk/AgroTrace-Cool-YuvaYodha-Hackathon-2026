'use client';

import React from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  ArrowDownRight, 
  Droplets, 
  Zap, 
  Activity,
  Gauge
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import DemoBadge from './DemoBadge';
import { useApp } from '@/context/AppContext';

export default function BatchDetailDrawer() {
  const { viewingBatch, setViewingBatch, setSelectedBatchId, setCurrentScreen } = useApp();

  if (!viewingBatch) return null;

  const drop = (viewingBatch.initialTemperature - viewingBatch.currentTemperature).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#0D1117]/80 backdrop-blur-sm animate-fade-in flex justify-end">
      <div 
        className="w-full max-w-2xl bg-[#21262D] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#30363D] card-transition"
        role="dialog"
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-[#30363D] bg-[#161B22] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#39FF14] uppercase tracking-wider">
                Batch Detail Inspection
              </span>
              <span className="text-[10px] text-[#7D8790] bg-[#21262D] px-1.5 py-0.5 rounded font-mono border border-[#30363D]">
                {viewingBatch.id}
              </span>
              <DemoBadge />
            </div>
            <h2 className="text-2xl font-bold text-[#F0F3F0]">
              {viewingBatch.crop} <span className="text-lg font-normal text-[#B8C0C7]">({viewingBatch.variety})</span>
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#B8C0C7] mt-1.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#39FF14]" />
                {viewingBatch.collectionCentre}
              </span>
              <span>•</span>
              <span className="font-semibold text-[#F0F3F0]">{viewingBatch.quantity} kg</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => setViewingBatch(null)}
              className="p-1.5 rounded-lg text-[#7D8790] hover:text-[#F0F3F0] hover:bg-[#21262D] btn-transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <StatusBadge status={viewingBatch.status} size="md" />
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#161B22] p-4 rounded-xl border border-[#30363D]">
            <div>
              <span className="text-[10px] font-semibold uppercase text-[#7D8790]">Initial Temp</span>
              <div className="text-lg font-bold text-[#F0F3F0] mt-0.5">{viewingBatch.initialTemperature.toFixed(1)}°C</div>
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase text-[#7D8790]">Current Temp</span>
              <div className="text-lg font-bold text-[#39FF14] mt-0.5">{viewingBatch.currentTemperature.toFixed(1)}°C</div>
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase text-[#7D8790]">Reduction</span>
              <div className="text-lg font-bold text-[#39FF14] mt-0.5 flex items-center gap-0.5">
                <ArrowDownRight className="w-4 h-4 text-[#39FF14]" />
                {drop}°C
              </div>
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase text-[#7D8790]">Cooling Duration</span>
              <div className="text-lg font-bold text-[#F0F3F0] mt-0.5">{viewingBatch.coolingDurationMinutes} min</div>
            </div>
          </div>

          {/* Environmental Conditions */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B8C0C7] mb-3 flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-[#39FF14]" />
              Environmental Telemetry (Demonstration Rig)
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-[#161B22] border border-[#30363D] rounded-lg">
                <span className="text-[10px] text-[#7D8790] uppercase">Ambient Air</span>
                <div className="text-base font-bold text-[#F0F3F0] mt-1">{viewingBatch.ambientTemperature}°C</div>
              </div>
              <div className="p-3 bg-[#161B22] border border-[#30363D] rounded-lg">
                <span className="text-[10px] text-[#7D8790] uppercase">Relative Humidity</span>
                <div className="text-base font-bold text-[#F0F3F0] mt-1">{viewingBatch.relativeHumidity}%</div>
              </div>
              <div className="p-3 bg-[#161B22] border border-[#30363D] rounded-lg">
                <span className="text-[10px] text-[#7D8790] uppercase">Cooling Potential</span>
                <div className="text-base font-bold text-[#39FF14] mt-1">{viewingBatch.coolingPotential}</div>
              </div>
            </div>
          </div>

          {/* Cooling Cycle Timeline */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B8C0C7] mb-3 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#39FF14]" />
              Cooling Cycle Timeline
            </h4>
            <div className="space-y-3 relative before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-0.5 before:bg-[#30363D]">
              {viewingBatch.timeline?.map((step, idx) => (
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
                  <div className="flex-1 bg-[#161B22] p-3.5 rounded-lg border border-[#30363D]">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#F0F3F0]">
                      <span>{step.event}</span>
                      <span className="text-[11px] font-normal text-[#7D8790]">{step.time}</span>
                    </div>
                    <p className="text-xs text-[#B8C0C7] mt-1 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Usage */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B8C0C7] flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#39FF14]" />
                Resource Usage When Measured
              </h4>
              <span className="text-[10px] text-[#7D8790] italic">Hardware sensor dependent</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Water Used */}
              <div className="p-3.5 bg-[#161B22] border border-[#30363D] rounded-xl">
                <div className="flex items-center justify-between text-xs text-[#7D8790] mb-1">
                  <span className="font-medium">Water Used</span>
                  <Droplets className="w-3.5 h-3.5 text-[#00F0FF]" />
                </div>
                {viewingBatch.waterUsedLiters !== null ? (
                  <div>
                    <div className="text-xl font-bold text-[#39FF14]">
                      {viewingBatch.waterUsedLiters} <span className="text-xs font-normal text-[#B8C0C7]">Liters</span>
                    </div>
                    <span className="text-[10px] text-[#39FF14] font-medium">Simulated Meter Reading</span>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm font-semibold text-[#7D8790] py-1">
                      No Data / Not Connected
                    </div>
                    <span className="text-[10px] text-[#7D8790]">No flow meter attached to sump</span>
                  </div>
                )}
              </div>

              {/* Energy Used */}
              <div className="p-3.5 bg-[#161B22] border border-[#30363D] rounded-xl">
                <div className="flex items-center justify-between text-xs text-[#7D8790] mb-1">
                  <span className="font-medium">Energy Used</span>
                  <Zap className="w-3.5 h-3.5 text-[#D29922]" />
                </div>
                {viewingBatch.energyUsedKwh !== null ? (
                  <div>
                    <div className="text-xl font-bold text-[#39FF14]">
                      {viewingBatch.energyUsedKwh} <span className="text-xs font-normal text-[#B8C0C7]">kWh</span>
                    </div>
                    <span className="text-[10px] text-[#39FF14] font-medium">Simulated CT Sensor</span>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm font-semibold text-[#7D8790] py-1">
                      No Data / Not Connected
                    </div>
                    <span className="text-[10px] text-[#7D8790]">No energy meter attached</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Supplier & Logistics Notes */}
          <div className="bg-[#161B22] p-4 rounded-xl border border-[#30363D] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#7D8790]">Supplier / Farmer:</span>
              <span className="font-semibold text-[#F0F3F0]">{viewingBatch.farmerSupplier}</span>
            </div>
            <div className="border-t border-[#30363D] pt-2">
              <span className="font-medium text-[#7D8790] block mb-1">Batch Operational Notes:</span>
              <p className="text-[#B8C0C7] leading-relaxed">{viewingBatch.notes}</p>
            </div>
          </div>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-4 border-t border-[#30363D] bg-[#161B22] flex items-center justify-between gap-3">
          <button
            onClick={() => setViewingBatch(null)}
            className="px-4 py-2 text-xs font-semibold text-[#F0F3F0] bg-[#21262D] hover:bg-[#2A3139] rounded-lg border border-[#30363D] btn-transition cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              setSelectedBatchId(viewingBatch.id);
              setCurrentScreen('monitor');
              setViewingBatch(null);
            }}
            className="px-4 py-2 text-xs font-bold text-[#0D1117] bg-[#39FF14] hover:bg-[#32e612] rounded-lg shadow-sm btn-transition flex items-center gap-1.5 cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-[#0D1117]" />
            <span>Open in Live Monitor</span>
          </button>
        </div>
      </div>
    </div>
  );
}
