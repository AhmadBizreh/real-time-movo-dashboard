import { useState } from 'react';
import { DriverFilters } from '../types';

export const useColumnHeader = () => {
  const [showOrderFilter, setShowOrderFilter] = useState(false);

  const toggleOrderFilter = () => {
    setShowOrderFilter(!showOrderFilter);
  };

  const handleDriverFilter = (
    filterType: 'free' | 'busy',
    driverFilters: DriverFilters | undefined,
    onDriverFilterClick: ((filterType: 'free' | 'busy') => void) | undefined
  ) => {
    if (onDriverFilterClick) {
      onDriverFilterClick(filterType);
    }
  };

  return {
    showOrderFilter,
    toggleOrderFilter,
    handleDriverFilter
  };
};
