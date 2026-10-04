# Agency Business Operations & Scaling Manual (1 to 50+ Clients)

This manual provides standard operating procedures for operating and scaling a solo freelance web development agency to 50+ concurrent client websites.

---

## 1. Scaling Architecture to 50+ Clients

To scale without code refactoring:
1. **Never Hardcode Client Records in UI:** All clients are stored as structured JSON records or MongoDB documents using the `ClientRecord` schema.
2. **Centralized Configuration:** Prices, contact info, and maintenance plans live in `src/config/agencyConfig.ts`. Modifying a rate updates the public calculator and dashboard simultaneously.
3. **Automated Search & Filters:** The client registry at `/admin/clients` supports instant text filtering by business name, representative name, domain, business category, and project status.
4. **Data Portability:** Use the **Export JSON Backup** button in the dashboard once a week to safeguard your complete client roster and lead pipeline.

---

## 2. Domain Expiry Alert Workflow

Expiring domains can ruin a local business's online presence. The platform calculates remaining days and fires alerts based on a 4-tier timeline:

```
[ 30 Days Out: Information Notice ]
  → Friendly WhatsApp reminder to client to verify auto-renewal card details.

[ 14 Days Out: Warning Notice ]
  → Verification check if invoice from GoDaddy/Namecheap was received.

[ 7 Days Out: Urgent Notice ]
  → Direct phone call to client owner to ensure payment authorization.

[ 3 Days Out: Emergency Action ]
  → Walk-through with client via screen share to complete payment before registrar hold.
```

> **Reminder:** Never automatically renew client domains with your personal payment card. The client must maintain their own registrar account for complete legal ownership.

---

## 3. Website Migration Checklist

When taking over an existing client website:
1. **DNS Audit:** Check existing registrar (GoDaddy, BigRock, Namecheap, Google).
2. **Asset Export:** Download existing high-res imagery, copy, and customer reviews.
3. **URL Mapping (301 Redirects):** Map old URLs to new page routes to preserve existing SEO authority.
4. **Email Routing Verification:** Verify MX records (Google Workspace, Zoho, Microsoft 365) are copied unchanged so client business email never drops.
5. **Switchover:** Point `A` or `CNAME` records with a low TTL (300 seconds) prior to the cutover.

---

## 4. Offboarding & Website Transfer to Client

If a client chooses to manage their website independently or terminate maintenance:
1. **Repository Access:** Invite client's GitHub account to the repository or provide a clean ZIP archive of the source code.
2. **Hosting Transfer:** Transfer the Vercel/Netlify project to the client's own team account.
3. **DNS Release:** Direct client's IT team or provide exact DNS values.
4. **Sign-off:** Issue a formal handover receipt confirming zero outstanding dues and full transfer of administrative controls.

---

## 5. Google Search Console & Google Business Profile (GBP) SOP

### Google Search Console Setup
1. Open [search.google.com/search-console](https://search.google.com/search-console).
2. Add Property -> **Domain** verification via DNS TXT record, or **URL prefix** via HTML tag.
3. Once verified, navigate to **Sitemaps** -> submit `https://clientdomain.com/sitemap.xml`.
4. Monitor **Pages** tab for indexing coverage and **Core Web Vitals** for performance metrics.

### Google Business Profile Optimization
1. Assist client in claiming or verifying their location on [google.com/business](https://google.com/business).
2. Ensure **NAP Consistency** (Name, Address, Phone) matches their website header, footer, and schema markup exactly.
3. Add Primary Category (e.g., "South Indian Restaurant", "Hair Salon", "Fitness Center").
4. Add Website link pointing to the new HTTPS production domain with UTM tags: `?utm_source=google&utm_medium=organic&utm_campaign=gmb`.
5. Upload authentic photos of exterior, interior, team, and products weekly.
