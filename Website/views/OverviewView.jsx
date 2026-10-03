'use client';

import React from 'react';
import { 
  Boxes, 
  Snowflake, 
  CheckCircle2, 
  Scale, 
  Plus
} from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import TemperatureCard from '@/components/TemperatureCard';
import LiveConditionPanel from '@/components/LiveConditionPanel';
import TemperatureChart from '@/components/TemperatureChart';
import CoolingDecisionAdvisory from '@/components/CoolingDecisionAdvisory';
import BatchTable from '@/components/BatchTable';
import { useApp } from '@/context/AppContext';

export default function OverviewView() {
  const { batches, activeBatch, setIsAddBatchOpen } = useApp();

  // Metrics computation from batches
  const activeBatchesCount = batches.filter(b => b.status === 'COOLING' || b.status === 'MONITORING').length;
  const coolingNowCount = batches.filter(b => b.status === 'COOLING').length;
  const completedTodayCount = batches.filter(b => b.status === 'COMPLETED').length + 3; // historical lots
  const totalProduceKg = batches.reduce((sum, b) => sum + (b.quantity || 0), 0);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16 md:pb-8">
      {/* 1. Header Greeting & Context */}
      <section className="bg-[#21262D] rounded-2xl border border-[#30363D] p-6 sm:p-7 shadow-lg card-transition flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#7D8790] flex items-center gap-1.5 mb-1.5">
            <span>Collection Centre Operations</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
            <span className="text-[#39FF14] font-bold">AgroTrace Cool</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F0F3F0]">
            Monitor today's produce and cooling activity.
          </h1>
          <p className="text-xs sm:text-sm text-[#B8C0C7] mt-1">
            Chennai FPO Collection Centre #1 • Low-cost evaporative monitoring system
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddBatchOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#0D1117] bg-[#39FF14] hover:bg-[#32e612] shadow-sm btn-transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#0D1117]" />
            <span>Add Batch</span>
          </button>
        </div>
      </section>

      {/* Summary Metrics Row */}
      <section aria-label="Summary Metrics" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={Boxes}
          value={String(activeBatchesCount).padStart(2, '0')}
          label="Active Batches"
          context="Under observation or cooling"
        />

        <MetricCard
          icon={Snowflake}
          value={String(coolingNowCount).padStart(2, '0')}
          label="Cooling Now"
          context="Chamber evaporative active"
        />

        <MetricCard
          icon={CheckCircle2}
          value={String(completedTodayCount).padStart(2, '0')}
          label="Completed Today"
          context="Target temperature achieved"
        />

        <MetricCard
          icon={Scale}
          value={totalProduceKg}
          unit="kg"
          label="Total Produce"
          context="Cumulative intake today"
        />
      </section>

      {/* 2. PRIMARY CURRENT BATCH (Spacious, prominent full-width card) */}
      <TemperatureCard batch={activeBatch} />

      {/* 3. CURRENT ENVIRONMENTAL CONDITIONS (Dedicated 4-column responsive monitoring panel) */}
      <LiveConditionPanel />

      {/* 4. TEMPERATURE TREND & DECISION ADVISORY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <TemperatureChart />
        </div>
        <div className="lg:col-span-5">
          <CoolingDecisionAdvisory />
        </div>
      </div>

      {/* 5. RECENT BATCHES TABLE (With slide-over details on click) */}
      <BatchTable limit={5} title="Recent Batches" />
    </div>
  );
}
