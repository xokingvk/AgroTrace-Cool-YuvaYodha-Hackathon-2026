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
import { useApp } from '@/context/AppContext';

export default function TemperatureChart({ className = '' }) {
  const { timeSeries, timeRange, setTimeRange } = useApp();
  const [showAmbient, setShowAmbient] = useState(true);

  // Exact Cyber Ink & Lime Theme Colors for Chart
  const gridColor = '#30363D';
  const axisTextColor = '#7D8790';
  const axisLineColor = '#30363D';
  const produceLineColor = '#39FF14';
  const ambientLineColor = '#00F0FF';
  const targetLineColor = '#D29922';

  // Custom clean tooltip matching Cyber Ink & Lime
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const prod = payload.find(p => p.dataKey === 'produceTemp');
      const amb = payload.find(p => p.dataKey === 'ambientTemp');

      return (
        <div className="bg-[#21262D] border border-[#30363D] p-3.5 rounded-xl shadow-2xl text-xs card-transition">
          <div className="font-semibold text-[#F0F3F0] mb-2 pb-1.5 border-b border-[#30363D]">
            Time: {label}
          </div>
          {prod && (
            <div className="flex items-center justify-between gap-4 py-0.5">
              <span className="flex items-center gap-1.5 text-[#B8C0C7]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14]" />
                Produce Temp:
              </span>
              <span className="font-bold text-[#39FF14]">{prod.value}°C</span>
            </div>
          )}
          {amb && (
            <div className="flex items-center justify-between gap-4 py-0.5">
              <span className="flex items-center gap-1.5 text-[#7D8790]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]" />
                Ambient Temp:
              </span>
              <span className="font-medium text-[#00F0FF]">{amb.value}°C</span>
            </div>
          )}
          <div className="text-[10px] text-[#7D8790] mt-1.5 pt-1.5 border-t border-[#30363D]">
            Target: 24.0°C
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section 
      aria-labelledby="temp-trend-heading"
      className={`bg-[#21262D] rounded-2xl border border-[#30363D] p-5 sm:p-6 lg:p-7 shadow-lg card-transition ${className}`}
    >
      {/* Chart Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 id="temp-trend-heading" className="text-base font-bold text-[#F0F3F0]">
            Produce Temperature vs Time
          </h2>
          <p className="text-xs text-[#B8C0C7] mt-0.5">
            Real-time evaporative cooling trajectory and chamber air reference
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Ambient Line Toggle */}
          <button
            onClick={() => setShowAmbient(!showAmbient)}
            className={`px-2.5 py-1 text-xs rounded-lg border font-medium btn-transition cursor-pointer ${
              showAmbient 
                ? 'bg-[#161B22] text-[#00F0FF] border-[#00F0FF]/40' 
                : 'bg-[#161B22] text-[#7D8790] border-[#30363D]'
            }`}
          >
            {showAmbient ? '✓ Ambient Line' : '+ Ambient Line'}
          </button>

          {/* Time range buttons */}
          <div className="inline-flex rounded-lg border border-[#30363D] bg-[#161B22] p-0.5">
            {['1h', '6h', '12h', '24h'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md btn-transition cursor-pointer ${
                  timeRange === range
                    ? 'bg-[#21262D] text-[#39FF14] font-bold border border-[#30363D]'
                    : 'text-[#7D8790] hover:text-[#B8C0C7]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Visualization (Chart background: #161B22, Chart border: #30363D) */}
      <div className="w-full h-72 sm:h-80 bg-[#161B22] p-4 rounded-xl border border-[#30363D]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={timeSeries}
            margin={{ top: 10, right: 15, left: -15, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} strokeOpacity={0.6} vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fill: axisTextColor, fontSize: 11, fontFamily: 'Poppins' }}
              axisLine={{ stroke: axisLineColor }}
              tickLine={false}
            />
            <YAxis
              domain={[20, 38]}
              tick={{ fill: axisTextColor, fontSize: 11, fontFamily: 'Poppins' }}
              axisLine={{ stroke: axisLineColor }}
              tickLine={false}
              unit="°C"
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Recommended Target Temperature Guide */}
            <ReferenceLine
              y={24.0}
              stroke={targetLineColor}
              strokeDasharray="4 4"
              label={{
                value: 'Target: 24°C',
                fill: targetLineColor,
                fontSize: 10,
                position: 'right',
                fontFamily: 'Poppins',
              }}
            />

            {/* Produce Temperature Curve (Primary - Cyber Lime) */}
            <Line
              type="monotone"
              dataKey="produceTemp"
              name="Produce Temperature"
              stroke={produceLineColor}
              strokeWidth={3}
              dot={{ fill: produceLineColor, r: 3.5, strokeWidth: 1.5, stroke: '#161B22' }}
              activeDot={{ r: 6, fill: produceLineColor }}
            />

            {/* Ambient Temperature Curve (Secondary - Electric Cyan) */}
            {showAmbient && (
              <Line
                type="monotone"
                dataKey="ambientTemp"
                name="Ambient Temperature"
                stroke={ambientLineColor}
                strokeWidth={2}
                strokeDasharray="4 2"
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend / Summary Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-[#30363D] text-xs text-[#B8C0C7]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-[#39FF14]" />
            <span className="font-semibold text-[#F0F3F0]">Produce Core</span>
          </div>
          {showAmbient && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-b border-dashed border-[#00F0FF]" />
              <span className="text-[#00F0FF]">Chamber Ambient</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-b border-dashed border-[#D29922]" />
            <span className="text-[#D29922]">Target Threshold</span>
          </div>
        </div>

        <div className="text-[11px] text-[#B8C0C7]">
          Initial: <strong className="text-[#F0F3F0]">34.0°C</strong> → Current: <strong className="text-[#39FF14]">29.0°C</strong> (<span className="text-[#39FF14] font-semibold">-5.0°C</span>)
        </div>
      </div>
    </section>
  );
}
