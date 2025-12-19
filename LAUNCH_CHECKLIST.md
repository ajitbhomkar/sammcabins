# 🚀 Domain & SEO Launch Checklist

## Prerequisites
- [x] Website built and tested
- [x] SEO metadata implemented
- [x] Structured data added
- [x] Sitemap and robots.txt configured
- [x] Monitoring system active
- [ ] Domain DNS configured
- [ ] SSL certificate installed

---

## Phase 1: Domain Setup (30-60 minutes)

### Step 1: Configure DNS Records
**Where:** Your domain registrar (where you bought saamzgroup.com)

1. Log into domain registrar
2. Find DNS settings/DNS management
3. Add these A records:
   ```
   Type: A
   Name: @
   Value: 68.178.160.108
   TTL: 3600 (or default)
   
   Type: A
   Name: www
   Value: 68.178.160.108
   TTL: 3600 (or default)
   ```
4. Save changes
5. Wait 5-30 minutes for DNS propagation

**Verify DNS:**
```bash
# On your local machine
nslookup saamzgroup.com
# Should show: 68.178.160.108
```

---

### Step 2: Install Nginx (On VPS)

```bash
# SSH into VPS
ssh adminsak@68.178.160.108

# Update package list
sudo apt update

# Install Nginx
sudo apt install nginx -y

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

---

### Step 3: Configure Nginx Reverse Proxy

```bash
# Create configuration file
sudo nano /etc/nginx/sites-available/saamzgroup.com
```

**Paste this configuration:**
```nginx
server {
    listen 80;
    server_name saamzgroup.com www.saamzgroup.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static assets
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }
}
```

**Save:** Press `Ctrl+X`, then `Y`, then `Enter`

---

### Step 4: Enable Site Configuration

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/saamzgroup.com /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

---

### Step 5: Install SSL Certificate

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate (follow prompts)
sudo certbot --nginx -d saamzgroup.com -d www.saamzgroup.com

# Certbot will:
# 1. Verify domain ownership
# 2. Install certificate
# 3. Update Nginx config automatically
# 4. Set up auto-renewal

# Test auto-renewal
sudo certbot renew --dry-run
```

**During Certbot setup:**
- Enter your email address
- Agree to terms of service (Y)
- Choose whether to redirect HTTP to HTTPS (choose 2 for redirect)

---

### Step 6: Update Environment Variables

```bash
# Go to project directory
cd /home/adminsak/sammcabins

# Create/update .env.production
nano .env.production
```

**Add:**
```bash
NEXT_PUBLIC_BASE_URL=https://saamzgroup.com
NODE_ENV=production
```

**Save:** `Ctrl+X`, `Y`, `Enter`

---

### Step 7: Rebuild and Restart

```bash
# Rebuild with new domain
NODE_ENV=production npm run build

# Restart PM2
pm2 restart sammcabins

# Save PM2 config
pm2 save

# Check status
pm2 status
```

---

### Step 8: Verify Domain Works

**In your browser:**
1. Go to: http://saamzgroup.com
   - Should redirect to https://saamzgroup.com
2. Check SSL certificate (click padlock icon)
   - Should show "Secure" with Let's Encrypt certificate
3. Test www redirect: http://www.saamzgroup.com
   - Should work and redirect to https://saamzgroup.com

---

## Phase 2: SEO Setup (1-2 hours)

### Step 1: Google Analytics 4

1. Go to https://analytics.google.com
2. Create account or sign in
3. Create GA4 property:
   - Property name: "SAAM Cabins"
   - Timezone: UAE (UTC+4)
   - Currency: AED
4. Get Measurement ID (format: G-XXXXXXXXXX)
5. Update in code (see SEO_GUIDE.md for details)

---

### Step 2: Google Search Console

1. Go to https://search.google.com/search-console
2. Add property: https://saamzgroup.com
3. Choose HTML tag verification method
4. Copy verification code
5. Update in `src/app/layout.tsx`:
   ```tsx
   verification: {
     google: 'paste-your-code-here',
   }
   ```
6. Rebuild and deploy:
   ```bash
   npm run build
   pm2 restart sammcabins
   ```
7. Go back to Search Console and click "Verify"

---

### Step 3: Submit Sitemap

**In Search Console:**
1. Click "Sitemaps" in left sidebar
2. Enter: `sitemap.xml`
3. Click "Submit"
4. Wait for processing (can take 24-48 hours)

---

### Step 4: Request Indexing

**For each important page:**
1. Go to URL Inspection tool in Search Console
2. Enter URLs:
   - https://saamzgroup.com
   - https://saamzgroup.com/cabins
   - https://saamzgroup.com/gallery
   - https://saamzgroup.com/contact
3. Click "Request Indexing" for each

---

### Step 5: Test Rich Results

1. Go to https://search.google.com/test/rich-results
2. Enter: https://saamzgroup.com
3. Verify all schemas appear:
   - Organization ✓
   - LocalBusiness ✓
   - WebSite ✓
   - BreadcrumbList ✓
4. Fix any errors shown

---

### Step 6: Google My Business

1. Go to https://business.google.com
2. Create business profile:
   - Name: SAAM Cabins
   - Category: Portable Building Manufacturer
   - Location: Your UAE address
3. Verify business (by phone or postcard)
4. Add:
   - Photos of cabins
   - Business hours
   - Contact details
   - Services offered

---

## Phase 3: Monitoring Setup (30 minutes)

### Step 1: Monitor SEO Dashboard

1. Go to: https://saamzgroup.com/admin/seo
2. Bookmark this page
3. Check weekly for:
   - Traffic growth
   - Keyword rankings
   - Technical health

---

### Step 2: Set Up Alerts

**Google Search Console:**
1. Settings → Users and permissions
2. Add email for notifications
3. Enable alerts for:
   - Indexing issues
   - Security issues
   - Manual actions

**Server Monitoring:**
- Already configured via auto-recovery.sh
- Checks site every 5 minutes
- Auto-restarts if down
- Logs to: `/home/adminsak/sammcabins/logs/auto-recovery.log`

---

### Step 3: Weekly Checks

**Every Monday:**
```bash
# SSH to VPS
ssh adminsak@68.178.160.108

# Check server health
pm2 status
free -h
df -h

# Check auto-recovery log
tail -50 /home/adminsak/sammcabins/logs/auto-recovery.log

# Check Nginx status
sudo systemctl status nginx

# Check SSL certificate expiry
sudo certbot certificates
```

---

## Phase 4: Marketing Launch (Ongoing)

### Week 1: Local Listings
- [ ] List on Dubai Yellow Pages
- [ ] Add to UAE Trade directory
- [ ] Submit to Etisalat Business Directory
- [ ] List on Zawya business portal
- [ ] Add to Gulf Business Directory

### Week 2: Social Media
- [ ] Create Facebook Business Page
- [ ] Set up Instagram Business account
- [ ] Create LinkedIn Company Page
- [ ] Post cabin photos on all platforms
- [ ] Link social accounts in website

### Week 3: Content Marketing
- [ ] Write 3 blog posts about porta cabins
- [ ] Create video tour of cabins
- [ ] Upload to YouTube
- [ ] Share on social media

### Week 4: Review Generation
- [ ] Ask satisfied customers for reviews
- [ ] Respond to all Google reviews
- [ ] Share positive reviews on social media
- [ ] Display reviews on website

---

## Troubleshooting

### Domain not resolving
```bash
# Check DNS propagation
nslookup saamzgroup.com

# If shows old IP, wait more time (up to 48 hours)
# Or flush DNS cache on your computer
```

### SSL certificate failed
```bash
# Check if domain resolves first
curl -I http://saamzgroup.com

# Try manual verification
sudo certbot certonly --webroot -w /var/www/html -d saamzgroup.com

# Check Nginx logs
sudo tail -50 /var/log/nginx/error.log
```

### Site not accessible
```bash
# Check if Next.js is running
pm2 status

# Check if Nginx is running
sudo systemctl status nginx

# Check Nginx config
sudo nginx -t

# View Nginx logs
sudo tail -50 /var/log/nginx/error.log
```

### High server load
```bash
# Check resource usage
pm2 monit

# View PM2 logs
pm2 logs sammcabins --lines 100

# Restart if needed
pm2 restart sammcabins
```

---

## Success Metrics

### Week 1
- [ ] Domain resolves correctly
- [ ] SSL certificate active
- [ ] Site accessible via domain
- [ ] Google Search Console verified
- [ ] Sitemap submitted

### Month 1
- [ ] 10+ pages indexed by Google
- [ ] Appearing in branded searches
- [ ] 50+ organic visitors
- [ ] Google My Business live

### Month 3
- [ ] 200+ organic visitors/month
- [ ] Keywords ranking page 2-3
- [ ] 10+ Google My Business reviews
- [ ] Listed on 5+ UAE directories

### Month 6
- [ ] 500+ organic visitors/month
- [ ] 5+ keywords on page 1
- [ ] 25+ reviews (4.5+ rating)
- [ ] Leads coming from organic search

---

## Quick Reference

**Domain:** saamzgroup.com  
**IP:** 68.178.160.108  
**VPS User:** adminsak  
**Project Path:** /home/adminsak/sammcabins  
**PM2 App:** sammcabins  

**Admin URLs:**
- Admin Panel: /admin
- Gallery Admin: /admin/gallery
- SEO Dashboard: /admin/seo
- Site Settings: /admin/settings

**Monitoring:**
- Health Check: /api/health
- Server Logs: `pm2 logs sammcabins`
- Auto-recovery: `/home/adminsak/sammcabins/logs/auto-recovery.log`
- Nginx Logs: `/var/log/nginx/error.log`

**Important Files:**
- Nginx Config: `/etc/nginx/sites-available/saamzgroup.com`
- Environment: `/home/adminsak/sammcabins/.env.production`
- PM2 Config: `/home/adminsak/sammcabins/ecosystem.config.js`

---

## Need Help?

- Domain setup issues → Check DOMAIN_SETUP.md
- SEO questions → Check SEO_GUIDE.md  
- Server problems → Check UPTIME_GUIDE.md
- Emergency downtime → Run auto-recovery manually:
  ```bash
  cd /home/adminsak/sammcabins
  bash scripts/auto-recovery.sh
  ```

---

**🎉 Good luck with your launch!**
