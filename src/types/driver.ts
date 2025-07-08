
export interface Driver {
  id: string;
  name: string;
  status: DriverStatus;
  currentOrders: number;
  rejectionRate: number;
  rating: number;
  location: string;
  avatar?: string;
  phone: string;
  vehicleType: 'car' | 'bike';
  batteryLevel: number;
  workingHours: string;
  delivered: number;
  canceled: number;
  rejected: number;
}

export type DriverStatus = 'free' | 'busy' | 'offline';

export interface DriverFilters {
  free: boolean;
  busy: boolean;
}

export interface DriverState {
  drivers: Driver[];
  driverFilters: DriverFilters;
}
