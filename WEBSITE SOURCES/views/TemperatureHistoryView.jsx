'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import DemoBadge from '@/components/DemoBadge';
import { BATCH_COMPARISON_SERIES, INITIAL_BATCHES } from '@/lib/data';
import { useApp } from '@/context/AppContext';

export default function TemperatureHistoryView() {
  const { setViewingBatch } = useApp();

  // Selected batches for overlay
  const [activeCurves, setActiveCurves] = useState({
    AT001: true,
    AT003: true,
    AT004: true,
    AT005: false,
  });

  const toggleCurve = (key) => {
    setActiveCurves(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Exact Cyber Ink & Lime Curve Colors
  const curveColors = {
    AT001: '#39FF14', // Cyber Lime (Primary)
    AT002: '#00F0FF', // Electric Cyan (Secondary)
    AT003: '#B8C0C7', // Slate / Secondary text
    AT004: '#4ADE80', // Soft Muted Lime
    AT005: '#D29922', // Muted Amber
  };

  const curveLabels = {
    AT001: 'AT-001 (Tomato, 100 kg)',
    AT002: 'AT-002 (Tomato, 150 kg)',
    AT003: 'AT-003 (Tomato, 75 kg)',
    AT004: 'AT-004 (Capsicum, 120 kg)',
    AT005: 'AT-005 (Mango, 200 kg)',
  };

  const gridColor = '#30363D';
  const axisTextColor = '#7D8790';
  const axisLineColor = '#30363D';
  const targetLineColor = '#D29922';

  const CustomHistoryTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#21262D] border border-[#30363D] p-3.5 rounded-xl shadow-2xl text-xs card-transition">
          <div className="font-semibold text-[#F0F3F0] mb-2 pb-1.5 border-b border-[#30363D]">
            Elapsed Time: {label} minutes
          </div>
          {payload.map((item) => (
            <div key={item.dataKey} className="flex items-center justify-between gap-4 py-0.5">
              <span className="flex items-center gap-1.5 text-[#B8C0C7]">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {curveLabels[item.dataKey] || item.dataKey}:
              </span>
              <span className="font-bold text-[#F0F3F0]">{item.value}°C</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16 md:pb-8">
      {/* Top Banner */}
      <section className="bg-[#21262D] rounded-2xl border border-[#30363D] p-6 sm:p-7 shadow-lg card-transition flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#7D8790] flex items-center gap-1.5 mb-1.5">
            <span>Historical Produce Behavior</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
            <span className="text-[#39FF14] font-bold">AgroTrace Cool</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F0F3F0]">
            Temperature History
          </h1>
          <p className="text-xs sm:text-sm text-[#B8C0C7] mt-1">
            Compare temperature curves and cooling durations across previous produce cycles
          </p>
        </div>

        <DemoBadge />
      </section>

      {/* Comparative Chart Container (Chart background: #161B22, Border: #30363D) */}
      <section className="bg-[#21262D] rounded-2xl border border-[#30363D] p-6 shadow-lg card-transition">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#30363D]">
          <div>
            <h2 className="text-base font-bold text-[#F0F3F0]">
              Produce Temperature Decay vs Elapsed Cooling Time
            </h2>
            <p className="text-xs text-[#B8C0C7] mt-0.5">
              Normalized from Minute 0 (commencement of evaporative airflow)
            </p>
          </div>

          {/* Batch Selector Pills for Chart Overlay */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase text-[#7D8790] mr-1">Overlay:</span>
            {Object.keys(activeCurves).map((key) => {
              const active = activeCurves[key];
              return (
                <button
                  key={key}
                  onClick={() => toggleCurve(key)}
                  className={`px-2.5 py-1 text-xs rounded-lg border font-semibold btn-transition flex items-center gap-1.5 cursor-pointer ${
                    active 
                      ? 'bg-[#161B22] text-[#F0F3F0] border-[#39FF14]/60' 
                      : 'bg-[#161B22] text-[#7D8790] border-[#30363D] opacity-60'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: curveColors[key] }} />
                  <span>{key}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recharts Multi-line Comparison */}
        <div className="w-full h-80 sm:h-96 bg-[#161B22] p-4 rounded-xl border border-[#30363D]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={BATCH_COMPARISON_SERIES}
              margin={{ top: 10, right: 20, left: -15, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} strokeOpacity={0.6} vertical={false} />
              <XAxis
                dataKey="minute"
                unit=" min"
                tick={{ fill: axisTextColor, fontSize: 11, fontFamily: 'Poppins' }}
                axisLine={{ stroke: axisLineColor }}
                tickLine={false}
              />
              <YAxis
                domain={[22, 38]}
                unit="°C"
                tick={{ fill: axisTextColor, fontSize: 11, fontFamily: 'Poppins' }}
                axisLine={{ stroke: axisLineColor }}
                tickLine={false}
              />
              <Tooltip content={<CustomHistoryTooltip />} />

              {/* Recommended Storage Line */}
              <ReferenceLine
                y={24.0}
                stroke={targetLineColor}
                strokeDasharray="4 4"
                label={{ value: 'Target: 24°C', fill: targetLineColor, fontSize: 10, position: 'right', fontFamily: 'Poppins' }}
              />

              {activeCurves.AT001 && (
                <Line
                  type="monotone"
                  dataKey="AT001"
                  stroke={curveColors.AT001}
                  strokeWidth={3}
                  name="AT-001 (Tomato)"
                  dot={{ r: 3, fill: curveColors.AT001 }}
                />
              )}

              {activeCurves.AT003 && (
                <Line
                  type="monotone"
                  dataKey="AT003"
                  stroke={curveColors.AT003}
                  strokeWidth={2.5}
                  name="AT-003 (Tomato)"
                  dot={{ r: 3, fill: curveColors.AT003 }}
                />
              )}

              {activeCurves.AT004 && (
                <Line
                  type="monotone"
                  dataKey="AT004"
                  stroke={curveColors.AT004}
                  strokeWidth={2.5}
                  name="AT-004 (Capsicum)"
                  dot={{ r: 3, fill: curveColors.AT004 }}
                />
              )}

              {activeCurves.AT005 && (
                <Line
                  type="monotone"
                  dataKey="AT005"
                  stroke={curveColors.AT005}
                  strokeWidth={2}
                  strokeDasharray="5 3"
                  name="AT-005 (Mango)"
                  dot={{ r: 3, fill: curveColors.AT005 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Informative Guidance */}
        <div className="mt-4 pt-3 border-t border-[#30363D] text-xs text-[#B8C0C7] flex flex-wrap items-center justify-between gap-2">
          <span>
            Notice how well-spaced crates (AT-001 & AT-003) achieve steady downward gradients compared to restricted crates (AT-005).
          </span>
          <span className="font-bold text-[#39FF14]">
            Average Cooling Rate: ~0.11°C/min
          </span>
        </div>
      </section>

      {/* Historical Batch Cooling Comparison Table */}
      <section className="bg-[#21262D] rounded-2xl border border-[#30363D] p-6 shadow-lg card-transition">
        <h2 className="text-base font-bold text-[#F0F3F0] mb-4">
          Comparative Batch Cooling Metrics
        </h2>

        <div className="overflow-x-auto rounded-xl border border-[#30363D]">
          <table className="w-full text-left text-xs border-collapse bg-[#21262D]">
            <thead>
              <tr className="bg-[#161B22] border-b border-[#30363D] text-[11px] font-semibold uppercase tracking-wider text-[#7D8790]">
                <th className="py-2.5 px-3">Batch ID</th>
                <th className="py-2.5 px-3">Crop</th>
                <th className="py-2.5 px-3">Initial Temp</th>
                <th className="py-2.5 px-3">Final / Current</th>
                <th className="py-2.5 px-3">Reduction</th>
                <th className="py-2.5 px-3">Duration</th>
                <th className="py-2.5 px-3">Cooling Rate</th>
                <th className="py-2.5 px-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363D]">
              {INITIAL_BATCHES.slice(0, 5).map((b) => {
                const dropVal = (b.initialTemperature - b.currentTemperature).toFixed(1);
                const rate = (dropVal / (b.coolingDurationMinutes || 1)).toFixed(2);
                return (
                  <tr 
                    key={b.id}
                    onClick={() => setViewingBatch(b)}
                    className="hover:bg-[#2A3139] cursor-pointer card-transition"
                  >
                    <td className="py-3 px-3 font-mono font-bold text-[#F0F3F0]">{b.id}</td>
                    <td className="py-3 px-3 text-[#F0F3F0]">{b.crop}</td>
                    <td className="py-3 px-3 text-[#B8C0C7]">{b.initialTemperature.toFixed(1)}°C</td>
                    <td className="py-3 px-3 font-semibold text-[#39FF14]">{b.currentTemperature.toFixed(1)}°C</td>
                    <td className="py-3 px-3 text-[#39FF14] font-semibold">-{dropVal}°C</td>
                    <td className="py-3 px-3 text-[#B8C0C7]">{b.coolingDurationMinutes} min</td>
                    <td className="py-3 px-3 text-[#B8C0C7]">{rate}°C/min</td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-xs text-[#39FF14] font-semibold hover:underline">
                        Details →
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
