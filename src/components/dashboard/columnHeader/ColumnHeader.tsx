import React from "react";
import { OrderFilter } from "@/components/ui/order-filter";
import { useColumnHeader } from "@/hooks/useColumnHeader";
import { ColumnHeaderProps } from "./interface";
import motorcycle from "/driver/motorcycle.svg";
import { Filter } from "lucide-react";

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  title,
  count,
  color,
  isDriverColumn,
  driverFilters,
  onDriverFilterClick,
  freeCount = 0,
  busyCount = 0,
  orders = [],
  onFilterByOrderId,
  onClearFilter,
  columnId,
}) => {
  const { showOrderFilter, toggleOrderFilter, handleDriverFilter } =
    useColumnHeader();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {columnId === "driver" ? (
            <img src={motorcycle} alt="Motorcycle" className="w-4 h-4" />
          ) : (
            <div
              className={`w-4 h-4 rounded-full border-2`}
              style={{ borderColor: color }}
            />
          )}

          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <span className="text-sm text-gray-500">{count} items</span>
          </div>
        </div>

        {isDriverColumn ? (
          <div className="flex gap-2">
            <button
              onClick={() =>
                handleDriverFilter("free", driverFilters, onDriverFilterClick)
              }
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                driverFilters?.free
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Free ({freeCount})
            </button>
            <button
              onClick={() =>
                handleDriverFilter("busy", driverFilters, onDriverFilterClick)
              }
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                driverFilters?.busy
                  ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Busy ({busyCount})
            </button>
          </div>
        ) : (
          <div className="flex ">
            <Filter className="w-4 h-8 text-gray-600" />
            <OrderFilter
              isOpen={showOrderFilter}
              onToggle={toggleOrderFilter}
              orders={orders}
              onFilterByOrderId={(orderId) => onFilterByOrderId?.(orderId)}
              onClearFilter={() => onClearFilter?.()}
            />
          </div>
        )}
      </div>
    </div>
  );
};
