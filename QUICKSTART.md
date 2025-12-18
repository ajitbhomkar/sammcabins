# 🚀 Quick Start Guide - Deploy to GoDaddy VPS

This is a condensed version for quick deployment. For detailed information, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## ⚡ 5-Step Deployment Process

### Step 1: Initial VPS Setup (One-time, ~15 minutes)

```bash
# 1. Connect to your VPS
ssh adminsak@68.178.160.108

# 2. Upload and run setup script
exit  # Back to local machine
scp scripts/setup-vps.sh adminsak@68.178.160.108:/tmp/
ssh adminsak@68.178.160.108
chmod +x /tmp/setup-vps.sh
sudo /tmp/setup-vps.sh

# 3. Create environment file
nano /var/www/sammcabins/shared/.env.production
# Add your environment variables (see .env.example)
```

### Step 2: SSL Setup (~5 minutes)

```bash
# Still on VPS
scp scripts/setup-ssl.sh adminsak@68.178.160.108:/tmp/
chmod +x /tmp/setup-ssl.sh

# Edit email before running
sudo nano /tmp/setup-ssl.sh
# Change: --email your-email@example.com

sudo /tmp/setup-ssl.sh
```

### Step 3: GitHub Actions Setup (~5 minutes)

```bash
# On VPS - Generate SSH key
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_deploy
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys

# Copy private key content
cat ~/.ssh/github_deploy

# Upload deploy script
exit  # Back to local
scp scripts/deploy.sh adminsak@68.178.160.108:/var/www/sammcabins/scripts/
ssh adminsak@68.178.160.108 "chmod +x /var/www/sammcabins/scripts/deploy.sh"
```

**Add GitHub Secrets** (Repository → Settings → Secrets):
- `VPS_SSH_KEY`: Private key from above
- `VPS_HOST`: `68.178.160.108`
- `VPS_USER`: `adminsak`
- `VPS_PATH`: `/var/www/sammcabins`

### Step 4: CMS Setup (Optional, ~10 minutes)

**For Sanity CMS:**
```bash
# On local machine
npm install -g @sanity/cli
sanity init
# Follow prompts, create project

# Add to .env.production on VPS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
```

### Step 5: Deploy! (~2 minutes)

```bash
# On local machine
git add .
git commit -m "Initial deployment"
git push origin main

# Watch deployment at:
# https://github.com/ajitbhomkar/sammcabins/actions
```

---

## ✅ Verify Deployment

```bash
# Check if site is live
curl -I https://saamcabins.com

# SSH to VPS and check status
ssh adminsak@68.178.160.108
pm2 status
pm2 logs sammcabins --lines 50
```

---

## 🔧 Common Commands

### Local Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run linter
```

### On VPS
```bash
pm2 status           # Check app status
pm2 logs sammcabins  # View logs
pm2 restart sammcabins  # Restart app
pm2 monit            # Real-time monitoring

sudo systemctl status nginx    # Check Nginx
sudo systemctl reload nginx    # Reload Nginx config
sudo nginx -t                  # Test Nginx config
```

### Deployment
```bash
git push origin main           # Auto-deploy via GitHub Actions
ssh adminsak@68.178.160.108   # Manual deployment
cd /var/www/sammcabins/scripts
./deploy.sh
```

---

## 🆘 Quick Troubleshooting

### Site Not Loading
```bash
ssh adminsak@68.178.160.108
pm2 status                    # Check if app is running
pm2 restart sammcabins        # Restart if needed
sudo systemctl status nginx   # Check Nginx
sudo systemctl restart nginx  # Restart Nginx
```

### Deployment Failed
```bash
# Check GitHub Actions logs
# Common fixes:
1. Verify all GitHub Secrets are set
2. Check SSH key permissions
3. Verify .env.production exists on VPS
```

### SSL Issues
```bash
# Check certificate
sudo certbot certificates

# Renew manually
sudo certbot renew

# Restart Nginx
sudo systemctl restart nginx
```

---

## 📊 Architecture Overview

```
GitHub (Code Push)
       ↓
GitHub Actions (CI/CD)
       ↓
GoDaddy VPS (68.178.160.108)
       ↓
Nginx (Port 80/443) → PM2 (Port 3000) → Next.js App
```

### Request Flow:
1. User visits `https://saamcabins.com`
2. Nginx receives request (port 443)
3. Nginx proxies to PM2 (port 3000)
4. PM2 manages Next.js processes
5. Next.js renders page (SSR) or serves static content
6. Response sent back through chain

---

## 🎯 Next Steps

After successful deployment:

1. **Monitor Performance**
   ```bash
   pm2 monit
   # Watch CPU, memory, and logs
   ```

2. **Set Up CMS Content**
   - Create cabin listings
   - Add amenities
   - Upload gallery images

3. **Configure Analytics**
   - Add Google Analytics ID to `.env.production`
   - Verify tracking is working

4. **Test Contact Form**
   - Configure SMTP settings
   - Test form submission

5. **Optimize Images**
   - Upload optimized images to `/public/images/`
   - Use Next.js Image component

6. **Set Up Monitoring**
   - Configure uptime monitoring
   - Set up error alerts

---

## 📱 Key URLs

- **Production Site**: https://saamcabins.com
- **Sanity Studio**: https://[your-project].sanity.studio
- **GitHub Actions**: https://github.com/ajitbhomkar/sammcabins/actions
- **GoDaddy Panel**: https://68.178.160.108:2083

---

## 💡 Pro Tips

1. **Always test locally before pushing**
   ```bash
   npm run build
   npm start
   # Test at http://localhost:3000
   ```

2. **Use staging branch for testing**
   ```bash
   git checkout -b staging
   # Make changes, test, then merge to main
   ```

3. **Monitor logs regularly**
   ```bash
   pm2 logs sammcabins --lines 100
   ```

4. **Keep dependencies updated**
   ```bash
   npm outdated
   npm update
   ```

5. **Backup regularly**
   ```bash
   # On VPS, backup .env and database
   cp /var/www/sammcabins/shared/.env.production ~/backups/
   ```

---

## 📞 Need Help?

- **Detailed Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **VPS Issues**: Check GoDaddy support
- **Code Issues**: GitHub Issues
- **CMS Help**: Sanity documentation

---

**Total Setup Time**: ~40 minutes
**Deployment Time (after setup)**: ~2 minutes per deploy

🎉 **You're all set! Happy deploying!** 🚀
