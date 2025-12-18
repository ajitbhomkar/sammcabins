#!/bin/bash

# Deployment script for GoDaddy VPS
# This script handles the deployment process

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="sammcabins"
APP_PATH="/var/www/sammcabins"
RELEASES_PATH="$APP_PATH/releases"
CURRENT_LINK="$APP_PATH/current"
KEEP_RELEASES=5

echo -e "${GREEN}🚀 Starting deployment...${NC}"

# Get the latest release directory
LATEST_RELEASE=$(ls -t $RELEASES_PATH | head -1)
RELEASE_PATH="$RELEASES_PATH/$LATEST_RELEASE"

echo -e "${YELLOW}📦 Release: $LATEST_RELEASE${NC}"

# Navigate to release directory
cd $RELEASE_PATH

# Copy .env file from shared directory
if [ -f "$APP_PATH/shared/.env.production" ]; then
    echo -e "${YELLOW}📋 Copying environment variables...${NC}"
    cp "$APP_PATH/shared/.env.production" .env.production
else
    echo -e "${RED}⚠️  Warning: .env.production not found in shared directory${NC}"
fi

# Install dependencies
echo -e "${YELLOW}📥 Installing dependencies...${NC}"
npm ci --production

# Create logs directory
mkdir -p logs

# Update symlink to current release
echo -e "${YELLOW}🔗 Updating symlink...${NC}"
ln -sfn $RELEASE_PATH $CURRENT_LINK

# Reload PM2
echo -e "${YELLOW}🔄 Reloading PM2...${NC}"
cd $CURRENT_LINK

# Check if PM2 process exists
if pm2 describe $APP_NAME > /dev/null 2>&1; then
    pm2 reload ecosystem.config.js --update-env
else
    pm2 start ecosystem.config.js
fi

# Save PM2 configuration
pm2 save

# Clean up old releases
echo -e "${YELLOW}🧹 Cleaning up old releases...${NC}"
cd $RELEASES_PATH
ls -t | tail -n +$((KEEP_RELEASES + 1)) | xargs -r rm -rf

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"

# Show PM2 status
pm2 status
