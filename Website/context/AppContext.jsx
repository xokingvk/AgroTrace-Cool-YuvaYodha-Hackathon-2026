'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_BATCHES, AT001_TIME_SERIES, SYSTEM_DEFAULTS } from '@/lib/data';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme management: 'light' or 'dark'
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('agrotrace-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (saved === 'dark' || (!saved && prefersDark)) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('agrotrace-theme', next);
      } catch (e) {}
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  // Navigation & Screens: 'overview', 'batches', 'monitor', 'history', 'cooling', 'reports', 'landing'
  const [currentScreen, setCurrentScreen] = useState('overview');
  const [selectedBatchId, setSelectedBatchId] = useState('AT-001');
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  
  // Primary batch live metrics
  const [produceTemp, setProduceTemp] = useState(29.0);
  const [ambientTemp, setAmbientTemp] = useState(33.2);
  const [humidity, setHumidity] = useState(68);
  const [coolingPotential, setCoolingPotential] = useState('Favorable');
  const [coolingDuration, setCoolingDuration] = useState(42); // minutes
  
  // Demonstration rig state (generic demonstration rig ONLY)
  const [rigStatus, setRigStatus] = useState('RUNNING'); // RUNNING, PAUSED, STOPPED
  const [isSimulatingLiveStream, setIsSimulatingLiveStream] = useState(true);
  
  // Time series for active batch
  const [timeSeries, setTimeSeries] = useState(AT001_TIME_SERIES);
  const [timeRange, setTimeRange] = useState('1h'); // 1h, 6h, 12h, 24h
  
  // Modals & Panels
  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);
  const [viewingBatch, setViewingBatch] = useState(null);
  const [isStopConfirmOpen, setIsStopConfirmOpen] = useState(false);
  const [isEsp32ModalOpen, setIsEsp32ModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Selected batch object
  const activeBatch = batches.find(b => b.id === selectedBatchId) || batches[0];

  // Subtle live simulation for realistic agri-tech monitoring feel
  useEffect(() => {
    if (!isSimulatingLiveStream || rigStatus !== 'RUNNING') return;

    const interval = setInterval(() => {
      // Gentle micro-fluctuations (±0.05°C) to show live system heartbeat without being distracting
      setProduceTemp(prev => {
        const delta = (Math.random() - 0.52) * 0.08;
        const next = Math.max(24.0, Math.min(34.0, parseFloat((prev + delta).toFixed(1))));
        return next;
      });

      setAmbientTemp(prev => {
        const delta = (Math.random() - 0.48) * 0.05;
        return parseFloat((prev + delta).toFixed(1));
      });

      setHumidity(prev => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.max(50, Math.min(85, prev + delta));
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isSimulatingLiveStream, rigStatus]);

  // Toast auto-clear
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type });
  };

  const addBatch = (newBatch) => {
    setBatches(prev => [newBatch, ...prev]);
    setSelectedBatchId(newBatch.id);
    showToast(`Batch ${newBatch.id} successfully registered for cooling monitoring`, 'success');
  };

  const updateBatchStatus = (batchId, newStatus) => {
    setBatches(prev => prev.map(b => b.id === batchId ? { ...b, status: newStatus } : b));
    showToast(`Batch ${batchId} status updated to ${newStatus}`, 'info');
  };

  // Demonstration rig controls
  const handleStartRig = () => {
    setRigStatus('RUNNING');
    updateBatchStatus(selectedBatchId, 'COOLING');
    showToast('Demonstration cooling rig started. Evaporative ventilation active.', 'success');
  };

  const handlePauseRig = () => {
    setRigStatus('PAUSED');
    updateBatchStatus(selectedBatchId, 'MONITORING');
    showToast('Demonstration cooling rig paused.', 'info');
  };

  const handleStopRig = () => {
    setRigStatus('STOPPED');
    updateBatchStatus(selectedBatchId, 'COMPLETED');
    setIsStopConfirmOpen(false);
    showToast(`Cooling cycle stopped for Batch ${selectedBatchId}.`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currentScreen,
        setCurrentScreen,
        selectedBatchId,
        setSelectedBatchId,
        batches,
        activeBatch,
        addBatch,
        updateBatchStatus,
        produceTemp,
        ambientTemp,
        humidity,
        coolingPotential,
        coolingDuration,
        rigStatus,
        handleStartRig,
        handlePauseRig,
        handleStopRig,
        isSimulatingLiveStream,
        setIsSimulatingLiveStream,
        timeSeries,
        timeRange,
        setTimeRange,
        isAddBatchOpen,
        setIsAddBatchOpen,
        viewingBatch,
        setViewingBatch,
        isStopConfirmOpen,
        setIsStopConfirmOpen,
        isEsp32ModalOpen,
        setIsEsp32ModalOpen,
        isStoryModalOpen,
        setIsStoryModalOpen,
        mobileMenuOpen,
        setMobileMenuOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
