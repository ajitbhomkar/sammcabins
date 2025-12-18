#!/bin/bash

# Rollback script to revert to previous deployment

set -e

APP_PATH="/var/www/sammcabins"
RELEASES_PATH="$APP_PATH/releases"
CURRENT_LINK="$APP_PATH/current"

echo "🔄 Rolling back to previous release..."

# Get current and previous release
CURRENT_RELEASE=$(readlink $CURRENT_LINK)
PREVIOUS_RELEASE=$(ls -t $RELEASES_PATH | grep -v $(basename $CURRENT_RELEASE) | head -1)

if [ -z "$PREVIOUS_RELEASE" ]; then
    echo "❌ No previous release found"
    exit 1
fi

PREVIOUS_PATH="$RELEASES_PATH/$PREVIOUS_RELEASE"

echo "📦 Current release: $(basename $CURRENT_RELEASE)"
echo "📦 Rolling back to: $PREVIOUS_RELEASE"

# Update symlink
ln -sfn $PREVIOUS_PATH $CURRENT_LINK

# Reload PM2
cd $CURRENT_LINK
pm2 reload ecosystem.config.js

echo "✅ Rollback completed successfully!"
pm2 status
