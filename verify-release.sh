#!/usr/bin/env bash

set -u

echo "========================================"
echo "2060 V5.0 RELEASE VERIFICATION"
echo "========================================"

FAILED=0

check_file() {
  if [ -f "$1" ]; then
    echo "✓ FILE: $1"
  else
    echo "✗ FILE MISSING: $1"
    FAILED=1
  fi
}

check_file server.js
check_file database.js
check_file auth.js
check_file package.json
check_file frontend/index.html
check_file render.yaml
check_file RELEASE_MANIFEST.md
check_file DEPLOYMENT_AUDIT.md

node --check server.js || FAILED=1
node --check database.js || FAILED=1
node --check auth.js || FAILED=1

if curl -sf http://localhost:4000 >/dev/null; then
  echo "✓ API: ONLINE"
else
  echo "✗ API: OFFLINE"
  FAILED=1
fi

if curl -sf http://localhost:3000 >/dev/null; then
  echo "✓ FRONTEND: ONLINE"
else
  echo "✗ FRONTEND: OFFLINE"
  FAILED=1
fi

echo "========================================"

if [ "$FAILED" -eq 0 ]; then
  echo "2060 V5.0 RELEASE STATUS: VERIFIED"
  exit 0
else
  echo "2060 V5.0 RELEASE STATUS: CHECK REQUIRED"
  exit 1
fi
