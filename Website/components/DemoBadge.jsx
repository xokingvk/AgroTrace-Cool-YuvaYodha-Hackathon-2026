'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export default function DemoBadge({ className = '' }) {
  const { setIsEsp32ModalOpen } = useApp();

  return (
    <button
      onClick={() => setIsEsp32ModalOpen(true)}
      type="button"
      title="Simulated sensor stream • Click to view planned ESP32 architecture"
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-[#21262D] text-[#B8C0C7] border border-[#30363D] hover:bg-[#2A3139] hover:text-[#F0F3F0] btn-transition cursor-pointer ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
      <span>Demo Data</span>
    </button>
  );
}
