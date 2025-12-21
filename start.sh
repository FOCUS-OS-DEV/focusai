#!/bin/sh
set -e

echo "==> Initializing database extensions..."
node init-db.cjs

echo "==> Running Payload migrations..."
npx payload migrate

echo "==> Running seed (if needed)..."
npm run seed

echo "==> Starting Next.js..."
exec npm start
