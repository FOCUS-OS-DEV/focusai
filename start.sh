#!/bin/sh
set -e

echo "==> Running Payload migrations..."
npx payload migrate || echo "Migrations done"

echo "==> Starting Next.js..."
exec npm start
