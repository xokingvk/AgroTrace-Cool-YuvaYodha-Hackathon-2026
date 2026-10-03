'use client';

import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import AddBatchModal from '@/components/AddBatchModal';
import BatchDetailDrawer from '@/components/BatchDetailDrawer';
import ConfirmationModal from '@/components/ConfirmationModal';
import Esp32ReadinessModal from '@/components/Esp32ReadinessModal';
import StoryModal from '@/components/StoryModal';
import OverviewView from '@/views/OverviewView';
import BatchesView from '@/views/BatchesView';
import LiveMonitoringView from '@/views/LiveMonitoringView';
import TemperatureHistoryView from '@/views/TemperatureHistoryView';
import CoolingView from '@/views/CoolingView';
import ReportsView from '@/views/ReportsView';
import LandingView from '@/views/LandingView';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export default function HomePage() {
  const { currentScreen, toastMessage } = useApp();

  const renderCurrentView = () => {
    switch (currentScreen) {
      case 'overview':
        return <OverviewView />;
      case 'batches':
        return <BatchesView />;
      case 'monitor':
        return <LiveMonitoringView />;
      case 'history':
        return <TemperatureHistoryView />;
      case 'cooling':
        return <CoolingView />;
      case 'reports':
        return <ReportsView />;
      case 'landing':
        return <LandingView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] flex transition-colors duration-200">
      {/* Persistent Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen bg-[#0D1117]">
        {/* Top Header */}
        <Header />

        {/* Centered Maximum Width Content Container (1200-1280px standard) */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1280px] w-full mx-auto">
          {renderCurrentView()}
        </main>

        {/* Mobile Fixed Bottom Navigation Bar */}
        <MobileNav />
      </div>

      {/* Modals & Slide-overs */}
      <AddBatchModal />
      <BatchDetailDrawer />
      <ConfirmationModal />
      <Esp32ReadinessModal />
      <StoryModal />

      {/* Floating System Toast */}
      {toastMessage && (
        <div className="fixed bottom-16 md:bottom-6 right-6 z-50 animate-bounce-subtle">
          <div className={`px-4 py-3 rounded-xl border border-[#30363D] shadow-2xl flex items-center gap-2.5 text-xs font-semibold bg-[#21262D] ${
            toastMessage.type === 'success'
              ? 'text-[#39FF14]'
              : toastMessage.type === 'warning'
              ? 'text-[#D29922]'
              : 'text-[#F0F3F0]'
          }`}>
            {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#39FF14]" />}
            {toastMessage.type === 'warning' && <AlertTriangle className="w-4 h-4 text-[#D29922]" />}
            {toastMessage.type === 'info' && <Info className="w-4 h-4 text-[#00F0FF]" />}
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
