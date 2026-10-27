# UAECNE website: server setup

This is the same setup as basspoweraudio.com: one DigitalOcean server, with PM2 keeping the site running, Caddy providing HTTPS and nightly backups going to Backblaze B2. Work through it one stage at a time and check each stage before moving on.

Every command is run **on the server** (DigitalOcean → Droplet → Console, or `ssh root@SERVER_IP`). Passwords and keys are typed there only and never shared in chat.

---

## Stage 0: Create the server (DigitalOcean website)

- **Create → Droplets.** Choose Ubuntu 24.04 LTS, Basic, Regular, **$6/mo (1 GB / 1 CPU)**, region **Frankfurt**.
- **Authentication:** use the same SSH key as the Bass Power server.
- **Hostname:** `uaecne-web`.
- Write down the server's IP address. It's called `SERVER_IP` below.

## Stage 1: Base system, firewall, swap

```bash
apt update && apt -y upgrade
adduser --disabled-password --gecos "" uaecne
ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw --force enable
# 2 GB swap, so building the site never runs out of memory on 1 GB RAM
fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

**Check:** `ufw status` shows OpenSSH, 80 and 443 as ALLOW, and `free -h` shows 2.0Gi of swap.

## Stage 2: Install Node.js 22, PM2, Caddy, git, rclone

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt -y install nodejs git build-essential rclone debian-keyring debian-archive-keyring apt-transport-https
npm install -g pm2
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' > /etc/apt/sources.list.d/caddy-stable.list
apt update && apt -y install caddy
```

**Check:** `node -v` shows v22.x, and `pm2 -v` and `caddy version` both print a version.

## Stage 3: Download the website and set its private settings

```bash
mkdir -p /var/www /var/lib/uaecne /var/backups/uaecne
git clone https://github.com/yboghossian-cpu/uaecne-website.git /var/www/uaecne
chown -R uaecne:uaecne /var/www/uaecne /var/lib/uaecne /var/backups/uaecne
cp /var/www/uaecne/deploy/env.production.example /var/www/uaecne/.env.production
chown uaecne:uaecne /var/www/uaecne/.env.production && chmod 600 /var/www/uaecne/.env.production
openssl rand -base64 32     # copy the output for the next step
nano /var/www/uaecne/.env.production
```

In `nano`:
- Paste the random value after `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=`.
- Leave `SMTP_USER` and `SMTP_PASS` empty for now; Stage 7 fills them in.
- Save with Ctrl+O and Enter, then exit with Ctrl+X.

While you're testing on `new.uaecne.org` (Stage 5), set `SITE_URL=https://new.uaecne.org`.

## Stage 4: Build, start, and create your admin login

```bash
su - uaecne
cd /var/www/uaecne
npm ci && npm run build
pm2 start deploy/ecosystem.config.cjs && pm2 save
UAECNE_DATA_DIR=/var/lib/uaecne node scripts/create-admin.mjs yeghia   # asks for a password (12+ characters)
exit
env PATH=$PATH:/usr/bin pm2 startup systemd -u uaecne --hp /home/uaecne
```

**Check:** `su - uaecne -c "pm2 status"` shows `uaecne` as **online**, and `curl -s localhost:3000 | head -c 200` prints HTML.

## Stage 5: HTTPS on a test address first

1. Wherever uaecne.org's DNS is managed (currently with the AWS setup), add an **A record**: `new` → `SERVER_IP`.
2. On the server:

```bash
cp /var/www/uaecne/deploy/Caddyfile /etc/caddy/Caddyfile
sed -i 's/^uaecne.org {/new.uaecne.org {/; /^www.uaecne.org {/,/^}/d' /etc/caddy/Caddyfile
systemctl reload caddy
```

3. Open **https://new.uaecne.org** and **https://new.uaecne.org/admin**, then sign in.

**Check:** the padlock shows, the site loads, and the admin dashboard opens.

## Stage 6: Nightly backups to Backblaze B2

1. In Backblaze, create a private bucket named **`uaecne-backups`** and an application key for it.
2. On the server, run `rclone config` → n (new remote) → name `b2remote` → choose `b2` → paste the key ID and key → accept the defaults.
3. Test the backup, then schedule it:

```bash
su - uaecne -c "bash /var/www/uaecne/deploy/backup.sh"
(crontab -u uaecne -l 2>/dev/null; echo "15 3 * * * bash /var/www/uaecne/deploy/backup.sh >> /var/backups/uaecne/backup.log 2>&1") | crontab -u uaecne -
```

**Check:** `rclone ls b2remote:uaecne-backups` lists today's file. (Run `rclone config` as the `uaecne` user, or copy `/root/.config/rclone` to `/home/uaecne/.config/`.)

## Stage 7: Email alerts for the contact and prayer forms (Gmail, free)

1. Use a Union Gmail account. Turn on 2-Step Verification, then go to Google Account → Security → **App passwords** and create one called "UAECNE website".
2. `nano /var/www/uaecne/.env.production` → set `SMTP_USER=<that gmail address>` and `SMTP_PASS=<the 16-character app password>`.
3. Apply the change: `su - uaecne -c "cd /var/www/uaecne && pm2 reload deploy/ecosystem.config.cjs --update-env"`
4. In the admin, go to **Settings → Form notifications**, enter the addresses that should receive messages, and click **Send a test email**.

## Stage 8: Switch uaecne.org to the new server

Only do this when you're happy with new.uaecne.org.

1. In DNS, change **only** the **A records** for `@` (uaecne.org) and `www` to `SERVER_IP`. **Don't touch MX or TXT records**: those carry the uaecne.org email.
2. On the server, put the full Caddyfile back and set the real address:

```bash
cp /var/www/uaecne/deploy/Caddyfile /etc/caddy/Caddyfile && systemctl reload caddy
sed -i 's#^SITE_URL=.*#SITE_URL=https://uaecne.org#' /var/www/uaecne/.env.production
su - uaecne -c "bash /var/www/uaecne/deploy/deploy.sh"
```

3. Check https://uaecne.org. Once it's correct, the old AWS site can be retired.
4. In Google Search Console, verify uaecne.org and submit `https://uaecne.org/sitemap.xml`.

---

## Every day

- **Edit content:** go to https://uaecne.org/admin. Changes go live immediately, with no rebuild.
- **Publish code changes** (new page designs pushed to GitHub): run `su - uaecne -c "bash /var/www/uaecne/deploy/deploy.sh"`.
- **Forgot the admin password:**

  ```bash
  su - uaecne -c "cd /var/www/uaecne && UAECNE_DATA_DIR=/var/lib/uaecne node scripts/create-admin.mjs yeghia"
  ```

## Restore from a backup

```bash
su - uaecne
pm2 stop uaecne
rclone copy b2remote:uaecne-backups/uaecne-YYYY-MM-DD.tar.gz /tmp/
mkdir /tmp/restore && tar -xzf /tmp/uaecne-YYYY-MM-DD.tar.gz -C /tmp/restore
cp /tmp/restore/uaecne.db /var/lib/uaecne/uaecne.db && rm -f /var/lib/uaecne/uaecne.db-wal /var/lib/uaecne/uaecne.db-shm
rsync -a /tmp/restore/media/ /var/lib/uaecne/media/
cd /var/www/uaecne && npm run build && pm2 start uaecne
```

## Where everything lives

| What | Where |
|---|---|
| Website code | `/var/www/uaecne` (from GitHub) |
| Private settings | `/var/www/uaecne/.env.production` |
| Database (settings, edits, news, inbox) | `/var/lib/uaecne/uaecne.db` |
| Uploaded photos and PDFs | `/var/lib/uaecne/media/` |
| Backups | `/var/backups/uaecne/` (14 days) + B2 bucket `uaecne-backups` |
| Logs | `su - uaecne -c "pm2 logs uaecne"` |
