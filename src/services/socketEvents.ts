// Dynamic socket event handler
export const createSocketListener = (eventName: string, action: Function) => {
  return { eventName, action };
};

// Event name constants
export const SOCKET_EVENTS = {
  NEW_ORDER: 'new_order',
  STATUS_UPDATE: 'status_update',
  DRIVER_UPDATE: 'driver_update'
} as const;

// Socket event management utility
export class SocketEventManager {
  private listeners: Map<string, Function[]> = new Map();

  on(eventName: string, action: Function) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName)?.push(action);
  }

  off(eventName: string, action: Function) {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      const index = eventListeners.indexOf(action);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  emit(eventName: string, data: any) {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      eventListeners.forEach(listener => listener(data));
    }
  }

  clear() {
    this.listeners.clear();
  }
}