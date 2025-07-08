import { useMemo } from 'react';
import { useOrderStore } from '../stores/orderStore';
import { useDriverStore } from '../stores/driverStore';

export const useDashboardFilters = () => {
  const { orders, orderFilters, activeFilters } = useOrderStore();
  const { drivers, driverFilters } = useDriverStore();

  // Filter orders based on active filters and order filters
  const getFilteredOrders = useMemo(() => {
    return (status: string) => {
      let baseOrders = orders.filter(order => order.status === status);
      
      // Apply order ID filter
      if (orderFilters[status]) {
        baseOrders = baseOrders.filter(order => order.id === orderFilters[status]);
      }
      
      // Apply VIP filter
      if (activeFilters[status]) {
        baseOrders = baseOrders.filter(order => order.priority === 'vip');
      }
      
      return baseOrders;
    };
  }, [orders, orderFilters, activeFilters]);

  // Filter drivers based on driver filters
  const getFilteredDrivers = useMemo(() => {
    return drivers.filter(driver => {
      if (!driverFilters.free && driver.status === 'free') return false;
      if (!driverFilters.busy && driver.status === 'busy') return false;
      return true;
    });
  }, [drivers, driverFilters]);

  // Driver counts
  const driverCounts = useMemo(() => ({
    free: drivers.filter(d => d.status === 'free').length,
    busy: drivers.filter(d => d.status === 'busy').length
  }), [drivers]);

  return {
    getFilteredOrders,
    getFilteredDrivers,
    driverCounts
  };
};