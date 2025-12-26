#!/bin/sh
set -e

echo "==> Initializing database extensions..."
node init-db.cjs

echo "==> Starting Next.js with Payload..."
# Migrations can be triggered via /api/run-migration endpoint
exec npm start
