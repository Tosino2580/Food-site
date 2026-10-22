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
  Download,
  Share2,
  AlertCircle
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

  // Step 1: Contact & Delivery, Step 2: Payment, Step 3: Confirmation
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

  // Handle address preset selection
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

  // Submit Order & Process Payment
  const handleProceedPayment = () => {
    setIsProcessing(true);

    // Simulate gateway handoff & processing
    setTimeout(() => {
      const orderRef = `OPY-${Math.floor(10000 + Math.random() * 90000)}`;
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

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback gracefully
      }
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
        onClick={() => {
          if (currentStep !== 3) onClose();
        }}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-fade-in my-8">
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              0{currentStep}
            </div>
            <div>
              <h2 className="text-base font-bold">
                {currentStep === 1 && 'Lagos Delivery & Contact Details'}
                {currentStep === 2 && 'Complete Payment via Secure Gateway'}
                {currentStep === 3 && 'Order Confirmed & Dispatched!'}
              </h2>
              <p className="text-xs text-slate-400">
                {currentStep === 1 && 'Step 1 of 3: Provide your address & preferred dispatch slot'}
                {currentStep === 2 && 'Step 2 of 3: Paystack, Flutterwave, or Direct Bank Transfer'}
                {currentStep === 3 && 'Step 3 of 3: Tracking code generated for your driver'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Pills */}
        <div className="bg-slate-100 px-6 py-2.5 flex items-center justify-between border-b border-slate-200 text-xs">
          <div className={`flex items-center gap-2 font-bold ${currentStep >= 1 ? 'text-emerald-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-300'}`}>1</span>
            <span>Delivery</span>
          </div>
          <div className="h-0.5 w-12 bg-slate-200" />
          <div className={`flex items-center gap-2 font-bold ${currentStep >= 2 ? 'text-emerald-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-300'}`}>2</span>
            <span>Payment</span>
          </div>
          <div className="h-0.5 w-12 bg-slate-200" />
          <div className={`flex items-center gap-2 font-bold ${currentStep === 3 ? 'text-emerald-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-300'}`}>3</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: DELIVERY & CONTACT */}
          {currentStep === 1 && (
            <div className="space-y-5">
              
              {/* If user has saved addresses, display fast selection */}
              {currentUser?.savedAddresses?.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Select From Your Saved Lagos Addresses:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentUser.savedAddresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => handleSelectSavedAddress(addr)}
                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedSavedAddrId === addr.id
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-extrabold text-slate-900">{addr.title}</span>
                          {selectedSavedAddrId === addr.id && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 leading-tight">{addr.street}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Near: {addr.landmark}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Full Name *
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Alhaji Opeyemi Adeleke"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number for Driver *
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+234 803 000 0000"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Delivery Address Details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Lagos Street Address & House/Shop Number *
                  </label>
                  <input
                    type="text"
                    value={deliveryStreet}
                    onChange={(e) => {
                      setDeliveryStreet(e.target.value);
                      setSelectedSavedAddrId('custom');
                    }}
                    placeholder="e.g. 42 Toyin Street, opposite First Bank, Ikeja"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Prominent Landmark / Bus Stop
                    </label>
                    <input
                      type="text"
                      value={deliveryLandmark}
                      onChange={(e) => setDeliveryLandmark(e.target.value)}
                      placeholder="e.g. Near Allen Avenue Roundabout"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Designated Zone
                    </label>
                    <div className="px-3 py-2 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between">
                      <span>{selectedZone.name}</span>
                      <span className="text-emerald-700 font-semibold">{formatNaira(cartTotals.deliveryFee)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Schedule Options */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Delivery Time Window:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setDeliverySchedule('express-today')}
                    className={`p-3 rounded-xl border-2 cursor-pointer flex items-center gap-3 ${
                      deliverySchedule === 'express-today'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="text-xs">Express Today (2 - 4 Hours)</h4>
                      <p className="text-[10px] text-slate-500 font-normal">Dispatched immediately from nearest hub</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setDeliverySchedule('tomorrow-morning')}
                    className={`p-3 rounded-xl border-2 cursor-pointer flex items-center gap-3 ${
                      deliverySchedule === 'tomorrow-morning'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="text-xs">Tomorrow Morning (9am - 12pm)</h4>
                      <p className="text-[10px] text-slate-500 font-normal">Scheduled wholesale bulk offload</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driver note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Driver Offloading Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={driverNotes}
                  onChange={(e) => setDriverNotes(e.target.value)}
                  placeholder="e.g. Call my storekeeper on arrival, drive to warehouse ramp"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-emerald-600 outline-none"
                />
              </div>

              {/* Step 1 Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Back to Cart
                </button>

                <button
                  type="button"
                  disabled={!contactName || !contactPhone || !deliveryStreet}
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md shadow-emerald-600/20"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: PAYMENT INTEGRATION */}
          {currentStep === 2 && (
            <div className="space-y-5">
              
              {/* Order Amount Preview */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-emerald-900 font-medium">Order Total (Including Delivery):</span>
                  <div className="text-lg font-black text-emerald-800">{formatNaira(cartTotals.finalTotal)}</div>
                </div>
                <div className="text-right text-[11px] text-slate-600">
                  <span>{cartTotals.totalItemsCount} items</span>
                  {cartTotals.totalWholesaleSavings > 0 && (
                    <div className="text-amber-700 font-bold">
                      Saved {formatNaira(cartTotals.totalWholesaleSavings)}!
                    </div>
                  )}
                </div>
              </div>

              {/* Gateway Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Nigerian Payment Gateway / Method:
                </label>
                <div className="space-y-2.5">
                  {PAYMENT_METHODS.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                            selectedPaymentMethod === method.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                          }`}>
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-extrabold text-slate-900">{method.name}</h4>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                                {method.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500">{method.description}</p>
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

                      {/* Extra details for direct bank transfer */}
                      {method.id === 'bank-transfer' && selectedPaymentMethod === 'bank-transfer' && (
                        <div className="mt-3 pt-3 border-t border-emerald-200/60 bg-white p-3 rounded-xl space-y-2 text-xs">
                          <p className="font-bold text-slate-800">Transfer directly to distributor account:</p>
                          <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-200">
                            <div>
                              <p className="text-[11px] text-slate-500">Bank: <strong className="text-slate-800">Providus Bank Nigeria</strong></p>
                              <p className="text-[11px] text-slate-500">Account Name: <strong className="text-slate-800">OPEYEMI FOODS WHOLESALE LTD</strong></p>
                              <p className="text-sm font-black text-emerald-800">Account No: 5401928491</p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyAccount('5401928491');
                              }}
                              className="px-2.5 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold hover:bg-emerald-200 flex items-center gap-1"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span>{copiedBank ? 'Copied!' : 'Copy No'}</span>
                            </button>
                          </div>

                          <label className="flex items-center gap-2 cursor-pointer pt-1">
                            <input
                              type="checkbox"
                              checked={transferConfirmed}
                              onChange={(e) => setTransferConfirmed(e.target.checked)}
                              className="rounded text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-[11px] text-slate-600">I have initiated the bank transfer or will transfer within 1 hour</span>
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Trust Notice */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2.5 text-xs text-slate-600">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Payments are simulated in test sandbox. Real integration connects to Paystack / Flutterwave verified merchant accounts.
                </span>
              </div>

              {/* Step 2 Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleProceedPayment}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Confirming with Gateway...</span>
                    </div>
                  ) : (
                    <>
                      <span>Pay {formatNaira(cartTotals.finalTotal)} & Complete Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: ORDER CONFIRMATION & RECEIPT */}
          {currentStep === 3 && confirmedOrder && (
            <div className="space-y-6 text-center py-2">
              
              {/* Success Badge */}
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Order Successfully Placed & Dispatched
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  Thank You, {confirmedOrder.customerName}!
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Your order is booked with Opeyemi Foods central warehouse. Our dispatch driver has been assigned.
                </p>
              </div>

              {/* Order Reference Slip */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Order Reference</span>
                    <p className="text-base font-extrabold text-emerald-800 tracking-wide">{confirmedOrder.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Status</span>
                    <p className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-block">
                      ● {confirmedOrder.orderStatus}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400">Lagos Delivery Zone:</span>
                    <p className="font-semibold text-slate-800">{confirmedOrder.zoneName}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Payment Status:</span>
                    <p className="font-semibold text-emerald-700">{confirmedOrder.paymentStatus} ({confirmedOrder.paymentMethod})</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400">Delivery Address:</span>
                    <p className="font-semibold text-slate-800">{confirmedOrder.deliveryAddress}</p>
                  </div>
                </div>

                {/* Items Summary in Receipt */}
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-600 block mb-1">Purchased Provisions ({confirmedOrder.items.length}):</span>
                  <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                    {confirmedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-slate-700 py-0.5">
                        <span className="truncate max-w-[280px]">
                          {item.qty}x {item.name}
                        </span>
                        <span className="font-semibold text-slate-900">
                          {formatNaira(item.price * item.qty)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-bold text-xs">
                  <span className="text-slate-800">Total Paid:</span>
                  <span className="text-sm font-black text-emerald-800">{formatNaira(confirmedOrder.total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewAccountOrders();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  View in Customer Orders
                </button>

                <button
                  type="button"
                  onClick={() => {
                    window.print();
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print Invoice</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
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
