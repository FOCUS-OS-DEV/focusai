#!/bin/sh
set -e

echo "==> Initializing database..."
node init-db.cjs

echo "==> Starting Next.js..."
exec npm start
