#!/bin/bash

echo "2060 RELEASE VERIFICATION"
echo "-------------------------"

PASS=0
FAIL=0

check_file() {
  if [ -f "$1" ]; then
    echo "✓ $1"
    PASS=$((PASS+1))
  else
    echo "✗ MISSING: $1"
    FAIL=$((FAIL+1))
  fi
}

check_file "package.json"
check_file "server.js"
check_file "business/RELEASE_MANAGEMENT.md"
check_file "business/PRODUCTION_READINESS.md"
check_file "business/SECURITY_BASELINE.md"

if node --check server.js >/dev/null 2>&1; then
  echo "✓ SERVER SYNTAX"
  PASS=$((PASS+1))
else
  echo "✗ SERVER SYNTAX ERROR"
  FAIL=$((FAIL+1))
fi

echo "-------------------------"
echo "PASSED: $PASS"
echo "FAILED: $FAIL"

if [ "$FAIL" -eq 0 ]; then
  echo "✓ RELEASE VERIFICATION PASSED"
  exit 0
else
  echo "⚠ RELEASE VERIFICATION NEEDS ATTENTION"
  exit 1
fi
