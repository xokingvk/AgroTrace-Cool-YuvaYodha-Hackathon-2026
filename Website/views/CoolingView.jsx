'use client';

import React from 'react';
import { 
  Snowflake, 
  Play, 
  Pause, 
  Square, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Thermometer, 
  Sun, 
  Droplets, 
  Gauge, 
  Wind,
  CheckCircle2,
  Info
} from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import DemoBadge from '@/components/DemoBadge';
import { useApp } from '@/context/AppContext';

export default function CoolingView() {
  const { 
    activeBatch, 
    produceTemp, 
    ambientTemp, 
    humidity, 
    coolingPotential,
    rigStatus, 
    handleStartRig, 
    handlePauseRig, 
    setIsStopConfirmOpen 
  } = useApp();

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16 md:pb-6">
      {/* Top Banner */}
      <div className="bg-[#21262D] rounded-2xl border border-[#30363D] p-6 shadow-lg flex flex-wrap items-center justify-between gap-4 card-transition">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#7D8790] flex items-center gap-1.5 mb-1">
            <span>Rig Operations</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
            <span className="text-[#39FF14] font-bold">AgroTrace Cool</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F0F3F0]">
            Cooling Operations
          </h2>
          <p className="text-xs sm:text-sm text-[#B8C0C7] mt-1">
            Chamber evaporative rig monitoring and demonstration control interface
          </p>
        </div>

        <DemoBadge />
      </div>

      {/* Generic Rig Framing Disclaimer */}
      <div className="bg-[#161B22] border border-[#D29922]/40 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-xs text-[#B8C0C7] card-transition">
        <AlertTriangle className="w-5 h-5 text-[#D29922] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-[#D29922]">
            Generic Demonstration Rig Control Only
          </div>
          <p className="text-[#B8C0C7] leading-relaxed text-[11px] sm:text-xs">
            The control interactions below are strictly mapped to the team's generic evaporative prototype rig (sump pump and low-pressure fan). AgroTrace Cool is primarily an open monitoring and decision-support platform and does NOT claim direct automated control over third-party commercial refrigeration equipment.
          </p>
        </div>
      </div>

      {/* Current Operational Telemetry & State */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Rig Status & Operator Controls */}
        <div className="lg:col-span-6 bg-[#21262D] rounded-2xl border border-[#30363D] p-6 shadow-lg flex flex-col justify-between card-transition">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#30363D]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7D8790]">
                Prototype Rig Status
              </span>
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                rigStatus === 'RUNNING' ? 'bg-[#161B22] text-[#39FF14] border border-[#39FF14]/40' :
                rigStatus === 'PAUSED' ? 'bg-[#161B22] text-[#D29922] border border-[#D29922]/40' :
                'bg-[#161B22] text-[#7D8790] border border-[#30363D]'
              }`}>
                {rigStatus === 'RUNNING' && '● Rig Active'}
                {rigStatus === 'PAUSED' && '❚❚ Rig Paused'}
                {rigStatus === 'STOPPED' && '■ Rig Idle / Stopped'}
              </span>
            </div>

            {/* Active Batch Summary */}
            <div className="bg-[#161B22] p-4 rounded-xl border border-[#30363D] mb-6">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#7D8790] mb-1">
                Mounted Batch
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-[#F0F3F0]">{activeBatch.crop}</h4>
                  <span className="text-xs text-[#B8C0C7]">{activeBatch.id} • {activeBatch.quantity} kg</span>
                </div>
                <StatusBadge status={activeBatch.status} size="sm" />
              </div>
            </div>

            {/* Subsystem Health Grid */}
            <div className="space-y-2.5 mb-6">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#161B22] border border-[#30363D] text-xs">
                <span className="flex items-center gap-2 text-[#F0F3F0]">
                  <Droplets className="w-4 h-4 text-[#00F0FF]" />
                  Cellulose Pad Water Pump
                </span>
                <span className="font-semibold text-[#39FF14]">
                  {rigStatus === 'RUNNING' ? 'Flowing (1.2 L/min)' : 'Off / Standby'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#161B22] border border-[#30363D] text-xs">
                <span className="flex items-center gap-2 text-[#F0F3F0]">
                  <Wind className="w-4 h-4 text-[#00F0FF]" />
                  Evaporative Axial Fan
                </span>
                <span className="font-semibold text-[#39FF14]">
                  {rigStatus === 'RUNNING' ? 'Optimal Airflow' : 'Off / Standby'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#161B22] border border-[#30363D] text-xs">
                <span className="flex items-center gap-2 text-[#F0F3F0]">
                  <Clock className="w-4 h-4 text-[#39FF14]" />
                  Active Elapsed Duration
                </span>
                <span className="font-semibold text-[#F0F3F0]">
                  {activeBatch.coolingDurationMinutes} minutes
                </span>
              </div>
            </div>
          </div>

          {/* Simple Operator Rig Controls */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7D8790] mb-2">
              Demonstration Actions
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Start */}
              <button
                onClick={handleStartRig}
                disabled={rigStatus === 'RUNNING'}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 btn-transition ${
                  rigStatus === 'RUNNING'
                    ? 'bg-[#161B22] text-[#7D8790] cursor-not-allowed border border-[#30363D]'
                    : 'bg-[#39FF14] text-[#0D1117] hover:bg-[#32e612] shadow-sm cursor-pointer'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Start</span>
              </button>

              {/* Pause */}
              <button
                onClick={handlePauseRig}
                disabled={rigStatus !== 'RUNNING'}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 btn-transition ${
                  rigStatus !== 'RUNNING'
                    ? 'bg-[#161B22] text-[#7D8790] cursor-not-allowed border border-[#30363D]'
                    : 'bg-[#21262D] text-[#D29922] hover:bg-[#2A3139] border border-[#30363D] cursor-pointer'
                }`}
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </button>

              {/* Stop with Confirmation Modal */}
              <button
                onClick={() => setIsStopConfirmOpen(true)}
                disabled={rigStatus === 'STOPPED'}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 btn-transition ${
                  rigStatus === 'STOPPED'
                    ? 'bg-[#161B22] text-[#7D8790] cursor-not-allowed border border-[#30363D]'
                    : 'bg-[#21262D] text-[#F85149] hover:bg-[#2A3139] border border-[#30363D] cursor-pointer'
                }`}
              >
                <Square className="w-3.5 h-3.5" />
                <span>Stop...</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Environmental Reading Panel */}
        <div className="lg:col-span-6 bg-[#21262D] rounded-2xl border border-[#30363D] p-6 shadow-lg space-y-5 card-transition">
          <div className="flex items-center justify-between pb-3 border-b border-[#30363D]">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F0F3F0]">
              Live Cooling Conditions
            </h3>
            <span className="text-[11px] text-[#7D8790]">Chamber Sensor Array</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Produce Temp */}
            <div className="p-4 bg-[#161B22] rounded-xl border border-[#30363D]">
              <span className="text-[10px] uppercase font-semibold text-[#B8C0C7] flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-[#39FF14]" />
                Produce Temp
              </span>
              <div className="text-3xl font-extrabold text-[#39FF14] mt-1 tabular-nums">
                {produceTemp.toFixed(1)}°C
              </div>
              <span className="text-[10px] text-[#39FF14] font-medium">Target: {activeBatch.targetTemperature.toFixed(1)}°C</span>
            </div>

            {/* Ambient Temp */}
            <div className="p-4 bg-[#161B22] rounded-xl border border-[#30363D]">
              <span className="text-[10px] uppercase font-semibold text-[#B8C0C7] flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-[#00F0FF]" />
                Ambient Temp
              </span>
              <div className="text-3xl font-extrabold text-[#F0F3F0] mt-1 tabular-nums">
                {ambientTemp.toFixed(1)}°C
              </div>
              <span className="text-[10px] text-[#7D8790]">Outside air dry-bulb</span>
            </div>

            {/* Humidity */}
            <div className="p-4 bg-[#161B22] rounded-xl border border-[#30363D]">
              <span className="text-[10px] uppercase font-semibold text-[#B8C0C7] flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-[#00F0FF]" />
                Relative Humidity
              </span>
              <div className="text-3xl font-extrabold text-[#F0F3F0] mt-1 tabular-nums">
                {humidity}%
              </div>
              <span className="text-[10px] text-[#7D8790]">Sufficient evaporative drive</span>
            </div>

            {/* Cooling Potential */}
            <div className="p-4 bg-[#161B22] rounded-xl border border-[#30363D]">
              <span className="text-[10px] uppercase font-semibold text-[#B8C0C7] flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-[#39FF14]" />
                Cooling Potential
              </span>
              <div className="text-2xl font-bold text-[#39FF14] mt-1">
                {coolingPotential}
              </div>
              <span className="text-[10px] text-[#7D8790]">Depression margin active</span>
            </div>
          </div>

          {/* Operational Advisory */}
          <div className="bg-[#161B22] p-4 rounded-xl border border-[#30363D] text-xs text-[#F0F3F0] space-y-1">
            <div className="font-semibold flex items-center gap-1.5 text-[#39FF14]">
              <CheckCircle2 className="w-4 h-4 text-[#39FF14]" />
              Operational Condition Normal
            </div>
            <p className="text-[11px] text-[#B8C0C7] leading-relaxed">
              Evaporative pads are wet and airflow is balanced. Produce temperature is tracking downward steadily without condensation risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
