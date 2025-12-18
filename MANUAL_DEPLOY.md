# Manual Deployment Guide for VPS

## Quick Deployment Steps

### Option 1: SSH and Deploy (Recommended)

1. **Open a new terminal window** and SSH into your VPS:
   ```bash
   ssh your-username@68.178.160.108
   ```
   Replace `your-username` with your actual VPS username (might be: root, ubuntu, admin, or your custom username)

2. **Navigate to your project directory:**
   ```bash
   # Try these common locations:
   cd ~/sammcabins
   # OR
   cd /var/www/sammcabins
   # OR
   cd /home/your-username/sammcabins
   ```

3. **Pull the latest code from GitHub:**
   ```bash
   git pull origin main
   ```

4. **Install dependencies (if package.json changed):**
   ```bash
   npm install
   ```

5. **Build the project:**
   ```bash
   npm run build
   ```

6. **Restart the application:**
   
   If using PM2:
   ```bash
   pm2 restart sammcabins
   # OR if not running yet:
   pm2 start npm --name "sammcabins" -- start
   pm2 save
   ```
   
   If using systemd:
   ```bash
   sudo systemctl restart sammcabins
   ```
   
   If running directly:
   ```bash
   # Find the process
   ps aux | grep "next"
   # Kill it (replace PID with actual process ID)
   kill PID
   # Start new one
   nohup npm start > /dev/null 2>&1 &
   ```

7. **Verify the deployment:**
   ```bash
   # Check if it's running
   pm2 status
   # OR
   curl http://localhost:3000
   ```

8. **Clear browser cache** and visit: http://68.178.160.108:3000

---

## Option 2: If you don't remember VPS details

Run this on your local machine to find SSH config:
```bash
cat ~/.ssh/config | grep -A 5 "68.178.160.108"
```

Or check for saved connection details:
```bash
grep -r "68.178.160.108" ~/.ssh/
```

---

## Troubleshooting

### If git pull fails with "local changes would be overwritten":
```bash
git stash
git pull origin main
git stash pop
```

### If build fails due to memory:
```bash
export NODE_OPTIONS="--max-old-space-size=2048"
npm run build
```

### If port 3000 is already in use:
```bash
# Find what's using port 3000
lsof -i :3000
# Kill the process
kill -9 PID
```

### To check application logs:
```bash
# If using PM2:
pm2 logs sammcabins

# If using systemd:
sudo journalctl -u sammcabins -f

# If running directly:
tail -f nohup.out
```

---

## Quick One-Liner (if everything is set up)

If you know your SSH details, run this from your local machine:
```bash
ssh your-username@68.178.160.108 "cd ~/sammcabins && git pull origin main && npm install && npm run build && pm2 restart sammcabins"
```

Replace:
- `your-username` with your VPS username
- `~/sammcabins` with your actual project path
- `pm2 restart sammcabins` with your process manager command
