#!/bin/bash

echo "2060 PRODUCTION LAUNCH CHECK"
echo "----------------------------"

PASS=0
FAIL=0

for file in \
business/PRODUCTION_LAUNCH_PLAN.md \
business/PRODUCTION_READINESS.md \
business/DEPLOYMENT_RUNBOOK.md \
business/RELEASE_MANAGEMENT.md \
business/SECURITY_BASELINE.md \
business/MONITORING_PLAN.md \
business/BACKUP_RECOVERY.md \
business/BUSINESS_CONTINUITY.md
do
  if [ -f "$file" ]; then
    echo "✓ $file"
    PASS=$((PASS+1))
  else
    echo "✗ MISSING: $file"
    FAIL=$((FAIL+1))
  fi
done

for term in "Final validation" "Staging" "Production" "Rollback"
do
  if grep -qi "$term" business/PRODUCTION_LAUNCH_PLAN.md; then
    echo "✓ PHASE: $term"
    PASS=$((PASS+1))
  else
    echo "✗ PHASE MISSING: $term"
    FAIL=$((FAIL+1))
  fi
done

echo "----------------------------"
echo "PASSED: $PASS"
echo "FAILED: $FAIL"

if [ "$FAIL" -eq 0 ]; then
  echo "✓ LAUNCH PLAN VERIFIED"
else
  echo "⚠ LAUNCH PLAN NEEDS ATTENTION"
fi
