import React, { useEffect } from 'react';
// import { Sidebar } from 'lucide-react';
import { MapSection } from '@/components/dashboard/mapSection/MapSection';
import { ColumnHeader } from '@/components/dashboard/columnHeader/ColumnHeader';
import { OrderCard } from '@/components/dashboard/orderCard/OrderCard';
import { DriverCard } from '@/components/dashboard/driverCard/DriverCard';
import { Notifications } from '@/components/ui/notifications';
import { useOrderStore } from '@/stores/orderStore';
import { useDriverStore } from '@/stores/driverStore';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { socketService } from '@/services/socketService';
import { SOCKET_EVENTS } from '@/services/socketEvents';
import { COLUMN_DEFINITIONS } from '@/data/columns';
import { SOCKET_CONFIG } from '@/data/constants';
import { Sidebar } from '@/components/layout/sidebar/Sidebar';

export const Dashboard: React.FC = () => {
  // Order store
  const { 
    orders,
    notifications,
    activeFilters,
    initializeMockOrders,
    updateOrderStatus,
    deleteOrder,
    toggleFilter,
    filterByOrderId,
    updateTimers,
    addOrder,
    removeNotification
  } = useOrderStore();

  // Driver store
  const {
    initializeMockDrivers,
    updateDriverStatus,
    toggleDriverFilter,
    driverFilters
  } = useDriverStore();

  // Filtered data
  const { getFilteredOrders, getFilteredDrivers, driverCounts } = useDashboardFilters();

  useEffect(() => {
    // Initialize data
    initializeMockOrders();
    initializeMockDrivers();
    
    // Start socket service
    socketService.start();
    
    // Listen for socket events
    socketService.on(SOCKET_EVENTS.NEW_ORDER, addOrder);
    socketService.on(SOCKET_EVENTS.STATUS_UPDATE, (data: any) => {
      updateOrderStatus(data.id, data.status);
    });
    socketService.on(SOCKET_EVENTS.DRIVER_UPDATE, (data: any) => {
      updateDriverStatus(data.id, data.status);
    });

    // Update timers
    const timerInterval = setInterval(updateTimers, SOCKET_CONFIG.TIMER_UPDATE_INTERVAL);

    return () => {
      socketService.stop();
      clearInterval(timerInterval);
    };
  }, []);

  // Get filtered data
  const filteredDrivers = getFilteredDrivers;

  // Build columns using definitions
  const columns = COLUMN_DEFINITIONS.map(columnDef => {
    let count, items;
    
    if (columnDef.id === 'driver') {
      count = filteredDrivers.length;
      items = filteredDrivers;
    } else {
      const filteredOrders = getFilteredOrders(columnDef.status);
      count = filteredOrders.length;
      items = filteredOrders;
    }
    
    return {
      ...columnDef,
      count,
      items
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <MapSection />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div key={column.id}>
              <ColumnHeader
                title={column.title}
                count={column.count}
                color={column.color}
                filterActive={activeFilters[column.id] || false}
                onFilterClick={() => toggleFilter(column.id)}
                isDriverColumn={column.id === 'driver'}
                driverFilters={driverFilters}
                onDriverFilterClick={toggleDriverFilter}
                freeCount={driverCounts.free}
                busyCount={driverCounts.busy}
                orders={orders.filter(order => order.status === column.id)}
                onFilterByOrderId={(orderId) => filterByOrderId(column.id, orderId)}
                onClearFilter={() => filterByOrderId(column.id, null)}
                columnId={column.id}
              />
              
              <div className="space-y-3">
                {column.items.map((item: any) => 
                  column.id === 'driver' ? (
                    <DriverCard
                      key={item.id}
                      driver={item as any}
                      onStatusChange={updateDriverStatus}
                    />
                  ) : (
                    <OrderCard
                      key={item.id}
                      order={item as any}
                      onStatusChange={updateOrderStatus}
                      onDelete={deleteOrder}
                    />
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Notifications
        notifications={notifications}
        onRemove={removeNotification}
      />
    </div>
  );
};
