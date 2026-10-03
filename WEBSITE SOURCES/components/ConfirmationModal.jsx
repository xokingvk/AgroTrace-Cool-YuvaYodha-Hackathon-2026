'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ConfirmationModal() {
  const { isStopConfirmOpen, setIsStopConfirmOpen, handleStopRig, activeBatch, produceTemp } = useApp();

  if (!isStopConfirmOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D1117]/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#21262D] rounded-2xl border border-[#30363D] shadow-2xl w-full max-w-md p-6 card-transition"
        role="alertdialog"
        aria-modal="true"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#161B22] border border-[#30363D] text-[#D29922] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <h3 className="text-base font-bold text-[#F0F3F0]">
              Confirm Stop Cooling
            </h3>
            <p className="text-xs text-[#B8C0C7] mt-1 leading-relaxed">
              Batch <strong className="text-[#F0F3F0]">{activeBatch.id} ({activeBatch.crop})</strong> has cooled to <strong className="text-[#39FF14]">{produceTemp.toFixed(1)}°C</strong>.
            </p>
            <p className="text-xs text-[#B8C0C7] mt-2 leading-relaxed bg-[#161B22] p-3 rounded-lg border border-[#30363D]">
              Recommended target is <strong className="text-[#39FF14]">{activeBatch.targetTemperature.toFixed(1)}°C</strong>. Stopping now will mark this cycle as concluded for the demonstration rig.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-[#30363D]">
          <button
            onClick={() => setIsStopConfirmOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-[#F0F3F0] bg-[#21262D] hover:bg-[#2A3139] rounded-lg border border-[#30363D] btn-transition cursor-pointer"
          >
            Continue Cooling
          </button>
          <button
            onClick={handleStopRig}
            className="px-4 py-2 text-xs font-bold text-[#0D1117] bg-[#D29922] hover:bg-[#c48d1d] rounded-lg shadow-sm btn-transition cursor-pointer"
          >
            Yes, Stop Cycle
          </button>
        </div>
      </div>
    </div>
  );
}
