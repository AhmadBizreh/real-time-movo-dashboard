
import { LABELS } from "./labels";
import motorcycle from "/driver/motorcycle.svg";


export const COLUMN_DEFINITIONS = [
  {
    id: 'pending',
    title: LABELS.PENDING,
    color: '#f59e0b',
    status: 'pending' as const
  },
  {
    id: 'on_route',
    title: LABELS.ON_ROUTE,
    color: '#10b981',
    status: 'on_route' as const
  },
  {
    id: 'schedule',
    title: LABELS.SCHEDULE,
    color: '#3b82f6',
    status: 'schedule' as const
  },
  {
    id: 'driver',
    title: LABELS.DRIVER,
    color: '#0D924B',
    status: 'driver' as const
  }
];
