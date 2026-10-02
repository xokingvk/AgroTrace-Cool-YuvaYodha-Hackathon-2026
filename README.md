# AgroTrace Cool

### Smart Monitoring for Farm-Gate Pre-Cooling

AgroTrace Cool is a low-cost evaporative pre-cooling prototype built for fresh produce handled at farm-gate and FPO collection centres.

The system combines a simple cooling chamber with temperature and humidity sensing, produce-temperature monitoring, local control, an Android monitoring app, and batch-level records.

The main idea is simple:

> **Make the cooling process measurable.**

A cooling system should not only run. The operator should be able to see whether the produce is actually cooling, whether the surrounding conditions are suitable, how long the cycle has been running, what resources were used, and what happened to the batch after the cycle.

---

## Table of Contents

- [Why We Built This](#why-we-built-this)
- [The Problem](#the-problem)
- [Our Approach](#our-approach)
- [Who It Is For](#who-it-is-for)
- [How AgroTrace Cool Works](#how-agrotrace-cool-works)
- [System Architecture](#system-architecture)
- [Hardware](#hardware)
- [Software Stack](#software-stack)
- [Cooling Decision Logic](#cooling-decision-logic)
- [Android Application](#android-application)
- [Batch Records](#batch-records)
- [Produce Use Cases](#produce-use-cases)
- [Prototype Validation](#prototype-validation)
- [Implementation Roadmap](#implementation-roadmap)
- [Feasibility and Viability](#feasibility-and-viability)
- [Current Scope](#current-scope)
- [What We Are Not Claiming](#what-we-are-not-claiming)
- [Future Scope](#future-scope)
- [Project Structure](#project-structure)
- [Research and References](#research-and-references)
- [Team](#team)

---

## Why We Built This

Freshly harvested produce carries field heat. Removing that heat early is an important part of post-harvest handling.

There are already different cooling methods, evaporative cooling systems, and IoT-based monitoring projects. We are not trying to claim that cooling itself is a new invention.

Our focus is the gap between:

**cooling is running**

and

**the operator knows what is happening during cooling.**

AgroTrace Cool brings those measurements into one simple workflow.

---

## The Problem

At a basic farm-gate or FPO cooling point, an operator may have limited visibility into the cooling cycle.

The questions are practical:

- Is the produce actually cooling?
- How is the cooling progressing over time?
- Are temperature and humidity suitable for evaporative cooling?
- Is continued cooling still helping?
- How long has this batch been in the chamber?
- How much water was used?
- How much energy was used?
- What happened during the previous cooling cycles?

A thermometer can provide a reading.

AgroTrace Cool is designed to provide a **cooling record**.

---

## Our Approach

AgroTrace Cool combines five parts:

**Sense → Analyze → Cool → Advise → Record**

### Sense
Measure:

- Ambient temperature
- Relative humidity
- Representative produce temperature

### Analyze
Use the environmental readings and produce-temperature trend to assess cooling conditions and response.

### Cool
Operate the fan and water pump in the evaporative cooling chamber.

### Advise
Provide a simple operating state:

- `COOL`
- `REDUCE`
- `STOP`
- `TARGET REACHED`

### Record
Store the cooling cycle as a batch record containing temperature, duration, resource use, status, and decision reason.

---

## Who It Is For

### Primary user

**FPO / Agricultural Collection-Centre Operator**

FPOs collect produce from multiple farmers and handle batches before the produce moves to the next stage of the supply chain.

AgroTrace Cool is designed around that operational setting.

### Intended position in the chain

```text
Harvest
   ↓
FPO / Collection Centre
   ↓
AgroTrace Cool Pre-Cooling
   ↓
Appropriate Storage / Controlled Transport
   ↓
Market / Processing / Export
```

AgroTrace Cool addresses the **farm-gate / first-mile pre-cooling stage**.

It is not intended to replace the complete cold chain.

---

# How AgroTrace Cool Works

## 1. Produce enters the chamber

Fresh produce is placed inside ventilated crates in the cooling chamber.

For the prototype, tomatoes are used as the primary demonstration produce.

## 2. Water wets the evaporative pad

A small water pump moves water from the tank to the wet jute/coir medium.

```text
Water Tank
    ↓
Water Pump
    ↓
Wet Jute / Coir Pad
```

The water is used by the evaporative cooling process.

**Water is not sprayed directly onto the produce.**

## 3. Air passes through the wet pad

The fan moves air through the wet medium.

```text
Fan / Airflow
      ↓
Wet Pad
      ↓
Cooler Air
      ↓
Ventilated Produce Crates
```

## 4. Sensors monitor conditions

### DHT22
Measures:

- Ambient temperature
- Relative humidity

### DS18B20
Measures:

- Temperature of a representative produce sample

For the prototype, one probe is a representative measurement. It should not be described as the average temperature of an entire batch.

## 5. ESP32 evaluates the cycle

The ESP32 reads the sensors and applies the defined cooling logic.

It can then control the fan and pump through a relay or MOSFET driver.

## 6. Data reaches the Android application

The ESP32 sends relevant data to the nearby Android device.

The app shows live values, cooling status, graphs, and batch history.

---

# System Architecture

```text
                 ┌─────────────────────┐
                 │       DHT22          │
                 │ Temperature + RH     │
                 └──────────┬──────────┘
                            │
                 ┌──────────▼──────────┐
                 │      DS18B20         │
                 │ Produce Temperature  │
                 └──────────┬──────────┘
                            │
                       ┌────▼────┐
                       │  ESP32  │
                       │         │
                       │ Sensing │
                       │ Logic   │
                       │ Logging │
                       └────┬────┘
                            │
                 ┌──────────┼──────────┐
                 │          │          │
              OLED     Driver      BLE / Sync
                 │          │          │
                 │      ┌───┴────┐     ▼
                 │      │Fan/Pump│  Android App
                 │      └───┬────┘     │
                 │          │          ├── Live Monitoring
                 ▼          ▼          ├── Cooling Graphs
             Local       Cooling       ├── Batch History
             Status      Chamber       └── Records
```

---

# Hardware

## Core Hardware Components

| Component | Purpose |
|---|---|
| **ESP32** | Main controller, sensing, decision logic, local control and communication |
| **DHT22** | Ambient temperature and relative humidity |
| **DS18B20** | Representative produce-temperature measurement |
| **Small DC Fan** | Airflow through the evaporative cooling system |
| **Small DC Water Pump** | Water circulation to the wet pad |
| **Relay / MOSFET Driver** | Safe switching of fan and pump |
| **Wet Jute / Coir Medium** | Evaporative cooling pad |
| **OLED Display** | Local temperature and operating-status display |
| **LED / Buzzer** | Simple status indication |
| **Power Bank** | Low-voltage DC power for the prototype |
| **Basic Enclosure** | Protects electronics and supports the build |
| **Tubing** | Water circulation |
| **Wires & Connectors** | Electrical connections |

### Current rough prototype estimate

The present full prototype BOM is approximately **₹1,030**, depending on component prices and local availability.

The prototype budget should be treated as an engineering estimate, not as a fixed commercial price.

---

# Software Stack

## ESP32 Firmware

**Language:** C / C++

**Development environment:** Arduino IDE

Responsibilities:

- Read DHT22
- Read DS18B20
- Process sensor data
- Apply cooling decision logic
- Control fan and pump
- Update OLED
- Maintain local logs
- Synchronize data with Android

## Android Application

**Language:** Kotlin

**Development environment:** Android Studio

**UI:** Jetpack Compose

Responsibilities:

- Operator dashboard
- Live cooling information
- Produce-temperature graph
- Batch creation and tracking
- Cooling-cycle history
- Resource tracking
- Decision/status display
- Basic logistics information

## Communication

**ESP32 ↔ Android:** Bluetooth Low Energy (BLE)

The physical prototype is designed to communicate locally without making the cooling process dependent on an internet connection.

## Data Storage

- ESP32 local logging for the prototype
- Android local storage for batch history and operational records

## Cooling Simulation

Stage-1 software demonstrations can simulate:

- Favorable cooling conditions
- Unfavorable / high-humidity conditions

The simulation uses established evaporative-cooling concepts, including wet-bulb depression.

No machine-learning model is required for the core cooling decision logic.

---

# Cooling Decision Logic

The system combines:

```text
Ambient Temperature
        +
Relative Humidity
        +
Representative Produce Temperature Trend
        ↓
Cooling Effectiveness
        ↓
Operating Decision
```

## Operating states

### COOL
Cooling conditions are suitable and the produce is responding.

### REDUCE
Cooling effectiveness is decreasing or conditions are becoming less favorable.

### STOP
Continuing the cycle is not providing enough useful cooling under the defined logic.

### TARGET REACHED
The produce reaches the validated target range used for that test.

The exact target range should be selected and validated for the produce being handled.

---

# Android Application

The Android application is the operator-facing part of AgroTrace Cool.

## Current Batch

- Batch ID
- Crop
- Current status

## Environment

- Ambient temperature
- Relative humidity
- Cooling potential

## Produce

- Initial produce temperature
- Current produce temperature
- Temperature reduction

## Cooling

- Cooling status
- Cooling duration
- Decision reason

## Resources

- Water used
- Energy used

## Graph

**Produce temperature versus time**

## Cycle History

Previous batches with:

- Batch ID
- Crop
- Initial / final temperature
- Cooling duration
- Water used
- Energy used
- Cooling result
- Decision reason

---

# Batch Records

AgroTrace Cool treats each cooling cycle as a batch-level record.

A batch can contain:

```text
Batch ID
Crop
Collection Centre
Date / Time
Initial Produce Temperature
Current / Final Produce Temperature
Cooling Status
Cooling Duration
Water Used
Energy Used
Decision Reason
Batch Notes
```

Future versions can extend the record with basic post-cooling logistics information such as:

- Destination
- Transport start
- ETA
- Current transport status

This remains a **basic batch trace**, not a full logistics optimisation platform.

---

# Produce Use Cases

Tomato is the main demonstration crop for the prototype because it gives us a clear, easy-to-observe fresh-produce use case.

The same monitoring concept can potentially be explored for other produce, including:

- **Brinjal / Eggplant**
- **Okra**
- **Capsicum**
- **Beans**
- **Certain leafy vegetables**
- **Other suitable fruits and vegetables**

However, AgroTrace Cool does **not** assume one cooling target works for every crop.

Different produce has different:

- temperature requirements
- humidity needs
- respiration behaviour
- sensitivity to chilling
- handling requirements

Therefore, each additional crop should be validated before operational deployment.

---

# Prototype Validation

The prototype is intended to produce its own evidence instead of relying only on assumptions.

## Data to collect

### Environment

- Ambient temperature
- Relative humidity

### Produce

- Starting temperature
- Temperature during cooling
- Final temperature

### Operation

- Fan runtime
- Pump runtime
- Total cycle duration

### Resources

- Water used
- Energy used

### Decision

- COOL
- REDUCE
- STOP
- TARGET REACHED

---

# Planned Tests

## Test 1 — Favorable Conditions

Check whether:

- produce temperature decreases
- the temperature trend is measurable
- the cooling cycle reaches the defined target range
- the cycle is recorded correctly

## Test 2 — High-Humidity Conditions

Check whether:

- evaporative cooling potential decreases
- produce temperature response becomes weaker
- the system detects reduced effectiveness
- the operating state changes appropriately

## Test 3 — Resource Tracking

Measure:

- water used per cycle
- electrical energy used per cycle

## Test 4 — Repeatability

Run repeated trials under similar conditions and compare:

- temperature response
- duration
- resource use
- final status

---

# Implementation Roadmap

```text
01. DESIGN
       ↓
02. BUILD PROTOTYPE
       ↓
03. INTEGRATE & CONTROL
       ↓
04. VALIDATE
       ↓
05. FPO PILOT
       ↓
06. SCALE
```

## 01 — Design

- Cooling chamber layout
- Wet-pad and water-circulation design
- Sensor placement
- Android data model

**Output:** Prototype design finalized

## 02 — Build Prototype

- Insulated thermocol chamber
- Fan and water pump
- DHT22 and DS18B20
- ESP32 and local display

**Output:** Working physical prototype

## 03 — Integrate & Control

- Read temperature and humidity
- Monitor produce temperature
- Evaluate cooling conditions
- Control fan and pump

**Output:** Cooling and monitoring working together

## 04 — Validate

- Favorable-condition testing
- High-humidity testing
- Produce-temperature tracking
- Water and energy measurement

**Output:** Measured cooling performance

## 05 — FPO Pilot

- Adapt the monitoring approach to an FPO setup
- Track batches during cooling
- Store cooling-cycle history
- Review operational records

**Output:** Field-tested monitoring approach

## 06 — Scale

- Adapt to larger cooling chambers
- Add sensors where required
- Track multiple batches
- Evaluate grid, battery or solar options based on measured demand

**Output:** Scalable FPO monitoring system

---

# Feasibility and Viability

## Prototype Ready

- Low-cost, commonly available components
- Simple evaporative cooling construction
- ESP32-based sensing and control
- Android monitoring interface
- Practical for student-level prototype development

## Technically Practical

- Ambient + produce temperature monitoring
- Relative-humidity monitoring
- Sensor-based cooling decisions
- Simple fan/pump control
- Local Android data synchronization

## FPO Adaptable

- Built around collection-centre batch handling
- Monitoring approach can be adapted to larger cooling setups
- Batch-level records can support operational review
- Does not require replacing the entire cooling method

## Scalable

```text
Prototype
   ↓
Controlled Testing
   ↓
FPO Pilot
   ↓
Engineering Adaptation
   ↓
Larger Deployment
```

Scale-up will require validation of airflow, chamber design, wet-pad area, fan/pump capacity, sensor placement, water demand, energy demand, hygiene, and maintenance.

---

# Current Scope

### What we are building now

- Small evaporative cooling chamber
- Sensor system
- ESP32 controller
- Fan and pump control
- Local display
- Android monitoring application
- Batch history
- Cooling simulation
- Prototype testing

### What comes later

- FPO field pilot
- Larger chamber adaptation
- Multi-point sensing where needed
- Larger batch handling
- Power-system evaluation
- Long-term field validation

---

# What We Are Not Claiming

To keep the project technically honest, AgroTrace Cool is **not** presented as:

- a replacement for refrigerated cold storage
- a replacement for refrigerated transport
- a complete cold-chain system
- a universal cooling solution for every crop
- a commercially validated large-scale system
- a confirmed 3-tonne cooling system
- a guaranteed spoilage-reduction percentage
- a guaranteed water-saving percentage
- a guaranteed energy-saving percentage
- an already deployed FPO network
- an AI-based cooling system

The current project is a **prototype and validation platform**.

---

# Why Existing Work Matters

AgroTrace Cool was developed after studying existing cooling and cold-chain work.

Research and existing projects show that:

- post-harvest pre-cooling is an established part of produce handling
- evaporative cooling is an established low-cost approach
- cooling performance depends on environmental conditions
- temperature monitoring is already used in agricultural supply chains
- India has government-supported cold-chain and FPO programmes
- IoT-connected evaporative cooling has already been explored in India and internationally

This existing work is important because it helps us avoid claiming novelty where there is already prior art.

Our focus is narrower:

> **A low-cost cooling process that also measures produce temperature, understands operating conditions, records the cooling cycle, and gives the FPO operator a usable batch history.**

---

# Research and References

## Government / Official

### Ministry of Food Processing Industries (MoFPI)

**Revised Operational Guidelines dated 22.05.2025 — Integrated Cold Chain and Value Addition Infrastructure under PMKSY**

https://www.mofpi.gov.in/en/announcements/revised-operational-guidelines-dated-22052025-respect-component-scheme-integrated-cold

MoFPI cold-chain guidelines provide the government context for integrated cold-chain infrastructure and farm-gate handling.

### MoFPI — Cold Chain

https://www.mofpi.gov.in/Schemes/cold-chain

### Small Farmers’ Agri-Business Consortium (SFAC)

**Farmer Producer Organization Scheme**

https://www.sfacindia.com/FPOS.aspx

SFAC provides the government framework and information related to the 10,000 FPO programme, including post-harvest management guidance for fruits and vegetables.

### India Science, Technology & Innovation (ISTI) Portal

**Smart Indigenous Cooling Chamber**

https://www.indiascienceandtechnology.gov.in/hi/node/170680

Relevant to Indian research on IoT-connected evaporative cooling and post-harvest preservation.

---

## Existing Cooling Research / Projects

### MIT J-WAFS — CoolVeg

**Mobile Evaporative Cooling Rooms for Vegetable Preservation**

https://jwafs.mit.edu/projects/2021/mobile-evaporative-cooling-rooms-vegetable-preservation

Relevant to forced-air evaporative cooling, prototype development, India pilot work, modelling, and smallholder deployment research.

### NITI Aayog Frontier Tech

**Reimagining Cold Chains: Tech-Driven Storage Solutions for India’s Perishable Agriculture**

https://frontiertech.niti.gov.in/story/reimagining-cold-chains-tech-driven-storage-solutions-for-indias-perishable-agriculture/

Includes discussion of decentralized cooling approaches and FPO aggregation contexts.

### Elephant Design

**FreshBox**

https://www.elephantdesign.com/perspective/innovation-mint/freshbox

Relevant to modular farm-produce cooling design.

### Sensor-Based Monitoring

**Lamberty, A., & Kreyenschmidt, J. (2025). Technical, process-related and sustainability requirements for IoT-based temperature monitoring in fruit and vegetable supply chains. Discover Food, 5, 151.**

https://link.springer.com/article/10.1007/s44187-025-00427-1

Relevant to temperature monitoring and IoT requirements in fruit and vegetable supply chains.

---

# Project Structure

A possible repository structure is:

```text
AgroTrace-Cool/
│
├── README.md
├── Research.md
│
├── hardware/
│   ├── circuit/
│   ├── wiring/
│   ├── bom/
│   └── prototype/
│
├── firmware/
│   ├── esp32/
│   ├── sensors/
│   ├── control/
│   └── logging/
│
├── android/
│   ├── app/
│   ├── ui/
│   ├── batch/
│   ├── monitoring/
│   └── storage/
│
├── simulation/
│   ├── favorable/
│   ├── unfavorable/
│   └── cooling-model/
│
├── data/
│   ├── sample-runs/
│   └── test-results/
│
├── docs/
│   ├── architecture/
│   ├── flowcharts/
│   ├── test-plans/
│   └── technical-documentation/
│
└── media/
    ├── prototype/
    ├── diagrams/
    └── presentation/
```

The exact structure can change as implementation progresses.

---

# Development Status

### Current project stage

**Prototype Development & Validation**

### Core components

- [x] Project concept
- [x] Physical cooling approach
- [x] Sensor architecture
- [x] ESP32 control concept
- [x] Android application concept
- [x] Batch-record design
- [x] Cooling simulation plan
- [ ] Final physical build
- [ ] Experimental validation
- [ ] FPO field pilot

The unchecked stages are future implementation and validation work, not completed deployment claims.

---

# Future Scope

Once the prototype is validated, future work can include:

### Larger Cooling Systems
Adapt the same monitoring architecture to larger FPO cooling chambers.

### More Sensors
Add multiple produce-temperature points where a larger chamber requires better temperature coverage.

### Crop Profiles
Create validated handling profiles for different produce types rather than using one universal target.

### Better Resource Measurement
Improve water and electrical energy measurement for reliable per-cycle comparisons.

### Power Options
Evaluate grid, battery, solar or hybrid power based on measured real-world load.

### Batch Traceability
Extend batch records into the next stage of the post-harvest journey.

### Field Validation
Test the monitoring approach under real FPO operating conditions and seasonal weather variation.

---

# Core Takeaway

AgroTrace Cool is not about inventing another cooling method.

It is about making a farm-gate cooling operation easier to **measure, understand, operate and record**.

```text
SENSE
  ↓
ANALYZE
  ↓
COOL
  ↓
ADVISE
  ↓
RECORD
```

> **Build the cooler. Measure the process. Validate the results. Adapt for FPOs. Scale.**

---

# Team

### 1. VISHNUVARDHAN B
**ECE — Electronics & Communication Engineering**

Focus:
- Android application
- System architecture
- Data model
- Monitoring interface
- Batch tracking
- Simulation
- Documentation and presentation

### 2. PRAVEENKUMAR K
**EEE — Electrical & Electronics Engineering**

Focus:
- Cooling chamber
- Sensors
- ESP32
- Fan and pump control
- Power system
- Embedded firmware
- Physical testing

---

## Project

**AgroTrace Cool**

**Smart Monitoring for Farm-Gate Pre-Cooling**

Built for the **Yuva Yodha Energy Tech Hackathon — Challenge 01: Sustainable Agriculture — Energy, Water & Productivity**
