#!/bin/sh
set -e

echo "==> Initializing database extensions..."
node init-db.cjs

echo "==> Running database migrations..."
npm run migrate

echo "==> Starting Next.js with Payload..."
exec npm start
