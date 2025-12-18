# 🚀 Complete Deployment Guide for GoDaddy VPS

This guide covers the complete setup and deployment process for the Saam Cabins Next.js application on GoDaddy VPS with CI/CD, CMS integration, and server-side rendering.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [VPS Initial Setup](#vps-initial-setup)
3. [CMS Setup](#cms-setup)
4. [GitHub Actions Setup](#github-actions-setup)
5. [SSL Configuration](#ssl-configuration)
6. [First Deployment](#first-deployment)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Prerequisites

### On Your Local Machine:
- Git installed
- Node.js 20.x installed
- SSH access to your GoDaddy VPS
- GitHub repository for your project

### On GoDaddy VPS:
- AlmaLinux 9 (cPanel) - as shown in your screenshot
- Root or sudo access
- Public IP: 68.178.160.108
- Domain: saamcabins.com configured

---

## 🔧 VPS Initial Setup

### Step 1: Connect to Your VPS

```bash
# From your local machine
ssh adminsak@68.178.160.108

# Or using the hostname
ssh adminsak@108.160.178.68.host.secureserver.net
```

### Step 2: Run Initial Setup Script

```bash
# Upload the setup script
scp scripts/setup-vps.sh adminsak@68.178.160.108:/tmp/

# SSH into VPS and run
ssh adminsak@68.178.160.108
chmod +x /tmp/setup-vps.sh
sudo /tmp/setup-vps.sh
```

This script will:
- Update system packages
- Install Node.js 20.x
- Install PM2 process manager
- Install and configure Nginx
- Create application directory structure
- Set up firewall rules

### Step 3: Verify Installation

```bash
node --version    # Should show v20.x.x
npm --version     # Should show 10.x.x
pm2 --version     # Should show 5.x.x
nginx -v          # Should show nginx version
```

---

## 📦 CMS Setup

### Option 1: Sanity CMS (Recommended)

Sanity is perfect for structured content like cabin listings, amenities, and galleries.

#### 1. Create Sanity Project

```bash
# On your local machine
npm install -g @sanity/cli
sanity init
```

Follow the prompts:
- Project name: "Saam Cabins"
- Use default dataset configuration: Yes
- Project output path: ./sanity-studio
- Schema: Choose "Clean project"

#### 2. Define Sanity Schemas

Create schema for cabins:

```javascript
// sanity-studio/schemas/cabin.js
export default {
  name: 'cabin',
  title: 'Cabin',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Cabin Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'price',
      title: 'Price per Night',
      type: 'number'
    },
    {
      name: 'capacity',
      title: 'Capacity',
      type: 'number'
    },
    {
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number'
    },
    {
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number'
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}]
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'amenity'}]}]
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean'
    }
  ]
}
```

#### 3. Deploy Sanity Studio

```bash
cd sanity-studio
sanity deploy
```

Choose a studio hostname (e.g., saamcabins.sanity.studio)

#### 4. Configure Next.js for Sanity

```bash
npm install next-sanity @portabletext/react @sanity/image-url
```

Create Sanity client:

```javascript
// src/lib/sanity.client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
```

#### 5. Update Environment Variables

```bash
# .env.production on VPS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
```

### Option 2: Strapi CMS (Alternative)

If you prefer a self-hosted CMS:

```bash
# On your VPS, create separate Strapi instance
npx create-strapi-app@latest strapi-cms --quickstart
cd strapi-cms
npm run develop
```

Configure Nginx to proxy Strapi on a subdomain (cms.saamcabins.com)

---

## 🔐 GitHub Actions Setup

### Step 1: Generate SSH Key Pair

```bash
# On your VPS
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_deploy

# Copy public key to authorized_keys
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys

# Display private key (you'll need this for GitHub)
cat ~/.ssh/github_deploy
```

### Step 2: Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

| Secret Name | Value |
|------------|-------|
| `VPS_SSH_KEY` | Contents of `~/.ssh/github_deploy` (private key) |
| `VPS_HOST` | `68.178.160.108` |
| `VPS_USER` | `adminsak` |
| `VPS_PATH` | `/var/www/sammcabins` |

### Step 3: Upload Deployment Script to VPS

```bash
# From your local machine
scp scripts/deploy.sh adminsak@68.178.160.108:/var/www/sammcabins/scripts/
ssh adminsak@68.178.160.108 "chmod +x /var/www/sammcabins/scripts/deploy.sh"
```

### Step 4: Create Environment File on VPS

```bash
# SSH into VPS
ssh adminsak@68.178.160.108

# Create production environment file
nano /var/www/sammcabins/shared/.env.production
```

Add your environment variables (see `.env.example`)

---

## 🔒 SSL Configuration

### Option 1: Using Let's Encrypt (Free)

```bash
# On your VPS
scp scripts/setup-ssl.sh adminsak@68.178.160.108:/tmp/
ssh adminsak@68.178.160.108
chmod +x /tmp/setup-ssl.sh

# Edit email in script before running
sudo nano /tmp/setup-ssl.sh
# Change: --email your-email@example.com

sudo /tmp/setup-ssl.sh
```

### Option 2: Using GoDaddy SSL Certificate

If you purchased SSL from GoDaddy:

```bash
# Upload your certificates
scp saamcabins.crt adminsak@68.178.160.108:/tmp/
scp saamcabins.key adminsak@68.178.160.108:/tmp/

# Move to proper location
ssh adminsak@68.178.160.108
sudo mv /tmp/saamcabins.crt /etc/ssl/certs/
sudo mv /tmp/saamcabins.key /etc/ssl/private/
sudo chmod 600 /etc/ssl/private/saamcabins.key

# Restart Nginx
sudo systemctl restart nginx
```

### Verify SSL

```bash
curl -I https://saamcabins.com
# Should return 200 OK with proper headers
```

---

## 🎉 First Deployment

### Option 1: Using GitHub Actions (Recommended)

```bash
# From your local machine
git add .
git commit -m "Initial deployment setup"
git push origin main
```

Watch the deployment:
- Go to GitHub → Actions tab
- Monitor the deployment progress

### Option 2: Manual Deployment

```bash
# From your local machine
npm run build

# Upload to VPS
rsync -avz --exclude 'node_modules' ./ adminsak@68.178.160.108:/var/www/sammcabins/current/

# SSH and start
ssh adminsak@68.178.160.108
cd /var/www/sammcabins/current
npm ci --production
pm2 start ecosystem.config.js
pm2 save
```

---

## 📊 Monitoring & Maintenance

### PM2 Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs sammcabins

# Monitor in real-time
pm2 monit

# Restart application
pm2 restart sammcabins

# Stop application
pm2 stop sammcabins
```

### Nginx Commands

```bash
# Check status
sudo systemctl status nginx

# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# View logs
sudo tail -f /var/log/nginx/sammcabins_access.log
sudo tail -f /var/log/nginx/sammcabins_error.log
```

### System Monitoring

```bash
# Check disk space
df -h

# Check memory usage
free -h

# Check CPU usage
top

# Check application performance
pm2 monit
```

---

## 🔧 Troubleshooting

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs sammcabins --lines 100

# Check if port 3000 is in use
sudo netstat -tulpn | grep 3000

# Restart PM2
pm2 delete sammcabins
pm2 start ecosystem.config.js
```

### Nginx 502 Bad Gateway

```bash
# Check if Next.js is running
pm2 status

# Check Nginx error logs
sudo tail -f /var/log/nginx/sammcabins_error.log

# Restart both services
pm2 restart sammcabins
sudo systemctl restart nginx
```

### Build Fails in CI/CD

```bash
# Check GitHub Actions logs
# Common issues:
# - Missing environment variables
# - Node version mismatch
# - Dependency conflicts

# Test build locally
npm ci
npm run build
```

### SSL Certificate Issues

```bash
# Check certificate expiry
sudo certbot certificates

# Renew manually
sudo certbot renew

# Check Nginx SSL configuration
sudo nginx -t
```

### Performance Issues

```bash
# Increase PM2 instances
pm2 scale sammcabins +2

# Check memory usage
pm2 monit

# Clear PM2 logs
pm2 flush

# Enable Next.js caching
# Add to next.config.ts:
# experimental: {
#   isrMemoryCacheSize: 0, // Disable ISR cache for production
# }
```

---

## 📈 Server-Side Rendering (SSR) Best Practices

### 1. Data Fetching in Next.js 14+

```typescript
// app/cabins/page.tsx
import { client } from '@/lib/sanity.client'

export default async function CabinsPage() {
  // Server-side data fetching
  const cabins = await client.fetch(`*[_type == "cabin" && !(_id in path("drafts.**"))]`)
  
  return (
    <div>
      {cabins.map(cabin => (
        <CabinCard key={cabin._id} cabin={cabin} />
      ))}
    </div>
  )
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600 // Revalidate every hour
```

### 2. Dynamic Routes with SSR

```typescript
// app/cabins/[slug]/page.tsx
import { client } from '@/lib/sanity.client'

export async function generateStaticParams() {
  const cabins = await client.fetch(`*[_type == "cabin"].slug.current`)
  return cabins.map(slug => ({ slug }))
}

export default async function CabinPage({ params }: { params: { slug: string } }) {
  const cabin = await client.fetch(
    `*[_type == "cabin" && slug.current == $slug][0]`,
    { slug: params.slug }
  )
  
  return <CabinDetail cabin={cabin} />
}
```

### 3. Optimize Images

```typescript
// next.config.ts
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
    formats: ['image/avif', 'image/webp'],
  },
}
```

---

## 🎯 Next Steps After Deployment

1. **Set up monitoring**: Install New Relic or Datadog
2. **Configure backups**: Set up automated database backups
3. **Add CDN**: Consider Cloudflare for static assets
4. **Set up staging environment**: Create a staging server for testing
5. **Configure email**: Set up transactional email service (SendGrid, Mailgun)
6. **Add error tracking**: Integrate Sentry for error monitoring
7. **Performance optimization**: Implement Redis caching
8. **Security audit**: Run security scans regularly

---

## 📞 Support

For issues or questions:
- Check GitHub Actions logs for CI/CD issues
- Review PM2 logs for application errors
- Check Nginx logs for proxy issues
- Review this documentation thoroughly

---

## 🎉 Congratulations!

Your Next.js application is now deployed with:
- ✅ Automated CI/CD pipeline
- ✅ Server-side rendering
- ✅ CMS integration
- ✅ SSL/HTTPS
- ✅ Process management with PM2
- ✅ Reverse proxy with Nginx
- ✅ Automatic deployments

Happy coding! 🚀
