import React, { useState } from 'react';
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
  Heart
} from 'lucide-react';
import { DemoFloatingCTA } from '../../components/DemoFloatingCTA';
import { getWhatsAppUrl } from '../../config/siteConfig';

interface MenuItem {
  id: string;
  name: string;
  category: 'Starters' | 'Main Course' | 'Biryani' | 'Dosa' | 'Breads' | 'Desserts' | 'Beverages';
  price: number;
  description: string;
  isVeg: boolean;
  isSpecial?: boolean;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: 's1',
    name: 'Chettinad Kozhi Varuval',
    category: 'Starters',
    price: 280,
    description: 'Crispy fried country chicken tossed with shallots, crushed pepper, and roasted curry leaves.',
    isVeg: false,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's2',
    name: 'Gobi 65 & Curry Leaves',
    category: 'Starters',
    price: 190,
    description: 'Golden cauliflower florets marinated in spiced curd batter and flash-fried with green chilies.',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'b1',
    name: 'Thalassery Mutton Dum Biryani',
    category: 'Biryani',
    price: 380,
    description: 'Fragrant Jeerakasala rice layered with tender mutton chunks, ghee, fried onions, and dry fruits.',
    isVeg: false,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'b2',
    name: 'Dindigul Thalappakatti Chicken Biryani',
    category: 'Biryani',
    price: 320,
    description: 'Seeraga samba rice cooked with stone-ground spices and succulent tender chicken cuts.',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd1',
    name: 'Mysore Masala Dosa',
    category: 'Dosa',
    price: 150,
    description: 'Crispy golden crepe smeared with spicy red chutney and stuffed with spiced potato masala.',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'd2',
    name: 'Madurai Kari Dosa (Mutton)',
    category: 'Dosa',
    price: 260,
    description: 'Thick spongy dosa layered with fluffy egg omlette and rich spicy minced mutton gravy.',
    isVeg: false,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'm1',
    name: 'Meen Pollichathu (Pearl Spot)',
    category: 'Main Course',
    price: 420,
    description: 'Fresh fish marinated in fiery shallot paste, wrapped in banana leaf and slow-griddled.',
    isVeg: false,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'm2',
    name: 'Paneer Butter Masala',
    category: 'Main Course',
    price: 240,
    description: 'Fresh malai paneer cubes simmered in a velvety tomato and cashew cream gravy.',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'br1',
    name: 'Malabar Porotta (2 pcs)',
    category: 'Breads',
    price: 70,
    description: 'Multi-layered flaky Kerala bread griddled on cast iron with pure ghee.',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'des1',
    name: 'Elaneer Payasam (Tender Coconut)',
    category: 'Desserts',
    price: 130,
    description: 'Creamy coconut milk kheer enriched with tender coconut pulp and cardamom.',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'bev1',
    name: 'Kumbakonam Degree Filter Coffee',
    category: 'Beverages',
    price: 60,
    description: 'Authentic South Indian chicory-blend coffee brewed with foaming fresh cow milk.',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
  },
];

export const RestaurantDemo: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [tableForm, setTableForm] = useState({
    name: '',
    phone: '',
    guests: '2 Guests',
    date: '',
    time: '07:30 PM',
  });
  const [tableBooked, setTableBooked] = useState(false);

  const categories = ['All', 'Starters', 'Biryani', 'Dosa', 'Main Course', 'Breads', 'Desserts', 'Beverages'];

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter((i) => i.category === activeCategory);

  const handleOrderWhatsApp = (dishName: string, price: number) => {
    const msg = `Hi Spice Route Restaurant, I would like to order: *${dishName}* (₹${price}) for takeaway.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  const handleTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTableBooked(true);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans pb-28">
      {/* Restaurant Header */}
      <header className="sticky top-0 z-30 bg-stone-950/90 backdrop-blur-md border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-stone-950 flex items-center justify-center font-black">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-wider text-amber-400 font-serif">
                SPICE ROUTE
              </span>
              <span className="text-[10px] block text-stone-400 tracking-widest uppercase">
                South Indian Heritage Cuisine
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
            <a
              href="#reserve"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition shadow-md shadow-amber-500/20"
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
                <span>Wood-Fired & Stone-Ground Flavours</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-serif leading-tight">
                Authentic South Indian Flavours,{' '}
                <span className="text-amber-400 italic">Served Fresh.</span>
              </h1>

              <p className="text-stone-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience heritage Chettinad, Malabar, and Kongu recipes cooked with hand-pounded spices, cold-pressed oils, and traditional slow-dum techniques.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#menu"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-sm transition shadow-lg shadow-amber-500/20 text-center"
                >
                  View Digital Menu
                </a>
                <a
                  href="#reserve"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-200 font-bold text-sm transition text-center"
                >
                  Book a Table
                </a>
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
                  <span>Open: 11:30 AM – 11:00 PM</span>
                </div>
              </div>
            </div>

            {/* Featured Dish Visual */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-2xl shadow-amber-500/10 relative group">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
                  alt="Thalassery Mutton Dum Biryani"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-md border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">
                      Chef's Signature
                    </span>
                    <h4 className="text-white font-bold text-sm sm:text-base">
                      Thalassery Mutton Dum Biryani
                    </h4>
                    <span className="text-xs text-stone-400">Slow-cooked in clay pots</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-amber-400">₹380</span>
                    <button
                      onClick={() => handleOrderWhatsApp('Thalassery Mutton Dum Biryani', 380)}
                      className="block mt-1 text-[11px] px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition"
                    >
                      WhatsApp
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
            {menuItems.filter(i => i.isSpecial).map((dish) => (
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
                  <button
                    onClick={() => handleOrderWhatsApp(dish.name, dish.price)}
                    className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-stone-800 hover:bg-emerald-600 text-stone-200 hover:text-white text-xs font-bold transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Order on WhatsApp</span>
                  </button>
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
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
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
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-stone-900/80 border border-stone-800 p-4 flex gap-4 hover:border-amber-500/40 transition group"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative bg-stone-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <span
                    className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-stone-900 ${
                      item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-white text-sm leading-snug">
                        {item.name}
                      </h4>
                      <span className="text-amber-400 font-extrabold text-sm shrink-0">
                        ₹{item.price}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] text-stone-400 font-medium">
                      {item.category}
                    </span>
                    <button
                      onClick={() => handleOrderWhatsApp(item.name, item.price)}
                      className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-bold"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Takeaway</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book a Table & Hours Section */}
      <section id="reserve" className="py-16 bg-stone-900/60 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Table Reservation Form */}
            <div className="lg:col-span-6 rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-5">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                  Reservations
                </span>
                <h3 className="text-2xl font-bold text-white font-serif">
                  Book a Table
                </h3>
                <p className="text-xs text-stone-400">
                  Complimentary booking • No cancellation fees • Special seating available for family dinners.
                </p>
              </div>

              {tableBooked ? (
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-3">
                  <span className="w-12 h-12 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center mx-auto font-black text-lg">
                    ✓
                  </span>
                  <h4 className="font-bold text-white text-base">Reservation Request Sent!</h4>
                  <p className="text-xs text-stone-300">
                    We will send an instant SMS confirmation to <strong>{tableForm.phone || '+91 98765 43210'}</strong> for {tableForm.guests} at {tableForm.time}.
                  </p>
                  <button
                    onClick={() => setTableBooked(false)}
                    className="text-xs text-amber-400 underline font-semibold"
                  >
                    Make another reservation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTableSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={tableForm.name}
                        onChange={(e) => setTableForm({ ...tableForm, name: e.target.value })}
                        placeholder="Ramesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        value={tableForm.phone}
                        onChange={(e) => setTableForm({ ...tableForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Party Size
                      </label>
                      <select
                        value={tableForm.guests}
                        onChange={(e) => setTableForm({ ...tableForm, guests: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option value="2 Guests">2 Guests</option>
                        <option value="4 Guests">4 Guests</option>
                        <option value="6 Guests">6 Guests</option>
                        <option value="8+ Family Table">8+ Family Table</option>
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Preferred Time
                      </label>
                      <select
                        value={tableForm.time}
                        onChange={(e) => setTableForm({ ...tableForm, time: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option value="12:30 PM">12:30 PM (Lunch)</option>
                        <option value="01:30 PM">01:30 PM (Lunch)</option>
                        <option value="07:30 PM">07:30 PM (Dinner)</option>
                        <option value="08:30 PM">08:30 PM (Dinner)</option>
                        <option value="09:30 PM">09:30 PM (Dinner)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider transition cursor-pointer"
                  >
                    Confirm Table Reservation
                  </button>
                </form>
              )}
            </div>

            {/* Operating Hours & Location Card */}
            <div id="location" className="lg:col-span-6 space-y-6">
              <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <Clock className="w-5 h-5" />
                  <h4 className="font-bold text-white text-lg">Opening Hours</h4>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-stone-300 divide-y divide-stone-800">
                  <div className="flex justify-between py-1.5">
                    <span>Monday – Friday (Lunch)</span>
                    <strong className="text-white">11:30 AM – 03:30 PM</strong>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Monday – Friday (Dinner)</span>
                    <strong className="text-white">06:30 PM – 11:00 PM</strong>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>Saturday & Sunday</span>
                    <strong className="text-amber-400">11:00 AM – 11:30 PM (Non-stop)</strong>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <MapPin className="w-5 h-5" />
                  <h4 className="font-bold text-white text-lg">Location & Directions</h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  #42 Heritage Boulevard, Near Cross Cut Junction, R.S. Puram, Coimbatore, Tamil Nadu 641002.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold border border-stone-700 transition"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Open in Google Maps
                  </a>
                  <a
                    href="tel:+916382450849"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 text-xs font-semibold border border-amber-500/20 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Dining Desk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Demo Conversion CTA */}
      <DemoFloatingCTA
        businessName="Spice Route Restaurant"
        businessType="Restaurant"
        recommendedPackage="Business (₹9,999)"
      />
    </div>
  );
};
