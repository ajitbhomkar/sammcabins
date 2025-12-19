#!/bin/bash

# Auto-recovery script for Sammcabins
# Add to crontab: */5 * * * * /home/adminsak/sammcabins/scripts/auto-recovery.sh

SITE_URL="http://localhost:3000/api/health"
LOG_FILE="/home/adminsak/sammcabins/logs/auto-recovery.log"
MAX_CPU=80

echo "[$(date)] Checking server health..." >> $LOG_FILE

# Check if site responds
if ! curl -f -s -o /dev/null $SITE_URL; then
    echo "[$(date)] ERROR: Site is down! Attempting restart..." >> $LOG_FILE
    cd /home/adminsak/sammcabins
    pm2 restart sammcabins
    sleep 5
    
    # Check if restart worked
    if curl -f -s -o /dev/null $SITE_URL; then
        echo "[$(date)] SUCCESS: Site restarted successfully" >> $LOG_FILE
    else
        echo "[$(date)] CRITICAL: Site still down after restart!" >> $LOG_FILE
    fi
else
    echo "[$(date)] Site is healthy" >> $LOG_FILE
fi

# Check CPU usage
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}')
CPU_INT=${CPU_USAGE%.*}

if [ $CPU_INT -gt $MAX_CPU ]; then
    echo "[$(date)] WARNING: CPU usage is high ($CPU_INT%)" >> $LOG_FILE
fi

# Keep log file under 10MB
if [ -f "$LOG_FILE" ]; then
    SIZE=$(du -k "$LOG_FILE" | cut -f1)
    if [ $SIZE -gt 10240 ]; then
        tail -n 1000 "$LOG_FILE" > "$LOG_FILE.tmp"
        mv "$LOG_FILE.tmp" "$LOG_FILE"
        echo "[$(date)] Log file trimmed" >> $LOG_FILE
    fi
fi
