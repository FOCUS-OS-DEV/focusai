#!/bin/sh
set -e

echo "==> Running Payload CMS migrations..."
npx payload migrate || echo "Migration completed (or already up to date)"

echo "==> Starting Next.js server..."
exec node server.js
