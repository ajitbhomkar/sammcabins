#!/bin/bash

# Initial VPS Setup Script for GoDaddy
# Run this script once on your VPS to set up the environment

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🔧 Setting up GoDaddy VPS for Next.js deployment...${NC}"

# Update system
echo -e "${YELLOW}📦 Updating system packages...${NC}"
sudo yum update -y

# Install Node.js 20.x
echo -e "${YELLOW}📦 Installing Node.js...${NC}"
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Verify Node.js installation
node --version
npm --version

# Install PM2 globally
echo -e "${YELLOW}📦 Installing PM2...${NC}"
sudo npm install -g pm2

# Install Nginx
echo -e "${YELLOW}📦 Installing Nginx...${NC}"
sudo yum install -y nginx

# Create application directory structure
echo -e "${YELLOW}📁 Creating directory structure...${NC}"
sudo mkdir -p /var/www/sammcabins/{releases,shared,scripts}
sudo mkdir -p /var/www/sammcabins/shared

# Set proper permissions
sudo chown -R $USER:$USER /var/www/sammcabins

# Create logs directory
mkdir -p /var/www/sammcabins/shared/logs

# Setup PM2 startup
echo -e "${YELLOW}⚙️  Configuring PM2 startup...${NC}"
pm2 startup systemd -u $USER --hp /home/$USER
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER

# Configure Nginx
echo -e "${YELLOW}⚙️  Configuring Nginx...${NC}"
sudo tee /etc/nginx/conf.d/sammcabins.conf > /dev/null <<'EOF'
# Rate limiting
limit_req_zone $binary_remote_addr zone=sammcabins_limit:10m rate=10r/s;

# Upstream configuration
upstream sammcabins_backend {
    least_conn;
    server localhost:3000;
    keepalive 64;
}

# Redirect www to non-www
server {
    listen 80;
    listen [::]:80;
    server_name www.saamcabins.com;
    return 301 https://saamcabins.com$request_uri;
}

# HTTP to HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name saamcabins.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name saamcabins.com;

    # SSL Configuration (update paths to your SSL certificates)
    ssl_certificate /etc/ssl/certs/saamcabins.crt;
    ssl_certificate_key /etc/ssl/private/saamcabins.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Logging
    access_log /var/log/nginx/sammcabins_access.log;
    error_log /var/log/nginx/sammcabins_error.log;

    # Max upload size
    client_max_body_size 10M;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
    gzip_disable "MSIE [1-6]\.";

    # Static files caching
    location /_next/static {
        alias /var/www/sammcabins/current/.next/static;
        expires 365d;
        access_log off;
        add_header Cache-Control "public, immutable";
    }

    location /images {
        alias /var/www/sammcabins/current/public/images;
        expires 30d;
        access_log off;
        add_header Cache-Control "public";
    }

    # Proxy to Next.js
    location / {
        limit_req zone=sammcabins_limit burst=20 nodelay;
        
        proxy_pass http://sammcabins_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

# Test Nginx configuration
sudo nginx -t

# Enable and start Nginx
sudo systemctl enable nginx
sudo systemctl restart nginx

# Configure firewall
echo -e "${YELLOW}🔥 Configuring firewall...${NC}"
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# Create environment file template
echo -e "${YELLOW}📝 Creating environment template...${NC}"
cat > /var/www/sammcabins/shared/.env.production.example <<'EOF'
# Next.js Configuration
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://saamcabins.com

# CMS Configuration (choose one)
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Or Strapi CMS
# NEXT_PUBLIC_STRAPI_URL=https://your-strapi.com
# STRAPI_API_TOKEN=your_api_token

# Or Contentful
# CONTENTFUL_SPACE_ID=your_space_id
# CONTENTFUL_ACCESS_TOKEN=your_access_token

# Email Configuration (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
CONTACT_EMAIL=info@saamcabins.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
EOF

echo -e "${GREEN}✅ VPS setup completed!${NC}"
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "1. Copy .env.production.example to .env.production and fill in your values"
echo "2. Set up SSL certificates (Let's Encrypt recommended)"
echo "3. Add your SSH public key to GitHub Secrets"
echo "4. Configure GitHub Actions secrets"
echo "5. Push to main branch to trigger deployment"
