import React from 'react';
import { Search, X } from 'lucide-react';
import { OrderStatus } from '../../types';
import { useStatusDropdown } from '../../hooks/useStatusDropdown';

interface StatusDropdownProps {
  currentStatus: OrderStatus;
  onStatusChange: (status: OrderStatus) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const StatusDropdown: React.FC<StatusDropdownProps> = ({
  currentStatus,
  onStatusChange,
  onClose,
  isOpen
}) => {
  const {
    searchTerm,
    setSearchTerm,
    showSearch,
    filteredStatuses,
    handleSearchToggle,
    resetSearch
  } = useStatusDropdown();

  if (!isOpen) return null;

  const handleStatusSelect = (status: OrderStatus) => {
    onStatusChange(status);
    onClose();
  };

  return (
    <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="p-2 border-b border-gray-100">
        {showSearch ? (
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <button
              onClick={resetSearch}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Change Status</span>
            <div className="flex gap-1">
              <button
                onClick={handleSearchToggle}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="max-h-48 overflow-y-auto">
        {filteredStatuses.map((status) => (
          <button
            key={status.value}
            onClick={() => handleStatusSelect(status.value)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 ${
              currentStatus === status.value ? 'bg-blue-50 border-r-2 border-blue-500' : ''
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${status.color}`} />
            <span className="text-sm text-gray-700">{status.label}</span>
          </button>
        ))}
      </div>

      <div className="p-2 border-t border-gray-100 flex gap-2">
        <button
          onClick={handleSearchToggle}
          className="flex-1 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200 flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
        <button
          onClick={onClose}
          className="flex-1 px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
