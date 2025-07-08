import { create } from 'zustand';
import { Order, OrderState, AppNotification } from '@/types';
import { MOCK_DATA, NOTIFICATION_DURATION } from '@/data/constants';

interface OrderStoreState extends OrderState {
  // Actions
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: string) => void;
  deleteOrder: (id: string) => void;
  updateOrderNote: (orderId: string, note: string, type: 'order' | 'address') => void;
  updateDispatch: (orderId: string, dispatch: boolean) => void;
  toggleFilter: (columnId: string) => void;
  filterByOrderId: (columnId: string, orderId: string | null) => void;
  addNotification: (notification: Omit<AppNotification, 'id'>) => void;
  removeNotification: (id: string) => void;
  updateTimers: () => void;
  initializeMockOrders: () => void;
}

const generateMockOrder = (index: number): Order => ({
  id: `order-${index}`,
  orderNumber: `#${1000 + index}`,
  trackId: `TK${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
  customerName: MOCK_DATA.customers[index % MOCK_DATA.customers.length],
  restaurant: MOCK_DATA.restaurants[index % MOCK_DATA.restaurants.length],
  area: MOCK_DATA.areas[index % MOCK_DATA.areas.length],
  transType: MOCK_DATA.transTypes[index % MOCK_DATA.transTypes.length],
  paymentMethod: MOCK_DATA.paymentMethods[index % MOCK_DATA.paymentMethods.length] as any,
  total: Math.floor(Math.random() * 50) + 15,
  status: ['pending', 'on_route', 'schedule'][index % 3] as any,
  createdAt: new Date(Date.now() - Math.random() * 3600000),
  deliveryTime: `${Math.floor(Math.random() * 2) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} PM`,
  estimatedTime: `${Math.floor(Math.random() * 30) + 15} min`,
  dispatch: Math.random() > 0.5,
  tags: index % 4 === 0 ? ['VIP'] : index % 5 === 0 ? ['MOVO plus'] : index % 6 === 0 ? ['On watch'] : [],
  priority: index % 3 === 0 ? 'vip' : index % 4 === 0 ? 'plus' : 'normal',
  isUrgent: index % 7 === 0,
  timer: '00:00:00',
  orderNote: index % 3 === 0 ? 'Customer requested extra sauce' : '',
  addressNote: index % 4 === 0 ? 'Building 5, Floor 2, Apartment 201' : ''
});

export const useOrderStore = create<OrderStoreState>((set, get) => ({
  orders: [],
  orderFilters: {},
  activeFilters: {},
  notifications: [],

  addOrder: (order) => {
    set((state) => ({
      orders: [...state.orders, order]
    }));
    get().addNotification({
      type: 'success',
      message: `New order ${order.orderNumber} has been added`,
      duration: NOTIFICATION_DURATION.SUCCESS
    });
  },

  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === id ? { ...order, status: status as any } : order
    )
  })),

  deleteOrder: (id) => set((state) => ({
    orders: state.orders.filter(order => order.id !== id)
  })),

  updateOrderNote: (orderId, note, type) => set((state) => ({
    orders: state.orders.map(order =>
      order.id === orderId 
        ? { ...order, [type === 'order' ? 'orderNote' : 'addressNote']: note }
        : order
    )
  })),

  updateDispatch: (orderId, dispatch) => set((state) => ({
    orders: state.orders.map(order =>
      order.id === orderId ? { ...order, dispatch } : order
    )
  })),

  toggleFilter: (columnId) => set((state) => ({
    activeFilters: {
      ...state.activeFilters,
      [columnId]: !state.activeFilters[columnId]
    }
  })),

  filterByOrderId: (columnId, orderId) => set((state) => ({
    orderFilters: {
      ...state.orderFilters,
      [columnId]: orderId
    }
  })),

  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, { ...notification, id: Date.now().toString() }]
  })),

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n  => n.id !== id)
  })),

  updateTimers: () => set((state) => ({
    orders: state.orders.map(order => {
      const now = new Date();
      const diff = now.getTime() - order.createdAt.getTime();
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      return {
        ...order,
        timer: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      };
    })
  })),

  initializeMockOrders: () => {
    const mockOrders = Array.from({ length: 15 }, (_, i) => generateMockOrder(i));
    set({ orders: mockOrders });
  }
}));
