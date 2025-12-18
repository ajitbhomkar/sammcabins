#!/bin/bash

# SSL Setup Script using Let's Encrypt (Certbot)

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🔐 Setting up SSL certificates with Let's Encrypt...${NC}"

# Install Certbot
echo -e "${YELLOW}📦 Installing Certbot...${NC}"
sudo yum install -y epel-release
sudo yum install -y certbot python3-certbot-nginx

# Stop Nginx temporarily
sudo systemctl stop nginx

# Obtain SSL certificate
echo -e "${YELLOW}🔑 Obtaining SSL certificate...${NC}"
sudo certbot certonly --standalone \
    -d saamcabins.com \
    -d www.saamcabins.com \
    --email your-email@example.com \
    --agree-tos \
    --non-interactive

# Update Nginx configuration with correct SSL paths
sudo sed -i 's|/etc/ssl/certs/saamcabins.crt|/etc/letsencrypt/live/saamcabins.com/fullchain.pem|g' /etc/nginx/conf.d/sammcabins.conf
sudo sed -i 's|/etc/ssl/private/saamcabins.key|/etc/letsencrypt/live/saamcabins.com/privkey.pem|g' /etc/nginx/conf.d/sammcabins.conf

# Test Nginx configuration
sudo nginx -t

# Start Nginx
sudo systemctl start nginx

# Set up automatic renewal
echo -e "${YELLOW}⏰ Setting up automatic certificate renewal...${NC}"
sudo systemctl enable certbot-renew.timer
sudo systemctl start certbot-renew.timer

# Test renewal
sudo certbot renew --dry-run

echo -e "${GREEN}✅ SSL certificates installed successfully!${NC}"
echo -e "${YELLOW}📝 Certificate will auto-renew every 90 days${NC}"
