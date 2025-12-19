# 🛡️ Server Stability & Uptime Guide

## ✅ What We've Done to Prevent Downtime

### 1. **Optimized Resource Usage**
- Single PM2 instance (reduced from multiple cluster instances)
- Memory limited to 400MB (prevents memory leaks)
- Production mode with dev dependencies removed
- Next.js compression and caching enabled

### 2. **Automatic Recovery**
- **Health Check Endpoint**: `/api/health` monitors server status
- **Auto-Recovery Script**: Checks site every 5 minutes and restarts if down
- **PM2 Auto-restart**: Restarts on crashes (max 10 times in 1 minute)
- **PM2 Startup**: Automatically starts on server reboot

### 3. **Resource Limits**
- Max memory: 400MB (will restart if exceeded)
- Min uptime: 10 seconds (prevents restart loops)
- Node.js memory limit: 400MB
- Single process (reduces CPU contention)

## 🚀 One-Time Setup (Run on VPS)

SSH into your VPS and run:

\`\`\`bash
cd /home/adminsak/sammcabins
bash scripts/setup-monitoring.sh
\`\`\`

This will:
- Setup PM2 to start on system boot
- Enable auto-recovery cron job (every 5 minutes)
- Create log directories

## 📊 Monitoring Commands

### Check if site is running:
\`\`\`bash
curl http://localhost:3000/api/health
# Should return: {"status":"ok",...}
\`\`\`

### Check PM2 status:
\`\`\`bash
pm2 status
pm2 monit  # Real-time monitoring
pm2 logs sammcabins  # View logs
\`\`\`

### Check resource usage:
\`\`\`bash
free -h  # Memory usage
top  # CPU usage
df -h  # Disk usage
\`\`\`

### View auto-recovery logs:
\`\`\`bash
tail -f /home/adminsak/sammcabins/logs/auto-recovery.log
\`\`\`

## 🆘 Emergency Recovery Commands

### If site is down:
\`\`\`bash
cd /home/adminsak/sammcabins
pm2 restart sammcabins
\`\`\`

### If PM2 is not running:
\`\`\`bash
cd /home/adminsak/sammcabins
pm2 start ecosystem.config.js
pm2 save
\`\`\`

### If server was rebooted:
\`\`\`bash
pm2 resurrect
# If that doesn't work:
cd /home/adminsak/sammcabins
pm2 start ecosystem.config.js
pm2 save
\`\`\`

### Clear logs if disk is full:
\`\`\`bash
pm2 flush sammcabins
rm -rf /home/adminsak/sammcabins/logs/*.log
\`\`\`

## ⚠️ Warning Signs

Your site might be having issues if:
- CPU usage stays above 80% for extended periods
- Memory usage consistently near 400MB
- PM2 shows frequent restarts
- Response time > 5 seconds

## 🔧 Additional Optimization Tips

### If CPU is still high:
1. **Add Nginx reverse proxy** to serve static files
2. **Enable Redis** for session/cache storage
3. **Upgrade VPS** to 2 CPU cores minimum

### Recommended VPS Specs:
- **Minimum**: 1 CPU core, 1GB RAM, 25GB SSD
- **Recommended**: 2 CPU cores, 2GB RAM, 50GB SSD

## 📞 Support

If you continue experiencing downtime:
1. Check logs: \`pm2 logs sammcabins --lines 100\`
2. Check auto-recovery: \`tail -50 logs/auto-recovery.log\`
3. Check system resources: \`top\` and \`free -h\`
4. Contact your hosting provider if hardware limits are reached

## ✨ Current Setup

- **Process Manager**: PM2 (single fork process)
- **Auto-restart**: Enabled (on crash or memory limit)
- **Health Monitoring**: Every 5 minutes
- **Memory Limit**: 400MB
- **Auto-recovery**: Enabled
- **Boot on Startup**: Enabled
