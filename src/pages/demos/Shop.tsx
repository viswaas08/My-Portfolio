import React, { useState } from 'react';
import { 
  Store, 
  ShoppingBag, 
  Clock, 
  MapPin, 
  Phone, 
  Check, 
  Tag, 
  Truck, 
  MessageSquare, 
  Search,
  Sparkles
} from 'lucide-react';
import { DemoFloatingCTA } from '../../components/DemoFloatingCTA';
import { getWhatsAppUrl } from '../../config/siteConfig';

export const ShopDemo: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [listText, setListText] = useState('');

  const products = [
    {
      id: 'p1',
      name: 'Organic Royal Ponni Boiled Rice (5kg)',
      category: 'Groceries',
      price: 340,
      mrp: 390,
      discount: '12% OFF',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'p2',
      name: 'Cold Pressed Groundnut Oil (1 Litre)',
      category: 'Groceries',
      price: 210,
      mrp: 245,
      discount: '14% OFF',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'p3',
      name: 'A2 Farm Fresh Cow Milk (1 Litre Bottle)',
      category: 'Groceries',
      price: 68,
      mrp: 75,
      discount: 'Fresh Daily',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'p4',
      name: 'Eco-Friendly Laundry Detergent Sheets (Pack of 40)',
      category: 'Home Essentials',
      price: 299,
      mrp: 350,
      discount: '15% OFF',
      image: 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'p5',
      name: 'Herbal Neem & Aloe Vera Gentle Body Wash (300ml)',
      category: 'Personal Care',
      price: 185,
      mrp: 220,
      discount: '16% OFF',
      image: 'https://images.unsplash.com/photo-1608248597359-58b2112a524b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'p6',
      name: 'Roasted California Almonds & Cashews (250g Jar)',
      category: 'Snacks',
      price: 280,
      mrp: 330,
      discount: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'p7',
      name: 'Natural Coconut Water with Tender Pulp (200ml x 4)',
      category: 'Beverages',
      price: 160,
      mrp: 180,
      discount: '11% OFF',
      image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'p8',
      name: 'Multigrain Crunchy Millet Cookies (Pack of 3)',
      category: 'Snacks',
      price: 150,
      mrp: 180,
      discount: '16% OFF',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const categories = ['All', 'Groceries', 'Home Essentials', 'Personal Care', 'Snacks', 'Beverages'];

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleSendList = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Urban Mart, I would like to order the following grocery list for home delivery:\n\n${listText || '1. Ponni Rice 5kg\n2. Milk 1L\n3. Sunflower oil 1L'}`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-28">
      {/* Retail Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                URBAN MART
              </span>
              <span className="text-[10px] block text-emerald-600 font-bold uppercase tracking-widest">
                Daily Essentials & Groceries
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <Truck className="w-3.5 h-3.5" /> Free Delivery within 3 km
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> 7:00 AM – 10:00 PM
            </span>
          </div>

          <a
            href="#whatsapp-list"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Send Grocery List</span>
          </a>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider text-emerald-200 inline-block">
              Your Local Supermarket
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Fresh Daily Groceries & Essentials Delivered To Your Doorstep.
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Skip supermarket queues. Send your grocery list via WhatsApp or browse our daily discounts. Fast local delivery in under 45 minutes.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#products"
                className="px-5 py-3 rounded-xl bg-white text-emerald-900 font-bold text-xs uppercase tracking-wider hover:bg-emerald-50 transition shadow"
              >
                Browse Today’s Deals
              </a>
              <a
                href="#whatsapp-list"
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs uppercase tracking-wider transition shadow flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" /> Quick WhatsApp Order
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Featured Items & Daily Deals
            </h2>
            <p className="text-xs text-slate-500">Carefully curated for freshness and best local pricing.</p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeCategory === c
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative bg-slate-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px]">
                    {item.discount}
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{item.category}</span>
                  <h4 className="font-bold text-sm text-slate-900 line-clamp-2">{item.name}</h4>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-extrabold text-slate-900">₹{item.price}</span>
                    <span className="text-xs text-slate-400 line-through">₹{item.mrp}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <a
                  href={getWhatsAppUrl(`Hi Urban Mart, please deliver: *${item.name}* (₹${item.price}) to my address.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Order on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp Quick Grocery List Order Builder */}
      <section id="whatsapp-list" className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-emerald-800">
              <ShoppingBag className="w-6 h-6" />
              <h3 className="text-xl font-bold">Have a Handwritten or Typed Grocery List?</h3>
            </div>
            <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
              Don't waste time searching for individual items! Just paste your grocery list below or send a photo of your handwritten paper list directly on WhatsApp. We will pack it and deliver it to your door.
            </p>

            <form onSubmit={handleSendList} className="space-y-3">
              <textarea
                rows={4}
                value={listText}
                onChange={(e) => setListText(e.target.value)}
                placeholder="e.g.&#10;1. 5kg Ponni Boiled Rice&#10;2. 1L Cold Pressed Gingelly Oil&#10;3. 500g Toor Dal&#10;4. 2 packets A2 Cow Milk..."
                className="w-full p-3.5 rounded-xl bg-white border border-emerald-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow"
              >
                <MessageSquare className="w-4 h-4" /> Send Grocery List to WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      <DemoFloatingCTA
        businessName="Urban Mart Retail"
        businessType="Retail Shop"
        recommendedPackage="Starter (₹4,999)"
      />
    </div>
  );
};
