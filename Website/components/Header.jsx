'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  User, 
  Menu, 
  X, 
  Calendar, 
  Clock, 
  BookOpen
} from 'lucide-react';
import Logo from './Logo';
import DemoBadge from './DemoBadge';
import ThemeToggle from './ThemeToggle';
import { useApp } from '@/context/AppContext';

export default function Header() {
  const { 
    currentScreen, 
    setCurrentScreen, 
    mobileMenuOpen, 
    setMobileMenuOpen,
    setIsStoryModalOpen
  } = useApp();

  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const pageTitles = {
    overview: { title: "Overview Dashboard", subtitle: "Monitor today's produce and cooling activity" },
    batches: { title: "Batch Management", subtitle: "Track incoming produce lots and cooling transitions" },
    monitor: { title: "Live Monitoring", subtitle: "High-resolution produce telemetry and evaporative chamber air" },
    history: { title: "Temperature History", subtitle: "Compare multi-batch thermal decay trajectories and cooling rates" },
    cooling: { title: "Cooling Operations", subtitle: "Demonstration cooling rig operational status and safety controls" },
    reports: { title: "Batch Reports & Records", subtitle: "Exportable post-harvest cooling documentation and resource logs" },
    landing: { title: "Product Overview", subtitle: "Smart post-harvest cooling for agricultural collection centres" }
  };

  const activeTitle = pageTitles[currentScreen] || pageTitles.overview;

  const demoNotifications = [
    { id: 1, title: 'AT-001 Temperature Drop Achieved', desc: 'Core pulp temperature reduced by 5.0°C in 42 minutes.', time: '5m ago', type: 'success' },
    { id: 2, title: 'Evaporative Wetting Optimal', desc: 'Cellulose cooling pads operating at steady 1.2 L/min flow.', time: '18m ago', type: 'info' },
    { id: 3, title: 'AT-005 Airflow Notice', desc: 'Mango wooden crates tightly packed; re-spacing recommended.', time: '35m ago', type: 'warning' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#161B22]/95 backdrop-blur border-b border-[#30363D] px-4 sm:px-6 lg:px-8 py-3.5 card-transition">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Page Title */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#F0F3F0] hover:bg-[#21262D] btn-transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Mobile Brand */}
          <div className="md:hidden">
            <Logo size="sm" />
          </div>

          {/* Desktop Title & Subtitle */}
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-[#F0F3F0] leading-tight">
              {activeTitle.title}
            </h1>
            <p className="text-xs text-[#B8C0C7] leading-tight mt-0.5">
              {activeTitle.subtitle}
            </p>
          </div>
        </div>

        {/* Right Side: Date/Time, Demo Badge, ThemeToggle, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Date and Time (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 text-xs text-[#B8C0C7] bg-[#21262D] px-3 py-1.5 rounded-lg border border-[#30363D]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B8C0C7]" />
              <span>{currentDate}</span>
            </div>
            <span className="text-[#30363D]">•</span>
            <div className="flex items-center gap-1.5 font-medium text-[#F0F3F0]">
              <Clock className="w-3.5 h-3.5 text-[#39FF14]" />
              <span>{currentTime}</span>
            </div>
          </div>

          {/* Farm-Gate Cooling Guide/Story Button */}
          <button
            onClick={() => setIsStoryModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#B8C0C7] hover:text-[#F0F3F0] bg-[#21262D] hover:bg-[#2A3139] rounded-lg border border-[#30363D] btn-transition cursor-pointer"
            title="Learn how AgroTrace Cool works at farm-gate"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#39FF14]" />
            <span className="hidden xl:inline">Cooling Story</span>
          </button>

          {/* Theme Toggle - Compact Sun/Moon */}
          <ThemeToggle />

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-[#B8C0C7] hover:text-[#F0F3F0] hover:bg-[#21262D] border border-transparent hover:border-[#30363D] btn-transition cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#39FF14] ring-2 ring-[#161B22]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#21262D] rounded-xl border border-[#30363D] shadow-2xl p-4 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#30363D]">
                  <span className="font-semibold text-[#F0F3F0]">Operational Alerts</span>
                  <span className="text-[11px] text-[#7D8790]">3 updates</span>
                </div>
                <div className="space-y-2.5">
                  {demoNotifications.map(n => (
                    <div key={n.id} className="p-2.5 rounded-lg bg-[#161B22] border border-[#30363D]">
                      <div className="flex items-center justify-between font-medium text-[#F0F3F0] mb-0.5">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-[#7D8790]">{n.time}</span>
                      </div>
                      <p className="text-[#B8C0C7] text-[11px]">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-[#30363D] text-center">
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-[11px] text-[#39FF14] font-semibold hover:underline cursor-pointer"
                  >
                    Close panel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Operator Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#30363D]">
            <div className="w-8 h-8 rounded-full bg-[#2A3139] border border-[#30363D] flex items-center justify-center text-[#39FF14] font-semibold text-xs">
              SK
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#F0F3F0] leading-tight">
                S. Kumar
              </span>
              <span className="text-[10px] text-[#7D8790] leading-tight">
                Chennai FPO Operator
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
