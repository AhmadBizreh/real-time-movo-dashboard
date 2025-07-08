import { create } from 'zustand';
import { Driver, DriverState } from '@/types';
import { MOCK_DATA } from '@/data/constants';

interface DriverStoreState extends DriverState {
  // Actions
  updateDriverStatus: (id: string, status: string) => void;
  toggleDriverFilter: (filterType: 'free' | 'busy') => void;
  assignDriver: (orderId: string, driverId: string) => void;
  initializeMockDrivers: () => void;
}

const generateMockDriver = (index: number): Driver => ({
  id: `driver-${index}`,
  name: MOCK_DATA.driverNames[index % MOCK_DATA.driverNames.length] + ` ${index + 1}`,
  status: ['free', 'busy', 'offline'][index % 3] as any,
  currentOrders: Math.floor(Math.random() * 5),
  rejectionRate: Math.floor(Math.random() * 20),
  rating: 3.5 + Math.random() * 1.5,
  location: MOCK_DATA.areas[index % MOCK_DATA.areas.length],
  phone: `+966 ${Math.floor(Math.random() * 900000000) + 100000000}`,
  vehicleType: index % 2 === 0 ? 'car' : 'bike',
  batteryLevel: Math.floor(Math.random() * 100) + 1,
  workingHours: `${8 + Math.floor(Math.random() * 4)}:00 - ${16 + Math.floor(Math.random() * 4)}:00`,
  delivered: Math.floor(Math.random() * 50) + 10,
  canceled: Math.floor(Math.random() * 5) + 1,
  rejected: Math.floor(Math.random() * 3) + 1
});

export const useDriverStore = create<DriverStoreState>((set, get) => ({
  drivers: [],
  driverFilters: { free: true, busy: true },

  updateDriverStatus: (id, status) => set((state) => ({
    drivers: state.drivers.map(driver => 
      driver.id === id ? { ...driver, status: status as any } : driver
    )
  })),

  toggleDriverFilter: (filterType) => set((state) => ({
    driverFilters: {
      ...state.driverFilters,
      [filterType]: !state.driverFilters[filterType]
    }
  })),

  assignDriver: (orderId, driverId) => {
    const driver = get().drivers.find(d => d.id === driverId);
    if (driver) {
      console.log(`Driver ${driver.name} assigned to order ${orderId}`);
    }
  },

  initializeMockDrivers: () => {
    const mockDrivers = Array.from({ length: 12 }, (_, i) => generateMockDriver(i));
    set({ drivers: mockDrivers });
  }
}));
