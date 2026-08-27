#!/usr/bin/env bash

set -u

echo "2060 PRODUCTION SMOKE TEST"

FAIL=0

API_CODE=$(curl -s -o /tmp/2060_api -w "%{http_code}" http://localhost:4000)
FRONT_CODE=$(curl -s -o /tmp/2060_front -w "%{http_code}" http://localhost:3000)

if [ "$API_CODE" = "200" ]; then
  echo "✓ API HTTP 200"
else
  echo "✗ API HTTP $API_CODE"
  FAIL=1
fi

if [ "$FRONT_CODE" = "200" ]; then
  echo "✓ FRONTEND HTTP 200"
else
  echo "✗ FRONTEND HTTP $FRONT_CODE"
  FAIL=1
fi

grep -qi "Mission Control API" /tmp/2060_api && \
  echo "✓ API CONTENT" || FAIL=1

grep -qi "MISSION CONTROL" /tmp/2060_front && \
  echo "✓ FRONTEND CONTENT" || FAIL=1

if [ "$FAIL" -eq 0 ]; then
  echo "2060 SMOKE TEST: PASSED"
  exit 0
else
  echo "2060 SMOKE TEST: FAILED"
  exit 1
fi
