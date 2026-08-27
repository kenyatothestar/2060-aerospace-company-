#!/bin/bash

echo "2060 SYSTEM HEALTH CHECK"
echo "------------------------"

PASS=0
WARN=0

check_url() {
  NAME="$1"
  URL="$2"

  if curl -s --max-time 5 "$URL" >/dev/null 2>&1; then
    echo "✓ $NAME RESPONDS"
    PASS=$((PASS+1))
  else
    echo "⚠ $NAME NOT RESPONDING"
    WARN=$((WARN+1))
  fi
}

check_url "API :4000" "http://localhost:4000"
check_url "WEB :8080" "http://localhost:8080"

if node --check server.js >/dev/null 2>&1; then
  echo "✓ SERVER SYNTAX OK"
  PASS=$((PASS+1))
else
  echo "⚠ SERVER SYNTAX CHECK FAILED"
  WARN=$((WARN+1))
fi

echo "------------------------"
echo "PASSED: $PASS"
echo "WARNINGS: $WARN"

if [ "$WARN" -eq 0 ]; then
  echo "✓ SYSTEM HEALTH CHECK PASSED"
else
  echo "⚠ SYSTEM HEALTH CHECK COMPLETED WITH WARNINGS"
fi
