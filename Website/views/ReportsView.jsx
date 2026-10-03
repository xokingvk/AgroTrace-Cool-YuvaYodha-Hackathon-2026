'use client';

import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Filter, 
  Calendar, 
  Clock, 
  Droplets, 
  Zap, 
  Printer, 
  Search, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import DemoBadge from '@/components/DemoBadge';
import StatusBadge from '@/components/StatusBadge';
import { useApp } from '@/context/AppContext';

export default function ReportsView() {
  const { batches, setViewingBatch, showToast } = useApp();
  const [selectedCrop, setSelectedCrop] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Filter batches
  const filtered = batches.filter((b) => {
    const matchCrop = selectedCrop === 'ALL' || b.crop === selectedCrop;
    const matchStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchCrop && matchStatus;
  });

  // Calculate totals
  const totalVolumeKg = filtered.reduce((acc, b) => acc + b.quantity, 0);
  const avgCoolingTime = filtered.length > 0
    ? Math.round(filtered.reduce((acc, b) => acc + b.coolingDurationMinutes, 0) / filtered.length)
    : 0;
  const avgTempDrop = filtered.length > 0
    ? (filtered.reduce((acc, b) => acc + (b.initialTemperature - b.currentTemperature), 0) / filtered.length).toFixed(1)
    : '0.0';

  // Export to CSV Function
  const exportToCSV = () => {
    const headers = [
      'Batch ID',
      'Crop',
      'Variety',
      'Quantity (kg)',
      'Collection Centre',
      'Initial Temp (°C)',
      'Current Temp (°C)',
      'Temp Drop (°C)',
      'Cooling Duration (min)',
      'Status',
      'Water Used (L)',
      'Energy Used (kWh)',
      'Resource Data Status',
      'Farmer/Supplier'
    ];

    const rows = filtered.map(b => [
      b.id,
      `"${b.crop}"`,
      `"${b.variety}"`,
      b.quantity,
      `"${b.collectionCentre}"`,
      b.initialTemperature.toFixed(1),
      b.currentTemperature.toFixed(1),
      (b.initialTemperature - b.currentTemperature).toFixed(1),
      b.coolingDurationMinutes,
      b.status,
      b.waterUsedLiters !== null ? b.waterUsedLiters : 'Not Connected',
      b.energyUsedKwh !== null ? b.energyUsedKwh : 'Not Connected',
      b.hasResourceMeters ? 'Simulated Demo Meter' : 'No Meter Attached',
      `"${b.farmerSupplier}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `agrotrace_cooling_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Report CSV successfully generated and downloaded', 'success');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16 md:pb-6">
      {/* Top Banner */}
      <div className="bg-[#21262D] rounded-2xl border border-[#30363D] p-6 shadow-lg flex flex-wrap items-center justify-between gap-4 card-transition">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#7D8790] flex items-center gap-1.5 mb-1">
            <span>Historical Records</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
            <span className="text-[#39FF14] font-bold">AgroTrace Cool</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F0F3F0]">
            Batch Reports & Logs
          </h2>
          <p className="text-xs sm:text-sm text-[#B8C0C7] mt-1">
            Review post-harvest cooling logs, temperature performance, and resource usage
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#0D1117] bg-[#39FF14] hover:bg-[#32e612] shadow-sm btn-transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#0D1117]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary Aggregate Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#21262D] p-5 rounded-xl border border-[#30363D] shadow-sm card-transition">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7D8790]">
            Total Produce Logged
          </span>
          <div className="text-3xl font-bold text-[#F0F3F0] mt-1">
            {totalVolumeKg} <span className="text-sm font-normal text-[#B8C0C7]">kg</span>
          </div>
          <span className="text-xs text-[#7D8790] mt-1 block">Across {filtered.length} registered batches</span>
        </div>

        <div className="bg-[#21262D] p-5 rounded-xl border border-[#30363D] shadow-sm card-transition">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7D8790]">
            Avg. Cooling Duration
          </span>
          <div className="text-3xl font-bold text-[#F0F3F0] mt-1">
            {avgCoolingTime} <span className="text-sm font-normal text-[#B8C0C7]">minutes</span>
          </div>
          <span className="text-xs text-[#7D8790] mt-1 block">Per completed evaporative cycle</span>
        </div>

        <div className="bg-[#21262D] p-5 rounded-xl border border-[#30363D] shadow-sm card-transition">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7D8790]">
            Avg. Temp Reduction
          </span>
          <div className="text-3xl font-bold text-[#39FF14] mt-1">
            {avgTempDrop}° <span className="text-sm font-normal text-[#B8C0C7]">C</span>
          </div>
          <span className="text-xs text-[#39FF14] font-medium mt-1 block">Field sensible heat removed</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#21262D] rounded-xl border border-[#30363D] p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs card-transition">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#B8C0C7]">
            <span className="font-semibold uppercase text-[11px] text-[#7D8790]">Crop:</span>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="px-2.5 py-1.5 bg-[#161B22] text-[#F0F3F0] rounded-lg border border-[#30363D] focus:border-[#39FF14] focus:outline-none"
            >
              <option value="ALL">All Crops</option>
              <option value="Tomato">Tomato</option>
              <option value="Capsicum">Capsicum</option>
              <option value="Mango">Mango</option>
              <option value="Green Chili">Green Chili</option>
              <option value="Cabbage">Cabbage</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-[#B8C0C7]">
            <span className="font-semibold uppercase text-[11px] text-[#7D8790]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-[#161B22] text-[#F0F3F0] rounded-lg border border-[#30363D] focus:border-[#39FF14] focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="COMPLETED">Completed</option>
              <option value="COOLING">Cooling</option>
              <option value="MONITORING">Monitoring</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-[#7D8790]">
          Showing <strong className="text-[#F0F3F0]">{filtered.length}</strong> batch records
        </div>
      </div>

      {/* Comprehensive Report Table */}
      <div className="bg-[#21262D] rounded-2xl border border-[#30363D] p-6 shadow-lg card-transition">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#30363D]">
          <h3 className="text-base font-semibold text-[#F0F3F0]">
            Batch Cooling & Resource Audit Log
          </h3>
          <DemoBadge />
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#30363D]">
          <table className="w-full text-left text-xs border-collapse bg-[#21262D]">
            <thead>
              <tr className="bg-[#161B22] border-b border-[#30363D] text-[11px] font-semibold uppercase tracking-wider text-[#7D8790]">
                <th className="py-3 px-3">Batch ID</th>
                <th className="py-3 px-3">Crop / Lot</th>
                <th className="py-3 px-3">Qty</th>
                <th className="py-3 px-3">Temp Delta</th>
                <th className="py-3 px-3">Time</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Water Used</th>
                <th className="py-3 px-3">Energy Used</th>
                <th className="py-3 px-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363D]">
              {filtered.map((b) => {
                const drop = (b.initialTemperature - b.currentTemperature).toFixed(1);
                return (
                  <tr
                    key={b.id}
                    onClick={() => setViewingBatch(b)}
                    className="hover:bg-[#2A3139] cursor-pointer card-transition"
                  >
                    <td className="py-3.5 px-3 font-mono font-bold text-[#F0F3F0]">
                      {b.id}
                    </td>
                    <td className="py-3.5 px-3 text-[#F0F3F0]">
                      <div className="font-medium">{b.crop}</div>
                      <div className="text-[11px] text-[#B8C0C7]">{b.variety}</div>
                    </td>
                    <td className="py-3.5 px-3 font-medium text-[#F0F3F0]">
                      {b.quantity} kg
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-medium text-[#B8C0C7]">
                        {b.initialTemperature.toFixed(1)}°C → <span className="text-[#39FF14] font-semibold">{b.currentTemperature.toFixed(1)}°C</span>
                        <span className="text-[#39FF14] font-semibold ml-1 bg-[#161B22] px-1.5 py-0.5 rounded border border-[#30363D] text-[11px]">
                          -{drop}°C
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-[#B8C0C7]">
                      {b.coolingDurationMinutes} min
                    </td>
                    <td className="py-3.5 px-3">
                      <StatusBadge status={b.status} size="sm" />
                    </td>
                    {/* Water Resource */}
                    <td className="py-3.5 px-3">
                      {b.waterUsedLiters !== null ? (
                        <div>
                          <span className="font-semibold text-[#39FF14]">{b.waterUsedLiters} L</span>
                          <span className="text-[10px] text-[#7D8790] block">Simulated</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#7D8790] italic">Not Connected</span>
                      )}
                    </td>
                    {/* Energy Resource */}
                    <td className="py-3.5 px-3">
                      {b.energyUsedKwh !== null ? (
                        <div>
                          <span className="font-semibold text-[#39FF14]">{b.energyUsedKwh} kWh</span>
                          <span className="text-[10px] text-[#7D8790] block">Simulated</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#7D8790] italic">Not Connected</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span className="text-xs text-[#39FF14] font-semibold hover:underline">
                        View
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
