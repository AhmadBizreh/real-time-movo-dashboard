import { AppNotification } from './notification';


export interface Order {
  id: string;
  orderNumber: string;
  trackId: string;
  customerName: string;
  restaurant: string;
  area: string;
  transType: string;
  paymentMethod: 'Cash' | 'Card' | 'Digital' | 'Bank Transfer';
  total: number;
  status: OrderStatus;
  createdAt: Date;
  estimatedDelivery?: Date;
  deliveryTime: string;
  estimatedTime: string;
  dispatch: boolean;
  driverId?: string;
  tags: string[];
  priority: 'normal' | 'vip' | 'plus';
  isUrgent: boolean;
  timer: string;
  orderNote?: string;
  addressNote?: string;
}

export type OrderStatus = 'pending' | 'on_route' | 'schedule' | 'delivered' | 'cancelled';

export interface OrderState {
  orders: Order[];
  orderFilters: { [key: string]: string | null };
  activeFilters: { [key: string]: boolean };
  notifications: AppNotification[];
}
