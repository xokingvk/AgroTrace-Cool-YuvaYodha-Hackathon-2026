'use client';

import React from 'react';
import { Snowflake, Eye, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

export default function StatusBadge({ status, size = 'md', className = '' }) {
  const normStatus = (status || '').toUpperCase();

  const configs = {
    'COOLING': {
      label: 'COOLING',
      bg: 'bg-[#161B22]',
      text: 'text-[#39FF14]',
      border: 'border-[#39FF14]/40',
      icon: Snowflake,
      iconAnimate: 'animate-spin-slow',
    },
    'MONITORING': {
      label: 'MONITORING',
      bg: 'bg-[#161B22]',
      text: 'text-[#00F0FF]',
      border: 'border-[#00F0FF]/30',
      icon: Eye,
      iconAnimate: '',
    },
    'COMPLETED': {
      label: 'COMPLETED',
      bg: 'bg-[#161B22]',
      text: 'text-[#4ADE80]',
      border: 'border-[#4ADE80]/30',
      icon: CheckCircle2,
      iconAnimate: '',
    },
    'ATTENTION REQUIRED': {
      label: 'ATTENTION REQUIRED',
      bg: 'bg-[#161B22]',
      text: 'text-[#D29922]',
      border: 'border-[#D29922]/30',
      icon: AlertTriangle,
      iconAnimate: '',
    },
    'ERROR': {
      label: 'ERROR',
      bg: 'bg-[#161B22]',
      text: 'text-[#F85149]',
      border: 'border-[#F85149]/30',
      icon: AlertCircle,
      iconAnimate: '',
    },
  };

  const config = configs[normStatus] || {
    label: normStatus || 'UNKNOWN',
    bg: 'bg-[#161B22]',
    text: 'text-[#B8C0C7]',
    border: 'border-[#30363D]',
    icon: Eye,
    iconAnimate: '',
  };

  const Icon = config.icon;
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-[11px] gap-1.5' 
    : size === 'lg'
    ? 'px-3.5 py-1.5 text-xs font-semibold gap-2'
    : 'px-2.5 py-1 text-xs gap-1.5 font-medium';

  return (
    <span
      className={`inline-flex items-center rounded-md border tracking-wider font-semibold uppercase ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
    >
      <Icon className={`w-3.5 h-3.5 ${config.iconAnimate}`} />
      <span>{config.label}</span>
    </span>
  );
}
