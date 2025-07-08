export const MOCK_DATA = {
  restaurants: [
    'Pizza Palace', 'Burger King', 'Sushi Master', 'KFC', 
    'Subway', 'Dominos', 'Starbucks', 'McDonald\'s'
  ],
  areas: [
    'Downtown', 'Westside', 'Eastport', 'Northgate', 
    'Southpark', 'Midtown', 'Riverside', 'Hillview'
  ],
  customers: [
    'John Smith', 'Sarah Johnson', 'Mike Wilson', 'Emma Davis', 
    'Alex Brown', 'Lisa Chen', 'Ahmed Ali', 'Maria Garcia'
  ],
  transTypes: ['Delivery', 'Pickup', 'Dine-in'],
  paymentMethods: ['Cash', 'Card', 'Digital', 'Bank Transfer'],
  driverNames: [
    'Ahmed Ali', 'Sara Hassan', 'Omar Khalil', 'Nour Farid', 
    'Karim Nasser', 'Layla Omar', 'Yusuf Ahmed', 'Fatima Said'
  ]
} as const;

export const TIMER_COLORS = {
  SAFE: 'bg-[#105DFB] text-white border-blue-300',
  WARNING: 'bg-[#F2C506] text-white border-yellow-300',
  DANGER: 'bg-[#E63B4D] text-white border-red-300'
} as const;

export const STATUS_COLORS = {
  pending: 'bg-[#F2C506]',
  on_route: 'bg-[#105DFB]',
  schedule: 'bg-[#5C2684]',
  delivered: 'bg-gray-500',
  cancelled: 'bg-red-500'
} as const;

export const PRIORITY_COLORS = {
  vip: 'bg-purple-100 text-purple-800 border border-purple-300',
  plus: 'bg-red text-blue-800 border border-blue-300',
  normal: 'bg-gray-100 text-gray-600 border border-gray-300'
} as const;

export const DRIVER_STATUS_COLORS = {
  free: 'bg-green-100 text-green-800 border-green-300',
  busy: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  offline: 'bg-gray-100 text-gray-800 border-gray-300'
} as const;

export const SOCKET_CONFIG = {
  ORDER_GENERATION_INTERVAL: 10000,
  STATUS_UPDATE_INTERVAL: 15000,
  DRIVER_UPDATE_INTERVAL: 20000,
  TIMER_UPDATE_INTERVAL: 1000
} as const;

export const NOTIFICATION_DURATION = {
  SUCCESS: 4000,
  ERROR: 5000,
  INFO: 3000
} as const;
