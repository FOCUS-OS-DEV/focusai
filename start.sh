#!/bin/sh
set -e

echo "==> Initializing database extensions..."
node init-db.cjs

echo "==> Starting Next.js with Payload..."
# Payload with push: true handles schema automatically
# No need for migrations - schema syncs on startup
exec npm start
