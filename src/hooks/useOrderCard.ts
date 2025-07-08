import { useState } from 'react';
import { Order } from '../types';
import { useOrderStore } from '../stores/orderStore';
import { useDriverStore } from '../stores/driverStore';
import { STATUS_COLORS, TIMER_COLORS, PRIORITY_COLORS } from '../data/constants';
import { LABELS } from '../data/labels';

export const useOrderCard = (order: Order) => {
  const { updateOrderNote, updateDispatch } = useOrderStore();
  const { drivers, assignDriver } = useDriverStore();
  
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderNote, setOrderNote] = useState(order.orderNote || '');
  const [addressNote, setAddressNote] = useState(order.addressNote || '');

  const getStatusColor = (status: string) => {
    return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.pending;
  };

  const getTimerColor = (timer: string) => {
    const [hours, minutes] = timer.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    if (totalMinutes >= 10) return TIMER_COLORS.DANGER;
    if (totalMinutes >= 7) return TIMER_COLORS.WARNING;
    return TIMER_COLORS.SAFE;
  };

  const getPriorityBadge = (priority: string) => {
    return PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] || PRIORITY_COLORS.normal;
  };

  const getTimerTitle = () => {
    return order.status === 'pending' ? LABELS.TIME_PASSED : LABELS.DELIVERY_TIMER;
  };

  const handleAssignDriver = (driverId: string) => {
    assignDriver(order.id, driverId);
    setShowModal(null);
  };

  const handleSaveOrderNote = () => {
    updateOrderNote(order.id, orderNote, 'order');
    setShowModal(null);
  };

  const handleSaveAddressNote = () => {
    updateOrderNote(order.id, addressNote, 'address');
    setShowModal(null);
  };

  const handleDispatchToggle = (checked: boolean) => {
    updateDispatch(order.id, checked);
  };

  const handleModalClose = (type: string) => {
    if (type === 'order-note') {
      setOrderNote(order.orderNote || '');
    } else if (type === 'address-note') {
      setAddressNote(order.addressNote || '');
    }
    setShowModal(null);
  };

  const availableDrivers = drivers.filter(d => d.status === 'free');

  return {
    // State
    showStatusDropdown,
    setShowStatusDropdown,
    showModal,
    setShowModal,
    showDeleteConfirm,
    setShowDeleteConfirm,
    orderNote,
    setOrderNote,
    addressNote,
    setAddressNote,
    availableDrivers,
    
    // Functions
    getStatusColor,
    getTimerColor,
    getPriorityBadge,
    getTimerTitle,
    handleAssignDriver,
    handleSaveOrderNote,
    handleSaveAddressNote,
    handleDispatchToggle,
    handleModalClose
  };
};
