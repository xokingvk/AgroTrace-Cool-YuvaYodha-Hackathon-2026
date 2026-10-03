'use client';

import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { useApp } from '@/context/AppContext';

export default function StoryModal() {
  const { isStoryModalOpen, setIsStoryModalOpen, setCurrentScreen } = useApp();

  if (!isStoryModalOpen) return null;

  const steps = [
    { num: '01', title: 'Fresh Produce Arrives', desc: 'Harvested under midday sun with high field heat (34°C - 36°C). Rapid cooling is essential to prevent degradation.' },
    { num: '02', title: 'Temperature is Measured', desc: 'Core pulp temperature is logged at collection centre intake using an accessible food probe.' },
    { num: '03', title: 'Cooling Begins', desc: 'Produce is placed in the low-cost evaporative chamber. Water wets the cellulose pads and gentle airflow begins.' },
    { num: '04', title: 'Conditions are Monitored', desc: 'AgroTrace Cool tracks produce core temperature, ambient heat, and relative humidity continuously.' },
    { num: '05', title: 'Temperature Decreases', desc: 'Field heat is safely removed by 5°C to 10°C, lowering produce respiration rate and locking in freshness.' },
    { num: '06', title: 'Cooling Cycle Recorded', desc: 'Full batch history, duration, and water usage are logged for FPO transparency and transport readiness.' },
    { num: '07', title: 'Operator Knows What Happened', desc: 'The FPO operator receives plain-language status guidance: cooling effective, safe to dispatch.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D1117]/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#21262D] rounded-2xl border border-[#30363D] shadow-2xl w-full max-w-2xl overflow-hidden card-transition"
        role="dialog"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#30363D] flex items-center justify-between bg-[#161B22]">
          <Logo size="md" showTagline={true} />
          <button
            onClick={() => setIsStoryModalOpen(false)}
            className="p-1.5 rounded-lg text-[#7D8790] hover:text-[#F0F3F0] hover:bg-[#21262D] btn-transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
          {/* Mission statement */}
          <div className="bg-[#161B22] p-4 rounded-xl border border-[#30363D]">
            <h3 className="text-base font-bold text-[#F0F3F0] mb-1">
              Smart Monitoring for Farm-Gate Cooling
            </h3>
            <p className="text-[#B8C0C7] leading-relaxed">
              AgroTrace Cool empowers Farmer Producer Organizations (FPOs) and agricultural collection centres with reliable, low-cost evaporative cooling visibility. No complex industrial SCADA, no misleading automated controls—just calm, clear operational monitoring.
            </p>
          </div>

          {/* 4 Pillars */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-[#7D8790] mb-3">
              The Four Operating Principles
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-3 bg-[#161B22] border border-[#30363D] rounded-lg">
                <span className="block font-bold text-[#F0F3F0] text-sm">MEASURE</span>
                <span className="text-[10px] text-[#7D8790] mt-0.5 block">Pulp & Chamber Temp</span>
              </div>
              <div className="p-3 bg-[#161B22] border border-[#30363D] rounded-lg">
                <span className="block font-bold text-[#F0F3F0] text-sm">UNDERSTAND</span>
                <span className="text-[10px] text-[#7D8790] mt-0.5 block">Plain-Language Status</span>
              </div>
              <div className="p-3 bg-[#161B22] border border-[#30363D] rounded-lg">
                <span className="block font-bold text-[#F0F3F0] text-sm">RECORD</span>
                <span className="text-[10px] text-[#7D8790] mt-0.5 block">Batch History & Logs</span>
              </div>
              <div className="p-3 bg-[#161B22] border border-[#30363D] rounded-lg">
                <span className="block font-bold text-[#F0F3F0] text-sm">ACT</span>
                <span className="text-[10px] text-[#7D8790] mt-0.5 block">Dispatch at Target Temp</span>
              </div>
            </div>
          </div>

          {/* Visual Story Sequence */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-[#7D8790] mb-3">
              The Post-Harvest Cooling Journey
            </h4>
            <div className="space-y-2">
              {steps.map((s) => (
                <div key={s.num} className="p-2.5 rounded-lg bg-[#161B22] border border-[#30363D] flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-[#39FF14] bg-[#21262D] px-2 py-0.5 rounded border border-[#30363D]">
                    {s.num}
                  </span>
                  <div>
                    <h5 className="font-bold text-[#F0F3F0] text-xs">{s.title}</h5>
                    <p className="text-[11px] text-[#B8C0C7] mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#30363D] bg-[#161B22] flex items-center justify-between">
          <span className="text-[11px] text-[#7D8790]">
            AgroTrace Cool • Farm-Gate Produce Freshness
          </span>
          <button
            onClick={() => setIsStoryModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-[#F0F3F0] bg-[#21262D] hover:bg-[#2A3139] rounded-lg border border-[#30363D] btn-transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
