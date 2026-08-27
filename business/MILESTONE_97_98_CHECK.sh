#!/bin/bash

echo "2060 MILESTONE 97-98 CHECK"
echo "--------------------------"

PASS=0
FAIL=0

for file in \
business/COMPLETION_CERTIFICATE.md \
business/handoff/FINAL_HANDOFF.md \
business/project-snapshot/README.md \
business/LAUNCH_READINESS_REPORT.md \
business/FINAL_BUSINESS_AUDIT.md \
business/FINAL_TECHNICAL_AUDIT.md
do
  if [ -f "$file" ]; then
    echo "✓ $file"
    PASS=$((PASS+1))
  else
    echo "✗ MISSING: $file"
    FAIL=$((FAIL+1))
  fi
done

if grep -qi "100-Step" business/COMPLETION_CERTIFICATE.md; then
  echo "✓ 100-STEP MILESTONE RECORDED"
  PASS=$((PASS+1))
else
  echo "✗ 100-STEP MILESTONE NOT FOUND"
  FAIL=$((FAIL+1))
fi

echo "--------------------------"
echo "PASSED: $PASS"
echo "FAILED: $FAIL"

if [ "$FAIL" -eq 0 ]; then
  echo "✓ MILESTONES 97-98 VERIFIED"
else
  echo "⚠ MILESTONE CHECK NEEDS ATTENTION"
fi
