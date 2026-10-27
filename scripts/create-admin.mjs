#!/usr/bin/env node
// Creates the admin account, or resets its password.
// Run ON THE SERVER, so the password never passes through anyone else:
//   UAECNE_DATA_DIR=/var/lib/uaecne node scripts/create-admin.mjs <username>
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import Database from "better-sqlite3";

const dir = process.env.UAECNE_DATA_DIR;
const username = process.argv[2];
if (!dir || !username) {
  console.error("Usage: UAECNE_DATA_DIR=/var/lib/uaecne node scripts/create-admin.mjs <username>");
  process.exit(1);
}

function ask(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = (s) => {
      if (s.startsWith(question)) process.stdout.write(question);
    };
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
  });
}

const password = process.env.UAECNE_ADMIN_PASSWORD ?? (await ask("New password: "));
if (!process.env.UAECNE_ADMIN_PASSWORD) {
  const again = await ask("Repeat password: ");
  if (again !== password) {
    console.error("Passwords do not match.");
    process.exit(1);
  }
}
if (password.length < 12) {
  console.error(
    `That was ${password.length} characters — use at least 12. (Pasting may not work in the web console; type it.)`,
  );
  process.exit(1);
}

const salt = crypto.randomBytes(16);
const hash = crypto.scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 });
const stored = `scrypt$16384$8$1$${salt.toString("base64")}$${hash.toString("base64")}`;

fs.mkdirSync(dir, { recursive: true });
const db = new Database(path.join(dir, "uaecne.db"));
db.exec(`CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  pass_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
)`);
const existing = db.prepare("SELECT id FROM admins WHERE username = ?").get(username);
if (existing) {
  db.prepare("UPDATE admins SET pass_hash = ? WHERE id = ?").run(stored, existing.id);
  try {
    db.prepare("DELETE FROM sessions WHERE admin_id = ?").run(existing.id);
  } catch {}
  console.log(`Password updated for "${username}" (other sessions signed out).`);
} else {
  db.prepare("INSERT INTO admins (username, pass_hash) VALUES (?, ?)").run(username, stored);
  console.log(`Admin "${username}" created.`);
}
