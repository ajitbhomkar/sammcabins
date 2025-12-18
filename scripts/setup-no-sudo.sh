#!/bin/bash

# VPS Setup Script - No Sudo Required
# This script installs everything in user's home directory

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🔧 Setting up VPS without sudo access...${NC}"

# Set up directory structure in home directory
APP_DIR="$HOME/sammcabins"
echo -e "${YELLOW}📁 Creating directory structure in $APP_DIR...${NC}"
mkdir -p $APP_DIR/{releases,shared,scripts,logs}
mkdir -p $APP_DIR/shared

# Install NVM (Node Version Manager) - no sudo needed
echo -e "${YELLOW}📦 Installing NVM (Node Version Manager)...${NC}"
if [ ! -d "$HOME/.nvm" ]; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
else
    echo -e "${GREEN}✅ NVM already installed${NC}"
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Install Node.js 20
echo -e "${YELLOW}📦 Installing Node.js 20...${NC}"
nvm install 20
nvm use 20
nvm alias default 20

# Verify Node installation
echo -e "${YELLOW}🔍 Verifying Node.js installation...${NC}"
node --version
npm --version

# Install PM2 locally (without -g flag)
echo -e "${YELLOW}📦 Installing PM2...${NC}"
npm install pm2 -g --prefix=$HOME/.local

# Add PM2 to PATH
if ! grep -q "export PATH=\$HOME/.local/bin:\$PATH" ~/.bashrc; then
    echo 'export PATH=$HOME/.local/bin:$PATH' >> ~/.bashrc
fi

# Source bashrc
source ~/.bashrc 2>/dev/null || true

# Create environment file template
echo -e "${YELLOW}📝 Creating environment template...${NC}"
cat > $APP_DIR/shared/.env.production.example <<'EOF'
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://saamcabins.com
PORT=3000

# CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
CONTACT_EMAIL=info@saamcabins.com
EOF

echo -e "${GREEN}✅ Setup completed successfully!${NC}"
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "1. Copy environment template: cp $APP_DIR/shared/.env.production.example $APP_DIR/shared/.env.production"
echo "2. Edit environment file: nano $APP_DIR/shared/.env.production"
echo "3. Add NVM to your shell: source ~/.bashrc"
echo "4. Verify PM2: ~/.local/bin/pm2 --version"
echo ""
echo -e "${YELLOW}⚠️  Important:${NC}"
echo "Since we don't have sudo access, you'll need to:"
echo "- Use a custom port (3000) instead of 80/443"
echo "- Configure port forwarding in GoDaddy panel: 80 -> 3000 and 443 -> 3000"
echo "- Or use GoDaddy's Application Manager to set up the reverse proxy"
