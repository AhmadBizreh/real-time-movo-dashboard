import { Order } from "@/types";

export interface OrderCardProps {
  order: Order;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}
