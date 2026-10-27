#!/usr/bin/env bash
# Pull the latest code from GitHub, rebuild, and restart with no downtime
# beyond a few seconds. Run on the server as the uaecne user:
#   bash /var/www/uaecne/deploy/deploy.sh
set -euo pipefail
cd /var/www/uaecne
git pull --ff-only origin main
npm ci
npm run build
pm2 reload deploy/ecosystem.config.cjs --update-env
pm2 save
echo "Deployed $(git log --oneline -1)"
