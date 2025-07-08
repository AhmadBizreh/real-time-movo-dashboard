import { useState } from 'react';
import { OrderStatus } from '../types';

const STATUS_OPTIONS = [
  { value: 'pending' as OrderStatus, label: 'Pending', color: 'bg-yellow-500' },
  { value: 'on_route' as OrderStatus, label: 'On Route', color: 'bg-green-500' },
  { value: 'schedule' as OrderStatus, label: 'Schedule', color: 'bg-blue-500' },
  { value: 'delivered' as OrderStatus, label: 'Delivered', color: 'bg-gray-500' },
  { value: 'cancelled' as OrderStatus, label: 'Cancelled', color: 'bg-red-500' }
];

export const useStatusDropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filteredStatuses = STATUS_OPTIONS.filter(status =>
    status.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchTerm('');
    }
  };

  const resetSearch = () => {
    setShowSearch(false);
    setSearchTerm('');
  };

  return {
    searchTerm,
    setSearchTerm,
    showSearch,
    setShowSearch,
    filteredStatuses,
    handleSearchToggle,
    resetSearch,
    STATUS_OPTIONS
  };
};
