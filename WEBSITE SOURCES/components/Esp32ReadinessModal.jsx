'use client';

import React from 'react';
import { X, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Esp32ReadinessModal() {
  const { isEsp32ModalOpen, setIsEsp32ModalOpen } = useApp();

  if (!isEsp32ModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D1117]/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#21262D] rounded-2xl border border-[#30363D] shadow-2xl w-full max-w-2xl overflow-hidden card-transition"
        role="dialog"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#30363D] flex items-center justify-between bg-[#161B22]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#21262D] border border-[#30363D] text-[#39FF14] flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0F3F0]">ESP32 Hardware Readiness Blueprint</h3>
              <p className="text-xs text-[#B8C0C7]">Mock Data Isolation & Future Telemetry Pipeline</p>
            </div>
          </div>
          <button
            onClick={() => setIsEsp32ModalOpen(false)}
            className="p-1.5 rounded-lg text-[#7D8790] hover:text-[#F0F3F0] hover:bg-[#21262D] btn-transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
          {/* Status Alert */}
          <div className="p-3.5 bg-[#161B22] border border-[#30363D] rounded-xl text-[#F0F3F0] flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#39FF14] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-xs block text-[#39FF14]">Current State: DEMO DATA MODE</span>
              <p className="text-[11px] text-[#B8C0C7] mt-0.5 leading-relaxed">
                The frontend uses structured mock data models identical to the planned telemetry payload. No fake ESP32 connection is claimed. When physical hardware is flashed and connected, only the data streaming adapter updates—the UI remains 100% stable.
              </p>
            </div>
          </div>

          {/* Architecture Flow */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-[#7D8790] mb-3">
              Planned Hardware-to-Cloud Telemetry Flow
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center">
              <div className="bg-[#161B22] p-3 rounded-lg border border-[#30363D] flex flex-col items-center">
                <span className="font-bold text-[#F0F3F0] text-xs">ESP32 MCU</span>
                <span className="text-[10px] text-[#7D8790] mt-1">Dual-core WiFi/BLE microcontroller</span>
              </div>
              <div className="bg-[#161B22] p-3 rounded-lg border border-[#30363D] flex flex-col items-center">
                <span className="font-bold text-[#F0F3F0] text-xs">Sensor Array</span>
                <span className="text-[10px] text-[#7D8790] mt-1">DS18B20 (Pulp) + SHT31 (Chamber RH/Temp)</span>
              </div>
              <div className="bg-[#161B22] p-3 rounded-lg border border-[#30363D] flex flex-col items-center">
                <span className="font-bold text-[#F0F3F0] text-xs">Data Sync</span>
                <span className="text-[10px] text-[#7D8790] mt-1">MQTT over TLS / JSON HTTP endpoint</span>
              </div>
              <div className="bg-[#161B22] p-3 rounded-lg border border-[#39FF14]/40 flex flex-col items-center">
                <span className="font-bold text-[#39FF14] text-xs">AgroTrace Cool</span>
                <span className="text-[10px] text-[#39FF14] mt-1">Live monitoring & operator advisory</span>
              </div>
            </div>
          </div>

          {/* Payload Specification */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-[#7D8790] mb-2">
              JSON Telemetry Schema Specification
            </h4>
            <div className="bg-[#0D1117] text-[#39FF14] p-3.5 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-[#30363D]">
              <pre>{`{
  "device_id": "ESP32-COOLRIG-01",
  "batch_id": "AT-001",
  "timestamp": 1727938560,
  "sensors": {
    "produce_temp_c": 29.04,     // DS18B20 food-grade probe
    "ambient_temp_c": 33.21,     // SHT31 chamber sensor
    "relative_humidity": 68.2,   // SHT31 RH percentage
    "water_flow_lpm": 1.20,      // Hall effect pulse sensor
    "fan_current_a": 0.85        // CT current sensor
  },
  "cooling_active": true
}`}</pre>
            </div>
          </div>

          {/* Guidelines Checklist */}
          <div className="space-y-1.5 text-[#B8C0C7]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#39FF14]" />
              <span>Dedicated adapter architecture ready for direct WebSocket or SSE ingestion.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#39FF14]" />
              <span>Offline caching fallback designed for rural intermittent connectivity.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#30363D] bg-[#161B22] flex justify-end">
          <button
            onClick={() => setIsEsp32ModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-[#F0F3F0] bg-[#21262D] hover:bg-[#2A3139] rounded-lg border border-[#30363D] btn-transition cursor-pointer"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
}
