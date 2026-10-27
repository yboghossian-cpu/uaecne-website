#!/usr/bin/env node
// Writes a consistent copy of the live database (safe while the site runs).
//   UAECNE_DATA_DIR=/var/lib/uaecne node scripts/backup-db.mjs /path/to/copy.db
import path from "node:path";
import Database from "better-sqlite3";

const dir = process.env.UAECNE_DATA_DIR;
const dest = process.argv[2];
if (!dir || !dest) {
  console.error("Usage: UAECNE_DATA_DIR=/var/lib/uaecne node scripts/backup-db.mjs <destination.db>");
  process.exit(1);
}
const db = new Database(path.join(dir, "uaecne.db"), { readonly: true });
await db.backup(dest);
db.close();
console.log(`Database copied to ${dest}`);
