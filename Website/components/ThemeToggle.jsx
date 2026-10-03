'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-center p-2 rounded-lg text-[#B8C0C7] hover:text-[#39FF14] bg-[#21262D] hover:bg-[#2A3139] border border-[#30363D] btn-transition cursor-pointer ${className}`}
      aria-label="Toggle monitoring theme"
      title="Toggle monitoring theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#39FF14] transition-transform duration-200 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[#39FF14] transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}
