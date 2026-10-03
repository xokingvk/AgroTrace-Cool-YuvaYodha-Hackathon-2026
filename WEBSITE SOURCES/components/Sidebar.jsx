'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Boxes, 
  Activity, 
  TrendingDown, 
  Snowflake, 
  FileSpreadsheet, 
  Cpu, 
  BookOpen, 
  Radio
} from 'lucide-react';
import Logo from './Logo';
import { useApp } from '@/context/AppContext';

export default function Sidebar() {
  const { 
    currentScreen, 
    setCurrentScreen, 
    isSimulatingLiveStream, 
    setIsSimulatingLiveStream,
    setIsEsp32ModalOpen,
    setIsStoryModalOpen,
    mobileMenuOpen,
    setMobileMenuOpen
  } = useApp();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'batches', label: 'Batches', icon: Boxes },
    { id: 'monitor', label: 'Live Monitoring', icon: Activity },
    { id: 'history', label: 'Temperature History', icon: TrendingDown },
    { id: 'cooling', label: 'Cooling', icon: Snowflake },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
  ];

  const handleNavClick = (screenId) => {
    setCurrentScreen(screenId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-[#0D1117]/80 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0D1117] border-r border-[#30363D] flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Brand Identity */}
        <div>
          <div className="p-6 border-b border-[#30363D]">
            <Logo size="md" showTagline={true} />
          </div>

          {/* Primary Navigation */}
          <nav className="p-4 space-y-1.5" aria-label="Main Navigation">
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7D8790]">
              Monitoring System
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium btn-transition text-left ${
                    isActive
                      ? 'bg-[#21262D] text-[#39FF14] font-semibold border border-[#30363D]'
                      : 'text-[#B8C0C7] hover:bg-[#21262D] hover:text-[#F0F3F0] border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#39FF14]' : 'text-[#7D8790]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Operations, ESP32 Future Specs, Product Story */}
        <div className="p-4 border-t border-[#30363D] space-y-3 bg-[#0D1117]">
          {/* Live Simulator Heartbeat Toggle */}
          <div className="bg-[#21262D] p-3 rounded-xl border border-[#30363D]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-[#F0F3F0] flex items-center gap-1.5">
                <Radio className={`w-3.5 h-3.5 ${isSimulatingLiveStream ? 'text-[#39FF14] animate-pulse' : 'text-[#7D8790]'}`} />
                Live Stream Sim
              </span>
              <button
                onClick={() => setIsSimulatingLiveStream(!isSimulatingLiveStream)}
                type="button"
                className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isSimulatingLiveStream ? 'bg-[#39FF14]' : 'bg-[#30363D]'
                }`}
                aria-label="Toggle sensor simulation"
              >
                <span
                  className={`pointer-events-none inline-block h-3 w-3 transform rounded-full ${
                    isSimulatingLiveStream ? 'bg-[#0D1117] translate-x-4' : 'bg-[#7D8790] translate-x-0'
                  } transition duration-200 ease-in-out`}
                />
              </button>
            </div>
            <p className="text-[10px] text-[#7D8790] leading-tight">
              {isSimulatingLiveStream 
                ? 'Emulating live sensor fluctuations' 
                : 'Sensor emulation paused'}
            </p>
          </div>

          {/* Secondary Actions */}
          <div className="space-y-1">
            <button
              onClick={() => {
                setIsEsp32ModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-[#B8C0C7] hover:text-[#F0F3F0] hover:bg-[#21262D] btn-transition text-left"
            >
              <Cpu className="w-3.5 h-3.5 text-[#7D8790]" />
              <span>ESP32 Architecture</span>
            </button>

            <button
              onClick={() => {
                setIsStoryModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-[#B8C0C7] hover:text-[#F0F3F0] hover:bg-[#21262D] btn-transition text-left"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#7D8790]" />
              <span>Farm-Gate Cooling Story</span>
            </button>
          </div>

          {/* Location & Node Version Footer */}
          <div className="pt-2 border-t border-[#30363D] flex items-center justify-between text-[10px] text-[#7D8790]">
            <span>Chennai FPO #1</span>
            <span className="font-mono">v1.2-demo</span>
          </div>
        </div>
      </aside>
    </>
  );
}
