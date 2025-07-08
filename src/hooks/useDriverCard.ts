import { useState } from 'react';
import { Driver } from '../types';
import { DRIVER_STATUS_COLORS } from '../data/constants';

export const useDriverCard = (driver: Driver) => {
  const [expandedStats, setExpandedStats] = useState({
    delivered: true,
    canceled: true,
    rejected: true
  });

  const getBatteryIcon = (level: number) => {
    if (level >= 75) return { icon: 'Battery', color: 'text-green-600' };
    if (level >= 50) return { icon: 'Battery', color: 'text-yellow-600' };
    if (level >= 25) return { icon: 'BatteryLow', color: 'text-orange-600' };
    return { icon: 'BatteryLow', color: 'text-red-600' };
  };

  const getSatisfactionIcon = (rating: number) => {
    if (rating >= 4.0) return { icon: 'Star', color: 'text-green-600 fill-current' };
    if (rating >= 3.0) return { icon: 'StarHalf', color: 'text-yellow-600 fill-current' };
    return { icon: 'Star', color: 'text-red-600' };
  };

  const getVehicleIcon = (type: string) => {
    return type === 'car' ? 
      { icon: 'Car', color: 'text-white' } : 
      { icon: 'Truck', color: 'text-[#5C2684]' };
  };

  const getStatusColor = (status: string) => {
    return DRIVER_STATUS_COLORS[status as keyof typeof DRIVER_STATUS_COLORS] || DRIVER_STATUS_COLORS.offline;
  };

  const toggleStat = (statType: 'delivered' | 'canceled' | 'rejected') => {
    setExpandedStats(prev => ({
      ...prev,
      [statType]: !prev[statType]
    }));
  };

  return {
    expandedStats,
    getBatteryIcon,
    getSatisfactionIcon,
    getVehicleIcon,
    getStatusColor,
    toggleStat
  };
};
