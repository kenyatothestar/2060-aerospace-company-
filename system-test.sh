#!/usr/bin/env bash

set -u

echo "========================================"
echo "2060 MISSION CONTROL SYSTEM TEST"
echo "========================================"

PASS=0
FAIL=0

check() {
  if "$@"; then
    echo "✓ PASS: $*"
    PASS=$((PASS+1))
  else
    echo "✗ FAIL: $*"
    FAIL=$((FAIL+1))
  fi
}

check test -f server.js
check test -f database.js
check test -f auth.js
check test -f frontend/index.html
check test -f package.json
check node --check server.js
check node --check database.js
check node --check auth.js
check curl -sf http://localhost:4000
check curl -sf http://localhost:3000

echo "========================================"
echo "PASSED: $PASS"
echo "FAILED: $FAIL"
echo "========================================"

if [ "$FAIL" -eq 0 ]; then
  echo "2060 SYSTEM STATUS: HEALTHY"
  exit 0
else
  echo "2060 SYSTEM STATUS: CHECK REQUIRED"
  exit 1
fi
