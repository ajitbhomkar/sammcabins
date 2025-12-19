# SAAM Cabins - Premium Porta Cabin Website

A modern Next.js website for SAAM Cabins, a leading porta cabin manufacturer in UAE.

## 🚀 Production Deployment

**Live Site:** https://saamzgroup.com (pending DNS setup)  
**Current:** http://68.178.160.108:3000

### Quick Links
- 📊 [SEO Dashboard](/admin/seo) - Monitor search performance
- ⚙️ [Admin Panel](/admin) - Manage content
- 🖼️ [Gallery Admin](/admin/gallery) - Upload images
- 🎨 [Site Settings](/admin/settings) - Customize theme

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [SEO & Domain Setup](#seo--domain-setup)
- [Monitoring](#monitoring)
- [Documentation](#documentation)

---

## ✨ Features

### Content Management
- ✅ Dynamic cabin listings with images
- ✅ Gallery with category filtering
- ✅ About Us page with rich content
- ✅ Contact form with validation
- ✅ Site settings (logo, fonts, theme, colors)

### SEO Optimization
- ✅ Comprehensive meta tags for UAE market
- ✅ JSON-LD structured data (Organization, LocalBusiness, Website, Breadcrumbs)
- ✅ Open Graph and Twitter Card metadata
- ✅ Dynamic sitemap.xml generation
- ✅ Robots.txt configuration
- ✅ SEO monitoring dashboard
- ✅ 18+ targeted keywords for porta cabins UAE

### Performance & Reliability
- ✅ PM2 process management (optimized for VPS)
- ✅ Auto-recovery system (5-minute health checks)
- ✅ Resource optimization (400MB limit)
- ✅ Image optimization with Next.js Image
- ✅ Compression and caching enabled
- ✅ Mobile-responsive design

### Admin Features
- ✅ Image upload system
- ✅ Theme customization (10 Google Fonts)
- ✅ Color scheme editor
- ✅ Social media links management
- ✅ Content backup/restore on deployment

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16.0.0 (App Router, Turbopack)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Icons:** Heroicons
- **Fonts:** 10 Google Fonts
- **Process Manager:** PM2
- **Server:** GoDaddy VPS (68.178.160.108)
- **CI/CD:** GitHub Actions

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sammcabins.git
   cd sammcabins
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

### Development Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## 📦 Deployment

### Current VPS Setup
- **Host:** GoDaddy VPS
- **IP:** 68.178.160.108:3000
- **User:** adminsak
- **Path:** /home/adminsak/sammcabins
- **Process:** PM2 (single fork, 400MB limit)

### Deployment Process
1. Push changes to GitHub
2. GitHub Actions runs tests (lint + build)
3. SSH deploys to VPS
4. PM2 restarts with ecosystem.config.js
5. Auto-recovery monitors uptime

### Manual Deployment
```bash
# On VPS
cd /home/adminsak/sammcabins
git pull origin main
npm install --production=false
NODE_ENV=production npm run build
npm prune --production
pm2 restart ecosystem.config.js
```

---

## 🌐 SEO & Domain Setup

### Domain Configuration
See **[DOMAIN_SETUP.md](./DOMAIN_SETUP.md)** for complete instructions:
- DNS A records configuration
- Nginx reverse proxy setup
- SSL certificate with Let's Encrypt
- Environment variables

### SEO Implementation
See **[SEO_GUIDE.md](./SEO_GUIDE.md)** for detailed guide:
- Google Analytics 4 setup
- Google Search Console verification
- Keyword strategy for UAE market
- Local SEO optimization
- Monthly reporting template

### Quick SEO Checklist
- [ ] Update Google verification code in layout.tsx
- [ ] Set up Google Analytics tracking
- [ ] Submit sitemap to Search Console
- [ ] Create Google My Business profile
- [ ] List on UAE business directories
- [ ] Add Arabic language version (optional)

---

## 📊 Monitoring

### Health Checks
- **Endpoint:** http://localhost:3000/api/health
- **Auto-Recovery:** Every 5 minutes via cron
- **Logs:** /home/adminsak/sammcabins/logs/auto-recovery.log

### SEO Dashboard
Access at **/admin/seo** to monitor:
- Page views and traffic
- Keyword rankings
- Top performing pages
- Technical SEO health
- PageSpeed scores

### Server Monitoring Commands
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs sammcabins

# Monitor resources
pm2 monit

# Check health endpoint
curl http://localhost:3000/api/health
```

See **[UPTIME_GUIDE.md](./UPTIME_GUIDE.md)** for complete monitoring documentation.

---

## 📚 Documentation

### Essential Files
- **[DOMAIN_SETUP.md](./DOMAIN_SETUP.md)** - Domain and SSL setup
- **[SEO_GUIDE.md](./SEO_GUIDE.md)** - SEO strategy and monitoring
- **[UPTIME_GUIDE.md](./UPTIME_GUIDE.md)** - Server stability guide
- **[ecosystem.config.js](./ecosystem.config.js)** - PM2 configuration

### Configuration Files
- **next.config.mjs** - Next.js settings (compression, caching)
- **tsconfig.json** - TypeScript configuration
- **.github/workflows/deploy.yml** - CI/CD pipeline
- **src/data/content.json** - Site content (backed up on deploy)

### Key Components
- **src/components/StructuredData.tsx** - JSON-LD schemas
- **src/app/api/health/route.ts** - Health check endpoint
- **src/app/admin/seo/page.tsx** - SEO monitoring dashboard
- **scripts/auto-recovery.sh** - Auto-restart script

---

## 🎯 Target Keywords

### Primary (UAE Market)
1. porta cabin UAE
2. portable cabins Dubai  
3. porta cabins Sharjah
4. office cabin UAE
5. security cabin UAE

### Secondary
6. site office cabin
7. prefab cabins Dubai
8. container office UAE
9. modular cabins UAE
10. porta cabin manufacturer

---

## 🔧 Environment Variables

Create `.env.production` from `.env.production.example`:

```bash
NEXT_PUBLIC_BASE_URL=https://saamzgroup.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-code
NODE_ENV=production
```

---

## 🆘 Troubleshooting

### Site Down
```bash
# Check if running
pm2 status

# View recent logs
pm2 logs sammcabins --lines 50

# Restart if needed
pm2 restart sammcabins

# Check auto-recovery
tail -f /home/adminsak/sammcabins/logs/auto-recovery.log
```

### Build Errors
```bash
# Clear cache
rm -rf .next
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### High CPU Usage
- Check PM2 is in fork mode (not cluster)
- Verify memory limit is 400MB
- Review auto-recovery logs for frequent restarts

---

## 📞 Support

- **Admin Panel:** /admin
- **SEO Dashboard:** /admin/seo
- **Health Check:** /api/health
- **Documentation:** See markdown files in root

---

## 📝 License

Proprietary - SAAM Cabins © 2024

---

## 🚀 Next Steps

1. **Domain Setup**
   - Add DNS A records at registrar
   - Run Nginx setup on VPS
   - Install SSL certificate
   - Update NEXT_PUBLIC_BASE_URL

2. **SEO Launch**
   - Set up Google Analytics
   - Verify Search Console
   - Submit sitemap
   - Request indexing

3. **Marketing**
   - Create Google My Business
   - List on UAE directories
   - Collect customer reviews
   - Share on social media

---

**Built with ❤️ for SAAM Cabins**
