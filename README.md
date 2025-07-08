# Real-Time Logistics Movo Dashboard

A modern logistics dashboard built with React and TypeScript for real-time order management and driver tracking. Designed for scalability, performance, and clarity.

---

## Features

* **Live Order Tracking**: Orders update in real time with countdowns and alerts.
* **Driver Management**: Monitor and assign drivers based on availability.
* **Status Control**: Update statuses with modals and dropdowns.
* **Smart Filters**: Filter by status, columns, or driver state.
* **Fully Responsive**: Works across desktop, tablet, and mobile.
* **Mock Socket System**: Simulated real-time updates via event-based architecture.

---

## Architecture Overview

* **React + TypeScript** for type-safe UI
* **Zustand** for modular state management
* **Custom Hooks** for clean business logic
* **Separation of Concerns** across UI, logic, types, and configuration
* **SocketService** simulates dynamic real-time behavior

---

## Design Principles

This project follows modern architecture practices:
- UI and business logic are fully separated using custom hooks.
- Domain state is managed through modular Zustand stores.
- All components are reusable, stateless when possible, and focused on presentation.

---

## Project Structure

```
src/
  components/     → UI components (Dashboard, Cards, Map)
  layout/         → Sidebar and layout wrappers
  ui/             → Reusable UI (dropdowns, modals)
  stores/         → Zustand state (orders, drivers)
  hooks/          → Business logic hooks
  services/       → WebSocket simulation
  data/           → Columns, labels, constants
  types/          → Typed definitions for each domain
  pages/          → Main app routes
```

---

## Development Notes

- You can extend mock socket events in `src/services/socketService.ts`.
- UI labels and column configs are centralized and easy to adjust.
- Each feature module (Orders, Drivers) is isolated for maintainability.


---


## Getting Started

1. Clone the repo:

   ```bash
   git clone <repo-url>
   cd logistics-dashboard
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the dev server:

   ```bash
   npm run dev
   ```
4. Visit: `http://localhost:5173`

To build for production:

```bash
npm run build
```

---

## Configuration

* **Data**: Modify in `src/data/constants.ts`
* **Drivers**: Edit in `src/stores/driverStore.ts`
* **Socket Frequency**: Adjust in `src/services/socketService.ts`
* **Labels and Columns**: Configurable from `src/data/`

---

## Technologies

* React 18 + TypeScript
* Zustand for state
* Tailwind CSS
* Vite for fast builds
* Custom Hooks & Mock Sockets

---

## Notes

* Currently uses simulated data and WebSocket events
* All logic is modular and type-safe
* Future enhancements include real GPS tracking and backend integration

---

Built with care to streamline logistics operations using clean, scalable React architecture.

# By Ahmad Bizreh
# ahmadbi181@gmail.com
