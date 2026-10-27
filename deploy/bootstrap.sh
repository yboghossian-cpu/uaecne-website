#!/usr/bin/env bash
# One-time server setup (stages 1–4 of SERVER_SETUP.md), run as root on a
# fresh Ubuntu 24.04 droplet:
#   curl -fsSL https://raw.githubusercontent.com/yboghossian-cpu/uaecne-website/main/deploy/bootstrap.sh -o /root/bootstrap.sh
#   bash /root/bootstrap.sh <public-hostname>
# <public-hostname> is the address the site is served on, e.g.
# 142-93-100-155.sslip.io for testing, or uaecne.org after the DNS switch.
# The admin password is NOT set here — run create-admin.mjs afterwards.
set -euo pipefail
HOST="${1:?Usage: bash bootstrap.sh <public-hostname>}"
export DEBIAN_FRONTEND=noninteractive NEEDRESTART_MODE=a
APP=/var/www/uaecne

step() { printf '\n\033[1;32m==> %s\033[0m\n' "$*"; }

step "1/7 System updates"
apt-get update -y
apt-get -y -o Dpkg::Options::=--force-confdef -o Dpkg::Options::=--force-confold upgrade

step "2/7 App user, firewall, swap"
id uaecne >/dev/null 2>&1 || adduser --disabled-password --gecos "" uaecne
ufw allow OpenSSH >/dev/null && ufw allow 80 >/dev/null && ufw allow 443 >/dev/null && ufw --force enable
if ! swapon --show | grep -q /swapfile; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

step "3/7 Node.js 22, PM2, Caddy, git, rclone"
if ! node -v 2>/dev/null | grep -q '^v22'; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
fi
apt-get install -y nodejs git build-essential rclone debian-keyring debian-archive-keyring apt-transport-https curl gnupg
npm install -g pm2
if ! command -v caddy >/dev/null; then
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor --yes -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' > /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -y && apt-get install -y caddy
fi

step "4/7 Website code and private settings"
mkdir -p /var/www /var/lib/uaecne /var/backups/uaecne
[ -d "$APP/.git" ] || git clone https://github.com/yboghossian-cpu/uaecne-website.git "$APP"
if [ ! -f "$APP/.env.production" ]; then
  cp "$APP/deploy/env.production.example" "$APP/.env.production"
  sed -i "s#^SITE_URL=.*#SITE_URL=https://$HOST#" "$APP/.env.production"
  sed -i "s#^NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=.*#NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=$(openssl rand -base64 32)#" "$APP/.env.production"
fi
chown -R uaecne:uaecne "$APP" /var/lib/uaecne /var/backups/uaecne
chmod 600 "$APP/.env.production"

step "5/7 Build the website (takes a few minutes)"
su - uaecne -c "cd $APP && npm ci && npm run build"

step "6/7 Start it and keep it running after reboots"
su - uaecne -c "cd $APP && (pm2 describe uaecne >/dev/null 2>&1 && pm2 reload deploy/ecosystem.config.cjs --update-env || pm2 start deploy/ecosystem.config.cjs) && pm2 save"
env PATH="$PATH:/usr/bin" pm2 startup systemd -u uaecne --hp /home/uaecne >/dev/null

step "7/7 HTTPS (Caddy) for $HOST"
sed "s/^uaecne.org {/$HOST {/" "$APP/deploy/Caddyfile" > /etc/caddy/Caddyfile
if [ "$HOST" != "uaecne.org" ]; then
  # testing address: drop the www redirect block
  sed -i '/^www.uaecne.org {/,/^}/d' /etc/caddy/Caddyfile
fi
systemctl reload caddy || systemctl restart caddy

sleep 3
code=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3000/ || true)
step "Done — local site check: HTTP $code (200 = OK)"
echo "Next: create the admin login with"
echo "  su - uaecne -c 'cd $APP && UAECNE_DATA_DIR=/var/lib/uaecne node scripts/create-admin.mjs yeghia'"
echo "Then open https://$HOST/admin"
