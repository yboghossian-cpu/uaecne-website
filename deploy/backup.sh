#!/usr/bin/env bash
# Nightly backup: database + uploaded media -> one archive -> Backblaze B2.
# Installed as a cron job by the setup guide (03:15 every night).
set -euo pipefail
export UAECNE_DATA_DIR=/var/lib/uaecne
STAMP=$(date +%Y-%m-%d)
OUT=/var/backups/uaecne
mkdir -p "$OUT"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
cd /var/www/uaecne
node scripts/backup-db.mjs "$TMP/uaecne.db" >/dev/null
tar -czf "$OUT/uaecne-$STAMP.tar.gz" -C "$TMP" uaecne.db -C "$UAECNE_DATA_DIR" media
# keep two weeks on the server
find "$OUT" -name 'uaecne-*.tar.gz' -mtime +14 -delete
# off-site copy (rclone remote "b2remote", bucket "uaecne-backups")
rclone copy "$OUT/uaecne-$STAMP.tar.gz" b2remote:uaecne-backups/
echo "Backup uaecne-$STAMP.tar.gz done"
