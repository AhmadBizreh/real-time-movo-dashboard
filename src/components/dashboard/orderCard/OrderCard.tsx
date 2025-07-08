import React from 'react';
import { Eye, MapPin, Trash2, FileText, MapPinHouse, UserCheck, Clock, CreditCard, Wallet } from 'lucide-react';
import { StatusDropdown } from '@/components/ui/status-dropdown';
import { ActionModal } from '@/components/ui/action-modal';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Switch } from '@/components/ui/switch';
import { useOrderCard } from '@/hooks/useOrderCard';
import { LABELS } from '@/data/labels';
import { OrderCardProps } from './interface';

import fatora from "/payment/fatora.svg"; 
import ecash from "/payment/ecash.svg"; 
import mtn from "/payment/mtn.svg"; 

export const OrderCard: React.FC<OrderCardProps> = ({ 
  order, 
  onStatusChange, 
  onDelete 
}) => {
  const {
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
    getTimerColor,
    getPriorityBadge,
    getTimerTitle,
    handleAssignDriver,
    handleSaveOrderNote,
    handleSaveAddressNote,
    handleDispatchToggle,
    handleModalClose
  } = useOrderCard(order);

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'Cash': return <Wallet className="w-5 h-5 text-green-600" />;
      case 'Card': return <img src={ecash} className="w-20 text-purple-600" />;
      case 'Digital': return <img src={fatora} className="w-20 text-purple-600" />;
      case 'Bank Transfer': return <img src={mtn} className="w-20 h-7 text-purple-600" />;
      default: return <CreditCard className="w-5 h-5 text-blue-600" />;
    }
  };

  const handleDelete = () => {
    onDelete(order.id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg border-2 border-gray-200 hover:border-gray-300 p-4 mb-3 hover:shadow-md transition-all">
        {/* Header with Timer */}
        <div className={`flex justify-between items-center mb-3  px-3 rounded-lg border ${getTimerColor(order.timer)}`}>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{getTimerTitle()}</span>
          </div>
          <div className="font-mono text-lg font-bold">{order.timer}</div>
        </div>

        {/* Order Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3 text-sm">
          <div>
            <span className="text-gray-500 block">{LABELS.ORDER_ID}:</span>
            <p className="font-semibold text-gray-900">{order.orderNumber}</p>
          </div>
          <div>
            <span className="text-gray-500 block">{LABELS.TRACK_ID}:</span>
            <p className="font-semibold text-gray-900">{order.trackId}</p>
          </div>
          <div>
            <span className="text-gray-500 block">{LABELS.CUSTOMER}:</span>
            <p className="font-semibold text-gray-900">{order.customerName}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {order.tags.map((tag, index) => (
            <span 
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getPriorityBadge(tag.toLowerCase())}`}
            >
              {tag === 'VIP' && <UserCheck className="w-3 h-3" />}
              {tag}
            </span>
          ))}
          {order.isUrgent && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-300 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {LABELS.URGENT}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-3"></div>

        {/* Restaurant & Order Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm mb-4">
          <div>
            <span className="text-gray-500 block">{LABELS.RESTAURANT}:</span>
            <p className="font-semibold text-gray-900">{order.restaurant}</p>
          </div>
          <div>
            <span className="text-gray-500 block">{LABELS.AREA}:</span>
            <p className="font-semibold text-gray-900">{order.area}</p>
          </div>
          <div>
            <span className="text-gray-500 block">{LABELS.TRANS_TYPE}:</span>
            <p className="font-semibold text-gray-900">{order.transType}</p>
          </div>
          <div>
            <span className="text-gray-500 block">{LABELS.PAYMENT}:</span>
            <div className="flex items-center gap-2 pt-2">
              {getPaymentIcon(order.paymentMethod)}
            </div>
          </div>
          <div>
            <span className="text-gray-500 block">{LABELS.TOTAL}:</span>
            <p className="font-bold text-green-600 text-lg pt-2">${order.total}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-3"></div>

        {/* Delivery Info */}
        <div className="p-3 bg-gray-50 rounded-lg mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-3">
            <div>
              <span className="text-gray-500 block">{LABELS.DELIVERY_TIME}:</span>
              <p className="font-semibold text-gray-900">{order.deliveryTime}</p>
            </div>
            <div>
              <span className="text-gray-500 block">{LABELS.EST_TIME}:</span>
              <p className="font-semibold text-gray-900">{order.estimatedTime}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">{LABELS.DISPATCH}:</span>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">No</span>
              <Switch
                checked={order.dispatch}
                onCheckedChange={handleDispatchToggle}
                className={order.dispatch ? 'bg-green-500' : ''}
              />
              <span className="text-sm text-gray-600">Yes</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <button 
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100 flex items-center gap-1 border border-blue-200"
            >
              {LABELS.STATUS}
            </button>
            <StatusDropdown
              currentStatus={order.status}
              onStatusChange={(status) => {
                onStatusChange(order.id, status);
                setShowStatusDropdown(false);
              }}
              onClose={() => setShowStatusDropdown(false)}
              isOpen={showStatusDropdown}
            />
          </div>
          
          <button 
            onClick={() => setShowModal('view')}
            className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-100 flex items-center gap-1 border border-gray-200"
          >
            <Eye className="w-3 h-3" />
            {LABELS.VIEW}
          </button>
          
          <button 
            onClick={() => setShowModal('track')}
            className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-100 flex items-center gap-1 border border-gray-200"
          >
            <MapPin className="w-3 h-3" />
            {LABELS.TRACK}
          </button>
          
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="px-3 py-1.5 bg-red-50 text-red-700 rounded-md text-sm font-medium hover:bg-red-100 flex items-center gap-1 border border-red-200"
          >
            <Trash2 className="w-3 h-3" />
            {LABELS.DELETE}
          </button>
          
          <button 
            onClick={() => setShowModal('order-note')}
            className="px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-md text-sm font-medium hover:bg-yellow-100 flex items-center gap-1 border border-yellow-200"
          >
            <FileText className="w-3 h-3" />
            {LABELS.ORDER_NOTE}
          </button>
          
          <button 
            onClick={() => setShowModal('address-note')}
            className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-100 flex items-center gap-1 border border-purple-200"
          >
            <MapPinHouse className="w-3 h-3" />
            {LABELS.ADDRESS_NOTE}
          </button>
          
          <button 
            onClick={() => setShowModal('assign')}
            className="px-3 py-1.5 bg-green-50 text-green-700 rounded-md text-sm font-medium hover:bg-green-100 flex items-center gap-1 border border-green-200"
          >
            <UserCheck className="w-3 h-3" />
            {LABELS.ASSIGN}
          </button>
        </div>
      </div>

      {/* Modals */}
      <ActionModal
        isOpen={showModal === 'view'}
        onClose={() => setShowModal(null)}
        title={LABELS.ORDER_DETAILS}
      >
        <div className="space-y-3">
          <p><strong>{LABELS.ORDER_ID}:</strong> {order.orderNumber}</p>
          <p><strong>{LABELS.TRACK_ID}:</strong> {order.trackId}</p>
          <p><strong>{LABELS.CUSTOMER}:</strong> {order.customerName}</p>
          <p><strong>{LABELS.RESTAURANT}:</strong> {order.restaurant}</p>
          <p><strong>{LABELS.AREA}:</strong> {order.area}</p>
          <p><strong>{LABELS.TOTAL}:</strong> ${order.total}</p>
          <p><strong>{LABELS.STATUS}:</strong> {order.status}</p>
          <p><strong>{LABELS.PAYMENT}:</strong> {order.paymentMethod}</p>
        </div>
      </ActionModal>

      <ActionModal
        isOpen={showModal === 'track'}
        onClose={() => setShowModal(null)}
        title={LABELS.TRACK_ORDER}
      >
        <div className="space-y-3">
          <p><strong>{LABELS.TRACK_ID}:</strong> {order.trackId}</p>
          <p><strong>{LABELS.ORDER_ID}:</strong> {order.orderNumber}</p>
          <p><strong>Current Location:</strong> {order.area}</p>
          <p><strong>{LABELS.STATUS}:</strong> {order.status}</p>
          <p><strong>Driver:</strong> {order.driverId ? 'Assigned' : 'Not assigned'}</p>
          <div className="bg-gray-100 p-3 rounded">
            <p className="text-sm text-gray-600">Real-time tracking available</p>
          </div>
        </div>
      </ActionModal>

      <ActionModal
        isOpen={showModal === 'order-note'}
        onClose={() => handleModalClose('order-note')}
        title={LABELS.ORDER_NOTES}
      >
        <div className="space-y-3">
          <textarea
            className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Add order notes..."
            value={orderNote}
            onChange={(e) => setOrderNote(e.target.value)}
          />
          <div className="flex gap-2">
            <button 
              onClick={handleSaveOrderNote}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              {LABELS.SAVE_NOTE}
            </button>
            <button 
              onClick={() => handleModalClose('order-note')}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
            >
              {LABELS.CANCEL}
            </button>
          </div>
        </div>
      </ActionModal>

      <ActionModal
        isOpen={showModal === 'address-note'}
        onClose={() => handleModalClose('address-note')}
        title={LABELS.ADDRESS_NOTES}
      >
        <div className="space-y-3">
          <textarea
            className="w-full p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-purple-500"
            rows={4}
            placeholder="Add address notes..."
            value={addressNote}
            onChange={(e) => setAddressNote(e.target.value)}
          />
          <div className="flex gap-2">
            <button 
              onClick={handleSaveAddressNote}
              className="flex-1 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
            >
              {LABELS.SAVE_NOTE}
            </button>
            <button 
              onClick={() => handleModalClose('address-note')}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
            >
              {LABELS.CANCEL}
            </button>
          </div>
        </div>
      </ActionModal>

      <ActionModal
        isOpen={showModal === 'assign'}
        onClose={() => setShowModal(null)}
        title={LABELS.ASSIGN_DRIVER}
      >
        <div className="space-y-3">
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {availableDrivers.map(driver => (
              <div 
                key={driver.id}
                onClick={() => handleAssignDriver(driver.id)}
                className="p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 hover:border-gray-300"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{driver.name}</p>
                    <p className="text-sm text-gray-600">
                      {driver.location} • {driver.rating.toFixed(1)} rating • {driver.vehicleType}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Available
                  </span>
                </div>
              </div>
            ))}
            {availableDrivers.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No available drivers
              </div>
            )}
          </div>
        </div>
      </ActionModal>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title={LABELS.DELETE_ORDER}
        message={`Are you sure you want to delete order ${order.orderNumber}? This action cannot be undone.`}
      />
    </>
  );
};
