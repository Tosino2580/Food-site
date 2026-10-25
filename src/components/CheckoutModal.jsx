import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Copy, 
  Building2, 
  Clock, 
  Download
} from 'lucide-react';
import { LAGOS_ZONES, PAYMENT_METHODS } from '../data/mockData';
import { formatNaira } from '../utils/formatters';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  cartTotals,
  selectedZone,
  currentUser,
  onOrderPlaced,
  onViewAccountOrders
}) {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Delivery Form State
  const [selectedSavedAddrId, setSelectedSavedAddrId] = useState(
    currentUser?.savedAddresses?.[0]?.id || 'custom'
  );
  const [contactName, setContactName] = useState(currentUser?.fullName || '');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '');
  const [deliveryStreet, setDeliveryStreet] = useState(
    currentUser?.savedAddresses?.[0]?.street || ''
  );
  const [deliveryLandmark, setDeliveryLandmark] = useState(
    currentUser?.savedAddresses?.[0]?.landmark || ''
  );
  const [deliverySchedule, setDeliverySchedule] = useState('express-today');
  const [driverNotes, setDriverNotes] = useState('');

  // Payment Form State
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('paystack');
  const [transferConfirmed, setTransferConfirmed] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  // Confirmed Order State
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const handleSelectSavedAddress = (addr) => {
    setSelectedSavedAddrId(addr.id);
    setDeliveryStreet(addr.street);
    setDeliveryLandmark(addr.landmark);
    if (addr.phone) setContactPhone(addr.phone);
  };

  const handleCopyAccount = (accNo) => {
    navigator.clipboard?.writeText(accNo);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleProceedPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderRef = `WH-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder = {
        id: orderRef,
        date: new Date().toISOString(),
        customerName: contactName || 'Customer',
        phone: contactPhone || '+234 800 000 0000',
        deliveryAddress: `${deliveryStreet}${deliveryLandmark ? `, near ${deliveryLandmark}` : ''}, Lagos`,
        zoneName: selectedZone.name,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          packSize: item.packSize,
          price: item.price || item.wholesalePrice,
          qty: item.qty,
          isWholesale: item.qty >= (item.wholesaleMinQty || 2),
          image: item.image
        })),
        subtotal: cartTotals.subtotal,
        wholesaleSavings: cartTotals.totalWholesaleSavings,
        deliveryFee: cartTotals.deliveryFee,
        total: cartTotals.finalTotal,
        paymentMethod: PAYMENT_METHODS.find((p) => p.id === selectedPaymentMethod)?.name || 'Online Payment',
        paymentStatus: selectedPaymentMethod === 'pod' ? 'Pending upon delivery' : 'Paid',
        orderStatus: 'Processing',
        deliverySchedule: deliverySchedule === 'express-today' ? 'Today Express (2 - 4 hrs)' : 'Tomorrow Morning Batch',
        driverContact: 'Assigned Lagos Dispatch Driver'
      };

      setConfirmedOrder(newOrder);
      onOrderPlaced(newOrder);
      setIsProcessing(false);
      setCurrentStep(3);

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs"
        onClick={() => {
          if (currentStep !== 3) onClose();
        }}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-fade-in my-2 sm:my-8 max-h-[95vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="bg-slate-950 text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              0{currentStep}
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black">
                {currentStep === 1 && 'Lagos Delivery & Contact'}
                {currentStep === 2 && 'Payment Gateway'}
                {currentStep === 3 && 'Order Confirmed!'}
              </h2>
              <p className="text-[11px] text-slate-400">
                {currentStep === 1 && 'Step 1 of 3: Address & dispatch'}
                {currentStep === 2 && 'Step 2 of 3: Paystack / Transfer'}
                {currentStep === 3 && 'Step 3 of 3: Tracking generated'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-slate-100 px-4 sm:px-6 py-2 flex items-center justify-between border-b border-slate-200 text-xs shrink-0">
          <div className={`flex items-center gap-1.5 font-bold ${currentStep >= 1 ? 'text-emerald-800' : 'text-slate-400'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${currentStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-300'}`}>1</span>
            <span>Delivery</span>
          </div>
          <div className="h-0.5 w-8 sm:w-16 bg-slate-300" />
          <div className={`flex items-center gap-1.5 font-bold ${currentStep >= 2 ? 'text-emerald-800' : 'text-slate-400'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${currentStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-300'}`}>2</span>
            <span>Payment</span>
          </div>
          <div className="h-0.5 w-8 sm:w-16 bg-slate-300" />
          <div className={`flex items-center gap-1.5 font-bold ${currentStep === 3 ? 'text-emerald-800' : 'text-slate-400'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${currentStep === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-300'}`}>3</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* STEP 1: DELIVERY & CONTACT */}
          {currentStep === 1 && (
            <div className="space-y-4">
              
              {/* Saved Addresses list */}
              {currentUser?.savedAddresses?.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Saved Lagos Addresses:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentUser.savedAddresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => handleSelectSavedAddress(addr)}
                        className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedSavedAddrId === addr.id
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-bold text-slate-900">{addr.title}</span>
                          {selectedSavedAddrId === addr.id && (
                            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 truncate">{addr.street}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Alhaji Musa Adeleke"
                    className="w-full px-3 py-2 text-sm sm:text-xs border border-slate-300 rounded-xl focus:border-emerald-600 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone for Driver *
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+234 803 000 0000"
                    className="w-full px-3 py-2 text-sm sm:text-xs border border-slate-300 rounded-xl focus:border-emerald-600 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Lagos Street Address & Shop Number *
                  </label>
                  <input
                    type="text"
                    value={deliveryStreet}
                    onChange={(e) => {
                      setDeliveryStreet(e.target.value);
                      setSelectedSavedAddrId('custom');
                    }}
                    placeholder="e.g. 42 Toyin Street, Ikeja"
                    className="w-full px-3 py-2 text-sm sm:text-xs border border-slate-300 rounded-xl focus:border-emerald-600 outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Prominent Landmark
                    </label>
                    <input
                      type="text"
                      value={deliveryLandmark}
                      onChange={(e) => setDeliveryLandmark(e.target.value)}
                      placeholder="e.g. Near Allen Roundabout"
                      className="w-full px-3 py-2 text-sm sm:text-xs border border-slate-300 rounded-xl focus:border-emerald-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Zone Delivery Fee
                    </label>
                    <div className="px-3 py-2 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between">
                      <span className="truncate max-w-[120px]">{selectedZone.name.split('&')[0]}</span>
                      <span className="text-emerald-700 font-bold">{formatNaira(cartTotals.deliveryFee)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dispatch Schedule */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Delivery Time Window:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div
                    onClick={() => setDeliverySchedule('express-today')}
                    className={`p-2.5 rounded-xl border-2 cursor-pointer flex items-center gap-2.5 ${
                      deliverySchedule === 'express-today'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="text-xs">Express Today (2 - 4 Hours)</h4>
                      <p className="text-[10px] text-slate-500 font-normal">Immediate warehouse dispatch</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setDeliverySchedule('tomorrow-morning')}
                    className={`p-2.5 rounded-xl border-2 cursor-pointer flex items-center gap-2.5 ${
                      deliverySchedule === 'tomorrow-morning'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="text-xs">Tomorrow Morning (9am - 12pm)</h4>
                      <p className="text-[10px] text-slate-500 font-normal">Scheduled bulk offload</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 1 Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Back to Cart
                </button>

                <button
                  type="button"
                  disabled={!contactName || !contactPhone || !deliveryStreet}
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: PAYMENT INTEGRATION */}
          {currentStep === 2 && (
            <div className="space-y-4">
              
              {/* Order Amount Preview */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-emerald-900 font-medium">Order Total Amount:</span>
                  <div className="text-base sm:text-lg font-black text-emerald-800">{formatNaira(cartTotals.finalTotal)}</div>
                </div>
                <div className="text-right text-[11px] text-slate-600">
                  <span>{cartTotals.totalItemsCount} items</span>
                  {cartTotals.totalWholesaleSavings > 0 && (
                    <div className="text-amber-700 font-bold">
                      Saved {formatNaira(cartTotals.totalWholesaleSavings)}
                    </div>
                  )}
                </div>
              </div>

              {/* Gateway Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Payment Method:
                </label>
                <div className="space-y-2">
                  {PAYMENT_METHODS.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                            selectedPaymentMethod === method.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                          }`}>
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-xs font-bold text-slate-900">{method.name}</h4>
                              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded">
                                {method.badge}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500">{method.description}</p>
                          </div>
                        </div>

                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedPaymentMethod === method.id ? 'border-emerald-600' : 'border-slate-300'
                        }`}>
                          {selectedPaymentMethod === method.id && (
                            <div className="w-2 h-2 rounded-full bg-emerald-600" />
                          )}
                        </div>
                      </div>

                      {/* Bank transfer info */}
                      {method.id === 'bank-transfer' && selectedPaymentMethod === 'bank-transfer' && (
                        <div className="mt-2.5 pt-2 border-t border-emerald-200/60 bg-white p-2.5 rounded-xl space-y-1.5 text-xs">
                          <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-200">
                            <div>
                              <p className="text-[10px] text-slate-500">Bank: Providus Bank</p>
                              <p className="text-xs font-black text-emerald-800">5401928491</p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyAccount('5401928491');
                              }}
                              className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-[11px] font-bold cursor-pointer"
                            >
                              {copiedBank ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2 Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleProceedPayment}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-black text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/25 cursor-pointer"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <span>Pay {formatNaira(cartTotals.finalTotal)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: ORDER CONFIRMATION */}
          {currentStep === 3 && confirmedOrder && (
            <div className="space-y-4 text-center py-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Order Successfully Dispatched
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1.5">
                  Thank You, {confirmedOrder.customerName}!
                </h3>
              </div>

              {/* Slip */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-left space-y-2.5 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase">Reference Code</span>
                    <p className="text-sm font-black text-emerald-800">{confirmedOrder.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 font-bold uppercase">Status</span>
                    <p className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      ● {confirmedOrder.orderStatus}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] space-y-1">
                  <p><span className="text-slate-500">Address:</span> <strong className="text-slate-800">{confirmedOrder.deliveryAddress}</strong></p>
                  <p><span className="text-slate-500">Total:</span> <strong className="text-emerald-800 font-black">{formatNaira(confirmedOrder.total)}</strong></p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewAccountOrders();
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  View in My Orders
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
