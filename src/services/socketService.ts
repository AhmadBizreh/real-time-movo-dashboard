import { SocketEventManager, SOCKET_EVENTS } from './socketEvents';
import { MOCK_DATA, SOCKET_CONFIG } from '@/data/constants';

class SocketService {
  private intervals: NodeJS.Timeout[] = [];
  private eventManager = new SocketEventManager();

  start() {
    // Simulate new orders
    const orderInterval = setInterval(() => {
      this.emit(SOCKET_EVENTS.NEW_ORDER, this.generateMockOrder());
    }, SOCKET_CONFIG.ORDER_GENERATION_INTERVAL);

    // Simulate status updates
    const statusInterval = setInterval(() => {
      this.emit(SOCKET_EVENTS.STATUS_UPDATE, {
        id: Math.random().toString(36).substr(2, 9),
        status: ['pending', 'on_route', 'delivered'][Math.floor(Math.random() * 3)]
      });
    }, SOCKET_CONFIG.STATUS_UPDATE_INTERVAL);

    // Simulate driver updates
    const driverInterval = setInterval(() => {
      this.emit(SOCKET_EVENTS.DRIVER_UPDATE, {
        id: Math.random().toString(36).substr(2, 9),
        status: ['free', 'busy', 'offline'][Math.floor(Math.random() * 3)]
      });
    }, SOCKET_CONFIG.DRIVER_UPDATE_INTERVAL);

    this.intervals.push(orderInterval, statusInterval, driverInterval);
  }

  stop() {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals = [];
    this.eventManager.clear();
  }

  on(eventName: string, action: Function) {
    this.eventManager.on(eventName, action);
  }

  off(eventName: string, action: Function) {
    this.eventManager.off(eventName, action);
  }

  private emit(eventName: string, data: any) {
    this.eventManager.emit(eventName, data);
  }

  private generateMockOrder() {
    return {
      id: Math.random().toString(36).substr(2, 9),
      orderNumber: `#${Math.floor(Math.random() * 9000) + 1000}`,
      customerName: MOCK_DATA.customers[Math.floor(Math.random() * MOCK_DATA.customers.length)],
      restaurant: MOCK_DATA.restaurants[Math.floor(Math.random() * MOCK_DATA.restaurants.length)],
      area: MOCK_DATA.areas[Math.floor(Math.random() * MOCK_DATA.areas.length)],
      paymentMethod: Math.random() > 0.5 ? 'Cash' : 'Card',
      status: 'pending',
      createdAt: new Date(),
      tags: Math.random() > 0.7 ? ['VIP'] : Math.random() > 0.8 ? ['MOVO plus'] : [],
      priority: Math.random() > 0.8 ? 'vip' : 'normal',
      isUrgent: Math.random() > 0.9,
      timer: '0:00'
    };
  }
}

export const socketService = new SocketService();
