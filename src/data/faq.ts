export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question: "How long does a website take to build?",
    answer: "For our Starter package (1–3 pages), delivery takes approximately 5–7 business days once all content, menu items, and business information are provided. The Business package (5–7 pages with digital menu/services) typically takes 7–10 business days. Custom web applications are scoped individually with agreed milestones."
  },
  {
    question: "Can you customize the design to match my business brand?",
    answer: "Yes, absolutely. We do not use cookie-cutter generic templates. Every website is styled with colors, typography, logos, photography, and layout structures tailored specifically to your business identity (e.g. warm artisanal vibes for a bakery, bold high-energy styling for a gym, or clinical professionalism for a clinic)."
  },
  {
    question: "Can I update the website later when menu items or prices change?",
    answer: "Yes! For standard static websites, we offer lightweight maintenance packages to perform updates for you promptly, or we can configure simple Google Sheets / JSON content managers. For businesses with frequent changes, we build custom admin dashboard management tools (Pro Web App tier) allowing you to edit dishes, prices, timings, and notices anytime."
  },
  {
    question: "Do you provide hosting?",
    answer: "We deploy client websites onto enterprise-grade cloud platforms like Vercel or Netlify, which provide lightning-fast global CDN speeds, automatic SSL security certificates (HTTPS), and 99.9% uptime. Cloud hosting setup is included in our packages."
  },
  {
    question: "Can I connect my own custom domain (e.g. mybusiness.com or .in)?",
    answer: "Yes! If you already own a domain from GoDaddy, Namecheap, Google Domains, or Hostinger, we will configure the DNS records and connect it directly to your new website at no extra charge. If you don't have one yet, we can guide you on purchasing one for your brand."
  },
  {
    question: "Can you add a direct WhatsApp chat button?",
    answer: "Yes, every package includes a direct WhatsApp integration. We configure it with custom pre-filled messages (such as 'Hi, I saw your menu and want to place an order' or 'Hi, I'd like to book an appointment') so that your customers can connect with you instantly on their phones."
  },
  {
    question: "Can you create an admin panel for my staff?",
    answer: "Yes. Under our Business Web Application tier, we build secure, password-protected admin dashboards where you and your team can manage customer inquiries, add/edit menu items, track member subscriptions, view orders, and download reports."
  },
  {
    question: "Can you maintain the website after it is launched?",
    answer: "Yes, all our packages include free post-launch support (14 days for Business and 30 days for Web Apps) to ensure everything runs smoothly. Thereafter, we offer flexible monthly or on-demand maintenance plans for updates, backups, and security monitoring."
  },
  {
    question: "What happens after deployment?",
    answer: "Once your website is deployed, we perform thorough cross-device testing across smartphones, tablets, and desktops. We connect your custom domain, configure Google Search Console for indexing, hand over all project assets, and walk you through how everything functions."
  },
  {
    question: "What payment structure do you use?",
    answer: "We use a transparent, milestone-based structure: typically 50% advance deposit to initiate design and development, and the remaining 50% upon final client review and approval before live domain pointing. For custom web applications, milestones are split into 40% kickoff, 30% alpha prototype, and 30% final deployment."
  }
];
