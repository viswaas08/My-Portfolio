# Recurring Maintenance & Infrastructure Cost Management

This document defines how client hosting, infrastructure usage, and ongoing website maintenance are tracked, budgeted, and billed.

---

## 1. Hosting Architecture: Commercial Team Model

### Why Not Free / Hobby Tiers?
- Commercial client websites should **not** rely on personal free/hobby accounts because commercial activity violates free tier terms of service, lacks enterprise uptime SLAs, and imposes severe bandwidth and serverless execution caps.
- Production client sites are maintained on commercial hosting accounts (Vercel Pro / Netlify Team / AWS) with custom domain routing, HTTPS certificates, and DDoS mitigation.

---

## 2. Infrastructure Cost Accounting Per Client

Infrastructure usage varies significantly based on business category:

| Business Type | Typical Monthly Bandwidth | Image/Asset Weight | Serverless Executions | Est. Monthly Infra Cost |
| :--- | :--- | :--- | :--- | :--- |
| **Tuition / Services** | Low (5 GB) | Static logos/text | None | ₹0 – ₹100 |
| **Salon / Gym** | Moderate (15 GB) | High-res gallery | Contact form submissions | ₹150 – ₹300 |
| **Popular Restaurant/Cafe**| High (50+ GB) | Menu scans, photo galleries | Dynamic menu queries | ₹300 – ₹600 |
| **High-Traffic Web App** | Heavy (100+ GB) | Multi-tenant media | DB queries & Auth API | ₹800 – ₹1,500+ |

### Calculation of Net Recurring Margin
The agency platform dynamically computes your actual recurring profitability:

$$\text{Gross MRR} = \sum (\text{Monthly Maintenance Fees})$$
$$\text{Total Infrastructure Cost} = \sum (\text{Recorded Hosting Cost per Client})$$
$$\text{Net Recurring Margin} = \text{Gross MRR} - \text{Total Infrastructure Cost}$$

### Surge Protection Policy
- Normal website bandwidth and CDN delivery within fair usage are included in the maintenance plan.
- If a client experiences a seasonal virality spike or heavy media streaming exceeding agreed quotas, the client is notified transparently before billing the excess infrastructure charge. Never silently absorb unexpected third-party cloud fees.

---

## 3. Maintenance Task Lifecycle in Admin Suite

```
[ Client Request via WhatsApp ]
              ↓
[ Enter Task in Admin Dashboard ]
              ↓
[ Staging / Local Implementation ]
              ↓
[ Client Verification Link ]
              ↓
[ Deploy to Production ]
              ↓
[ Mark Task Completed in Registry ]
```

### Regular Monthly Health Checklist
- [ ] Check HTTP 200 response on production domain
- [ ] Verify SSL certificate validity (> 30 days)
- [ ] Verify WhatsApp button and contact form submit without error
- [ ] Inspect Google Search Console for crawl errors or mobile usability flags
- [ ] Verify opening hours and festive holiday notices
- [ ] Run automated Lighthouse speed audit
