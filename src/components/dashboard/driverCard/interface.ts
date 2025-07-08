import { Driver } from "@/types";

export interface DriverCardProps {
  driver: Driver;
  onStatusChange: (id: string, status: string) => void;
}
