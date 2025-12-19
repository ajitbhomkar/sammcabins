# Sammcabins Server Monitoring & Recovery

## Auto-restart on failure
pm2 start ecosystem.config.js
pm2 startup
pm2 save

## Monitor server health
watch -n 30 'pm2 status && free -h && uptime'

## If CPU gets high again, check:
pm2 monit
top -o %CPU

## Emergency commands if site goes down:
pm2 restart sammcabins
pm2 logs sammcabins --lines 50
pm2 flush sammcabins

## Clear logs if they grow too large:
pm2 flush sammcabins
rm -rf logs/*.log
mkdir -p logs
