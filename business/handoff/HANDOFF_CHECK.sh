#!/bin/bash

echo "2060 FINAL HANDOFF CHECK"
echo "------------------------"

PASS=0
FAIL=0

for file in \
business/handoff/FINAL_HANDOFF.md \
business/LAUNCH_READINESS_REPORT.md \
business/FINAL_TECHNICAL_AUDIT.md \
business/FINAL_BUSINESS_AUDIT.md \
business/project-snapshot/README.md \
business/project-snapshot/BUSINESS_FILE_INVENTORY.txt
do
  if [ -f "$file" ]; then
    echo "✓ $file"
    PASS=$((PASS+1))
  else
    echo "✗ MISSING: $file"
    FAIL=$((FAIL+1))
  fi
done

echo "------------------------"
echo "PASSED: $PASS"
echo "FAILED: $FAIL"

if [ "$FAIL" -eq 0 ]; then
  echo "✓ FINAL HANDOFF VERIFIED"
else
  echo "⚠ HANDOFF NEEDS ATTENTION"
fi
