import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  Clock, 
  Calendar, 
  MapPin, 
  Users, 
  MessageSquare, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { DemoConfigStore, BusinessDemoStore } from '../../services/demoConfigStore';
import { useBrandCustomizer } from '../../context/BrandCustomizerContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

interface FoodOrderingModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessId: string;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const FoodOrderingModal: React.FC<FoodOrderingModalProps> = ({
  isOpen,
  onClose,
  businessId,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const { getBrandName } = useBrandCustomizer();
  const [store, setStore] = useState<BusinessDemoStore>(DemoConfigStore.getStore(businessId));
  const currentBrandName = getBrandName(store.business.name);
  const [step, setStep] = useState<'cart' | 'details' | 'summary' | 'sent'>('cart');
  
  // Available order types based on admin config (delivery requires both toggles)
  const deliveryAllowed = store.ordering.delivery && store.delivery.enabled;
  const availableTypes: ('Takeaway' | 'Dining' | 'Delivery')[] = [];
  if (store.ordering.takeaway) availableTypes.push('Takeaway');
  if (store.ordering.dining) availableTypes.push('Dining');
  if (deliveryAllowed) availableTypes.push('Delivery');

  const [orderType, setOrderType] = useState<'Takeaway' | 'Dining' | 'Delivery'>(
    availableTypes[0] || 'Takeaway'
  );

  // If admin disables the currently selected method, fall back to an enabled one
  useEffect(() => {
    if (availableTypes.length > 0 && !availableTypes.includes(orderType)) {
      setOrderType(availableTypes[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.ordering.takeaway, store.ordering.dining, deliveryAllowed]);

  // Date and Time in IST
  const todayStr = DemoConfigStore.getIstDateString();
  const maxDateStr = DemoConfigStore.getIstDateString(store.timeSlots.maxBookingDays ?? 7);
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [dateClosedReason, setDateClosedReason] = useState<string | undefined>();

  // Customer form
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Generated WhatsApp details
  const [whatsAppUrl, setWhatsAppUrl] = useState('');
  const [whatsAppMessage, setWhatsAppMessage] = useState('');
  const [formError, setFormError] = useState('');

  // Load and refresh store config
  useEffect(() => {
    const handleUpdate = () => {
      const current = DemoConfigStore.getStore(businessId);
      setStore(current);
    };
    window.addEventListener('demo_config_changed', handleUpdate);
    return () => window.removeEventListener('demo_config_changed', handleUpdate);
  }, [businessId]);

  // Recalculate slots whenever date or config changes
  useEffect(() => {
    if (selectedDate) {
      const result = DemoConfigStore.generateTimeSlots(businessId, selectedDate);
      setAvailableSlots(result.slots);
      setDateClosedReason(result.reason);
      setSelectedTimeSlot(prev => (result.slots.includes(prev) ? prev : (result.slots[0] || '')));
    }
  }, [businessId, selectedDate, store]);

  if (!isOpen) return null;

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let deliveryFee = 0;
  if (orderType === 'Delivery' && store.delivery.enabled && store.delivery.deliveryCharge > 0) {
    deliveryFee = store.delivery.deliveryCharge;
  }
  const grandTotal = subtotal + deliveryFee;

  const handleProceedToDetails = () => {
    if (cart.length === 0) return;
    setStep('details');
  };

  const handleProceedToSummary = () => {
    setFormError('');
    if (availableTypes.length === 0) {
      setFormError('Online ordering is currently unavailable.');
      return;
    }
    if (!customerName.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (customerPhone.replace(/\D/g, '').length < 10) {
      setFormError('Please enter a valid phone number (at least 10 digits).');
      return;
    }
    if (!selectedTimeSlot) {
      setFormError('Please select an available IST time slot.');
      return;
    }
    if (orderType === 'Delivery') {
      if (!deliveryAddress.trim()) {
        setFormError('Please provide your delivery address.');
        return;
      }
      if (store.delivery.minimumOrder > 0 && subtotal < store.delivery.minimumOrder) {
        setFormError(`Minimum order for delivery is ₹${store.delivery.minimumOrder}.`);
        return;
      }
    }
    if (orderType === 'Dining' && guestCount < 1) {
      setFormError('Please select the number of guests.');
      return;
    }

    const { url, message } = DemoConfigStore.generateWhatsAppOrderUrl({
      businessId,
      customerName,
      customerPhone,
      orderType,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      items: cart,
      deliveryAddress,
      landmark,
      guestCount,
      specialInstructions
    });

    setWhatsAppUrl(url);
    setWhatsAppMessage(message);
    setStep('summary');
  };

  const handleOpenWhatsApp = () => {
    window.open(whatsAppUrl, '_blank');
    setStep('sent');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                {currentBrandName} — Order Online
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {step === 'cart' && 'Step 1 of 3: Review Cart Items'}
                {step === 'details' && 'Step 2 of 3: Order Type & IST Time Slot'}
                {step === 'summary' && 'Step 3 of 3: Verify & Send on WhatsApp'}
                {step === 'sent' && 'Order Details Ready in WhatsApp'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: CART */}
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                    🛒
                  </div>
                  <h4 className="font-bold text-slate-700 dark:text-slate-300">Your Cart is Empty</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Browse our digital menu and click "Add" to start building your order.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{totalQuantity} Items Selected</span>
                    <button 
                      onClick={onClearCart}
                      className="text-red-500 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear Cart
                    </button>
                  </div>

                  <div className="space-y-2.5 divide-y divide-slate-100 dark:divide-slate-800/80">
                    {cart.map((item) => (
                      <div key={item.id} className="pt-2.5 first:pt-0 flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                            {item.name}
                          </h5>
                          <span className="text-xs text-sky-600 dark:text-sky-400 font-semibold">
                            ₹{item.price} each
                          </span>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold w-6 text-center text-slate-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right w-16">
                          <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Subtotal Banner */}
                  <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-sky-700 dark:text-sky-300 font-semibold block">Order Subtotal</span>
                      <span className="text-xs text-slate-500">Taxes included</span>
                    </div>
                    <span className="text-xl font-black text-sky-600 dark:text-sky-400">
                      ₹{subtotal}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: DETAILS (Order Type, Date, IST Slot, Customer Form) */}
          {step === 'details' && (
            <div className="space-y-5">
              {formError && (
                <div role="alert" className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}
              {availableTypes.length === 0 && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-700 dark:text-amber-300">
                  Online ordering is currently paused by the restaurant.
                </div>
              )}
              
              {/* Order Type Radio Cards */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Order Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {store.ordering.takeaway && (
                    <button
                      type="button"
                      onClick={() => setOrderType('Takeaway')}
                      className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                        orderType === 'Takeaway'
                          ? 'border-sky-600 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span className="text-xs font-bold">Takeaway</span>
                    </button>
                  )}

                  {store.ordering.dining && (
                    <button
                      type="button"
                      onClick={() => setOrderType('Dining')}
                      className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                        orderType === 'Dining'
                          ? 'border-sky-600 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span className="text-xs font-bold">Dining</span>
                    </button>
                  )}

                  {deliveryAllowed && (
                    <button
                      type="button"
                      onClick={() => setOrderType('Delivery')}
                      className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                        orderType === 'Delivery'
                          ? 'border-sky-600 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-bold">Delivery</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Date & IST Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Order Date
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    max={maxDateStr}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Time zone: Asia/Kolkata (IST)</span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> IST Time Slot
                  </label>
                  {availableSlots.length > 0 ? (
                    <select
                      value={selectedTimeSlot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold"
                    >
                      {availableSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-700 dark:text-amber-300">
                      {dateClosedReason || 'No slots available for this date.'}
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Info Form */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Arun Kumar"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                    />
                  </div>
                </div>

                {/* Conditional Fields based on Order Type */}
                {orderType === 'Delivery' && (
                  <div className="space-y-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Delivery Address *</label>
                      <input
                        type="text"
                        placeholder="House / Flat no, Street name, Area"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nearby Landmark (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Opposite ABC School"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      📍 {store.delivery.deliveryArea}
                    </p>
                  </div>
                )}

                {orderType === 'Dining' && (
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Number of People (Guests)</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 4, 6, 8, 10].map(count => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setGuestCount(count)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                            guestCount === count
                              ? 'border-sky-600 bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Special Cooking / Packaging Note (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Less spicy, extra green chutney"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER SUMMARY */}
          {step === 'summary' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                    Order Summary
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300">
                    {orderType}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">Customer:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{customerName} ({customerPhone})</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Date & Slot (IST):</span>
                    <span className="font-bold text-slate-900 dark:text-white">{selectedDate} @ {selectedTimeSlot}</span>
                  </div>
                  {orderType === 'Delivery' && (
                    <div className="col-span-2">
                      <span className="text-slate-500 block">Delivery Address:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{deliveryAddress} {landmark && `(Near ${landmark})`}</span>
                    </div>
                  )}
                  {orderType === 'Dining' && (
                    <div className="col-span-2">
                      <span className="text-slate-500 block">Seating:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{guestCount} Guests</span>
                    </div>
                  )}
                </div>

                {/* Items breakdown */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-slate-700 dark:text-slate-300">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {orderType === 'Delivery' && (
                    <div className="flex justify-between text-slate-500">
                      <span>Delivery Fee</span>
                      <span>
                        {store.delivery.deliveryCharge > 0 ? `₹${store.delivery.deliveryCharge}` : 'To be confirmed by restaurant'}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-black text-sm text-slate-900 dark:text-white pt-1">
                    <span>Grand Total</span>
                    <span className="text-sky-600 dark:text-sky-400">₹{grandTotal}</span>
                  </div>
                </div>
              </div>

              {/* Ready to Send Notice */}
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  <strong>Ready to Send:</strong> Clicking the button below opens WhatsApp with your complete itemized order prepared for <strong>{currentBrandName}</strong> ({store.business.whatsappNumber}).
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SENT / READY IN WHATSAPP */}
          {step === 'sent' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-2xl animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">
                WhatsApp Order Prepared
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                Your order details have been populated into WhatsApp. Please send the pre-filled message to the restaurant staff to confirm availability.
              </p>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-400 text-left font-mono whitespace-pre-line max-h-36 overflow-y-auto border border-slate-200 dark:border-slate-700">
                {whatsAppMessage}
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => window.open(whatsAppUrl, '_blank')}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <MessageSquare className="w-4 h-4" /> Re-open WhatsApp
                </button>
                <button
                  onClick={() => {
                    onClearCart();
                    onClose();
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Controls */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          {step === 'cart' && (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Continue Browsing
              </button>
              <button
                onClick={handleProceedToDetails}
                disabled={cart.length === 0}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-sky-600/20 transition cursor-pointer"
              >
                <span>Select Slot & Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {step === 'details' && (
            <>
              <button
                onClick={() => setStep('cart')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
              </button>
              <button
                onClick={handleProceedToSummary}
                disabled={availableSlots.length === 0}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-sky-600/20 transition cursor-pointer"
              >
                <span>Review Order Summary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {step === 'summary' && (
            <>
              <button
                onClick={() => setStep('details')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Edit Order
              </button>
              <button
                onClick={handleOpenWhatsApp}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Place Order on WhatsApp</span>
              </button>
            </>
          )}

          {step === 'sent' && (
            <div className="w-full flex justify-end">
              <button
                onClick={() => {
                  onClearCart();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
