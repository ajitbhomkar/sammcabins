#!/bin/bash

# Setup monitoring and auto-recovery for Sammcabins
# Run this once on the VPS: bash scripts/setup-monitoring.sh

echo "🔧 Setting up server monitoring for Sammcabins..."

# Create logs directory
mkdir -p /home/adminsak/sammcabins/logs
chmod 755 /home/adminsak/sammcabins/logs

# Make auto-recovery script executable
chmod +x /home/adminsak/sammcabins/scripts/auto-recovery.sh

# Add cron job for auto-recovery (every 5 minutes)
CRON_CMD="*/5 * * * * /home/adminsak/sammcabins/scripts/auto-recovery.sh"
(crontab -l 2>/dev/null | grep -v "auto-recovery.sh"; echo "$CRON_CMD") | crontab -

echo "✅ Monitoring setup complete!"
echo ""
echo "📊 Current cron jobs:"
crontab -l
echo ""
echo "🏥 Health check will run every 5 minutes"
echo "📝 Logs will be saved to: /home/adminsak/sammcabins/logs/auto-recovery.log"
echo ""
echo "To manually check site health:"
echo "  curl http://localhost:3000/api/health"
echo ""
echo "To view auto-recovery logs:"
echo "  tail -f /home/adminsak/sammcabins/logs/auto-recovery.log"
