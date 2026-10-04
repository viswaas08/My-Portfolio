import React, { useState } from 'react';
import { 
  Coffee, 
  Clock, 
  MapPin, 
  Star, 
  Heart, 
  MessageSquare, 
  Sparkles, 
  CupSoda, 
  Cookie, 
  ChevronRight,
  Flame,
  Phone
} from 'lucide-react';
import { DemoFloatingCTA } from '../../components/DemoFloatingCTA';
import { getWhatsAppUrl } from '../../config/siteConfig';

interface CafeItem {
  id: string;
  name: string;
  category: 'Coffee' | 'Tea' | 'Cold Drinks' | 'Desserts' | 'Snacks';
  price: number;
  notes: string;
  image: string;
  popular?: boolean;
}

const cafeMenu: CafeItem[] = [
  {
    id: 'c1',
    name: 'Single Origin Pour Over (Chikmagalur Arabica)',
    category: 'Coffee',
    price: 180,
    notes: 'Tasting notes: Orange blossom, hazelnut, mild caramel sweetness.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 'c2',
    name: 'Nitro Velvet Cold Brew',
    category: 'Coffee',
    price: 210,
    notes: 'Infused with nitrogen for a Guinness-like silky crema and zero bitterness.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 'c3',
    name: 'Spanish Iced Latte with Condensed Milk',
    category: 'Coffee',
    price: 190,
    notes: 'Double ristretto espresso layered with slow-steamed milk and caramelized sugar.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 't1',
    name: 'Nilgiri Silver Needle White Tea',
    category: 'Tea',
    price: 160,
    notes: 'Delicate high-grown white tea hand-plucked at 6,000 ft with floral undertones.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 't2',
    name: 'Spiced Masala Chai Latte',
    category: 'Tea',
    price: 120,
    notes: 'Slow-simmered Assam black tea with crushed green cardamom, ginger, and cinnamon.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cd1',
    name: 'Kaffir Lime & Mint Espresso Tonic',
    category: 'Cold Drinks',
    price: 195,
    notes: 'Crisp artisanal tonic water topped with a fresh espresso shot and kaffir lime zest.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'des1',
    name: 'Warm Basque Burnt Cheesecake',
    category: 'Desserts',
    price: 220,
    notes: 'Caramelized burnt crust with an oozing rich cream cheese center.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 'des2',
    name: 'Classic Tiramisu Cup',
    category: 'Desserts',
    price: 210,
    notes: 'Espresso-soaked savoiardi biscuits layered with fluffy mascarpone cream and cocoa.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sn1',
    name: 'Truffle Mushroom Sourdough Toast',
    category: 'Snacks',
    price: 240,
    notes: 'Artisan sourdough with sautéed button mushrooms, white truffle oil, and parmesan shavings.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 'sn2',
    name: 'Smoked Chicken & Pesto Panini',
    category: 'Snacks',
    price: 260,
    notes: 'Grilled ciabatta loaded with basil walnut pesto, smoked chicken breast, and mozzarella.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
  },
];

export const CafeDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = ['All', 'Coffee', 'Tea', 'Cold Drinks', 'Desserts', 'Snacks'];

  const filteredItems = activeTab === 'All'
    ? cafeMenu
    : cafeMenu.filter((i) => i.category === activeTab);

  const handleWhatsAppOrder = (dish: string, price: number) => {
    const msg = `Hi Brew & Bean Cafe, I would like to order *${dish}* (₹${price}) for pickup/table.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-[#14100c] text-[#f7f2ea] font-sans pb-28">
      {/* Cafe Header */}
      <header className="sticky top-0 z-30 bg-[#14100c]/90 backdrop-blur-md border-b border-[#3d2f23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c58f5e] text-[#14100c] flex items-center justify-center font-bold">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-[#f7f2ea]">
                BREW & BEAN
              </span>
              <span className="text-[10px] block text-[#c58f5e] uppercase tracking-widest font-semibold">
                Specialty Coffee Roasters
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-[#cfbeae]">
            <a href="#specialty" className="hover:text-[#c58f5e] transition">Specialty</a>
            <a href="#menu" className="hover:text-[#c58f5e] transition">Menu</a>
            <a href="#about" className="hover:text-[#c58f5e] transition">Our Roastery</a>
            <a href="#location" className="hover:text-[#c58f5e] transition">Hours & Location</a>
          </nav>

          <a
            href={getWhatsAppUrl("Hi Brew & Bean, I would like to reserve a cozy corner table for today.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#c58f5e] hover:bg-[#d69f6e] text-[#14100c] text-xs font-bold transition shadow-md"
          >
            Reserve Table
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#1f1913] to-[#14100c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c58f5e]/15 border border-[#c58f5e]/30 text-[#c58f5e] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Micro-Lot Estate Coffee & Fresh Bakes</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#f7f2ea] leading-[1.1]">
                Good Coffee.{' '}
                <span className="text-[#c58f5e] italic font-serif">
                  Good Conversations.
                </span>
              </h1>

              <p className="text-[#cfbeae] text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Step away from the rush. We pull artisanal espresso shots from shade-grown Chikmagalur beans, paired with sourdough bites and warm bakery indulgences.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#menu"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#c58f5e] hover:bg-[#d69f6e] text-[#14100c] font-black text-sm transition text-center shadow-lg shadow-[#c58f5e]/20"
                >
                  Explore Menu
                </a>
                <a
                  href="#location"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#3d2f23] bg-[#241c15] hover:bg-[#2e231b] text-[#f7f2ea] font-bold text-sm transition text-center"
                >
                  Visit Us
                </a>
              </div>

              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#a39080]">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#c58f5e] fill-[#c58f5e]" />
                  <span className="font-bold text-[#f7f2ea]">4.9 / 5.0</span>
                  <span>(420+ Coffee Lovers)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Open Daily 07:30 AM – 10:30 PM</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden border-2 border-[#3d2f23] shadow-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
                  alt="Brew and Bean ambiance"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14100c] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#1f1913]/90 backdrop-blur-md border border-[#3d2f23] p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#c58f5e] font-bold uppercase tracking-wider">
                      Single Origin Daily Brew
                    </span>
                    <h4 className="font-bold text-sm text-white">Chikmagalur AAA Arabica</h4>
                    <span className="text-xs text-[#cfbeae]">Hand-dripped to order</span>
                  </div>
                  <span className="text-lg font-black text-[#c58f5e]">₹180</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialty Coffee Section */}
      <section id="specialty" className="py-14 bg-[#1a1410] border-y border-[#3d2f23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-[#c58f5e]">
              Bean To Cup Passion
            </span>
            <h2 className="text-3xl font-extrabold text-[#f7f2ea]">
              Our Specialty Roasts
            </h2>
            <p className="text-xs sm:text-sm text-[#cfbeae]">
              Small batches roasted in-house every Tuesday. High elevation beans with vibrant, clean flavor notes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cafeMenu.filter(i => i.popular).slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#241c15] border border-[#3d2f23] flex flex-col justify-between hover:border-[#c58f5e]/50 transition group"
              >
                <div className="space-y-3">
                  <div className="h-44 rounded-xl overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/70 text-[#c58f5e] font-black text-xs">
                      ₹{item.price}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-base">{item.name}</h4>
                  <p className="text-xs text-[#cfbeae] leading-relaxed">{item.notes}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#3d2f23] flex items-center justify-between">
                  <span className="text-[11px] text-[#c58f5e] font-semibold">{item.category}</span>
                  <button
                    onClick={() => handleWhatsAppOrder(item.name, item.price)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c58f5e] text-[#14100c] text-xs font-bold hover:bg-[#d69f6e] transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Quick Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Cafe Menu */}
      <section id="menu" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-[#f7f2ea]">
              The Brew & Bean Menu
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === cat
                      ? 'bg-[#c58f5e] text-[#14100c]'
                      : 'bg-[#241c15] text-[#cfbeae] hover:bg-[#2e231b]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#1c1611] border border-[#30251c] flex items-center justify-between gap-4 hover:border-[#c58f5e]/40 transition"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#241c15]">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-white text-sm">{item.name}</h4>
                    <span className="text-[#c58f5e] font-extrabold text-sm">₹{item.price}</span>
                  </div>
                  <p className="text-xs text-[#a39080] mt-1 line-clamp-2">{item.notes}</p>
                </div>
                <button
                  onClick={() => handleWhatsAppOrder(item.name, item.price)}
                  className="p-2 rounded-lg bg-[#241c15] text-[#c58f5e] hover:bg-[#c58f5e] hover:text-[#14100c] transition shrink-0"
                  title="Order on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section id="location" className="py-14 bg-[#1a1410] border-t border-[#3d2f23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 rounded-3xl bg-[#241c15] border border-[#3d2f23] space-y-4">
              <div className="flex items-center gap-2 text-[#c58f5e]">
                <Clock className="w-5 h-5" />
                <h4 className="font-bold text-white text-lg">Cafe Hours</h4>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-[#cfbeae]">
                <div className="flex justify-between py-1 border-b border-[#30251c]">
                  <span>Monday – Friday</span>
                  <strong className="text-white">07:30 AM – 10:30 PM</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-[#30251c]">
                  <span>Saturday & Sunday</span>
                  <strong className="text-[#c58f5e]">07:00 AM – 11:00 PM</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span>Acoustic Evenings</span>
                  <strong className="text-white">Friday 07:00 PM onwards</strong>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#241c15] border border-[#3d2f23] space-y-4">
              <div className="flex items-center gap-2 text-[#c58f5e]">
                <MapPin className="w-5 h-5" />
                <h4 className="font-bold text-white text-lg">Find Us In Town</h4>
              </div>
              <p className="text-xs sm:text-sm text-[#cfbeae] leading-relaxed">
                Plot #18, Urban Tree Enclave, Race Course Road, Coimbatore, Tamil Nadu 641018. Outdoor pet-friendly patio and free high-speed Wi-Fi available.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#c58f5e] text-[#14100c] text-xs font-bold hover:bg-[#d69f6e] transition"
                >
                  Directions on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemoFloatingCTA
        businessName="Brew & Bean Cafe"
        businessType="Cafe"
        recommendedPackage="Business (₹9,999)"
      />
    </div>
  );
};
