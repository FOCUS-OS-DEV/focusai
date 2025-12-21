#!/bin/sh
set -e

echo "==> Initializing database extensions..."
node init-db.cjs

echo "==> Running Payload migrations..."
npx payload migrate

echo "==> Starting Next.js..."
exec npm start
