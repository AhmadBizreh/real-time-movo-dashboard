import { DriverFilters, Order } from "@/types";

export interface ColumnHeaderProps {
  title: string;
  count: number;
  color: string;
  onFilterClick?: () => void;
  filterActive?: boolean;
  isDriverColumn?: boolean;
  driverFilters?: DriverFilters;
  onDriverFilterClick?: (filterType: 'free' | 'busy') => void;
  freeCount?: number;
  busyCount?: number;
  orders?: Order[];
  onFilterByOrderId?: (orderId: string) => void;
  onClearFilter?: () => void;
  columnId?: string;
}
