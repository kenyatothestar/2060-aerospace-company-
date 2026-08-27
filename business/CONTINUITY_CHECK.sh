#!/bin/bash

echo "2060 BUSINESS CONTINUITY CHECK"
echo "------------------------------"

PASS=0
FAIL=0

for file in \
business/BUSINESS_CONTINUITY.md \
business/BACKUP_RECOVERY.md \
business/INCIDENT_ESCALATION.md \
business/DEPLOYMENT_RUNBOOK.md \
business/OPERATIONS_MANUAL.md
do
  if [ -f "$file" ]; then
    echo "✓ $file"
    PASS=$((PASS+1))
  else
    echo "✗ MISSING: $file"
    FAIL=$((FAIL+1))
  fi
done

for term in "Software outage" "Infrastructure failure" "Key-person unavailability"
do
  if grep -qi "$term" business/BUSINESS_CONTINUITY.md; then
    echo "✓ CONTINUITY AREA: $term"
    PASS=$((PASS+1))
  else
    echo "✗ MISSING: $term"
    FAIL=$((FAIL+1))
  fi
done

echo "------------------------------"
echo "PASSED: $PASS"
echo "FAILED: $FAIL"

if [ "$FAIL" -eq 0 ]; then
  echo "✓ CONTINUITY READINESS VERIFIED"
else
  echo "⚠ CONTINUITY NEEDS ATTENTION"
fi
