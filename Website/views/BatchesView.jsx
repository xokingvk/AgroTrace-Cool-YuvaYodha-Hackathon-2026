'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  FolderOpen
} from 'lucide-react';
import BatchTable from '@/components/BatchTable';
import { useApp } from '@/context/AppContext';

export default function BatchesView() {
  const { batches, setIsAddBatchOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [cropFilter, setCropFilter] = useState('ALL');

  // Filter logic
  const filteredBatches = batches.filter((b) => {
    const matchesSearch = 
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.farmerSupplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.collectionCentre.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    const matchesCrop = cropFilter === 'ALL' || b.crop === cropFilter;

    return matchesSearch && matchesStatus && matchesCrop;
  });

  const uniqueCrops = Array.from(new Set(batches.map(b => b.crop)));

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16 md:pb-8">
      {/* Top Banner & Action */}
      <section className="bg-[#21262D] rounded-2xl border border-[#30363D] p-6 sm:p-7 shadow-lg card-transition flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#7D8790] flex items-center gap-1.5 mb-1.5">
            <span>Logistics & Handling</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
            <span className="text-[#39FF14] font-bold">AgroTrace Cool</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F0F3F0]">
            Batches
          </h1>
          <p className="text-xs sm:text-sm text-[#B8C0C7] mt-1">
            Track incoming produce lots and cooling transitions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddBatchOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#0D1117] bg-[#39FF14] hover:bg-[#32e612] shadow-sm btn-transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#0D1117]" />
            <span>+ Add Batch</span>
          </button>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section aria-label="Search and Filters" className="bg-[#21262D] rounded-xl border border-[#30363D] p-4 shadow-sm card-transition flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D8790]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search batches by ID, crop, or farmer..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#161B22] text-[#F0F3F0] placeholder-[#7D8790] rounded-lg border border-[#30363D] focus:border-[#39FF14] focus:outline-none"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-[#B8C0C7]">
            <span className="font-semibold uppercase text-[10px] text-[#7D8790]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-[#161B22] text-[#F0F3F0] rounded-lg border border-[#30363D] focus:border-[#39FF14] focus:outline-none text-xs"
            >
              <option value="ALL">All Statuses</option>
              <option value="COOLING">Cooling</option>
              <option value="MONITORING">Monitoring</option>
              <option value="COMPLETED">Completed</option>
              <option value="ATTENTION REQUIRED">Attention Required</option>
            </select>
          </div>

          {/* Crop Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-[#B8C0C7]">
            <span className="font-semibold uppercase text-[10px] text-[#7D8790]">Crop:</span>
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-[#161B22] text-[#F0F3F0] rounded-lg border border-[#30363D] focus:border-[#39FF14] focus:outline-none text-xs"
            >
              <option value="ALL">All Crops</option>
              {uniqueCrops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          {/* Reset Filters button */}
          {(statusFilter !== 'ALL' || cropFilter !== 'ALL' || searchQuery) && (
            <button
              onClick={() => {
                setStatusFilter('ALL');
                setCropFilter('ALL');
                setSearchQuery('');
              }}
              className="text-xs text-[#39FF14] hover:underline px-2 py-1 font-medium cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </section>

      {/* Batch Table Container */}
      <BatchTable batches={filteredBatches} title="All Registered Batches" />
    </div>
  );
}
