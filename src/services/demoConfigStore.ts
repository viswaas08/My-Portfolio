// Centralized Persistent Configuration Store for Business Demo Websites
// Supports localStorage persistence, live synchronization with public demos,
// multi-business selection (Spice Route, Brew & Bean, Sweet Crumbs, etc.), and demo reset.

export interface MenuItemConfig {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
  isAvailable: boolean;
  isPopular: boolean;
  prepTime?: string;
}

export interface DayShift {
  name: string;
  open: string;  // e.g. "11:30"
  close: string; // e.g. "15:00"
}

export interface DayHours {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  isClosed: boolean;
  shifts: DayShift[];
}

export interface SpecialDateOverride {
  date: string; // YYYY-MM-DD
  isClosed: boolean;
  reason: string;
  customHours?: string;
}

export interface BusinessConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  businessType: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  logo: string;
  favicon: string;
  currency: string;
  timezone: string; // "Asia/Kolkata" (IST)
}

export interface OrderingConfig {
  takeaway: boolean;
  dining: boolean;
  delivery: boolean;
}

export interface DeliveryConfig {
  enabled: boolean;
  deliveryCharge: number; // if 0 => "To be confirmed by restaurant"
  minimumOrder: number;
  deliveryArea: string;
}

export interface TimeSlotSettings {
  slotInterval: number; // minutes, e.g. 30
  minAdvanceBookingMinutes: number; // e.g. 30
  maxBookingDays: number; // e.g. 7
  openingTime: string; // default e.g. "11:30"
  closingTime: string; // default e.g. "22:30"
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

export interface BusinessDemoStore {
  business: BusinessConfig;
  menu: MenuItemConfig[];
  categories: string[];
  ordering: OrderingConfig;
  delivery: DeliveryConfig;
  hours: DayHours[];
  timeSlots: TimeSlotSettings;
  specialDates: SpecialDateOverride[];
  seo: SeoConfig;
}

// Initial Factory Seed for Spice Route (Restaurant)
export const initialRestaurantStore: BusinessDemoStore = {
  business: {
    id: 'restaurant',
    name: 'Spice Route',
    tagline: 'Authentic South Indian & Coastal Delicacies',
    description: 'Heritage recipes slow-cooked with freshly ground stone spices and farm-fresh ingredients in Coimbatore.',
    businessType: 'Restaurant',
    phone: '+91 98430 12345',
    whatsappNumber: '+919843012345',
    email: 'contact@spiceroute.com',
    address: '104 Race Course Road, Near Thomas Park, Coimbatore, Tamil Nadu 641018',
    googleMapsUrl: 'https://maps.google.com/?q=Coimbatore+Race+Course',
    instagramUrl: 'https://instagram.com/spiceroute_cbe',
    facebookUrl: 'https://facebook.com/spiceroute.cbe',
    logo: '🍽️',
    favicon: '/favicon.ico',
    currency: '₹',
    timezone: 'Asia/Kolkata'
  },
  categories: ['Starters', 'Main Course', 'Biryani', 'Dosa', 'Breads', 'Desserts', 'Beverages'],
  menu: [
    {
      id: 'm-01',
      name: 'Chicken Biryani',
      description: 'Fragrant Seeraga Samba rice cooked with succulent chicken cuts, mint, curd, and hand-pounded masala.',
      price: 220,
      category: 'Biryani',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
      isVeg: false,
      isAvailable: true,
      isPopular: true,
      prepTime: '20 mins'
    },
    {
      id: 'm-02',
      name: 'Paneer Tikka',
      description: 'Creamy malai paneer cubes marinated in spiced hung curd, bell peppers, and slow-charred in clay tandoor.',
      price: 180,
      category: 'Starters',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      isAvailable: true,
      isPopular: true,
      prepTime: '15 mins'
    },
    {
      id: 'm-03',
      name: 'Chettinad Kozhi Varuval',
      description: 'Tender country chicken flash-fried with caramelized shallots, black pepper, and roasted curry leaves.',
      price: 260,
      category: 'Starters',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
      isVeg: false,
      isAvailable: true,
      isPopular: true,
      prepTime: '20 mins'
    },
    {
      id: 'm-04',
      name: 'Thalassery Mutton Dum Biryani',
      description: 'Fragrant Jeerakasala rice slow-steamed with tender mutton, rich ghee, golden fried cashews, and sultanas.',
      price: 360,
      category: 'Biryani',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
      isVeg: false,
      isAvailable: true,
      isPopular: true,
      prepTime: '25 mins'
    },
    {
      id: 'm-05',
      name: 'Mysore Masala Dosa',
      description: 'Crispy fermented rice-lentil crepe smeared with spicy roasted garlic chutney and stuffed with spiced potatoes.',
      price: 130,
      category: 'Dosa',
      image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      isAvailable: true,
      isPopular: false,
      prepTime: '10 mins'
    },
    {
      id: 'm-06',
      name: 'Meen Pollichathu',
      description: 'Pearl spot fish wrapped in fragrant scorched banana leaf with spicy shallot, tomato, and kokum reduction.',
      price: 380,
      category: 'Main Course',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
      isVeg: false,
      isAvailable: true,
      isPopular: true,
      prepTime: '25 mins'
    },
    {
      id: 'm-07',
      name: 'Fresh Lime Soda',
      description: 'Chilled freshly squeezed lime juice with club soda, black salt, and fresh mint sprig.',
      price: 80,
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      isAvailable: true,
      isPopular: false,
      prepTime: '5 mins'
    },
    {
      id: 'm-08',
      name: 'Filter Coffee Panna Cotta',
      description: 'Silky cream infused with first-decoction Kumbakonam degree filter coffee with crushed jaggery honeycomb.',
      price: 150,
      category: 'Desserts',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      isAvailable: true,
      isPopular: true,
      prepTime: '5 mins'
    }
  ],
  ordering: {
    takeaway: true,
    dining: true,
    delivery: true
  },
  delivery: {
    enabled: true,
    deliveryCharge: 40,
    minimumOrder: 200,
    deliveryArea: 'Within 7 km radius of Race Course, Coimbatore'
  },
  hours: [
    {
      day: 'Monday',
      isClosed: false,
      shifts: [
        { name: 'Lunch', open: '11:30', close: '15:00' },
        { name: 'Dinner', open: '18:30', close: '22:30' }
      ]
    },
    {
      day: 'Tuesday',
      isClosed: false,
      shifts: [
        { name: 'Lunch', open: '11:30', close: '15:00' },
        { name: 'Dinner', open: '18:30', close: '22:30' }
      ]
    },
    {
      day: 'Wednesday',
      isClosed: false,
      shifts: [
        { name: 'Lunch', open: '11:30', close: '15:00' },
        { name: 'Dinner', open: '18:30', close: '22:30' }
      ]
    },
    {
      day: 'Thursday',
      isClosed: false,
      shifts: [
        { name: 'Lunch', open: '11:30', close: '15:00' },
        { name: 'Dinner', open: '18:30', close: '22:30' }
      ]
    },
    {
      day: 'Friday',
      isClosed: false,
      shifts: [
        { name: 'Lunch', open: '11:30', close: '15:00' },
        { name: 'Dinner', open: '18:30', close: '23:00' }
      ]
    },
    {
      day: 'Saturday',
      isClosed: false,
      shifts: [
        { name: 'Lunch', open: '11:30', close: '15:30' },
        { name: 'Dinner', open: '18:30', close: '23:00' }
      ]
    },
    {
      day: 'Sunday',
      isClosed: false,
      shifts: [
        { name: 'Lunch', open: '11:30', close: '16:00' },
        { name: 'Dinner', open: '18:30', close: '23:00' }
      ]
    }
  ],
  timeSlots: {
    slotInterval: 30,
    minAdvanceBookingMinutes: 30,
    maxBookingDays: 7,
    openingTime: '11:30',
    closingTime: '22:30'
  },
  specialDates: [
    {
      date: '2026-11-08',
      isClosed: true,
      reason: 'Deepavali Special Holiday'
    }
  ],
  seo: {
    metaTitle: 'Spice Route Restaurant | Traditional South Indian Dining in Coimbatore',
    metaDescription: 'Authentic Seeraga Samba Biryani, Chettinad curries and coastal fish delicacies. Book dining or order takeaway on WhatsApp.',
    keywords: 'restaurant coimbatore, south indian food, biryani, chettinad chicken, takeaway'
  }
};

// Initial Factory Seed for Brew & Bean (Cafe)
export const initialCafeStore: BusinessDemoStore = {
  business: {
    id: 'cafe',
    name: 'Brew & Bean',
    tagline: 'Artisanal Roastery & Slow Bar',
    description: 'Single-origin Arabica roasts, cold brews, and freshly baked flaky croissants in an urban oasis.',
    businessType: 'Cafe',
    phone: '+91 97890 22334',
    whatsappNumber: '+919789022334',
    email: 'hello@brewandbean.in',
    address: '42 East Club Road, Shenoy Nagar, Chennai, Tamil Nadu 600030',
    googleMapsUrl: 'https://maps.google.com/?q=Chennai+Shenoy+Nagar',
    instagramUrl: 'https://instagram.com/brewandbean',
    facebookUrl: 'https://facebook.com/brewandbean',
    logo: '☕',
    favicon: '/favicon.ico',
    currency: '₹',
    timezone: 'Asia/Kolkata'
  },
  categories: ['Hot Coffee', 'Cold Brews', 'Teas & Infusions', 'Desserts', 'Artisan Toast'],
  menu: [
    {
      id: 'c-01',
      name: 'Pour Over (Yercaud Estate Arabica)',
      description: 'Hand-brewed single estate coffee with bright citrus aroma and dark chocolate undertones.',
      price: 180,
      category: 'Hot Coffee',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      isAvailable: true,
      isPopular: true,
      prepTime: '7 mins'
    },
    {
      id: 'c-02',
      name: 'Vanilla Cold Brew Latte',
      description: '18-hour cold steeped concentrate poured over oat milk and Madagascar vanilla bean syrup.',
      price: 210,
      category: 'Cold Brews',
      image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      isAvailable: true,
      isPopular: true,
      prepTime: '5 mins'
    },
    {
      id: 'c-03',
      name: 'Avocado Sourdough Toast',
      description: 'Toasted seeded sourdough with smashed Hass avocado, cherry tomatoes, feta crumble, and chili flakes.',
      price: 240,
      category: 'Artisan Toast',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      isAvailable: true,
      isPopular: true,
      prepTime: '10 mins'
    },
    {
      id: 'c-04',
      name: 'Lotus Biscoff Cheesecake',
      description: 'Velvety New York style baked cheesecake layered with caramelized spiced biscuit spread.',
      price: 220,
      category: 'Desserts',
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      isAvailable: true,
      isPopular: true,
      prepTime: '3 mins'
    }
  ],
  ordering: {
    takeaway: true,
    dining: true,
    delivery: true
  },
  delivery: {
    enabled: true,
    deliveryCharge: 30,
    minimumOrder: 150,
    deliveryArea: 'Within 5 km radius of Shenoy Nagar, Chennai'
  },
  hours: [
    {
      day: 'Monday',
      isClosed: false,
      shifts: [{ name: 'All Day', open: '08:00', close: '22:00' }]
    },
    {
      day: 'Tuesday',
      isClosed: false,
      shifts: [{ name: 'All Day', open: '08:00', close: '22:00' }]
    },
    {
      day: 'Wednesday',
      isClosed: false,
      shifts: [{ name: 'All Day', open: '08:00', close: '22:00' }]
    },
    {
      day: 'Thursday',
      isClosed: false,
      shifts: [{ name: 'All Day', open: '08:00', close: '22:00' }]
    },
    {
      day: 'Friday',
      isClosed: false,
      shifts: [{ name: 'All Day', open: '08:00', close: '23:00' }]
    },
    {
      day: 'Saturday',
      isClosed: false,
      shifts: [{ name: 'All Day', open: '08:00', close: '23:00' }]
    },
    {
      day: 'Sunday',
      isClosed: false,
      shifts: [{ name: 'All Day', open: '08:00', close: '23:00' }]
    }
  ],
  timeSlots: {
    slotInterval: 30,
    minAdvanceBookingMinutes: 20,
    maxBookingDays: 5,
    openingTime: '08:00',
    closingTime: '22:00'
  },
  specialDates: [],
  seo: {
    metaTitle: 'Brew & Bean Cafe | Specialty Coffee & Roastery',
    metaDescription: 'Artisanal pour-overs, cold brew, and fresh gourmet cafe bakes. WhatsApp pickup and table seating.',
    keywords: 'cafe, specialty coffee, chennai cafe, cold brew, avocado toast'
  }
};

// Initial Factory Seed for Sweet Crumbs Bakery
export const initialBakeryStore: BusinessDemoStore = {
  business: {
    id: 'bakery',
    name: 'Sweet Crumbs Bakery',
    tagline: 'Artisanal Bakes & Custom Celebration Cakes',
    description: 'Handcrafted sourdough loaves, French butter pastries, and bespoke celebration cakes made to order.',
    businessType: 'Bakery',
    phone: '+91 94421 99887',
    whatsappNumber: '+919442199887',
    email: 'orders@sweetcrumbs.in',
    address: '18 Cross Cut Road, Gandhipuram, Coimbatore, Tamil Nadu 641012',
    googleMapsUrl: 'https://maps.google.com/?q=Gandhipuram+Coimbatore',
    instagramUrl: 'https://instagram.com/sweetcrumbs_bakes',
    facebookUrl: 'https://facebook.com/sweetcrumbs',
    logo: '🥐',
    favicon: '/favicon.ico',
    currency: '₹',
    timezone: 'Asia/Kolkata'
  },
  categories: ['Custom Cakes', 'Pastries', 'Artisan Bread', 'Cookies', 'Savouries'],
  menu: [
    {
      id: 'bk-01',
      name: 'Belgian Dark Truffle Cake (1 Kg)',
      description: 'Silky 70% dark Belgian couverture ganache layered between moist Dutch chocolate sponge.',
      price: 850,
      category: 'Custom Cakes',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      isAvailable: true,
      isPopular: true,
      prepTime: '2 hours'
    },
    {
      id: 'bk-02',
      name: 'Pure Butter French Croissant',
      description: 'Laminated with premium French butter for golden honeycomb layers and crisp flaky crust.',
      price: 95,
      category: 'Pastries',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      isAvailable: true,
      isPopular: true,
      prepTime: 'Baked fresh daily'
    },
    {
      id: 'bk-03',
      name: 'Country Sourdough Loaf (Whole)',
      description: 'Naturally fermented 36-hour sourdough with open crumb and caramelized blistered crust.',
      price: 140,
      category: 'Artisan Bread',
      image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      isAvailable: true,
      isPopular: false,
      prepTime: 'Ready to slice'
    }
  ],
  ordering: {
    takeaway: true,
    dining: false,
    delivery: true
  },
  delivery: {
    enabled: true,
    deliveryCharge: 50,
    minimumOrder: 300,
    deliveryArea: 'Coimbatore Municipal Corporation limits'
  },
  hours: [
    {
      day: 'Monday',
      isClosed: false,
      shifts: [{ name: 'Store Hours', open: '09:00', close: '21:30' }]
    },
    {
      day: 'Tuesday',
      isClosed: false,
      shifts: [{ name: 'Store Hours', open: '09:00', close: '21:30' }]
    },
    {
      day: 'Wednesday',
      isClosed: false,
      shifts: [{ name: 'Store Hours', open: '09:00', close: '21:30' }]
    },
    {
      day: 'Thursday',
      isClosed: false,
      shifts: [{ name: 'Store Hours', open: '09:00', close: '21:30' }]
    },
    {
      day: 'Friday',
      isClosed: false,
      shifts: [{ name: 'Store Hours', open: '09:00', close: '22:00' }]
    },
    {
      day: 'Saturday',
      isClosed: false,
      shifts: [{ name: 'Store Hours', open: '09:00', close: '22:00' }]
    },
    {
      day: 'Sunday',
      isClosed: false,
      shifts: [{ name: 'Store Hours', open: '09:00', close: '21:30' }]
    }
  ],
  timeSlots: {
    slotInterval: 30,
    minAdvanceBookingMinutes: 60,
    maxBookingDays: 14,
    openingTime: '09:00',
    closingTime: '21:30'
  },
  specialDates: [],
  seo: {
    metaTitle: 'Sweet Crumbs Bakery | Custom Birthday Cakes & Artisan Breads',
    metaDescription: 'Fresh Belgian chocolate cakes, butter croissants and sourdough. Order custom cakes directly on WhatsApp.',
    keywords: 'bakery, custom cakes, birthday cake, coimbatore bakery, sourdough'
  }
};

const STORAGE_PREFIX = 'demo_biz_store_';
const ACTIVE_BIZ_KEY = 'demo_active_biz_id';

export class DemoConfigStore {
  // Get active business ID for the demo admin
  static getActiveBusinessId(): string {
    return localStorage.getItem(ACTIVE_BIZ_KEY) || 'restaurant';
  }

  static setActiveBusinessId(id: string): void {
    localStorage.setItem(ACTIVE_BIZ_KEY, id);
    window.dispatchEvent(new Event('demo_config_changed'));
  }

  // Get Store for a specific business
  static getStore(businessId?: string): BusinessDemoStore {
    const id = businessId || this.getActiveBusinessId();
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing stored config, using factory defaults', e);
      }
    }

    // Default fallbacks
    if (id === 'cafe') return initialCafeStore;
    if (id === 'bakery') return initialBakeryStore;
    return initialRestaurantStore;
  }

  // Save Store updates
  static saveStore(businessId: string, store: BusinessDemoStore): void {
    localStorage.setItem(`${STORAGE_PREFIX}${businessId}`, JSON.stringify(store));
    window.dispatchEvent(new Event('demo_config_changed'));
  }

  // Reset a specific business store to factory state
  static resetStore(businessId: string): BusinessDemoStore {
    let factoryStore = initialRestaurantStore;
    if (businessId === 'cafe') factoryStore = initialCafeStore;
    if (businessId === 'bakery') factoryStore = initialBakeryStore;

    localStorage.setItem(`${STORAGE_PREFIX}${businessId}`, JSON.stringify(factoryStore));
    window.dispatchEvent(new Event('demo_config_changed'));
    return factoryStore;
  }

  // Reset all business stores
  static resetAllStores(): void {
    localStorage.setItem(`${STORAGE_PREFIX}restaurant`, JSON.stringify(initialRestaurantStore));
    localStorage.setItem(`${STORAGE_PREFIX}cafe`, JSON.stringify(initialCafeStore));
    localStorage.setItem(`${STORAGE_PREFIX}bakery`, JSON.stringify(initialBakeryStore));
    window.dispatchEvent(new Event('demo_config_changed'));
  }

  // Current IST wall-clock parts, independent of the browser's timezone.
  static getIstNowParts(): { dateStr: string; minuteOfDay: number } {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(new Date());
    const get = (t: string) => parts.find(p => p.type === t)?.value || '00';
    const hour = Number(get('hour')) % 24;
    return {
      dateStr: `${get('year')}-${get('month')}-${get('day')}`,
      minuteOfDay: hour * 60 + Number(get('minute'))
    };
  }

  // YYYY-MM-DD in IST, offset by N days.
  static getIstDateString(offsetDays = 0): string {
    const today = this.getIstNowParts().dateStr;
    const d = new Date(`${today}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + offsetDays);
    return d.toISOString().slice(0, 10);
  }

  // Generate dynamic IST Time Slots for a given date (YYYY-MM-DD, IST calendar date)
  static generateTimeSlots(businessId: string, targetDateStr: string): { slots: string[]; isClosed: boolean; reason?: string } {
    const store = this.getStore(businessId);
    const { dateStr: todayIst, minuteOfDay: nowMinute } = this.getIstNowParts();

    if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDateStr)) {
      return { slots: [], isClosed: true, reason: 'Please select a valid date.' };
    }
    if (targetDateStr < todayIst) {
      return { slots: [], isClosed: true, reason: 'Past dates cannot be selected.' };
    }
    const maxDate = this.getIstDateString(store.timeSlots.maxBookingDays ?? 7);
    if (targetDateStr > maxDate) {
      return { slots: [], isClosed: true, reason: `Orders can be placed up to ${store.timeSlots.maxBookingDays} days in advance.` };
    }

    // Special date overrides (holidays / special openings)
    const special = store.specialDates.find(d => d.date === targetDateStr);
    if (special && special.isClosed) {
      return { slots: [], isClosed: true, reason: special.reason || 'Closed on this date' };
    }

    // Day of week computed on the IST calendar date (UTC-anchored to avoid browser TZ drift)
    const dayNames: DayHours['day'][] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayName = dayNames[new Date(`${targetDateStr}T00:00:00Z`).getUTCDay()];
    const daySchedule = store.hours.find(h => h.day === currentDayName);

    let shifts: DayShift[] = daySchedule && !daySchedule.isClosed ? daySchedule.shifts : [];

    // Special opening date with custom hours "HH:MM-HH:MM" overrides weekly schedule
    if (special && !special.isClosed && special.customHours) {
      const m = special.customHours.match(/(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})/);
      if (m) shifts = [{ name: special.reason || 'Special', open: m[1], close: m[2] }];
    }

    if (shifts.length === 0) {
      return { slots: [], isClosed: true, reason: `Closed on ${currentDayName}s` };
    }

    const isToday = targetDateStr === todayIst;
    const earliestMinute = isToday ? nowMinute + (store.timeSlots.minAdvanceBookingMinutes ?? 30) : -1;
    const intervalMinutes = Math.max(5, store.timeSlots.slotInterval || 30);
    const seen = new Set<number>();
    const minutes: number[] = [];

    shifts.forEach(shift => {
      const [openHour, openMin] = shift.open.split(':').map(Number);
      const [closeHour, closeMin] = shift.close.split(':').map(Number);
      const start = openHour * 60 + openMin;
      const end = closeHour * 60 + closeMin;
      for (let t = start; t <= end; t += intervalMinutes) {
        if (t < earliestMinute || seen.has(t)) continue;
        seen.add(t);
        minutes.push(t);
      }
    });

    minutes.sort((a, b) => a - b);
    const generatedSlots = minutes.map(t => {
      const hour = Math.floor(t / 60);
      const minute = t % 60;
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${displayHour}:${minute.toString().padStart(2, '0')} ${period} IST`;
    });

    return {
      slots: generatedSlots,
      isClosed: generatedSlots.length === 0,
      reason: generatedSlots.length === 0 ? 'No ordering slots are available for this date.' : undefined
    };
  }

  // Format and generate WhatsApp Order URL
  static generateWhatsAppOrderUrl(params: {
    businessId: string;
    customerName: string;
    customerPhone: string;
    orderType: 'Takeaway' | 'Dining' | 'Delivery';
    date: string;
    timeSlot: string;
    items: { name: string; quantity: number; price: number }[];
    deliveryAddress?: string;
    landmark?: string;
    guestCount?: number;
    specialInstructions?: string;
  }): { url: string; message: string } {
    const store = this.getStore(params.businessId);
    const targetWhatsApp = store.business.whatsappNumber.replace(/[^0-9]/g, '');

    const totalQty = params.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = params.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Delivery charge calculation
    let deliveryChargeText = '';
    let grandTotal = subtotal;

    if (params.orderType === 'Delivery') {
      if (store.delivery.enabled && store.delivery.deliveryCharge > 0) {
        grandTotal += store.delivery.deliveryCharge;
        deliveryChargeText = `\n*Delivery Fee:* ₹${store.delivery.deliveryCharge}`;
      } else {
        deliveryChargeText = `\n*Delivery Fee:* To be confirmed by restaurant`;
      }
    }

    const readableDate = (() => {
      const d = new Date(`${params.date}T00:00:00Z`);
      return isNaN(d.getTime())
        ? params.date
        : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });
    })();

    const intro =
      params.orderType === 'Delivery' ? 'I would like to place a *DELIVERY* order.' :
      params.orderType === 'Dining' ? 'I would like to reserve/order for *DINING*.' :
      'I would like to place a *TAKEAWAY* order.';

    let message = `Hello *${store.business.name}*,\n\n${intro}\n\n`;
    message += `*Order Type:* ${params.orderType}\n`;
    message += `*Customer:* ${params.customerName}\n`;
    message += `*Phone:* ${params.customerPhone}\n\n`;

    message += `*Date:* ${readableDate}\n`;
    message += `*Time:* ${params.timeSlot}\n\n`;

    if (params.orderType === 'Delivery' && params.deliveryAddress) {
      message += `*Delivery Address:* ${params.deliveryAddress}\n`;
      if (params.landmark) {
        message += `*Landmark:* ${params.landmark}\n`;
      }
      message += '\n';
    }

    if (params.orderType === 'Dining' && params.guestCount) {
      message += `*Number of Guests:* ${params.guestCount} People\n\n`;
    }

    message += `*Order Items:*\n`;
    params.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} × ${item.quantity} — ₹${item.price * item.quantity}\n`;
    });

    message += `\n*Total Items:* ${totalQty}\n`;
    message += `*Subtotal:* ₹${subtotal}${deliveryChargeText}\n`;
    message += `*Estimated Grand Total:* ₹${grandTotal}\n\n`;

    if (params.specialInstructions) {
      message += `*Special Note:* ${params.specialInstructions}\n\n`;
    }

    message += params.orderType === 'Dining'
      ? `Please confirm availability.\nThank you!`
      : params.orderType === 'Delivery'
        ? `Please confirm availability and delivery charges.\nThank you!`
        : `Please confirm my order.\nThank you!`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${targetWhatsApp}?text=${encoded}`;

    return { url, message };
  }
}
