import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  Check, 
  MessageSquare, 
  Calendar, 
  Users, 
  Sparkles,
  ChevronRight,
  Flame,
  Coffee,
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  CheckCircle2
} from 'lucide-react';
import { DemoFloatingCTA } from '../../components/DemoFloatingCTA';
import { DemoConfigStore, BusinessDemoStore, MenuItemConfig } from '../../services/demoConfigStore';
import { FoodOrderingModal, CartItem } from '../../components/ordering/FoodOrderingModal';
import { BrandCustomizerBar } from '../../components/BrandCustomizerBar';
import { useBrandCustomizer } from '../../context/BrandCustomizerContext';

export const RestaurantDemo: React.FC = () => {
  const { getBrandName } = useBrandCustomizer();
  const [store, setStore] = useState<BusinessDemoStore>(DemoConfigStore.getStore('restaurant'));
  const currentBrandName = getBrandName(store.business.name);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderingModalOpen, setIsOrderingModalOpen] = useState(false);

  // Table reservation form state
  const [tableForm, setTableForm] = useState({
    name: '',
    phone: '',
    guests: '2 Guests',
    date: DemoConfigStore.getIstDateString(),
    time: '07:30 PM IST',
  });
  const [tableBooked, setTableBooked] = useState(false);

  // Synchronize live with DemoConfigStore
  useEffect(() => {
    const handleUpdate = () => {
      const current = DemoConfigStore.getStore('restaurant');
      setStore(current);
    };
    window.addEventListener('demo_config_changed', handleUpdate);
    return () => window.removeEventListener('demo_config_changed', handleUpdate);
  }, []);

  const categories = ['All', ...store.categories];

  const filteredItems = activeCategory === 'All'
    ? store.menu
    : store.menu.filter((i) => i.category === activeCategory);

  // Cart operations
  const handleAddToCart = (item: MenuItemConfig) => {
    if (!item.isAvailable) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
        category: item.category
      }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.id === id) {
          const newQty = i.quantity + delta;
          return newQty > 0 ? { ...i, quantity: newQty } : null;
        }
        return i;
      }).filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleDirectWhatsAppOrder = (dishName: string, price: number) => {
    const targetPhone = store.business.whatsappNumber.replace(/[^0-9]/g, '');
    const msg = `Hello *${currentBrandName}*,\n\nI would like to order: *${dishName}* (₹${price}) for takeaway.\nPlease confirm availability.\n\nThank you!`;
    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTableBooked(true);
    // Prepare WhatsApp reservation request
    const targetPhone = store.business.whatsappNumber.replace(/[^0-9]/g, '');
    const msg = `Hello *${currentBrandName}*,\n\nI would like to reserve a table for dining:\n\n*Name:* ${tableForm.name}\n*Phone:* ${tableForm.phone}\n*Guests:* ${tableForm.guests}\n*Date:* ${tableForm.date}\n*Time:* ${tableForm.time}\n\nPlease confirm availability. Thank you!`;
    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans pb-32">
      <BrandCustomizerBar businessType="Restaurant" defaultBrandName={store.business.name} />

      {/* Restaurant Header */}
      <header className="sticky top-0 z-30 bg-stone-950/90 backdrop-blur-md border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-stone-950 flex items-center justify-center font-black">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-wider text-amber-400 font-serif">
                {currentBrandName.toUpperCase()}
              </span>
              <span className="text-[10px] block text-stone-400 tracking-widest uppercase">
                {store.business.tagline}
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase font-semibold tracking-wider text-stone-300">
            <a href="#menu" className="hover:text-amber-400 transition">Menu</a>
            <a href="#about" className="hover:text-amber-400 transition">About Us</a>
            <a href="#reserve" className="hover:text-amber-400 transition">Book Table</a>
            <a href="#location" className="hover:text-amber-400 transition">Hours & Location</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* View Cart Button */}
            {totalCartCount > 0 && (
              <button
                onClick={() => setIsOrderingModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Cart ({totalCartCount}) • ₹{cartSubtotal}</span>
              </button>
            )}

            <a
              href="#reserve"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition shadow-md shadow-amber-500/20 hidden sm:inline-block"
            >
              Book a Table
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" />
                <span>{store.business.tagline}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-serif leading-tight">
                Authentic South Indian Flavours,{' '}
                <span className="text-amber-400 italic">Served Fresh.</span>
              </h1>

              <p className="text-stone-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {store.business.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#menu"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-sm transition shadow-lg shadow-amber-500/20 text-center"
                >
                  View Digital Menu
                </a>
                <button
                  onClick={() => setIsOrderingModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm transition shadow-lg shadow-emerald-600/20 text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Online (WhatsApp)</span>
                </button>
              </div>

              {/* Trust counters */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-stone-400">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white">4.8 / 5.0</span>
                  <span>(680+ Diners)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>All times in IST (Asia/Kolkata)</span>
                </div>
              </div>
            </div>

            {/* Featured Dish Visual */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl shadow-amber-500/10 relative group">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
                  alt="Special Signature Dish"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-md border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">
                      Chef's Signature
                    </span>
                    <h4 className="text-white font-bold text-sm sm:text-base">
                      {store.menu[0]?.name || 'Chicken Biryani'}
                    </h4>
                    <span className="text-xs text-stone-400">Slow-cooked in clay pots</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-amber-400">₹{store.menu[0]?.price || 220}</span>
                    <button
                      onClick={() => {
                        if (store.menu[0]) handleAddToCart(store.menu[0]);
                        setIsOrderingModalOpen(true);
                      }}
                      className="block mt-1 text-[11px] px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition cursor-pointer"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Dishes Showcase */}
      <section className="py-12 bg-stone-900/50 border-y border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                Trending This Week
              </span>
              <h3 className="text-2xl font-black text-white font-serif">
                Diner Favourites
              </h3>
            </div>
            <a href="#menu" className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold">
              Full Menu <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {store.menu.filter(i => i.isPopular).slice(0, 4).map((dish) => (
              <div key={dish.id} className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden hover:border-amber-500/40 transition flex flex-col justify-between">
                <div className="relative h-44 overflow-hidden">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                  <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold ${dish.isVeg ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                    {dish.isVeg ? 'VEG' : 'NON-VEG'}
                  </span>
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-amber-400 text-xs font-black">
                    ₹{dish.price}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-white text-sm line-clamp-1">{dish.name}</h4>
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">{dish.description}</p>
                  
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleAddToCart(dish)}
                      disabled={!dish.isAvailable}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 text-xs font-bold transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{dish.isAvailable ? 'Add to Cart' : 'Sold Out'}</span>
                    </button>
                    <button
                      onClick={() => handleDirectWhatsAppOrder(dish.name, dish.price)}
                      title="Quick WhatsApp Order"
                      className="p-2 rounded-xl bg-stone-800 hover:bg-emerald-600 text-stone-300 hover:text-white transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Categorized Menu Section */}
      <section id="menu" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Handcrafted Culinary Specialties
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-serif">
              Our Complete Menu
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm">
              All dishes prepared fresh to order using cold-pressed gingelly oil, farm-fresh dairy, and authentic stone-ground spices.
            </p>

            {/* Category tabs */}
            <div className="flex items-center sm:justify-center gap-2 pt-4 overflow-x-auto no-scrollbar pb-2 px-1 sm:flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                      : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const inCart = cart.find(c => c.id === item.id);
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl bg-stone-900/80 border p-4 flex gap-4 transition group ${
                    item.isAvailable
                      ? 'border-stone-800 hover:border-amber-500/40 hover:bg-stone-900'
                      : 'border-stone-800/40 opacity-60'
                  }`}
                >
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    <span className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold ${item.isVeg ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                      {item.isVeg ? 'VEG' : 'NON-VEG'}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-white text-sm sm:text-base leading-snug">
                          {item.name}
                        </h4>
                        <span className="font-extrabold text-amber-400 text-sm whitespace-nowrap">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {item.isAvailable ? (
                        <>
                          {inCart ? (
                            <div className="flex items-center gap-2 bg-stone-800 p-1 rounded-xl">
                              <button
                                onClick={() => handleUpdateQuantity(item.id, -1)}
                                className="p-1 rounded-lg text-stone-300 hover:bg-stone-700"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-bold w-5 text-center text-amber-400">
                                {inCart.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateQuantity(item.id, 1)}
                                className="p-1 rounded-lg text-stone-300 hover:bg-stone-700"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-stone-950 border border-amber-500/20 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleDirectWhatsAppOrder(item.name, item.price)}
                            className="text-stone-400 hover:text-emerald-400 p-1 text-xs flex items-center gap-1"
                            title="Direct WhatsApp Order"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <span className="text-[11px] font-bold text-rose-400">
                          Currently Unavailable
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Table Reservation & Opening Hours Section */}
      <section id="reserve" className="py-16 sm:py-20 bg-stone-900/60 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Table Booking Form */}
            <div className="lg:col-span-6 rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Dine In With Us
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-serif mt-1">
                  Reserve a Table
                </h3>
                <p className="text-stone-400 text-xs sm:text-sm mt-1">
                  Book in advance to ensure preferred seating for family gatherings and weekend dining.
                </p>
              </div>

              {tableBooked ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                    ✓
                  </div>
                  <h4 className="font-extrabold text-white text-base">Reservation Request Sent!</h4>
                  <p className="text-xs text-stone-300">
                    Your table booking request was opened in WhatsApp for <strong>{tableForm.name}</strong> ({tableForm.guests}). Our team will confirm shortly.
                  </p>
                  <button
                    onClick={() => setTableBooked(false)}
                    className="text-xs text-amber-400 hover:underline font-bold"
                  >
                    Make another booking
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTableSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Arun Kumar"
                        value={tableForm.name}
                        onChange={(e) => setTableForm({ ...tableForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:outline-hidden focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98430 12345"
                        value={tableForm.phone}
                        onChange={(e) => setTableForm({ ...tableForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:outline-hidden focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Number of Guests
                      </label>
                      <select
                        value={tableForm.guests}
                        onChange={(e) => setTableForm({ ...tableForm, guests: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:outline-hidden focus:border-amber-400"
                      >
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests">2 Guests</option>
                        <option value="4 Guests">4 Guests</option>
                        <option value="6 Guests">6 Guests</option>
                        <option value="8+ Guests">8+ Guests</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={tableForm.date}
                        onChange={(e) => setTableForm({ ...tableForm, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:outline-hidden focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Time Slot (IST)
                      </label>
                      <input
                        type="text"
                        value={tableForm.time}
                        onChange={(e) => setTableForm({ ...tableForm, time: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:outline-hidden focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider transition cursor-pointer"
                  >
                    Confirm Table Reservation on WhatsApp
                  </button>
                </form>
              )}
            </div>

            {/* Operating Hours & Location Card */}
            <div id="location" className="lg:col-span-6 space-y-6">
              <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <Clock className="w-5 h-5" />
                  <h4 className="font-bold text-white text-lg">Opening Hours (IST)</h4>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-stone-300 divide-y divide-stone-800">
                  {store.hours.map((h) => (
                    <div key={h.day} className="flex justify-between py-1.5">
                      <span>{h.day}</span>
                      <strong className={h.isClosed ? 'text-red-400' : 'text-white'}>
                        {h.isClosed ? 'Closed' : h.shifts.map(s => `${s.open} - ${s.close}`).join(' & ')}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <MapPin className="w-5 h-5" />
                  <h4 className="font-bold text-white text-lg">Location & Directions</h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {store.business.address}
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href={store.business.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold border border-stone-700 transition"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Open in Google Maps
                  </a>
                  <a
                    href={`tel:${store.business.phone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 text-xs font-semibold border border-amber-500/20 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Restaurant
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Bottom Cart Bar (if items in cart) */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-40 animate-slideUp">
          <button
            onClick={() => setIsOrderingModalOpen(true)}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-between sm:justify-center gap-4 shadow-2xl shadow-emerald-600/40 border border-emerald-400/30 transition cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>{totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} in Cart</span>
            </div>
            <span className="px-2.5 py-1 rounded-xl bg-emerald-700 font-mono text-sm">
              ₹{cartSubtotal}
            </span>
            <span className="text-xs bg-white text-emerald-950 px-2 py-0.5 rounded-lg font-black uppercase">
              Checkout &rarr;
            </span>
          </button>
        </div>
      )}

      {/* Reusable Food Ordering Modal */}
      <FoodOrderingModal
        isOpen={isOrderingModalOpen}
        onClose={() => setIsOrderingModalOpen(false)}
        businessId="restaurant"
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Floating Demo Conversion CTA */}
      <DemoFloatingCTA
        businessName={currentBrandName}
        businessType="Restaurant"
        recommendedPackage="Business (₹9,999)"
      />
    </div>
  );
};
