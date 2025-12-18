#!/bin/bash

# Deployment script for SAAM Cabins VPS
# Deploys to: adminsak@68.178.160.108:/home/adminsak/sammcabins

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# VPS Configuration
VPS_HOST="68.178.160.108"
VPS_USER="adminsak"
PROJECT_PATH="/home/adminsak/sammcabins"
APP_NAME="sammcabins"

echo -e "${GREEN}🚀 Starting deployment to VPS...${NC}"
echo -e "${YELLOW}📋 Configuration:${NC}"
echo -e "   Host: ${VPS_HOST}"
echo -e "   User: ${VPS_USER}"
echo -e "   Path: ${PROJECT_PATH}"
echo ""

# Check if we can connect
echo -e "${YELLOW}🔌 Testing SSH connection...${NC}"
if ! ssh -o ConnectTimeout=5 -o BatchMode=yes ${VPS_USER}@${VPS_HOST} exit 2>/dev/null; then
    echo -e "${RED}❌ Cannot connect to VPS. Please check:${NC}"
    echo "   1. SSH key is set up correctly"
    echo "   2. You can connect manually with: ssh ${VPS_USER}@${VPS_HOST}"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ SSH connection successful${NC}"
echo ""

# Deploy
echo -e "${BLUE}📦 Deploying application...${NC}"

ssh ${VPS_USER}@${VPS_HOST} bash << 'ENDSSH'
set -e

# Colors for remote
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

cd /home/adminsak/sammcabins

echo -e "${YELLOW}📥 Pulling latest code from GitHub...${NC}"
git pull origin main

echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

echo -e "${YELLOW}🔨 Building application...${NC}"
npm run build

echo -e "${YELLOW}🔄 Restarting application with PM2...${NC}"

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Installing PM2 globally...${NC}"
    npm install -g pm2
fi

# Check if app is already running
if pm2 list | grep -q "sammcabins"; then
    echo -e "${BLUE}Restarting existing PM2 process...${NC}"
    pm2 restart sammcabins
else
    echo -e "${BLUE}Starting new PM2 process...${NC}"
    pm2 start npm --name "sammcabins" -- start
    pm2 save
fi

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo ""
echo -e "${YELLOW}📊 Application status:${NC}"
pm2 list
echo ""
echo -e "${GREEN}🌐 Your application is now live at: http://68.178.160.108:3000${NC}"

ENDSSH

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${YELLOW}💡 Tip: Do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R) to see the latest changes${NC}"
