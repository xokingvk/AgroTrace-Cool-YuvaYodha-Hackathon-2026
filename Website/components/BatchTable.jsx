'use client';

import React from 'react';
import { ArrowRight, Clock, Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useApp } from '@/context/AppContext';

export default function BatchTable({ batches: propBatches, limit, title = "Recent Batches", className = '' }) {
  const { batches: allBatches, setSelectedBatchId, setViewingBatch, setCurrentScreen } = useApp();

  const displayBatches = propBatches || (limit ? allBatches.slice(0, limit) : allBatches);

  const handleBatchClick = (batch) => {
    setSelectedBatchId(batch.id);
    setViewingBatch(batch);
  };

  return (
    <section 
      aria-labelledby="batch-table-heading"
      className={`bg-[#21262D] rounded-2xl border border-[#30363D] p-5 sm:p-6 lg:p-7 shadow-lg card-transition ${className}`}
    >
      {/* Table Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-3 border-b border-[#30363D]">
        <div>
          <h2 id="batch-table-heading" className="text-base font-bold text-[#F0F3F0]">
            {title}
          </h2>
          <p className="text-xs text-[#B8C0C7] mt-0.5">
            Click any batch record to view telemetry, cooling history, and resource metrics
          </p>
        </div>

        {limit && (
          <button
            onClick={() => setCurrentScreen('batches')}
            className="text-xs font-semibold text-[#39FF14] hover:underline flex items-center gap-1.5 btn-transition cursor-pointer"
          >
            <span>View All Batches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Desktop View: Clean Spacious Table (Background: #21262D, Header: #161B22, Border: #30363D, Hover: #2A3139) */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-[#30363D]">
        <table className="w-full text-left border-collapse bg-[#21262D]">
          <thead>
            <tr className="bg-[#161B22] border-b border-[#30363D] text-[11px] font-semibold uppercase tracking-wider text-[#7D8790]">
              <th className="py-3 px-3.5">Batch ID</th>
              <th className="py-3 px-3.5">Crop & Variety</th>
              <th className="py-3 px-3.5">Quantity</th>
              <th className="py-3 px-3.5">Temp Transition</th>
              <th className="py-3 px-3.5">Duration</th>
              <th className="py-3 px-3.5">Status</th>
              <th className="py-3 px-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#30363D] text-xs">
            {displayBatches.map((batch) => {
              const drop = (batch.initialTemperature - batch.currentTemperature).toFixed(1);
              return (
                <tr
                  key={batch.id}
                  onClick={() => handleBatchClick(batch)}
                  className="hover:bg-[#2A3139] card-transition cursor-pointer group"
                >
                  <td className="py-3.5 px-3.5 font-bold text-[#F0F3F0]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{batch.id}</span>
                      {batch.isDemo && (
                        <span className="text-[10px] text-[#7D8790] bg-[#161B22] px-1.5 py-0.5 rounded border border-[#30363D]">
                          DEMO
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-3.5">
                    <div className="font-semibold text-[#F0F3F0]">{batch.crop}</div>
                    <div className="text-[11px] text-[#B8C0C7]">{batch.variety}</div>
                  </td>
                  <td className="py-3.5 px-3.5 font-semibold text-[#F0F3F0]">
                    {batch.quantity} kg
                  </td>
                  <td className="py-3.5 px-3.5">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="text-[#B8C0C7]">{batch.initialTemperature.toFixed(1)}°C</span>
                      <ArrowRight className="w-3 h-3 text-[#7D8790]" />
                      <span className="font-bold text-[#39FF14]">{batch.currentTemperature.toFixed(1)}°C</span>
                      <span className="text-[11px] text-[#39FF14] font-bold ml-1 bg-[#161B22] px-1.5 py-0.5 rounded border border-[#30363D]">
                        -{drop}°C
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3.5 text-[#B8C0C7]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#39FF14]" />
                      <span>{batch.coolingDurationMinutes} min</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3.5">
                    <StatusBadge status={batch.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBatchClick(batch);
                      }}
                      className="p-1.5 rounded-lg text-[#B8C0C7] group-hover:text-[#39FF14] group-hover:bg-[#161B22] border border-transparent group-hover:border-[#30363D] btn-transition cursor-pointer"
                      title="Inspect batch details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile View: Stacked Cards (Card: #21262D, Border: #30363D, Batch ID: #F0F3F0, Temp: #39FF14, Info: #B8C0C7) */}
      <div className="md:hidden space-y-3">
        {displayBatches.map((batch) => {
          const drop = (batch.initialTemperature - batch.currentTemperature).toFixed(1);
          return (
            <div
              key={batch.id}
              onClick={() => handleBatchClick(batch)}
              className="bg-[#21262D] border border-[#30363D] rounded-xl p-4 shadow-sm active:bg-[#2A3139] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#30363D]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#F0F3F0] text-sm font-mono">{batch.id}</span>
                  <span className="text-[10px] text-[#7D8790] bg-[#161B22] px-1 rounded border border-[#30363D]">
                    DEMO
                  </span>
                </div>
                <StatusBadge status={batch.status} size="sm" />
              </div>

              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-[#F0F3F0]">{batch.crop} ({batch.variety})</span>
                <span className="text-[#B8C0C7] font-medium bg-[#161B22] px-2 py-0.5 rounded border border-[#30363D]">
                  {batch.quantity} kg
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#30363D]">
                <div>
                  <span className="text-[10px] text-[#7D8790] uppercase">Temp Drop</span>
                  <div className="font-bold text-[#39FF14]">
                    {batch.initialTemperature.toFixed(1)}°C → {batch.currentTemperature.toFixed(1)}°C
                    <span className="text-[#39FF14] ml-1">(-{drop}°C)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#7D8790] uppercase">Duration</span>
                  <div className="font-medium text-[#B8C0C7] flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3 text-[#39FF14]" />
                    {batch.coolingDurationMinutes} min
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
