
import { Order, OrderStatus } from './order';
import { Driver } from './driver';

export interface ColumnFilter {
  id: string;
  label: string;
  active: boolean;
}

export interface DashboardColumn {
  id: string;
  title: string;
  status: OrderStatus | 'driver';
  color: string;
  count: number;
  items: (Order | Driver)[];
  filters: ColumnFilter[];
}
