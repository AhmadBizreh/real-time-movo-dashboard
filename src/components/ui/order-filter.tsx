import React, { useState } from 'react';
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';

interface OrderFilterProps {
  isOpen: boolean;
  onToggle: () => void;
  orders: any[];
  onFilterByOrderId: (orderId: string) => void;
  onClearFilter: () => void;
}

export const OrderFilter: React.FC<OrderFilterProps> = ({
  isOpen,
  onToggle,
  orders,
  onFilterByOrderId,
  onClearFilter
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.trackId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`p-2 rounded-lg transition-colors flex items-center gap-1 ${
          isOpen ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
        }`}
      >
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by Order ID or Track ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-2 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => {
                  onClearFilter();
                  onToggle();
                }}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="max-h-48 overflow-y-auto">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => {
                    onFilterByOrderId(order.id);
                    onToggle();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-50 last:border-b-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.orderNumber}</p>
                    <p className="text-xs text-gray-500">{order.trackId}</p>
                  </div>
                  <span className="text-xs text-gray-400">{order.customerName}</span>
                </button>
              ))
            ) : (
              <div className="p-3 text-center text-gray-500 text-sm">
                No orders found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
