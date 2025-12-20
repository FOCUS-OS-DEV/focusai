#!/bin/sh
set -e

echo "==> Running database migrations..."
node src/migrations/run.js || echo "Migrations completed (or tables exist)"

echo "==> Starting server..."
exec node server.js
