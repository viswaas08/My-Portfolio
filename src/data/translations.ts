export type Language = 'en' | 'ta';

export interface Translations {
  nav: {
    home: string;
    services: string;
    pricing: string;
    demos: string;
    process: string;
    projects: string;
    faq: string;
    contact: string;
    cta: string;
    badge: string;
    callDirect: string;
    langToggle: string;
  };
  hero: {
    badge: string;
    headlinePart1: string;
    headlinePart2: string;
    supporting: string;
    viewDemos: string;
    consultation: string;
    trust1: string;
    trust2: string;
    trust3: string;
    trust4: string;
    mockupUrl: string;
    previewBadge: string;
    dishName1: string;
    dishName2: string;
    orderOnline: string;
    whatsappDirect: string;
    tableBooking: string;
  };
  problem: {
    badge: string;
    title: string;
    subtitle: string;
    quote: string;
    quoteHighlight: string;
    quoteSub: string;
    cta: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    startingFrom: string;
    idealFor: string;
    included: string;
    previewDemo: string;
    cards: {
      id: string;
      title: string;
      badge: string;
      subtitle: string;
      idealFor: string[];
      startingPrice: string;
      features: string[];
      ctaText: string;
    }[];
  };
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    mostPopular: string;
    startingPriceLabel: string;
    bestForLabel: string;
    includedLabel: string;
    whatsappInquiry: string;
    noticeTitle: string;
    noticeDesc: string;
    domainNote: string;
    tiers: {
      id: string;
      name: string;
      price: string;
      tagline: string;
      bestFor: string;
      delivery: string;
      revisions: string;
      features: string[];
      ctaText: string;
      whatsappMsg: string;
    }[];
  };
  demos: {
    badge: string;
    title: string;
    subtitle: string;
    openDemo: string;
    recommendedPlan: string;
    keyFeatures: string;
    filterAll: string;
  };
  process: {
    badge: string;
    title: string;
    subtitle: string;
    steps: {
      step: string;
      title: string;
      desc: string;
    }[];
  };
  why: {
    badge: string;
    title: string;
    subtitle: string;
    cards: {
      title: string;
      desc: string;
    }[];
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    note: string;
    problemSolved: string;
    technicalSolution: string;
    keyFeatures: string;
    viewGithub: string;
    liveProject: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    bannerTitle: string;
    bannerSub: string;
    whatsappBtn: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    fastestResponse: string;
    chatDirect: string;
    openChat: string;
    emailInquiries: string;
    sendEmail: string;
    baseLocation: string;
    locationVal: string;
    devProfiles: string;
    formTitle: string;
    nameLabel: string;
    businessNameLabel: string;
    businessTypeLabel: string;
    phoneLabel: string;
    emailLabel: string;
    reqLabel: string;
    sendBtn: string;
    whatsappBtn: string;
    privacyNote: string;
    successTitle: string;
    successDesc: string;
    submitAnother: string;
  };
  modal: {
    title: string;
    subtitle: string;
    name: string;
    businessName: string;
    businessType: string;
    phone: string;
    email: string;
    packageLabel: string;
    message: string;
    submit: string;
    chatWhatsapp: string;
    successTitle: string;
    successDesc: string;
    close: string;
  };
  footer: {
    tagline: string;
    navigation: string;
    workingDemos: string;
    directContact: string;
    rights: string;
    builtBy: string;
  };
  floating: {
    demoLabel: string;
    question: string;
    whatsapp: string;
    getWebsite: string;
    allDemos: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      pricing: "Pricing",
      demos: "Demos",
      process: "Process",
      projects: "Projects",
      faq: "FAQ",
      contact: "Contact",
      cta: "Get My Website",
      badge: "8 Demos",
      callDirect: "Call",
      langToggle: "தமிழ்",
    },
    hero: {
      badge: "Websites for Local Businesses",
      headlinePart1: "Turn Your Local Business Into a",
      headlinePart2: "Professional Online Brand.",
      supporting: "I build fast, mobile-friendly websites for restaurants, cafes, shops and local businesses that make it easier for customers to discover you, contact you and visit you.",
      viewDemos: "View Demo Websites",
      consultation: "Get a Free Consultation",
      trust1: "React 19",
      trust2: "Modern UI",
      trust3: "Mobile First",
      trust4: "Fast Deployment",
      mockupUrl: "spiceroute-restaurant.in",
      previewBadge: "Live Preview",
      dishName1: "Ghee Roast Dosa",
      dishName2: "Mutton Sukka",
      orderOnline: "Order Online",
      whatsappDirect: "Instant WhatsApp Order",
      tableBooking: "Table Reservation",
    },
    problem: {
      badge: "The Local Business Challenge",
      title: "Is Your Business Missing Customers Online?",
      subtitle: "Every single day, nearby people search for restaurants, salons, groceries, and clinics around your locality. Here is why many walk into competing stores instead:",
      quote: "Your customers are already online.",
      quoteHighlight: "Your business should be too.",
      quoteSub: "A fast, mobile-friendly website acts as your 24/7 digital front door — answering questions, showing photos, and booking appointments even while you sleep.",
      cta: "See how your business can look",
      items: [
        { title: "No Professional Website", desc: "Relying purely on social media pages or outdated directories makes your business look informal and leaves potential customers skeptical." },
        { title: "Doesn't Work Well on Mobile", desc: "Over 80% of local diners and shoppers search on their phones. If your page is slow or awkward to scroll, they click back to a competitor in seconds." },
        { title: "Menu & Services Are Hard to See", desc: "Customers get frustrated searching through messy PDF attachments or blurry photos just to check what dishes, haircuts, or products you offer." },
        { title: "No Clear WhatsApp Contact Option", desc: "Nobody wants to fill out obsolete 10-field contact forms. Today's customers want a 1-tap direct WhatsApp conversation to place orders or ask questions." },
        { title: "Key Info is Difficult to Find", desc: "Opening hours, today's availability, exact Google Map location, and payment methods should take 2 seconds to spot, not endless scrolling." },
        { title: "Outdated Online Appearance", desc: "First impressions are made online. A modern, polished website immediately signals superior hygiene, service quality, and reliability." },
      ]
    },
    services: {
      badge: "Services & Capabilities",
      title: "Website Solutions Built for Real Local Growth",
      subtitle: "Every package is tailored to help nearby customers discover you on Google Maps, browse what you offer on their smartphones, and contact you directly via WhatsApp.",
      startingFrom: "Starting from",
      idealFor: "Ideal For:",
      included: "Included Features:",
      previewDemo: "See Demo Preview",
      cards: [
        {
          id: "business-website",
          title: "Business Website",
          badge: "Fast Launch",
          subtitle: "Clean, high-impact online storefront for local shops, clinics, and service providers.",
          idealFor: ["Retail Shops", "Local Services", "Clinics", "Tuition Centres", "Home Businesses"],
          startingPrice: "₹4,999",
          features: [
            "100% Mobile responsive layout",
            "Home, About & Services showcase",
            "One-tap WhatsApp direct chat button",
            "Interactive Google Maps store location",
            "Click-to-call phone & email contact",
            "Social media profile integration",
            "Basic on-page local SEO setup",
            "High-speed Vercel/Netlify cloud deployment"
          ],
          ctaText: "Get Starter Website",
        },
        {
          id: "restaurant-cafe-website",
          title: "Restaurant & Cafe Website",
          badge: "High Conversion",
          subtitle: "Mouth-watering digital presence with interactive categorization, digital menu, and table booking.",
          idealFor: ["Restaurants", "Cafes", "Bakeries", "Food Trucks", "Cloud Kitchens"],
          startingPrice: "₹7,999",
          features: [
            "Interactive Digital Menu with categories",
            "High-resolution dish cards with pricing",
            "Direct WhatsApp Food Order placement",
            "Table Reservation & Party enquiry form",
            "Live Opening Hours & Weekly timings",
            "Photo gallery for ambience & food",
            "Customer testimonials & review highlights",
            "Instant Google Maps directions link"
          ],
          ctaText: "Get Food & Cafe Website",
        },
        {
          id: "business-web-app",
          title: "Business Web Application",
          badge: "Advanced Functionality",
          subtitle: "Custom operational software, client portals, and administrative dashboard systems.",
          idealFor: ["Gyms with Memberships", "Tuition & Academies", "Appointment Clinics", "Multi-branch Ops"],
          startingPrice: "₹19,999",
          features: [
            "Secure Role-based User Authentication",
            "Custom Admin Dashboard with live metrics",
            "Full Database setup (PostgreSQL / MongoDB)",
            "Automated CRUD data management",
            "Client enquiry & member tracking",
            "Exportable reports (Excel / PDF / CSV)",
            "Custom business workflow automation",
            "API integrations & secure cloud deployment"
          ],
          ctaText: "Discuss Web Application",
        },
        {
          id: "custom-website",
          title: "Custom Tailored Website",
          badge: "Bespoke Architecture",
          subtitle: "Tailored from ground up with specialized animations, custom calculators, or external system hooks.",
          idealFor: ["Specialized Brands", "Franchises", "Unique Business Models", "Full Rebranding"],
          startingPrice: "Custom Quote",
          features: [
            "Bespoke UI/UX crafted to your brand guidelines",
            "Interactive custom calculators & quoting tools",
            "Multilingual language toggle support",
            "Third-party CRM / WhatsApp automation hooks",
            "Advanced page transition animations",
            "Comprehensive speed & Core Web Vitals optimization",
            "Staff onboarding training & walkthrough video",
            "Priority post-launch support"
          ],
          ctaText: "Request a Quote",
        }
      ]
    },
    pricing: {
      badge: "Clear & Transparent Pricing",
      title: "Invest in a Website That Pays For Itself",
      subtitle: "No hidden retainers, no confusing tech jargon. Simple upfront packages built specifically for Indian local businesses.",
      mostPopular: "Most Popular Choice",
      startingPriceLabel: "starting price",
      bestForLabel: "Best for:",
      includedLabel: "What is included:",
      whatsappInquiry: "Inquire via WhatsApp",
      noticeTitle: "Transparent, Honest Pricing",
      noticeDesc: "Prices listed above are starting prices for standard scope. Final pricing depends on your unique design needs, custom features, specific content volume, and external integrations.",
      domainNote: "Custom domain registration (e.g. .com, .in), cloud hosting renewal, third-party SMS/payment gateway accounts, and premium commercial assets are billed directly by respective providers.",
      tiers: [
        {
          id: "starter",
          name: "Starter",
          price: "₹4,999",
          tagline: "The essential online launchpad for local shops and neighborhood services.",
          bestFor: "Small shops, single-service providers, and local businesses taking their first step online.",
          delivery: "5–7 days",
          revisions: "2 rounds",
          features: [
            "1–3 Modern responsive pages",
            "Mobile-first responsive design",
            "Business information & about section",
            "Services or products showcase",
            "One-click WhatsApp chat button",
            "Interactive Google Maps location",
            "Contact details & enquiry form",
            "Social media links integration",
            "Basic on-page SEO setup",
            "Fast deployment on cloud hosting"
          ],
          ctaText: "Choose Starter",
          whatsappMsg: "Hi Viswaas, I want to get started with the Starter Package (₹4,999) for my business."
        },
        {
          id: "business",
          name: "Business",
          price: "₹9,999",
          tagline: "Our high-impact package with rich visual presentation and interactive features.",
          bestFor: "Restaurants, cafes, bakeries, salons, gyms, and growing local brands wanting standout quality.",
          delivery: "7–10 days",
          revisions: "3 rounds",
          features: [
            "5–7 Premium responsive pages / sections",
            "Custom aesthetic branding & tailored color scheme",
            "Interactive Digital Menu / Services catalog with filters",
            "High-res photo gallery (Ambience, dishes, facilities)",
            "Integrated WhatsApp ordering / booking links",
            "Google Maps integration with quick directions",
            "Detailed contact & enquiry form with validation",
            "Live opening hours & weekly schedule widget",
            "Customer reviews & trust badges showcase",
            "Local SEO optimization & Open Graph preview tags",
            "Social media feeds & integration",
            "Mobile speed & performance optimization",
            "Fast deployment + 14 days post-launch support"
          ],
          ctaText: "Choose Business",
          whatsappMsg: "Hi Viswaas, I want to choose the Business Package (₹9,999 - Most Popular) for my business website."
        },
        {
          id: "pro-web-app",
          name: "Pro Web App",
          price: "₹19,999+",
          tagline: "Custom web software with databases, member logins, and administrative control.",
          bestFor: "Businesses requiring dynamic data management, customer portals, or bespoke operational workflows.",
          delivery: "Discuss based on requirements",
          revisions: "Dedicated milestone reviews",
          features: [
            "Full React / modern web app frontend",
            "Secure Backend API & database architecture",
            "Role-based authentication (Admin / Staff / Client)",
            "Custom Admin Dashboard with live statistics",
            "Full CRUD functionality (add, edit, delete records)",
            "User management & customer directory",
            "Custom business workflow automation",
            "Automated PDF receipts / report generation",
            "Third-party API & payment gateway hooks",
            "Scalable cloud deployment with database backups",
            "Complete handover walkthrough & documentation"
          ],
          ctaText: "Discuss My Project",
          whatsappMsg: "Hi Viswaas, I have requirements for a custom Pro Web App (₹19,999+) and would like to discuss the scope."
        }
      ]
    },
    demos: {
      badge: "Interactive Showroom",
      title: "See What Your Business Could Look Like",
      subtitle: "Choose your business type and explore a realistic website demo. Each is an actual working page with menus, forms, and WhatsApp order flows.",
      openDemo: "Open Live Demo",
      recommendedPlan: "Recommended Plan:",
      keyFeatures: "Key Demo Features:",
      filterAll: "All Demos",
    },
    process: {
      badge: "Simple 5-Step Process",
      title: "How It Works",
      subtitle: "From initial idea to live domain launch in as little as 5 days. No technical headaches on your end.",
      steps: [
        { step: "01", title: "Tell Me About Your Business", desc: "Share your business details, food menu, services, photos, and contact info via WhatsApp or a short phone call." },
        { step: "02", title: "Choose Your Design & Vibe", desc: "Select a visual direction, color theme, and layout that matches your store's personality and local customer base." },
        { step: "03", title: "I Build Your Website", desc: "I craft a fast, mobile-friendly website with custom WhatsApp ordering, Google Maps, and SEO optimization in 5–10 days." },
        { step: "04", title: "You Review & Request Revisions", desc: "You test the live preview link on your own phone. We refine menu items, prices, and copy together until you love it." },
        { step: "05", title: "Launch & Go Live", desc: "We connect your custom domain (yourbusiness.com/.in), verify on Google Search, and celebrate your new digital storefront!" }
      ]
    },
    why: {
      badge: "Why Partner With Viswaa Web",
      title: "Built for Real Reliability & Local Conversions",
      subtitle: "I don't make unrealistic promises. I deliver clean, fast, and modern digital storefronts that make your business look world-class.",
      cards: [
        { title: "Mobile First Architecture", desc: "Designed ground-up for smartphone screens where your local customers browse menus and look for directions." },
        { title: "Fast-Loading Performance", desc: "Built with modern React and clean code so your website loads in under a second without bloated page builders." },
        { title: "Custom Modern Aesthetics", desc: "Distinctive, high-end styling tailored specifically to your trade — no generic copy-pasted templates." },
        { title: "Seamless WhatsApp Integration", desc: "Direct 1-tap chats with pre-filled order and booking inquiries, turning website visitors into immediate conversations." },
        { title: "Local SEO Ready", desc: "Proper meta tags, schema markup, and Google Maps alignment so nearby customers can find you effortlessly." },
        { title: "Honest & Affordable Pricing", desc: "Transparent upfront packages starting at ₹4,999 with no sneaky long-term contracts or hidden surprises." },
        { title: "Full Cross-Device Compatibility", desc: "Flawless rendering and touch-friendly controls tested across iPhone, Android, tablets, laptops, and 4K displays." },
        { title: "Direct Developer Access", desc: "You deal directly with me, Viswaas. No frustrating account managers or offshore communication gaps." }
      ]
    },
    projects: {
      badge: "Technical Engineering Projects",
      title: "Complex Systems & Engineering Work",
      subtitle: "In addition to local business websites, I build full-stack web applications, databases, and custom workflows. These showcase my technical depth and architecture capabilities.",
      note: "* Note: These are independent engineering systems and previous development work, separate from local client demo websites.",
      problemSolved: "Problem Solved",
      technicalSolution: "Technical Solution",
      keyFeatures: "Key Technical Features:",
      viewGithub: "View GitHub Code",
      liveProject: "Live Project Link",
    },
    faq: {
      badge: "Frequently Asked Questions",
      title: "Everything You Need to Know",
      subtitle: "Direct answers to common business questions about timelines, custom domains, updates, and payments.",
      bannerTitle: "Have a specific question not covered here?",
      bannerSub: "Send a message directly to Viswaas for a quick, no-pressure chat.",
      whatsappBtn: "Ask on WhatsApp",
    },
    contact: {
      badge: "Get In Touch",
      title: "Let's Build Your Online Presence",
      subtitle: "Whether you run a cafe, clinic, salon, gym, or retail shop, let's talk about how a modern website can attract more local customers.",
      fastestResponse: "Fastest Response",
      chatDirect: "WhatsApp Chat Direct",
      openChat: "Open Chat →",
      emailInquiries: "Email Inquiries",
      sendEmail: "Send Email →",
      baseLocation: "Base Location",
      locationVal: "Coimbatore, Tamil Nadu, India (Available Worldwide)",
      devProfiles: "Developer Profiles",
      formTitle: "Project Inquiry Form",
      nameLabel: "Your Name *",
      businessNameLabel: "Business Name",
      businessTypeLabel: "Business Type",
      phoneLabel: "WhatsApp Number *",
      emailLabel: "Email Address (Optional)",
      reqLabel: "Requirements & Details",
      sendBtn: "Send Enquiry",
      whatsappBtn: "Chat on WhatsApp",
      privacyNote: "Your contact details are strictly kept private. No spam.",
      successTitle: "Thank You!",
      successDesc: "Your inquiry details have been generated. Let's start the conversation on WhatsApp right away.",
      submitAnother: "Submit Another Inquiry",
    },
    modal: {
      title: "Get Your Business Website",
      subtitle: "Direct consultation with Viswaas • No obligation",
      name: "Your Name *",
      businessName: "Business Name",
      businessType: "Business Type",
      phone: "Phone / WhatsApp *",
      email: "Email Address (Optional)",
      packageLabel: "Package Preference",
      message: "Tell me a bit about what you need",
      submit: "Submit Inquiry",
      chatWhatsapp: "Chat on WhatsApp Now",
      successTitle: "Inquiry Details Received!",
      successDesc: "Thank you! Let's fast-track your project discussion directly on WhatsApp right now.",
      close: "Close Window",
    },
    footer: {
      tagline: "Modern websites for ambitious local businesses. Fast loading, mobile-first, and designed to turn online searches into paying customers.",
      navigation: "Navigation",
      workingDemos: "Working Demos",
      directContact: "Direct Contact",
      rights: "© 2026 Viswaa Web. All rights reserved.",
      builtBy: "Architected & Built by Viswaas • Full-Stack Developer for Local Businesses",
    },
    floating: {
      demoLabel: "Live Demo:",
      question: "Want a website like this for your business?",
      whatsapp: "WhatsApp",
      getWebsite: "Get This Website",
      allDemos: "All Demos",
    }
  },
  ta: {
    nav: {
      home: "முகப்பு",
      services: "சேவைகள்",
      pricing: "கட்டணங்கள்",
      demos: "மாதிரிகள்",
      process: "செயல்முறை",
      projects: "திட்டங்கள்",
      faq: "கேள்வி-பதில்",
      contact: "தொடர்பு",
      cta: "இணையதளம் பெறுங்கள்",
      badge: "8 மாதிரிகள்",
      callDirect: "அழைக்கவும்",
      langToggle: "English",
    },
    hero: {
      badge: "உள்ளூர் வணிகங்களுக்கான இணையதளங்கள்",
      headlinePart1: "உங்கள் உள்ளூர் வணிகத்தை ஒரு",
      headlinePart2: "தொழில்முறை பிராண்டாக மாற்றுங்கள்.",
      supporting: "உணவகங்கள், கஃபேக்கள், கடைகள் மற்றும் உள்ளூர் வணிகங்களுக்காக அதிவேக, மொபைல் நட்பு இணையதளங்களை உருவாக்குகிறேன் — வாடிக்கையாளர்கள் உங்களை எளிதாகக் கண்டறியவும், தொடர்பு கொள்ளவும் உதவுகிறது.",
      viewDemos: "மாதிரி இணையதளங்களை பார்க்க",
      consultation: "இலவச ஆலோசனை பெற",
      trust1: "ரியாக்ட் 19",
      trust2: "நவீன வடிவமைப்பு",
      trust3: "மொபைல் ஃபர்ஸ்ட்",
      trust4: "விரைவான வெளியீடு",
      mockupUrl: "spiceroute-restaurant.in",
      previewBadge: "நேரலை மாதிரி",
      dishName1: "நெய் ரோஸ்ட் தோசை",
      dishName2: "மட்டன் சுக்கா",
      orderOnline: "ஆர்டர் செய்யுங்கள்",
      whatsappDirect: "வாட்ஸ்அப் நேரடி ஆர்டர்",
      tableBooking: "டேபிள் முன்பதிவு",
    },
    problem: {
      badge: "உள்ளூர் வணிகங்களின் சவால்",
      title: "உங்கள் வணிகம் இணையத்தில் வாடிக்கையாளர்களை இழக்கிறதா?",
      subtitle: "தினமும் உங்கள் பகுதி மக்கள் உணவகங்கள், சலூன்கள், மளிகைக் கடைகள், கிளினிக்குகளை மொபைலில் தேடுகிறார்கள். அவர்கள் மற்ற கடைகளுக்குச் செல்ல இதுவே காரணம்:",
      quote: "உங்கள் வாடிக்கையாளர்கள் ஏற்கனவே இணையத்தில் உள்ளனர்.",
      quoteHighlight: "உங்கள் வணிகமும் இணையத்தில் இருக்க வேண்டும்.",
      quoteSub: "ஒரு வேகமான, மொபைல் நட்பு இணையதளம் உங்கள் 24/7 டிஜிட்டல் வரவேற்பாளராக செயல்பட்டு, நீங்கள் தூங்கும் போதும் ஆர்டர்களையும் முன்பதிவுகளையும் பெற உதவுகிறது.",
      cta: "உங்கள் வணிக இணையதளம் எப்படி இருக்கும் எனப் பார்க்க",
      items: [
        { title: "தொழில்முறை இணையதளம் இல்லாமை", desc: "வெறும் சமூக ஊடகப் பக்கங்களை மட்டுமே நம்பியிருப்பது உங்கள் கடையின் நற்பெயரைக் குறைத்து வாடிக்கையாளர்களிடம் தயக்கத்தை ஏற்படுத்துகிறது." },
        { title: "மொபைலில் சரியாக இயங்காதது", desc: "80%க்கும் அதிகமானோர் போனில் தான் தேடுகிறார்கள். உங்கள் பக்கம் மெதுவாகத் திறந்தால் அல்லது பெரிதாக்க சிரமப்பட்டால், உடனே மாற்று கடைக்குச் சென்றுவிடுவார்கள்." },
        { title: "மெனு மற்றும் சேவைகள் தெளிவாகத் தெரியாமை", desc: "மங்கலான புகைப்படங்கள் அல்லது சிக்கலான PDF மெனுக்களைத் தேடி வாடிக்கையாளர்கள் வெறுப்படைகிறார்கள்." },
        { title: "நேரடி வாட்ஸ்அப் தொடர்பு வசதி இல்லாமை", desc: "நீண்ட படிவங்களை நிரப்ப எவருக்கும் நேரமில்லை. ஒரே கிளிக்கில் வாட்ஸ்அப்பில் பேசி ஆர்டர் செய்யவே மக்கள் விரும்புகிறார்கள்." },
        { title: "முக்கிய விவரங்கள் எளிதில் கிடைக்காதது", desc: "திறந்திருக்கும் நேரம், கூகுள் மேப் முகவரி, கட்டண முறைகள் 2 வினாடிகளில் தெரிய வேண்டும்." },
        { title: "பழைய கால தோற்றம்", desc: "இணையத்தில் முதல் பார்வையில் தோன்றும் அழகே உங்கள் சேவையின் தரம் மற்றும் நம்பகத்தன்மையை தீர்மானிக்கிறது." },
      ]
    },
    services: {
      badge: "சேவைகள் & திறன்கள்",
      title: "உள்ளூர் வணிக வளர்ச்சிக்கான இணையதள தீர்வுகள்",
      subtitle: "கூகுள் மேப்பில் உங்களை சுலபமாக அடையாளம் காணவும், மெனுவை போனில் பார்க்கவும், வாட்ஸ்அப்பில் வாடிக்கையாளர்கள் உடனடியாக ஆர்டர் செய்யவும் அமைக்கப்பட்டவை.",
      startingFrom: "தொடக்க விலை",
      idealFor: "பொருத்தமானது:",
      included: "சேர்க்கப்பட்ட அம்சங்கள்:",
      previewDemo: "மாதிரி இணையதளத்தைப் பார்க்க",
      cards: [
        {
          id: "business-website",
          title: "வணிக இணையதளம்",
          badge: "விரைவான துவக்கம்",
          subtitle: "உள்ளூர் கடைகள், கிளினிக்குகள் மற்றும் சேவை நிறுவனங்களுக்கான நேர்த்தியான டிஜிட்டல் முகம்.",
          idealFor: ["சில்லறை கடைகள்", "உள்ளூர் சேவைகள்", "கிளினிக்குகள்", "டியூஷன் மையங்கள்", "வீட்டு வணிகங்கள்"],
          startingPrice: "₹4,999",
          features: [
            "100% மொபைல் நட்பு வடிவமைப்பு",
            "முகப்பு, எங்களைப் பற்றி & சேவை விளக்கம்",
            "ஒரே கிளிக்கில் வாட்ஸ்அப் நேரடி அரட்டை பொத்தான்",
            "கூகுள் மேப்ஸ் நேரடி கடை இருப்பிடம்",
            "தொலைபேசி அழைப்பு & மின்னஞ்சல் வசதி",
            "சமூக ஊடக இணைப்புகள்",
            "அடிப்படை உள்ளூர் SEO அமைப்பு",
            "அதிவேக கிளவுட் ஹோஸ்டிங் வெளியீடு"
          ],
          ctaText: "ஸ்டார்ட்டர் பேக்கேஜ் பெற",
        },
        {
          id: "restaurant-cafe-website",
          title: "உணவகம் & கஃபே இணையதளம்",
          badge: "அதிக விற்பனை",
          subtitle: "வகைப்படுத்தப்பட்ட டிஜிட்டல் மெனு, உணவுப் புகைப்படங்கள் மற்றும் டேபிள் முன்பதிவு வசதி.",
          idealFor: ["உணவகங்கள்", "கஃபேக்கள்", "பேக்கரிகள்", "உணவு வண்டிகள்", "கிளவுட் கிச்சன்"],
          startingPrice: "₹7,999",
          features: [
            "வகைப்படுத்தப்பட்ட ஊடாடும் டிஜிட்டல் மெனு",
            "விலையுடன் கூடிய உயர் தெளிவு உணவு அட்டைகள்",
            "நேரடி வாட்ஸ்அப் பார்சல்/உணவு ஆர்டர்",
            "டேபிள் முன்பதிவு & விழாக்கள் வினவல் படிவம்",
            "நேரலை கடை திறக்கும் & மூடும் நேரங்கள்",
            "உணவு மற்றும் சூழல் புகைப்பட தொகுப்பு",
            "வாடிக்கையாளர் விமர்சனங்கள் & மதிப்பீடுகள்",
            "கூகுள் மேப்ஸ் நேரடி வழித்தட இணைப்பு"
          ],
          ctaText: "உணவக இணையதளம் பெற",
        },
        {
          id: "business-web-app",
          title: "வணிக வலைப் பயன்பாடு",
          badge: "மேம்பட்ட செயல்பாடு",
          subtitle: "தனிப்பயன் மேலாண்மை மென்பொருள், வாடிக்கையாளர் போர்டல் மற்றும் அட்மின் டாஷ்போர்டு.",
          idealFor: ["ஜிம்கள் & உடற்பயிற்சிக் கூடங்கள்", "டியூஷன் மையங்கள்", "கிளினிக்குகள்", "பல கிளை நிறுவனங்கள்"],
          startingPrice: "₹19,999",
          features: [
            "பாதுகாப்பான அட்மின் & பயனர் உள்நுழைவு",
            "நேரடி புள்ளிவிவரங்களுடன் தனிப்பயன் அட்மின் டாஷ்போர்டு",
            "முழுமையான டேட்டாபேஸ் கட்டமைப்பு",
            "பதிவுகளைச் சேர்த்தல், திருத்துதல் & நீக்குதல்",
            "வாடிக்கையாளர் வினவல்கள் & உறுப்பினர் கண்காணிப்பு",
            "எக்செல் / PDF அறிக்கைகள் பதிவிறக்கம்",
            "தனிப்பயன் வணிக பணிப்பாய்வு ஆட்டோமேஷன்",
            "பாதுகாப்பான கிளவுட் சர்வர் வெளியீடு"
          ],
          ctaText: "பயன்பாடு பற்றி விவாதிக்க",
        },
        {
          id: "custom-website",
          title: "தனிப்பயன் வடிவமைக்கப்பட்ட தளம்",
          badge: "பிரத்யேக கட்டமைப்பு",
          subtitle: "உங்கள் பிராண்டிற்கு ஏற்ப விசேஷ அனிமேஷன்கள் மற்றும் கணக்கீட்டு கருவிகளுடன் உருவாக்கப்படும்.",
          idealFor: ["பிரபல பிராண்டுகள்", "ஃபிரான்சைஸ்", "தனித்துவமான வணிகங்கள்", "முழு ரீபிராண்டிங்"],
          startingPrice: "தனிப்பயன் மதிப்பீடு",
          features: [
            "உங்கள் பிராண்ட் நிறங்களுக்கு ஏற்ப தனிப்பயன் UI/UX",
            "ஊடாடும் விலைக் கணக்கீட்டு கருவிகள்",
            "பன்மொழி (தமிழ் & ஆங்கிலம்) மொழி மாற்றம்",
            "வாட்ஸ்அப் ஆட்டோமேஷன் இணைப்புகள்",
            "அதிவேக பக்க மாற்ற அனிமேஷன்கள்",
            "முழுமையான வேக மேம்பாடு & Core Web Vitals",
            "பயன்பாட்டு பயிற்சி மற்றும் வழிகாட்டுதல்",
            "வெளியீட்டிற்குப் பிந்தைய முன்னுரிமை ஆதரவு"
          ],
          ctaText: "மதிப்பீடு கோரவும்",
        }
      ]
    },
    pricing: {
      badge: "தெளிவான & வெளிப்படையான கட்டணங்கள்",
      title: "உங்கள் வணிகத்திற்கு பலமடங்கு பயன் தரும் முதலீடு",
      subtitle: "மறைக்கப்பட்ட கட்டணங்கள் இல்லை, புரியாத தொழில்நுட்ப வார்த்தைகள் இல்லை. தமிழக உள்ளூர் வணிகங்களுக்காக வடிவமைக்கப்பட்ட எளிய திட்டங்கள்.",
      mostPopular: "மிகவும் விரும்பப்படும் திட்டம்",
      startingPriceLabel: "தொடக்க விலை",
      bestForLabel: "பொருத்தமானது:",
      includedLabel: "இதில் அடங்குபவை:",
      whatsappInquiry: "வாட்ஸ்அப்பில் விசாரிக்க",
      noticeTitle: "வெளிப்படையான, நேர்மையான கட்டண முறை",
      noticeDesc: "மேலே பட்டியலிடப்பட்ட விலைகள் அடிப்படை திட்டத்திற்கான தொடக்க விலைகளாகும். உங்கள் தனிப்பட்ட வடிவமைப்புத் தேவைகள் மற்றும் கூடுதல் அம்சங்களைப் பொறுத்து இறுதி விலை மாறுபடலாம்.",
      domainNote: "சொந்த டொமைன் (.com, .in) பதிவு மற்றும் கிளவுட் சர்வர் புதுப்பித்தல் கட்டணங்கள் அந்தந்த சேவை வழங்குநர்களிடம் நேரடியாகச் செலுத்தப்பட வேண்டியவை.",
      tiers: [
        {
          id: "starter",
          name: "ஸ்டார்ட்டர் (Starter)",
          price: "₹4,999",
          tagline: "உள்ளூர் கடைகள் மற்றும் சிறிய வணிகங்களுக்கான அடிப்படை இணையதளம்.",
          bestFor: "சிறிய கடைகள், ஒற்றை சேவை வழங்குநர்கள் மற்றும் புதிதாக இணையத்தில் தடம் பதிப்பவர்கள்.",
          delivery: "5–7 நாட்கள்",
          revisions: "2 முறை திருத்தங்கள்",
          features: [
            "1–3 நவீன மொபைல் பக்கங்கள்",
            "மொபைல் ஃபர்ஸ்ட் வடிவமைப்பு",
            "வணிக விவரங்கள் & எங்களைப் பற்றி",
            "சேவைகள் அல்லது பொருட்கள் காட்சி",
            "வாட்ஸ்அப் நேரடி அரட்டை பொத்தான்",
            "கூகுள் மேப்ஸ் கடை அமைவிடம்",
            "தொடர்பு விவரங்கள் & வினவல் படிவம்",
            "சமூக ஊடக இணைப்புகள்",
            "அடிப்படை SEO அமைப்பு",
            "வேகமான கிளவுட் வெளியீடு"
          ],
          ctaText: "ஸ்டார்ட்டரை தேர்வு செய்க",
          whatsappMsg: "வணக்கம் விஸ்வாஸ், எனது வணிகத்திற்காக ஸ்டார்ட்டர் பேக்கேஜ் (₹4,999) தேர்வு செய்ய விரும்புகிறேன்."
        },
        {
          id: "business",
          name: "பிசினஸ் (Business)",
          price: "₹9,999",
          tagline: "அழகிய தோற்றம் மற்றும் ஊடாடும் அம்சங்களுடன் கூடிய சிறந்த பேக்கேஜ்.",
          bestFor: "உணவகங்கள், கஃபேக்கள், பேக்கரிகள், சலூன்கள், ஜிம்கள் மற்றும் வளரும் உள்ளூர் பிராண்டுகள்.",
          delivery: "7–10 நாட்கள்",
          revisions: "3 முறை திருத்தங்கள்",
          features: [
            "5–7 பிரீமியம் மொபைல் பக்கங்கள் / பிரிவுகள்",
            "தனிப்பயன் பிராண்டிங் & வண்ண அமைப்பு",
            "டிஜிட்டல் மெனு / தயாரிப்புகள் பட்டியல் மற்றும் வடிகட்டிகள்",
            "உயர் தெளிவு புகைப்பட தொகுப்பு (உணவு, சூழல்)",
            "ஒருங்கிணைக்கப்பட்ட வாட்ஸ்அப் ஆர்டர் & முன்பதிவு",
            "கூகுள் மேப்ஸ் நேரடி வழித்தடம்",
            "முழுமையான தொடர்பு & வினவல் படிவம்",
            "நேரலை கடை நேரம் மற்றும் வாராந்திர அட்டவணை",
            "வாடிக்கையாளர் விமர்சனங்கள் & நற்பெயர் சான்றுகள்",
            "உள்ளூர் SEO உகப்பாக்கம்",
            "சமூக ஊடக ஒருங்கிணைப்பு",
            "அதிவேக மொபைல் செயல்திறன்",
            "14 நாட்கள் இலவச தொழில்நுட்ப ஆதரவு"
          ],
          ctaText: "பிசினஸ் தேர்வு செய்க",
          whatsappMsg: "வணக்கம் விஸ்வாஸ், எனது வணிகத்திற்காக பிசினஸ் பேக்கேஜ் (₹9,999 - Most Popular) தேர்வு செய்ய விரும்புகிறேன்."
        },
        {
          id: "pro-web-app",
          name: "ப்ரோ வெப் ஆப் (Pro Web App)",
          price: "₹19,999+",
          tagline: "டேட்டாபேஸ், அட்மின் உள்நுழைவு மற்றும் தனிப்பயன் நிர்வாக மென்பொருள்.",
          bestFor: "வாடிக்கையாளர் கணக்குகள், மெம்பர்ஷிப்கள் மற்றும் உள் வணிக அமைப்புகள் தேவைப்படும் வணிகங்கள்.",
          delivery: "தேவைகளுக்கு ஏற்ப விவாதிக்கப்படும்",
          revisions: "ஒவ்வொரு கட்டத்திலும் ஆய்வுகள்",
          features: [
            "முழு ரியாக்ட் நவீன இணையதளம்",
            "பாதுகாப்பான பின்தள API மற்றும் டேட்டாபேஸ்",
            "அட்மின் / பணியாளர் உள்நுழைவு வசதி",
            "நேரடி புள்ளிவிவரங்களுடன் கூடிய அட்மின் டாஷ்போர்டு",
            "முழுமையான டேட்டா மேலாண்மை (சேர்த்தல், திருத்துதல்)",
            "பயனர் மற்றும் வாடிக்கையாளர் பட்டியல்",
            "தனிப்பயன் வணிக தானியங்கு அமைப்புகள்",
            "தானியங்கி PDF பில்கள் & அறிக்கைகள்",
            "வெளிப்புற API மற்றும் பேமென்ட் கேட்வே வசதி",
            "அளவிடக்கூடிய கிளவுட் சர்வர் & பேக்கப்",
            "முழுமையான இயக்கப் பயிற்சி & ஆவணங்கள்"
          ],
          ctaText: "திட்டம் பற்றி பேசலாம்",
          whatsappMsg: "வணக்கம் விஸ்வாஸ், தனிப்பயன் வெப் ஆப் (₹19,999+) தேவைகள் குறித்து விவாதிக்க விரும்புகிறேன்."
        }
      ]
    },
    demos: {
      badge: "ஊடாடும் மாதிரி இணையதளங்கள்",
      title: "உங்கள் வணிக இணையதளம் எப்படி இருக்கும் என்று பாருங்கள்",
      subtitle: "உங்கள் வணிக வகையைத் தேர்ந்தெடுத்து, நேரலை மாதிரி இணையதளத்தை இயக்கிப் பாருங்கள். ஒவ்வொன்றும் இயங்கக்கூடிய மெனுக்கள், படிவங்கள் மற்றும் வாட்ஸ்அப் ஆர்டர் வசதியைக் கொண்டுள்ளது.",
      openDemo: "நேரலை மாதிரியைத் திறக்க",
      recommendedPlan: "பரிந்துரைக்கப்பட்ட திட்டம்:",
      keyFeatures: "முக்கிய மாதிரி அம்சங்கள்:",
      filterAll: "அனைத்தும்",
    },
    process: {
      badge: "எளிய 5 படிமுறைகள்",
      title: "எப்படி செயல்படுகிறது",
      subtitle: "தொடக்க யோசனை முதல் வெறும் 5 நாட்களில் இணையதளம் நேரலையாகும் வரை. உங்களுக்கு எந்த தொழில்நுட்பக் கவலையும் இல்லை.",
      steps: [
        { step: "01", title: "உங்கள் வணிகம் பற்றி கூறுங்கள்", desc: "உங்கள் கடை விவரங்கள், மெனு, சேவைகள், புகைப்படங்கள் மற்றும் தொடர்பு எண்களை வாட்ஸ்அப் அல்லது தொலைபேசி அழைப்பில் பகிருங்கள்." },
        { step: "02", title: "வடிவமைப்பு & நிறத்தைத் தேர்ந்தெடுங்கள்", desc: "உங்கள் கடையின் தன்மைக்கும் வாடிக்கையாளர்களுக்கும் ஏற்ற அழகிய வண்ண அமைப்பைத் தேர்ந்தெடுங்கள்." },
        { step: "03", title: "நான் இணையதளத்தை உருவாக்குகிறேன்", desc: "5 முதல் 10 நாட்களில் அதிவேக, மொபைல் நட்பு, வாட்ஸ்அப் ஆர்டர் மற்றும் கூகுள் மேப்ஸ் கொண்ட தளத்தை உருவாக்குகிறேன்." },
        { step: "04", title: "சரிபார்த்து மாற்றங்களைச் சொல்லுங்கள்", desc: "உங்கள் சொந்த மொபைலில் நேரலை இணைப்பைச் சோதித்து, தேவைப்படும் திருத்தங்களை என்னிடம் கூறுங்கள்." },
        { step: "05", title: "இணையதளம் நேரலையாகிறது", desc: "உங்கள் சொந்த டொமைனை (yourbusiness.in) இணைத்து, கூகுள் தேடலில் பதிவு செய்து, வெற்றிகரமாகத் துவங்குகிறோம்!" }
      ]
    },
    why: {
      badge: "விஸ்வாஸ் வெப்-ஐ ஏன் தேர்வு செய்ய வேண்டும்?",
      title: "நம்பகத்தன்மை மற்றும் உள்ளூர் வாடிக்கையாளர் ஈர்ப்புக்காக உருவாக்கப்பட்டது",
      subtitle: "நான் மிகைப்படுத்தப்பட்ட வாக்குறுதிகளை அளிப்பதில்லை. உங்கள் வணிகத்தை சர்வதேச தரத்தில் காட்டும் வேகமான, நவீன இணையதளங்களை வழங்குகிறேன்.",
      cards: [
        { title: "மொபைல் ஃபர்ஸ்ட் கட்டமைப்பு", desc: "மக்கள் அதிகம் பயன்படுத்தும் ஸ்மார்ட்போன் திரைகளுக்கு ஏற்ப சிறப்பாக வடிவமைக்கப்பட்டுள்ளது." },
        { title: "அதிவேக பக்க ஏற்றம்", desc: "பழைய மெதுவான பில்டர்கள் இன்றி, நவீன ரியாக்ட் மூலம் 1 வினாடிக்குள் திறக்கும் வகையில் கட்டமைக்கப்பட்டது." },
        { title: "தனிப்பயன் நவீன வடிவமைப்பு", desc: "காப்பி-பேஸ்ட் டெம்ப்ளேட்டுகள் இன்றி, உங்கள் தொழில் ரசனைக்கு ஏற்ப பிரத்யேகமாக உருவாக்கப்படுகிறது." },
        { title: "எளிதான வாட்ஸ்அப் இணைப்பு", desc: "வாடிக்கையாளர் ஒரே கிளிக்கில் வாட்ஸ்அப்பில் பேசி ஆர்டர் செய்யும் உடனடி வசதி." },
        { title: "உள்ளூர் SEO அமைப்பு", desc: "அருகிலுள்ள மக்கள் கூகுளில் தேடும்போது உங்கள் வணிகத்தை எளிதில் கண்டறியும் உகப்பாக்கம்." },
        { title: "நேர்மையான & நியாயமான கட்டணம்", desc: "மறைமுகக் கட்டணங்கள் இன்றி ₹4,999 முதல் தொடங்கும் வெளிப்படையான விலை நிர்ணயம்." },
        { title: "அனைத்து சாதனங்களிலும் பொருந்தும்", desc: "ஆண்ட்ராய்டு, ஐபோன், டேப்லெட், மடிக்கணினி என அனைத்திலும் நேர்த்தியாக இயங்குகிறது." },
        { title: "நேரடி டெவலப்பர் தொடர்பு", desc: "இடைத்தரகர்கள் இன்றி டெவலப்பர் விஸ்வாஸுடன் நேரடியாகப் பேசும் வசதி." }
      ]
    },
    projects: {
      badge: "தொழில்நுட்ப பொறியியல் திட்டங்கள்",
      title: "மேம்பட்ட அமைப்புகள் & தொழில்நுட்பப் பணிகள்",
      subtitle: "உள்ளூர் வணிக தளங்களுடன் சேர்த்து, முழுமையான வெப் அப்ளிகேஷன்கள், டேட்டாபேஸ்கள் மற்றும் தானியங்கு பணிப்பாய்வு அமைப்புகளையும் உருவாக்குகிறேன்.",
      note: "* குறிப்பு: இவை எனது சுயாதீன பொறியியல் மற்றும் முந்தைய மேம்பாட்டுத் திட்டங்கள் ஆகும் (உள்ளூர் கிளையண்ட் மாதிரிகளிலிருந்து வேறுபட்டவை).",
      problemSolved: "தீர்க்கப்பட்ட பிரச்சனை",
      technicalSolution: "தொழில்நுட்பத் தீர்வு",
      keyFeatures: "முக்கிய தொழில்நுட்ப அம்சங்கள்:",
      viewGithub: "கிட்ஹப் குறியீட்டைப் பார்க்க",
      liveProject: "நேரலை இணைப்பு",
    },
    faq: {
      badge: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
      title: "நீங்கள் தெரிந்து கொள்ள வேண்டிய அனைத்தும்",
      subtitle: "கால அளவு, சொந்த டொமைன், மாற்றங்கள் மற்றும் கட்டண முறைகள் குறித்த நேரடி பதில்கள்.",
      bannerTitle: "இங்கு இல்லாத வேறு கேள்விகள் உள்ளதா?",
      bannerSub: "உடனடி, கட்டாயமில்லாத பதில்களுக்கு விஸ்வாஸிடம் நேரடியாக வாட்ஸ்அப்பில் பேசுங்கள்.",
      whatsappBtn: "வாட்ஸ்அப்பில் கேளுங்கள்",
    },
    contact: {
      badge: "தொடர்பு கொள்ளுங்கள்",
      title: "உங்கள் இணையதளத்தை உருவாக்கத் தொடங்கலாம்",
      subtitle: "நீங்கள் உணவகம், கிளினிக், சலூன், ஜிம் அல்லது மளிகைக்கடை நடத்துபவரா? புதிய வாடிக்கையாளர்களை ஈர்க்கும் இணையதளம் பற்றி பேசுவோம்.",
      fastestResponse: "மிக விரைவான பதில்",
      chatDirect: "வாட்ஸ்அப் நேரடி அரட்டை",
      openChat: "அரட்டையைத் திறக்க →",
      emailInquiries: "மின்னஞ்சல் வினவல்கள்",
      sendEmail: "மின்னஞ்சல் அனுப்ப →",
      baseLocation: "மைய இருப்பிடம்",
      locationVal: "கோயம்புத்தூர், தமிழ்நாடு, இந்தியா (உலகளாவிய சேவைகள்)",
      devProfiles: "டெவலப்பர் சுயவிவரங்கள்",
      formTitle: "திட்ட வினவல் படிவம்",
      nameLabel: "உங்கள் பெயர் *",
      businessNameLabel: "வணிகத்தின் பெயர்",
      businessTypeLabel: "வணிக வகை",
      phoneLabel: "வாட்ஸ்அப் எண் *",
      emailLabel: "மின்னஞ்சல் முகவரி (விருப்பத்தேர்வு)",
      reqLabel: "உங்கள் தேவைகள் & விவரங்கள்",
      sendBtn: "வினவலை அனுப்புக",
      whatsappBtn: "வாட்ஸ்அப்பில் பேச",
      privacyNote: "உங்கள் தொடர்பு விவரங்கள் பாதுகாப்பாக வைக்கப்படும். ஸ்பேம் இல்லை.",
      successTitle: "நன்றி!",
      successDesc: "உங்கள் விவரங்கள் பெறப்பட்டன. உடனடியாக வாட்ஸ்அப்பில் உரையாடலைத் தொடங்குவோம்.",
      submitAnother: "மற்றொரு வினவலை அனுப்ப",
    },
    modal: {
      title: "உங்கள் வணிக இணையதளத்தைப் பெறுங்கள்",
      subtitle: "விஸ்வாஸுடன் நேரடி ஆலோசனை • எந்தக் கட்டாயமும் இல்லை",
      name: "உங்கள் பெயர் *",
      businessName: "வணிகத்தின் பெயர்",
      businessType: "வணிக வகை",
      phone: "தொலைபேசி / வாட்ஸ்அப் எண் *",
      email: "மின்னஞ்சல் (விருப்பத்தேர்வு)",
      packageLabel: "விரும்பும் திட்டம்",
      message: "உங்கள் தேவைகளை சுருக்கமாகக் கூறுங்கள்",
      submit: "வினவலை சமர்ப்பிக்க",
      chatWhatsapp: "வாட்ஸ்அப்பில் உடனடியாக பேச",
      successTitle: "விவரங்கள் பெறப்பட்டன!",
      successDesc: "நன்றி! உங்கள் திட்டத்தை வாட்ஸ்அப்பில் விரிவாக விவாதிப்போம்.",
      close: "சாளரத்தை மூடுக",
    },
    footer: {
      tagline: "வளரும் உள்ளூர் வணிகங்களுக்கான நவீன இணையதளங்கள். அதிவேக பக்கங்கள், மொபைல் நட்பு மற்றும் கூகுள் தேடல்களை வாடிக்கையாளர்களாக மாற்றும் அமைப்பு.",
      navigation: "வழிகாட்டல்",
      workingDemos: "மாதிரி இணையதளங்கள்",
      directContact: "நேரடித் தொடர்பு",
      rights: "© 2026 விஸ்வாஸ் வெப். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      builtBy: "வடிவமைத்து உருவாக்கியவர் விஸ்வாஸ் • உள்ளூர் வணிகங்களுக்கான முழு-அடுக்கு வலை டெவலப்பர்",
    },
    floating: {
      demoLabel: "நேரலை மாதிரி:",
      question: "உங்கள் கடைக்கு இது போன்ற இணையதளம் வேண்டுமா?",
      whatsapp: "வாட்ஸ்அப்",
      getWebsite: "இந்த தளம் வேண்டும்",
      allDemos: "அனைத்து மாதிரிகள்",
    }
  }
};
