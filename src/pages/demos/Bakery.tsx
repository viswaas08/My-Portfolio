import React, { useState } from 'react';
import { 
  Cake, 
  Sparkles, 
  Heart, 
  Clock, 
  MapPin, 
  Star, 
  MessageSquare, 
  Check, 
  Gift, 
  Send
} from 'lucide-react';
import { DemoFloatingCTA } from '../../components/DemoFloatingCTA';
import { getWhatsAppUrl } from '../../config/siteConfig';

export const BakeryDemo: React.FC = () => {
  const [cakeForm, setCakeForm] = useState({
    flavor: 'Belgian Truffle Chocolate',
    weight: '1.0 Kg',
    occasion: 'Birthday Celebration',
    date: '',
    nameMsg: 'Happy Birthday!',
  });

  const bakeryItems = [
    {
      id: 'bk1',
      name: 'Signature Belgian Chocolate Truffle Cake',
      category: 'Cakes',
      price: 650,
      unit: 'per 500g',
      desc: 'Layers of moist dark sponge drenched in 54% dark chocolate ganache and chocolate curls.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'bk2',
      name: 'Classic New York Red Velvet Cake with Cream Cheese',
      category: 'Cakes',
      price: 600,
      unit: 'per 500g',
      desc: 'Velvety crimson layers topped with authentic Philadelphia cream cheese frosting.',
      image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'bk3',
      name: 'French Butter Croissants (Pack of 2)',
      category: 'Pastries',
      price: 180,
      unit: '2 pcs',
      desc: 'Laminated with pure European cultured butter for 27 flaky, golden, airy layers.',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'bk4',
      name: 'Artisan Country Sourdough Loaf',
      category: 'Bread',
      price: 160,
      unit: '500g loaf',
      desc: '36-hour slow cold fermentation using our 5-year-old sourdough starter. Crispy crust.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'bk5',
      name: 'Lotus Biscoff Cheesecake Slice',
      category: 'Pastries',
      price: 220,
      unit: 'per slice',
      desc: 'Creamy baked cheesecake infused with spiced speculoos spread on a crunchy biscuit base.',
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'bk6',
      name: 'Fresh Alphonso Mango Tart (Seasonal)',
      category: 'Pastries',
      price: 190,
      unit: 'individual',
      desc: 'Crisp almond sablé shell filled with vanilla pastry cream and fresh mango rosettes.',
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const handleCustomCakeWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Sweet Crumbs Bakery, I want to book a Custom Cake:\n- Flavor: ${cakeForm.flavor}\n- Weight: ${cakeForm.weight}\n- Occasion: ${cakeForm.occasion}\n- Date: ${cakeForm.date || 'Soon'}\n- Message on Cake: "${cakeForm.nameMsg}"`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-[#faf7f5] text-[#2c2420] font-sans pb-28">
      {/* Bakery Header */}
      <header className="sticky top-0 z-30 bg-[#faf7f5]/90 backdrop-blur-md border-b border-[#ebdcd5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#e17b88] text-white flex items-center justify-center font-bold">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-[#2c2420] font-serif">
                Sweet Crumbs
              </span>
              <span className="text-[10px] block text-[#e17b88] font-bold uppercase tracking-widest">
                Artisan Bakery & Patisserie
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase font-bold tracking-wider text-[#735e55]">
            <a href="#custom-cake" className="hover:text-[#e17b88] transition">Custom Cakes</a>
            <a href="#menu" className="hover:text-[#e17b88] transition">Bakes & Treats</a>
            <a href="#reviews" className="hover:text-[#e17b88] transition">Testimonials</a>
            <a href="#location" className="hover:text-[#e17b88] transition">Visit Store</a>
          </nav>

          <a
            href="#custom-cake"
            className="px-4 py-2 rounded-xl bg-[#e17b88] hover:bg-[#cf6875] text-white text-xs font-bold transition shadow-sm"
          >
            Custom Cake Order
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-[#f5ede8] to-[#faf7f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e17b88]/15 text-[#e17b88] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Pure Butter • No Artificial Preservatives
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-[#2c2420] leading-tight">
                Freshly Baked Every Morning with{' '}
                <span className="text-[#e17b88] italic">100% Pure Butter.</span>
              </h1>

              <p className="text-[#735e55] text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                From dreamy multi-tier birthday cakes to golden flaky French croissants and rustic sourdough, we bake celebrations with love and premium ingredients.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#custom-cake"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#e17b88] hover:bg-[#cf6875] text-white font-bold text-sm transition shadow-md text-center"
                >
                  Order Custom Birthday Cake
                </a>
                <a
                  href="#menu"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#ebdcd5] bg-white hover:bg-[#f7ece7] text-[#2c2420] font-bold text-sm transition text-center"
                >
                  Browse Today’s Bakes
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative group">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
                  alt="Sweet Crumbs cake"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#ebdcd5] shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#e17b88] uppercase">Best Seller</span>
                    <h4 className="font-bold text-sm text-[#2c2420]">Belgian Truffle Dream</h4>
                    <span className="text-xs text-[#735e55]">Same-day delivery available</span>
                  </div>
                  <span className="text-base font-extrabold text-[#e17b88]">₹650/kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Cake Order Builder */}
      <section id="custom-cake" className="py-16 bg-white border-y border-[#ebdcd5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs uppercase font-bold text-[#e17b88] tracking-widest">
              Made For Your Special Days
            </span>
            <h2 className="text-3xl font-extrabold font-serif text-[#2c2420]">
              Custom Cake WhatsApp Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-[#735e55]">
              Select your favorite flavor and size. We will instantly craft your WhatsApp order message.
            </p>
          </div>

          <form onSubmit={handleCustomCakeWhatsApp} className="p-6 sm:p-8 rounded-3xl bg-[#faf7f5] border border-[#ebdcd5] space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2c2420] mb-1.5">
                  Select Cake Flavour
                </label>
                <select
                  value={cakeForm.flavor}
                  onChange={(e) => setCakeForm({ ...cakeForm, flavor: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#ebdcd5] bg-white text-base sm:text-xs font-medium text-[#2c2420] focus:outline-none focus:border-[#e17b88]"
                >
                  <option value="Belgian Truffle Chocolate">Belgian Truffle Chocolate (Most Popular)</option>
                  <option value="Philadelphia Red Velvet">Philadelphia Red Velvet</option>
                  <option value="Lotus Biscoff Caramel">Lotus Biscoff Caramel</option>
                  <option value="Fresh Alphonso Mango Cream">Fresh Alphonso Mango Cream</option>
                  <option value="Rasmalai Cardamom Infusion">Rasmalai Cardamom Infusion</option>
                  <option value="Classic Black Forest Dark Cherries">Classic Black Forest Dark Cherries</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2c2420] mb-1.5">
                  Weight / Servings
                </label>
                <select
                  value={cakeForm.weight}
                  onChange={(e) => setCakeForm({ ...cakeForm, weight: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#ebdcd5] bg-white text-base sm:text-xs font-medium text-[#2c2420] focus:outline-none focus:border-[#e17b88]"
                >
                  <option value="0.5 Kg (4–5 people)">0.5 Kg (4–5 people)</option>
                  <option value="1.0 Kg (8–10 people)">1.0 Kg (8–10 people)</option>
                  <option value="1.5 Kg (12–15 people)">1.5 Kg (12–15 people)</option>
                  <option value="2.0 Kg 2-Tier (18+ people)">2.0 Kg 2-Tier (18+ people)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2c2420] mb-1.5">
                  Occasion
                </label>
                <input
                  type="text"
                  value={cakeForm.occasion}
                  onChange={(e) => setCakeForm({ ...cakeForm, occasion: e.target.value })}
                  placeholder="e.g. 1st Birthday, 25th Anniversary"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#ebdcd5] bg-white text-base sm:text-xs font-medium text-[#2c2420] focus:outline-none focus:border-[#e17b88]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2c2420] mb-1.5">
                  Message on Cake
                </label>
                <input
                  type="text"
                  value={cakeForm.nameMsg}
                  onChange={(e) => setCakeForm({ ...cakeForm, nameMsg: e.target.value })}
                  placeholder="e.g. Happy Birthday Ananya!"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#ebdcd5] bg-white text-base sm:text-xs font-medium text-[#2c2420] focus:outline-none focus:border-[#e17b88]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Order on WhatsApp (Instant Response)</span>
            </button>
          </form>
        </div>
      </section>

      {/* Fresh Bakes Menu */}
      <section id="menu" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-3xl font-extrabold font-serif text-[#2c2420]">
            Fresh Daily Bakery Menu
          </h2>
          <p className="text-xs text-[#735e55]">Baked fresh at 6:30 AM every day.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bakeryItems.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white border border-[#ebdcd5] overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="h-44 overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-white/90 text-[#e17b88] font-black text-xs">
                  ₹{item.price}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <span className="text-[10px] text-[#e17b88] uppercase font-bold tracking-wider">{item.category}</span>
                <h4 className="font-bold text-sm text-[#2c2420]">{item.name}</h4>
                <p className="text-xs text-[#735e55] leading-relaxed">{item.desc}</p>
                <div className="pt-2">
                  <a
                    href={getWhatsAppUrl(`Hi Sweet Crumbs, I'd like to order: ${item.name} (₹${item.price})`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-bold hover:underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Order on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DemoFloatingCTA
        businessName="Sweet Crumbs Bakery"
        businessType="Bakery"
        recommendedPackage="Business (₹9,999)"
      />
    </div>
  );
};
