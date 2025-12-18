#!/bin/bash

# Non-privileged VPS Setup Script
# Run this if you don't have sudo access

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🔧 Setting up application without root access...${NC}"

# Check if Node.js is installed
if command -v node &> /dev/null; then
    echo -e "${GREEN}✅ Node.js is already installed: $(node --version)${NC}"
else
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo -e "${YELLOW}Please contact your hosting provider to install Node.js 20.x${NC}"
    exit 1
fi

# Check if npm is installed
if command -v npm &> /dev/null; then
    echo -e "${GREEN}✅ npm is already installed: $(npm --version)${NC}"
else
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

# Install PM2 globally in user space
echo -e "${YELLOW}📦 Installing PM2 globally...${NC}"
npm install -g pm2 || {
    echo -e "${YELLOW}⚠️  Global install failed, trying local install...${NC}"
    npm install pm2
    export PATH=$PATH:$PWD/node_modules/.bin
}

# Verify PM2 installation
if command -v pm2 &> /dev/null; then
    echo -e "${GREEN}✅ PM2 installed: $(pm2 --version)${NC}"
else
    echo -e "${RED}❌ PM2 installation failed${NC}"
    exit 1
fi

# Create application directory structure
echo -e "${YELLOW}📁 Creating directory structure...${NC}"
mkdir -p ~/www/sammcabins/{releases,shared,scripts}
mkdir -p ~/www/sammcabins/shared/logs

# Set proper permissions
chmod -R 755 ~/www/sammcabins

# Create logs directory
mkdir -p ~/www/sammcabins/shared/logs

# Setup PM2 startup (without sudo)
echo -e "${YELLOW}⚙️  Configuring PM2 startup...${NC}"
pm2 startup -u $USER --hp $HOME | grep -v "sudo" || true

echo -e "${GREEN}✅ Setup completed!${NC}"
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "1. Create your .env.production file"
echo "2. Contact your hosting provider for:"
echo "   - Nginx configuration (or they may already have it)"
echo "   - SSL certificate setup"
echo "   - Firewall rules (ports 80, 443)"
echo "3. Use ~/www/sammcabins as your application path instead of /var/www/sammcabins"

# Create a note file with paths
cat > ~/www/sammcabins/PATHS.txt <<EOF
Your application paths (use these in GitHub secrets):

VPS_PATH: $HOME/www/sammcabins
Current Release: $HOME/www/sammcabins/current
Shared Directory: $HOME/www/sammcabins/shared
Environment File: $HOME/www/sammcabins/shared/.env.production
Scripts: $HOME/www/sammcabins/scripts

PM2 Commands:
pm2 start ecosystem.config.js
pm2 status
pm2 logs sammcabins
pm2 restart sammcabins
pm2 stop sammcabins

Note: You're using a non-root user setup.
Contact GoDaddy support if you need:
- Nginx configuration
- SSL certificates
- Firewall rules
EOF

echo -e "${GREEN}📄 Paths saved to ~/www/sammcabins/PATHS.txt${NC}"
