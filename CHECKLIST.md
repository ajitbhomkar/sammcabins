# ✅ Deployment Checklist

Use this checklist to ensure you complete all steps for successful deployment.

## 📋 Pre-Deployment Checklist

### Local Development Setup
- [ ] Node.js 20.x installed locally
- [ ] Git repository initialized and connected to GitHub
- [ ] All code committed and pushed to GitHub
- [ ] Application builds successfully locally (`npm run build`)
- [ ] Application runs successfully locally (`npm start`)
- [ ] No linting errors (`npm run lint`)

### GitHub Repository Setup
- [ ] Repository created on GitHub (ajitbhomkar/sammcabins)
- [ ] Main branch protected (optional but recommended)
- [ ] Repository is accessible

## 🔧 VPS Initial Setup

### Access & Connection
- [ ] SSH access to VPS verified (`ssh adminsak@68.178.160.108`)
- [ ] Root/sudo privileges confirmed
- [ ] Domain DNS configured to point to VPS IP (68.178.160.108)

### System Setup
- [ ] `setup-vps.sh` uploaded to VPS
- [ ] Script executed: `sudo /tmp/setup-vps.sh`
- [ ] Node.js 20.x installed and verified
- [ ] PM2 installed globally
- [ ] Nginx installed and running
- [ ] Firewall configured (ports 80, 443 open)

### Directory Structure
- [ ] `/var/www/sammcabins` directory created
- [ ] Subdirectories created:
  - [ ] `/var/www/sammcabins/releases`
  - [ ] `/var/www/sammcabins/shared`
  - [ ] `/var/www/sammcabins/scripts`
- [ ] Correct permissions set (owned by your user)

## 🔐 SSL/HTTPS Setup

### Let's Encrypt (Free)
- [ ] `setup-ssl.sh` uploaded to VPS
- [ ] Email address updated in script
- [ ] Script executed: `sudo /tmp/setup-ssl.sh`
- [ ] Certificates obtained successfully
- [ ] Nginx configuration updated with SSL paths
- [ ] Nginx restarted successfully
- [ ] Site accessible via HTTPS
- [ ] HTTP redirects to HTTPS
- [ ] Auto-renewal configured

### Or GoDaddy SSL (Paid)
- [ ] SSL certificate purchased
- [ ] Certificate files (.crt and .key) obtained
- [ ] Files uploaded to VPS
- [ ] Files moved to proper locations
- [ ] Nginx configuration updated
- [ ] Nginx restarted

### Verification
- [ ] `curl -I https://saamcabins.com` returns 200 OK
- [ ] Browser shows secure padlock icon
- [ ] www redirects to non-www (or vice versa)
- [ ] SSL certificate valid and not expired

## 🔑 GitHub Actions Setup

### SSH Key Generation
- [ ] SSH key pair generated on VPS
- [ ] Public key added to `~/.ssh/authorized_keys`
- [ ] Private key content copied

### GitHub Secrets Configuration
Navigate to: GitHub → Your Repo → Settings → Secrets and variables → Actions

- [ ] `VPS_SSH_KEY` added (private key content)
- [ ] `VPS_HOST` added (68.178.160.108)
- [ ] `VPS_USER` added (adminsak)
- [ ] `VPS_PATH` added (/var/www/sammcabins)

### Deployment Scripts
- [ ] `deploy.sh` uploaded to VPS scripts directory
- [ ] Script made executable: `chmod +x /var/www/sammcabins/scripts/deploy.sh`
- [ ] Script tested manually (optional)

## 📝 Environment Configuration

### Production Environment File
- [ ] `.env.production` created on VPS at `/var/www/sammcabins/shared/`
- [ ] All required variables filled in:

#### Essential Variables
- [ ] `NODE_ENV=production`
- [ ] `NEXT_PUBLIC_SITE_URL=https://saamcabins.com`

#### CMS Variables (choose one)
- [ ] Sanity: `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] Sanity: `NEXT_PUBLIC_SANITY_DATASET`
- [ ] Sanity: `SANITY_API_TOKEN`
- [ ] Or Strapi/Contentful/WordPress configured

#### Email Configuration
- [ ] `SMTP_HOST`
- [ ] `SMTP_PORT`
- [ ] `SMTP_USER`
- [ ] `SMTP_PASSWORD`
- [ ] `CONTACT_EMAIL`

#### Optional but Recommended
- [ ] Google Analytics ID
- [ ] GTM ID
- [ ] Other third-party service keys

### Local Environment
- [ ] `.env.local` created for local development
- [ ] Local environment variables configured
- [ ] `.env.example` kept up to date

## 🎨 CMS Setup (If Using Sanity)

### Sanity Project Creation
- [ ] Sanity CLI installed: `npm install -g @sanity/cli`
- [ ] Sanity project created: `sanity init`
- [ ] Project ID obtained
- [ ] Dataset created (production)

### Schema Configuration
- [ ] Schemas created for:
  - [ ] Cabins
  - [ ] Amenities
  - [ ] Gallery images
  - [ ] Contact info
  - [ ] Other content types
- [ ] Schemas deployed to Sanity

### Sanity Studio
- [ ] Studio deployed: `sanity deploy`
- [ ] Studio URL accessible
- [ ] Test content created

### API Configuration
- [ ] API token generated
- [ ] Token added to `.env.production` on VPS
- [ ] Token added to `.env.local` for local dev
- [ ] CORS origins configured (if needed)

### Next.js Integration
- [ ] Sanity client configured in project
- [ ] Data fetching working in components
- [ ] Images loading from Sanity CDN

## 🚀 First Deployment

### Pre-Deployment
- [ ] All code committed
- [ ] `.env.production` verified on VPS
- [ ] PM2 ecosystem config present
- [ ] Nginx config correct

### Deployment Trigger
- [ ] Code pushed to main branch: `git push origin main`
- [ ] GitHub Actions workflow triggered
- [ ] Workflow status checked (GitHub → Actions tab)

### Monitor Deployment
- [ ] Build step passed
- [ ] Test step passed
- [ ] Deploy step passed
- [ ] Health check passed

### Post-Deployment Verification
- [ ] Site accessible: https://saamcabins.com
- [ ] Home page loads correctly
- [ ] All routes working:
  - [ ] /cabins
  - [ ] /amenities
  - [ ] /gallery
  - [ ] /contact
- [ ] Images loading properly
- [ ] Contact form working
- [ ] CMS content displaying
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Fast page loads

## 🔍 VPS Verification

### PM2 Status
```bash
ssh adminsak@68.178.160.108
pm2 status
```
- [ ] All instances running
- [ ] No restarts/errors
- [ ] Memory usage reasonable (<1GB per instance)

### Nginx Status
```bash
sudo systemctl status nginx
```
- [ ] Active and running
- [ ] No errors in logs

### Logs Check
```bash
pm2 logs sammcabins --lines 50
```
- [ ] No error messages
- [ ] Application starting correctly
- [ ] Requests being handled

## 🎯 Testing Checklist

### Functional Testing
- [ ] Homepage loads
- [ ] Navigation works
- [ ] All pages accessible
- [ ] Images load correctly
- [ ] Contact form submits
- [ ] Links work
- [ ] Search functionality (if applicable)

### Performance Testing
- [ ] Page load time <3 seconds
- [ ] Images optimized
- [ ] Lighthouse score >85
- [ ] No memory leaks
- [ ] No excessive CPU usage

### SEO Testing
- [ ] Meta tags present
- [ ] Open Graph tags configured
- [ ] Sitemap accessible (/sitemap.xml)
- [ ] Robots.txt present
- [ ] Structured data (if applicable)

### Security Testing
- [ ] HTTPS working
- [ ] HTTP redirects to HTTPS
- [ ] Security headers present
- [ ] No sensitive data exposed
- [ ] CORS configured correctly

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Mobile Testing
- [ ] Responsive design working
- [ ] Touch interactions work
- [ ] Forms usable on mobile
- [ ] Images scale properly

## 📊 Monitoring Setup

### PM2 Monitoring
- [ ] PM2 startup script configured
- [ ] `pm2 save` executed
- [ ] Auto-restart on reboot enabled

### Log Rotation
- [ ] PM2 logs rotating
- [ ] Nginx logs rotating
- [ ] Old logs being cleaned up

### Health Checks
- [ ] `health-check.sh` uploaded and executable
- [ ] Cron job for health checks (optional)
- [ ] Alerting configured (optional)

### External Monitoring (Optional)
- [ ] Uptime monitoring (e.g., UptimeRobot)
- [ ] Performance monitoring (e.g., New Relic)
- [ ] Error tracking (e.g., Sentry)

## 🔄 Backup & Recovery

### Backup Strategy
- [ ] Environment files backed up
- [ ] Database backup script (if using)
- [ ] Media files backup plan
- [ ] Backup storage location identified

### Recovery Plan
- [ ] Rollback script tested: `./rollback.sh`
- [ ] Recovery procedure documented
- [ ] Backup restoration tested

## 📚 Documentation

### Internal Documentation
- [ ] README.md updated
- [ ] DEPLOYMENT.md reviewed
- [ ] Team members trained (if applicable)
- [ ] Access credentials secured

### External Documentation
- [ ] Client/stakeholder documentation (if applicable)
- [ ] API documentation (if applicable)
- [ ] User guides (if applicable)

## 🎉 Launch Checklist

### Pre-Launch
- [ ] All tests passing
- [ ] Content reviewed and approved
- [ ] Legal pages present (Privacy, Terms)
- [ ] Analytics tracking verified
- [ ] Social media links correct

### Launch
- [ ] DNS propagation complete (24-48 hours)
- [ ] All stakeholders notified
- [ ] Support team briefed (if applicable)

### Post-Launch
- [ ] Monitor logs for 24 hours
- [ ] Check analytics for traffic
- [ ] Verify form submissions working
- [ ] Monitor error rates
- [ ] Check server resources

## 🔧 Maintenance Tasks

### Daily
- [ ] Check PM2 status
- [ ] Review error logs
- [ ] Monitor server resources

### Weekly
- [ ] Check SSL certificate expiry
- [ ] Review access logs
- [ ] Check for updates
- [ ] Backup important data

### Monthly
- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance review
- [ ] Cleanup old releases

## 🆘 Emergency Procedures

### If Site Goes Down
1. [ ] Check PM2 status: `pm2 status`
2. [ ] Check Nginx: `sudo systemctl status nginx`
3. [ ] Review logs: `pm2 logs sammcabins`
4. [ ] Restart services if needed
5. [ ] Rollback if necessary: `./rollback.sh`

### Contact Information
- [ ] VPS support contact saved
- [ ] Domain registrar support saved
- [ ] Developer contact information
- [ ] Emergency escalation plan

---

## ✅ Final Sign-Off

### Deployment Complete When:
- [ ] All items above checked
- [ ] Site live and accessible
- [ ] No critical errors
- [ ] Performance acceptable
- [ ] Monitoring in place
- [ ] Team notified

**Deployed By**: _________________

**Date**: _________________

**Sign-Off**: _________________

---

## 📞 Quick Reference

### Important URLs
- **Production Site**: https://saamcabins.com
- **GitHub Repo**: https://github.com/ajitbhomkar/sammcabins
- **CMS Studio**: https://[your-project].sanity.studio
- **VPS Panel**: https://68.178.160.108:2083

### Important Commands
```bash
# Check status
pm2 status

# View logs
pm2 logs sammcabins

# Restart app
pm2 restart sammcabins

# Check Nginx
sudo systemctl status nginx

# Rollback
cd /var/www/sammcabins/scripts && ./rollback.sh
```

### Important Files
- Deployment script: `/var/www/sammcabins/scripts/deploy.sh`
- Environment: `/var/www/sammcabins/shared/.env.production`
- Nginx config: `/etc/nginx/conf.d/sammcabins.conf`
- PM2 config: `/var/www/sammcabins/current/ecosystem.config.js`

---

**Need Help?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
