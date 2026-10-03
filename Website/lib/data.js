// AgroTrace Cool Mock Data & Sensor Simulation Layer
// Designed for seamless transition to live ESP32 hardware streaming

export const INITIAL_BATCHES = [
  {
    id: "AT-001",
    crop: "Tomato",
    variety: "Arka Rakshak / Sahu Hybrid",
    collectionCentre: "Chennai FPO Collection Centre #1",
    quantity: 100, // kg
    arrivalDateTime: "2026-10-03T10:18:00",
    coolingStartTime: "2026-10-03T10:24:00",
    initialTemperature: 34.0, // °C
    currentTemperature: 29.0, // °C
    targetTemperature: 24.0, // °C
    status: "COOLING", // COOLING | MONITORING | COMPLETED | ATTENTION REQUIRED
    coolingDurationMinutes: 42,
    farmerSupplier: "K. Murugan (Tiruvallur Cluster)",
    ambientTemperature: 33.2,
    relativeHumidity: 68,
    coolingPotential: "Favorable",
    waterUsedLiters: 4.8, // Simulated demonstration
    energyUsedKwh: 0.62, // Simulated demonstration
    hasResourceMeters: true,
    isDemo: true,
    notes: "Harvested at 08:30 AM under direct sun. Crates stacked with 50mm airflow gap. Evaporative cooling pad pump active at 1.2 L/min.",
    decisionReason: "Produce core temperature is decreasing steadily at ~0.12°C/min. Environmental humidity is favorable for continuous evaporative cooling.",
    timeline: [
      { time: "10:18 AM", event: "Batch Arrived & Weighed", status: "completed", detail: "100 kg crates checked in. Initial pulp temp 34.0°C." },
      { time: "10:24 AM", event: "Cooling Started", status: "completed", detail: "Generic demo cooling rig engaged. Evaporative air circulation started." },
      { time: "11:06 AM", event: "Current Monitoring", status: "active", detail: "Produce cooled to 29.0°C (5.0°C reduction in 42 mins)." },
      { time: "11:45 AM (Est.)", event: "Target Completion", status: "pending", detail: "Expected target produce temperature: 24.0°C." }
    ]
  },
  {
    id: "AT-002",
    crop: "Tomato",
    variety: "Shivam Special",
    collectionCentre: "Chennai FPO Collection Centre #1",
    quantity: 150,
    arrivalDateTime: "2026-10-03T09:30:00",
    coolingStartTime: "2026-10-03T09:40:00",
    initialTemperature: 32.0,
    currentTemperature: 30.0,
    targetTemperature: 24.0,
    status: "MONITORING",
    coolingDurationMinutes: 31,
    farmerSupplier: "S. Raman (Vellore Agro Club)",
    ambientTemperature: 32.8,
    relativeHumidity: 70,
    coolingPotential: "Favorable",
    waterUsedLiters: null, // No meter attached
    energyUsedKwh: null, // No meter attached
    hasResourceMeters: false,
    isDemo: true,
    notes: "Staged in holding bay after quick pre-wash. Waiting for second evaporative chamber slot.",
    decisionReason: "Surface temperature decreasing slowly. Natural convective cooling active while awaiting chamber transfer.",
    timeline: [
      { time: "09:30 AM", event: "Batch Arrived", status: "completed", detail: "150 kg loaded. Initial pulp temp 32.0°C." },
      { time: "09:40 AM", event: "Staged in Monitoring Bay", status: "completed", detail: "Initial sensor probe inserted." },
      { time: "10:11 AM", event: "Active Observation", status: "active", detail: "Temperature stabilized at 30.0°C." }
    ]
  },
  {
    id: "AT-003",
    crop: "Tomato",
    variety: "Namdhari NS-585",
    collectionCentre: "Chennai FPO Collection Centre #1",
    quantity: 75,
    arrivalDateTime: "2026-10-03T08:00:00",
    coolingStartTime: "2026-10-03T08:08:00",
    initialTemperature: 35.0,
    currentTemperature: 25.0,
    targetTemperature: 25.0,
    status: "COMPLETED",
    coolingDurationMinutes: 58,
    farmerSupplier: "P. Lakshmi (Chengalpattu FPO)",
    ambientTemperature: 31.5,
    relativeHumidity: 65,
    coolingPotential: "Optimal",
    waterUsedLiters: 6.2,
    energyUsedKwh: 0.85,
    hasResourceMeters: true,
    isDemo: true,
    notes: "Target temperature of 25.0°C achieved with 10.0°C total reduction. Crates transferred to insulated staging for outbound transit.",
    decisionReason: "Produce has reached target holding temperature safely. Transferred to passive insulated cover.",
    timeline: [
      { time: "08:00 AM", event: "Batch Arrived", status: "completed", detail: "75 kg in 5 crates. Initial pulp temp 35.0°C." },
      { time: "08:08 AM", event: "Cooling Commenced", status: "completed", detail: "Demo cooling rig active." },
      { time: "09:06 AM", event: "Target Reached (25.0°C)", status: "completed", detail: "Cooling cycle stopped after 58 mins." }
    ]
  },
  {
    id: "AT-004",
    crop: "Capsicum",
    variety: "Indra Green Bell",
    collectionCentre: "Coimbatore Collection Hub",
    quantity: 120,
    arrivalDateTime: "2026-10-03T07:15:00",
    coolingStartTime: "2026-10-03T07:22:00",
    initialTemperature: 31.0,
    currentTemperature: 24.5,
    targetTemperature: 24.0,
    status: "COMPLETED",
    coolingDurationMinutes: 64,
    farmerSupplier: "Anand Green Polyhouse",
    ambientTemperature: 29.8,
    relativeHumidity: 72,
    coolingPotential: "Optimal",
    waterUsedLiters: 5.5,
    energyUsedKwh: 0.78,
    hasResourceMeters: true,
    isDemo: true,
    notes: "High gloss skin, firm texture maintained. No water droplet spotting on fruit skin.",
    decisionReason: "Cooling cycle concluded at 24.5°C. Preserved firm calyx and reduced post-harvest respiration.",
    timeline: [
      { time: "07:15 AM", event: "Batch Arrived", status: "completed", detail: "120 kg graded peppers." },
      { time: "07:22 AM", event: "Cooling Rig Activated", status: "completed", detail: "Gentle airflow cycle." },
      { time: "08:26 AM", event: "Completed & Sealed", status: "completed", detail: "Ready for retail crate dispatch." }
    ]
  },
  {
    id: "AT-005",
    crop: "Mango",
    variety: "Banganapalli Fresh",
    collectionCentre: "Madurai Collection Centre",
    quantity: 200,
    arrivalDateTime: "2026-10-03T06:45:00",
    coolingStartTime: "2026-10-03T07:00:00",
    initialTemperature: 36.0,
    currentTemperature: 33.5,
    targetTemperature: 26.0,
    status: "ATTENTION REQUIRED",
    coolingDurationMinutes: 50,
    farmerSupplier: "R. Selvam Orchards",
    ambientTemperature: 34.5,
    relativeHumidity: 62,
    coolingPotential: "Moderate",
    waterUsedLiters: null,
    energyUsedKwh: null,
    hasResourceMeters: false,
    isDemo: true,
    notes: "Dense wooden crates stacked 4-high, restricting air movement across center fruit. Re-spacing suggested.",
    decisionReason: "Cooling rate is slower than expected (only 2.5°C drop in 50 min). Operator action required: unstack center crates to restore airflow.",
    timeline: [
      { time: "06:45 AM", event: "Batch Arrived", status: "completed", detail: "200 kg summer harvest." },
      { time: "07:00 AM", event: "Cooling Initiated", status: "completed", detail: "High initial pulp heat." },
      { time: "07:50 AM", event: "Airflow Restriction Alert", status: "active", detail: "Slow temperature reduction noted." }
    ]
  },
  {
    id: "AT-006",
    crop: "Green Chili",
    variety: "G4 Bullet",
    collectionCentre: "Chennai FPO Collection Centre #1",
    quantity: 60,
    arrivalDateTime: "2026-10-03T08:45:00",
    coolingStartTime: "2026-10-03T08:52:00",
    initialTemperature: 33.0,
    currentTemperature: 26.0,
    targetTemperature: 25.0,
    status: "COMPLETED",
    coolingDurationMinutes: 48,
    farmerSupplier: "V. Govindaraj (Uthiramerur)",
    ambientTemperature: 32.0,
    relativeHumidity: 69,
    coolingPotential: "Favorable",
    waterUsedLiters: 3.4,
    energyUsedKwh: 0.45,
    hasResourceMeters: true,
    isDemo: true,
    notes: "Perforated net bags allowed rapid evaporative air penetration.",
    decisionReason: "Cooled 7.0°C in 48 min. Moisture retention verified.",
    timeline: [
      { time: "08:45 AM", event: "Batch Arrived", status: "completed", detail: "60 kg netted produce." },
      { time: "08:52 AM", event: "Cooling Commenced", status: "completed", detail: "High flow fan active." },
      { time: "09:40 AM", event: "Completed", status: "completed", detail: "Packed for market transport." }
    ]
  },
  {
    id: "AT-007",
    crop: "Cabbage",
    variety: "Golden Acre",
    collectionCentre: "Coimbatore Collection Hub",
    quantity: 180,
    arrivalDateTime: "2026-10-03T06:10:00",
    coolingStartTime: "2026-10-03T06:20:00",
    initialTemperature: 28.5,
    currentTemperature: 22.0,
    targetTemperature: 22.0,
    status: "COMPLETED",
    coolingDurationMinutes: 55,
    farmerSupplier: "Nilgiris Fresh Cooperative",
    ambientTemperature: 26.0,
    relativeHumidity: 78,
    coolingPotential: "Optimal",
    waterUsedLiters: 5.1,
    energyUsedKwh: 0.70,
    hasResourceMeters: true,
    isDemo: true,
    notes: "Dense leafy head cooled thoroughly to center core.",
    decisionReason: "Optimal temperature achieved with 6.5°C reduction.",
    timeline: [
      { time: "06:10 AM", event: "Batch Arrived", status: "completed", detail: "180 kg early morning harvest." },
      { time: "07:15 AM", event: "Target Reached (22.0°C)", status: "completed", detail: "Cycle completed." }
    ]
  }
];

// Temperature series for primary active batch (AT-001)
// Realistic evaporative cooling trajectory
export const AT001_TIME_SERIES = [
  { time: "10:24", produceTemp: 34.0, ambientTemp: 33.1, humidity: 67, targetTemp: 24.0 },
  { time: "10:28", produceTemp: 33.6, ambientTemp: 33.2, humidity: 67, targetTemp: 24.0 },
  { time: "10:32", produceTemp: 33.0, ambientTemp: 33.2, humidity: 68, targetTemp: 24.0 },
  { time: "10:36", produceTemp: 32.3, ambientTemp: 33.3, humidity: 68, targetTemp: 24.0 },
  { time: "10:40", produceTemp: 31.7, ambientTemp: 33.4, humidity: 68, targetTemp: 24.0 },
  { time: "10:44", produceTemp: 31.1, ambientTemp: 33.3, humidity: 68, targetTemp: 24.0 },
  { time: "10:48", produceTemp: 30.6, ambientTemp: 33.3, humidity: 69, targetTemp: 24.0 },
  { time: "10:52", produceTemp: 30.1, ambientTemp: 33.2, humidity: 68, targetTemp: 24.0 },
  { time: "10:56", produceTemp: 29.6, ambientTemp: 33.2, humidity: 68, targetTemp: 24.0 },
  { time: "11:00", produceTemp: 29.3, ambientTemp: 33.2, humidity: 68, targetTemp: 24.0 },
  { time: "11:06", produceTemp: 29.0, ambientTemp: 33.2, humidity: 68, targetTemp: 24.0 },
];

// Multi-batch comparison curves for Screen 4 (Temperature History)
// Normalized by elapsed minutes from start of cooling
export const BATCH_COMPARISON_SERIES = [
  { minute: 0, AT001: 34.0, AT002: 32.0, AT003: 35.0, AT004: 31.0, AT005: 36.0 },
  { minute: 5, AT001: 33.5, AT002: 31.8, AT003: 34.2, AT004: 30.2, AT005: 35.8 },
  { minute: 10, AT001: 32.9, AT002: 31.5, AT003: 33.3, AT004: 29.4, AT005: 35.5 },
  { minute: 15, AT001: 32.2, AT002: 31.1, AT003: 32.4, AT004: 28.6, AT005: 35.2 },
  { minute: 20, AT001: 31.5, AT002: 30.8, AT003: 31.3, AT004: 27.8, AT005: 34.9 },
  { minute: 25, AT001: 30.9, AT002: 30.4, AT003: 30.2, AT004: 27.0, AT005: 34.5 },
  { minute: 30, AT001: 30.2, AT002: 30.0, AT003: 29.2, AT004: 26.3, AT005: 34.2 },
  { minute: 35, AT001: 29.7, AT002: null, AT003: 28.2, AT004: 25.7, AT005: 33.9 },
  { minute: 40, AT001: 29.2, AT002: null, AT003: 27.2, AT004: 25.2, AT005: 33.7 },
  { minute: 45, AT001: 29.0, AT002: null, AT003: 26.4, AT004: 24.8, AT005: 33.6 },
  { minute: 50, AT001: null, AT002: null, AT003: 25.7, AT004: 24.6, AT005: 33.5 },
  { minute: 55, AT001: null, AT002: null, AT003: 25.1, AT004: 24.5, AT005: null },
  { minute: 60, AT001: null, AT002: null, AT003: 25.0, AT004: 24.5, AT005: null },
];

export const SYSTEM_DEFAULTS = {
  activeCentre: "Chennai FPO Collection Centre #1",
  operatorName: "S. Kumar (Lead Operator)",
  demoRigStatus: "RUNNING", // RUNNING | PAUSED | STOPPED
  esp32Connected: false, // Explicitly false as per DEMO DATA RULE
  simulationMode: true,
  waterPumpActive: true,
  ventilationFanActive: true,
  padWaterFlowRateLpm: 1.2,
  padStatus: "OPTIMAL WETTING",
};

export const CROP_OPTIONS = [
  "Tomato",
  "Capsicum",
  "Green Chili",
  "Mango",
  "Cabbage",
  "Cucumber",
  "Eggplant (Brinjal)",
  "Guava",
  "Beans",
  "Papaya"
];

export const COLLECTION_CENTRES = [
  "Chennai FPO Collection Centre #1",
  "Coimbatore Collection Hub",
  "Madurai Collection Centre",
  "Tiruvallur Primary Yard",
  "Salem Fruit Aggregation Point"
];
