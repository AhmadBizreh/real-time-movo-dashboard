import React from "react";
import {
  User,
  Phone,
  Battery,
  BatteryLow,
  ChevronDown,
  ChevronUp,
  Car,
  Bike,
} from "lucide-react";
import { useDriverCard } from "@/hooks/useDriverCard";
import { LABELS } from "@/data/labels";
import { DriverCardProps } from "./interface";

import order from "/driver/order.svg";
import clock from "/driver/clock.svg";
import emojiSad from "/driver/emojiSad.svg";
import emojiNormal from "/driver/emojiNormal.svg";


export const DriverCard: React.FC<DriverCardProps> = ({ driver }) => {
  const {
    expandedStats,
    getBatteryIcon,
    getSatisfactionIcon,
    getVehicleIcon,
    getStatusColor,
    toggleStat,
  } = useDriverCard(driver);

  const renderBatteryIcon = (level: number) => {
    const { icon, color } = getBatteryIcon(level);
    const IconComponent = icon === "Battery" ? Battery : BatteryLow;
    return <IconComponent className={`w-5 h-5 ${color}`} />;
  };

  const renderSatisfactionIcon = (rating: number) => {
    const { icon, color } = getSatisfactionIcon(rating);
    const IconComponent = icon === "Star" ? emojiNormal : emojiSad;
    return <img src={IconComponent} className="w-5 text-2xl" />;
  };

  const renderVehicleIcon = (type: string) => {
    const { icon, color } = getVehicleIcon(type);
    const IconComponent = icon === "Car" ? Bike : Car;
    return <IconComponent className={`w-5 h-5 ${color}`} />;
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 hover:border-gray-300 p-4 mb-3 hover:shadow-md transition-all">
      {/* Header */}
      <div className="bg-[#0D924B] rounded-lg px-3 py-1 mb-4 border border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-200 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-green-700" />
            </div>
            <div>
              <p className="font-semibold text-white flex items-center gap-2">
                {driver.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {renderVehicleIcon(driver.vehicleType)}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                driver.status
              )}`}
            >
              {driver.status}
            </span>
          </div>
        </div>
      </div>

      {/* Driver Info */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-green-600" />
          <span className="font-medium">{driver.phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <img src={clock} className="w-5 text-2xl" />
          <span className="font-medium">{driver.workingHours}</span>
        </div>
        <div className="flex items-center gap-3">
          {renderBatteryIcon(driver.batteryLevel)}
          <span className="font-medium">{driver.batteryLevel}%</span>
        </div>
        <div className="flex items-center gap-3">
          {renderSatisfactionIcon(driver.rating)}
          <span className="font-medium">
            {`${(driver.rating * 20).toFixed(0)}%`}
          </span>
        </div>
        <div className="col-span-2 flex items-center gap-3">
          <img src={order} className="w-5 text-2xl" />
          <span className="font-medium">
            {driver.currentOrders} {LABELS.CURRENT_ORDERS.toLowerCase()}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Performance Stats */}
      <div>
        <div className="space-x-1 sm:space-x-5 flex flex-row">
          {/* Delivered */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStat("delivered")}
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  {expandedStats.delivered ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>
                <span className="text-sm font-medium text-[#71839B]">
                  {LABELS.DELIVERED}
                </span>
              </div>
            </div>
            {expandedStats.delivered && (
              <div className="ml-6 mt-1">
                <span className="text-lg font-bold text-green-600">
                  {driver.delivered}
                </span>
              </div>
            )}
          </div>

          {/* Canceled */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStat("canceled")}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  {expandedStats.canceled ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <span className="text-sm font-medium text-[#71839B]">
                  {LABELS.CANCELED}
                </span>
              </div>
            </div>
            {expandedStats.canceled && (
              <div className="ml-6 mt-1">
                <span className="text-lg font-bold text-red-600">
                  {driver.canceled}
                </span>
              </div>
            )}
          </div>

          {/* Rejected */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStat("rejected")}
                  className="text-orange-600 hover:text-orange-700 transition-colors"
                >
                  {expandedStats.rejected ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <span className="text-sm font-medium text-[#71839B]">
                  {LABELS.REJECTED}
                </span>
              </div>
            </div>
            {expandedStats.rejected && (
              <div className="ml-6 mt-1">
                <span className="text-lg font-bold text-orange-600">
                  {driver.rejected}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
