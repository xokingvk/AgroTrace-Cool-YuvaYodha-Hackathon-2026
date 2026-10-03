'use client';

import React from 'react';
import { 
  ArrowRight, 
  Thermometer, 
  Droplets, 
  Wind, 
  ShieldCheck, 
  Boxes, 
  Activity, 
  FileSpreadsheet, 
  Cpu, 
  CheckCircle2 
} from 'lucide-react';
import Logo from '@/components/Logo';
import DemoBadge from '@/components/DemoBadge';
import { useApp } from '@/context/AppContext';

export default function LandingView() {
  const { setCurrentScreen, setIsEsp32ModalOpen, setIsStoryModalOpen } = useApp();

  return (
    <div className="space-y-12 sm:space-y-16 animate-fade-in pb-16">
      {/* Hero Section */}
      <section className="bg-[#21262D] rounded-3xl border border-[#30363D] p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden transition-colors">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#161B22] text-[#39FF14] border border-[#30363D]">
              Post-Harvest Agri-Tech
            </span>
            <DemoBadge />
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F0F3F0] tracking-tight leading-tight">
            AgroTrace <span className="font-semibold text-[#39FF14]">Cool</span>
          </h1>
          <p className="text-lg sm:text-xl font-medium text-[#39FF14] mt-2">
            Smart Monitoring for Farm-Gate Cooling
          </p>

          <p className="text-sm sm:text-base text-[#B8C0C7] mt-4 leading-relaxed max-w-2xl">
            Monitor produce temperature, cooling conditions, and batch history with one simple system. Designed for Farmer Producer Organizations and rural agricultural collection centres.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentScreen('overview')}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-[#0D1117] bg-[#39FF14] hover:bg-[#32e612] shadow-sm btn-transition cursor-pointer"
            >
              <span>Start Monitoring</span>
              <ArrowRight className="w-4 h-4 text-[#0D1117]" />
            </button>

            <button
              onClick={() => setIsEsp32ModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-[#F0F3F0] bg-[#161B22] hover:bg-[#2A3139] border border-[#30363D] btn-transition cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-[#39FF14]" />
              <span>View Hardware Blueprint</span>
            </button>
          </div>
        </div>

        {/* 4 Pillars Card Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#30363D]">
          <div className="p-4 bg-[#161B22] rounded-xl border border-[#30363D] transition-colors">
            <span className="text-xs font-bold text-[#39FF14] uppercase block">01 • Measure</span>
            <span className="text-xs text-[#B8C0C7] mt-1 block">Digital core pulp probe logs incoming field heat</span>
          </div>
          <div className="p-4 bg-[#161B22] rounded-xl border border-[#30363D] transition-colors">
            <span className="text-xs font-bold text-[#39FF14] uppercase block">02 • Understand</span>
            <span className="text-xs text-[#B8C0C7] mt-1 block">Plain-language status without industrial jargon</span>
          </div>
          <div className="p-4 bg-[#161B22] rounded-xl border border-[#30363D] transition-colors">
            <span className="text-xs font-bold text-[#39FF14] uppercase block">03 • Record</span>
            <span className="text-xs text-[#B8C0C7] mt-1 block">Verifiable batch duration, temp, and water usage</span>
          </div>
          <div className="p-4 bg-[#161B22] rounded-xl border border-[#30363D] transition-colors">
            <span className="text-xs font-bold text-[#39FF14] uppercase block">04 • Act</span>
            <span className="text-xs text-[#B8C0C7] mt-1 block">Dispatch produce with proven shelf-life preservation</span>
          </div>
        </div>
      </section>

      {/* Visual Post-Harvest Journey */}
      <section className="bg-[#21262D] rounded-3xl border border-[#30363D] p-8 sm:p-12 shadow-2xl transition-colors">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#39FF14] block mb-1">
            Simple Farm-Gate Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F0F3F0]">
            How Produce Preserves Freshness in the Field
          </h2>
          <p className="text-xs sm:text-sm text-[#B8C0C7] mt-2">
            Eliminating the post-harvest cooling blind spot between harvest and cold-chain transit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#161B22] rounded-2xl border border-[#30363D] space-y-3 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#21262D] border border-[#30363D] text-[#39FF14] flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-base font-bold text-[#F0F3F0]">Harvest & Intake</h3>
            <p className="text-xs text-[#B8C0C7] leading-relaxed">
              Produce arrives hot from morning field picking (34°C - 36°C). AgroTrace Cool logs initial pulp heat and registers the crate batch immediately.
            </p>
          </div>

          <div className="p-6 bg-[#161B22] rounded-2xl border border-[#30363D] space-y-3 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#21262D] border border-[#30363D] text-[#39FF14] flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-base font-bold text-[#F0F3F0]">Evaporative Cooling</h3>
            <p className="text-xs text-[#B8C0C7] leading-relaxed">
              Low-cost wet cellulose pads and uniform ventilation lower ambient air temperature by 4°C - 8°C. Produce core temperature steadily tracks down.
            </p>
          </div>

          <div className="p-6 bg-[#161B22] rounded-2xl border border-[#30363D] space-y-3 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#21262D] border border-[#30363D] text-[#39FF14] flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-base font-bold text-[#F0F3F0]">Verified Dispatch</h3>
            <p className="text-xs text-[#B8C0C7] leading-relaxed">
              When target temperature (24°C) is reached, the operator is notified. The complete cooling cycle is logged for FPO transparency and transit readiness.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#30363D] flex items-center justify-between">
          <span className="text-xs text-[#7D8790]">
            AgroTrace Cool • Cool the Produce. Preserve the Freshness.
          </span>
          <button
            onClick={() => setCurrentScreen('overview')}
            className="text-xs font-semibold text-[#39FF14] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Open Operations Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
}
