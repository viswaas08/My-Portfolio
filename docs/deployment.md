# Deployment Guide: Freelance Web Development Agency Platform

This guide outlines how to run, build, and deploy the Freelance Web Development Business Platform to production (Vercel / Netlify) and how to configure custom domains, SSL, and preview vs production workflows.

---

## 1. Running Locally

### Prerequisites
- Node.js (v18.0.0 or later recommended)
- npm or pnpm or yarn

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/viswaas08/My-Portfolio.git
cd "PORTFOLIO WEBSITE"

# Install dependencies
npm install

# Start development server
npm run dev
```
The application will start on `http://localhost:5173`.

### Backend API Setup (Optional)
If running the Node.js/Express MongoDB service:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string and JWT secret
npm run dev
```

---

## 2. Deploying to Netlify / Vercel

### Deploying Frontend to Netlify
1. Connect your GitHub repository to [Netlify](https://app.netlify.com).
2. Configure build settings:
   - **Base directory:** Leave blank (or root)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Single Page App (SPA) redirect rule is already included in `public/_redirects`:
   ```text
   /*    /index.html   200
   ```
4. Current Live Production URL: `https://viswaas-portfolio.netlify.app`

### Deploying Frontend to Vercel
1. Install Vercel CLI or import via [vercel.com](https://vercel.com).
2. Configure Framework Preset: **Vite**.
3. Build command: `npm run build`, Output directory: `dist`.
4. Configure SPA routing in `vercel.json` if deploying to Vercel:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

---

## 3. Deployment Environments: Development, Preview, & Production

| Environment | Branch | URL Structure | Purpose |
| :--- | :--- | :--- | :--- |
| **Development** | `local / localhost` | `http://localhost:5173` | Active coding, testing features, styling demos. |
| **Preview** | PRs / Feature Branches | `https://portfolio-git-[branch].vercel.app` | Internal review, client feedback on work-in-progress before merge. |
| **Production** | `main` branch | `https://viswaas-portfolio.netlify.app` | Live public showcase, onboarding, and agency operations. |

---

## 4. Custom Domain & SSL Configuration

To connect a custom agency domain (e.g., `viswaasdesigns.com`):

1. **DNS Records (Apex domain):**
   - Type: `A`
   - Name: `@`
   - Value: Netlify IP (`75.2.60.5`) or Vercel IP (`76.76.21.21`)
2. **DNS Records (Subdomain / www):**
   - Type: `CNAME`
   - Name: `www`
   - Value: `viswaas-portfolio.netlify.app` or `cname.vercel-dns.com`
3. **Automatic SSL/TLS:**
   - Both Netlify and Vercel automatically issue Let's Encrypt certificates once DNS propagates (usually 5 to 30 minutes).

---

## 5. Security & Environment Variables Checklist

- Never commit `.env` or production secrets to Git.
- Keep `ADMIN_PASSCODE` in environment variables or secured behind backend auth.
- Use HTTPS everywhere with HTTP-to-HTTPS automatic 301 redirects.
- Ensure all API endpoints employ rate limiting and helmet headers.
