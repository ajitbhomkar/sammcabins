#!/bin/bash

# Health check script for monitoring
# Can be run by cron or monitoring tools

APP_URL="https://saamcabins.com"
PM2_APP="sammcabins"

# Check if application is responding
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $APP_URL)

if [ $HTTP_CODE -eq 200 ]; then
    echo "✅ Application is healthy (HTTP $HTTP_CODE)"
    exit 0
else
    echo "❌ Application is unhealthy (HTTP $HTTP_CODE)"
    
    # Try to restart PM2
    pm2 restart $PM2_APP
    
    # Wait and check again
    sleep 5
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $APP_URL)
    
    if [ $HTTP_CODE -eq 200 ]; then
        echo "✅ Application recovered after restart"
        exit 0
    else
        echo "❌ Application still unhealthy after restart"
        # Send alert (add your notification logic here)
        exit 1
    fi
fi
