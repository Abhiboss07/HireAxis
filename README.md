# HireAxis — Job Application Service Website

HireAxis is a modern, responsive web application for a premier job application service that searches, tailors, and submits applications on behalf of qualified candidates across 9 countries.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### 2. Installation
```bash
# Install dependencies
npm install
```

### 3. Environment Variables
```bash
# Copy the template and fill in your keys (.env is gitignored)
cp .env.example .env
```

| Variable | Where it runs | Purpose |
|---|---|---|
| `VITE_GOOGLE_SHEET_URL` | browser | Apps Script endpoint for form submissions |
| `VITE_RAZORPAY_KEY_ID` | server → browser | Razorpay publishable key, handed to the browser in the order response |
| `RAZORPAY_KEY_SECRET` | **server only** | Signs and verifies payments — never commit |

### 4. Development Server
```bash
# React app only, http://localhost:3000 (the /api routes are NOT served)
npm run dev

# React app + serverless functions — required to test Razorpay checkout
vercel dev
```

### 5. Production Build
```bash
# Build optimized static production bundle in dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Tech Stack & Features

- **Framework**: React 18 + Vite
- **Routing**: React Router DOM (v6) with client-side SPA handling
- **Styling**: Custom CSS design system with CSS custom properties (Plus Jakarta Sans & Inter typography)
- **Backend**: Vercel serverless functions in `api/` (Razorpay order creation & signature verification)
- **Deployment**: Pre-configured for **Vercel** (`vercel.json`) with SPA route rewrites, Edge CDN caching, and security headers.

### Features
| Feature | Entry point | Docs |
|---|---|---|
| **Razorpay checkout** on the pricing table | [`src/lib/razorpay.js`](src/lib/razorpay.js), [`api/`](api/) | [RAZORPAY_SETUP.md](RAZORPAY_SETUP.md) |
| **Landing popup** application form | [`src/components/ApplicationModal.jsx`](src/components/ApplicationModal.jsx) | — |
| **Scripted FAQ chatbot** | [`src/components/ChatBot.jsx`](src/components/ChatBot.jsx) | — |
| **Lead capture** to Sheets + Drive | [`src/lib/submitLead.js`](src/lib/submitLead.js) | [GOOGLE_SHEET_SETUP.md](GOOGLE_SHEET_SETUP.md) |

Two files hold all the editable content: **[`src/data/packages.js`](src/data/packages.js)**
(prices, shared by the pricing table, the chatbot, and the server) and
**[`src/data/chatFlow.js`](src/data/chatFlow.js)** (chatbot topics and answers).

- **Pages**:
  - `/` — Homepage (Hero, Stats, Quote Banner, How It Works, Target Audience, Features, Countries Covered, Value Props, FAQ, CTA)
  - `/services` — Services breakdown, ATS optimization, live tracking & conversion support
  - `/pricing` — Transparent package pricing & country-specific rates
  - `/about` — Why HireAxis exists, beliefs & principles
  - `/faq` — Comprehensive interactive FAQ accordion
  - `/contact` — Contact form & onboarding intake

---

## 📄 License
© 2026 HireAxis. All rights reserved.
