'use client';

import React from 'react';
import { LayoutDashboard, Boxes, Activity, Snowflake, FileSpreadsheet } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function MobileNav() {
  const { currentScreen, setCurrentScreen } = useApp();

  const items = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'batches', label: 'Batches', icon: Boxes },
    { id: 'monitor', label: 'Monitor', icon: Activity },
    { id: 'cooling', label: 'Cooling', icon: Snowflake },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
  ];

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0D1117]/95 backdrop-blur border-t border-[#30363D] px-2 py-2 flex items-center justify-around shadow-2xl"
      aria-label="Mobile Navigation"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg btn-transition cursor-pointer ${
              isActive 
                ? 'text-[#39FF14] font-bold' 
                : 'text-[#7D8790] hover:text-[#B8C0C7]'
            }`}
          >
            <div className={`p-1 rounded-md ${isActive ? 'bg-[#21262D] text-[#39FF14] border border-[#30363D]' : ''}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
