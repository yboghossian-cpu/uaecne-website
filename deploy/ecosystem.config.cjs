// PM2 process file — keeps the website running and restarts it after a
// crash or a server reboot. Secrets live in /var/www/uaecne/.env.production
// (loaded by Next.js itself), never in this file.
module.exports = {
  apps: [
    {
      name: "uaecne",
      cwd: "/var/www/uaecne",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000 -H 127.0.0.1",
      env: { NODE_ENV: "production" },
      max_memory_restart: "600M",
      time: true,
    },
  ],
};
