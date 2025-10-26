# Server Disk Space Cleanup Guide

## Problem
Your server ran out of disk space, causing deployment failures.

## Immediate Fix Required

### 1. SSH into your server
```bash
ssh root@your-server-ip
```

### 2. Check current disk usage
```bash
df -h
```

### 3. Find what's using space
```bash
# Check /var/www/mypal directory
du -h /var/www/mypal | sort -rh | head -20

# Check overall system usage
du -h / 2>/dev/null | sort -rh | head -30
```

### 4. Clean up old deployments and backups
```bash
cd /var/www/mypal
# Remove ALL old deployment directories
rm -rf deploy_*
# Remove ALL old backup directories  
rm -rf backup_*
# Check space freed
df -h
```

### 5. Clean system caches
```bash
# Clean apt cache
sudo apt clean
sudo apt autoclean

# Clean old journal logs (keep only 7 days)
sudo journalctl --vacuum-time=7d

# Remove old kernels (if any)
sudo apt autoremove -y
```

### 6. Check Docker (if you're using it)
```bash
# If using Docker, clean up unused images/containers
docker system prune -a --volumes -f
```

### 7. Verify space is available
```bash
df -h
# You should see at least 2-3GB free space
```

## After Cleanup

Once you have free space, you can push the updated workflow:

```bash
# On your local machine
cd /home/olalekan/Folders/codes/mypal-inc-admin
git push origin main
```

The new workflow:
- ✅ Only deploys static files (no node_modules)
- ✅ Much smaller deployment packages (~50MB vs ~500MB)
- ✅ Faster transfers
- ✅ Less disk space usage

## Prevent Future Issues

### Monitor disk space
```bash
# Add to crontab to get alerts
0 */6 * * * df -h | grep -E '(9[0-9]|100)%' && echo "Disk space critical" | mail -s "Server Alert" your-email@example.com
```

### Automatic cleanup script
Create `/root/cleanup-deployments.sh`:
```bash
#!/bin/bash
cd /var/www/mypal
# Keep only last 2 deployments and 1 backup
ls -dt deploy_* | tail -n +3 | xargs -r rm -rf
ls -dt backup_* | tail -n +2 | xargs -r rm -rf
```

Add to crontab:
```bash
0 2 * * * /root/cleanup-deployments.sh
```

## Troubleshooting

If you still see "No space left on device":
1. Check for large log files: `find /var/log -type f -size +100M`
2. Check for core dumps: `find / -name "core.*" -size +100M 2>/dev/null`
3. Check for temp files: `du -h /tmp | sort -rh | head -10`
4. Consider upgrading your server storage
