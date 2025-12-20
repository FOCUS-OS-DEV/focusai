#!/bin/sh
set -e

echo "==> Starting Payload CMS server..."
echo "==> Tables will be auto-created with push: true"
exec node server.js
