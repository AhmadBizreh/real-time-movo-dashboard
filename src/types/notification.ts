export interface AppNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
}
