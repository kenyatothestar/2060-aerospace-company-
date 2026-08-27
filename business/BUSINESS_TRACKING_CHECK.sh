#!/bin/bash

echo "2060 BUSINESS TRACKING CHECK"
echo "----------------------------"

PASS=0
FAIL=0

for file in \
business/PARTNERSHIP_TRACKER.md \
business/SALES_PIPELINE.md \
business/FIRST_OUTREACH_CAMPAIGN.md \
business/CUSTOMER_SUPPORT.md \
business/CUSTOMER_ISSUE_TRACKER.md
do
  if [ -f "$file" ]; then
    echo "✓ $file"
    PASS=$((PASS+1))
  else
    echo "✗ MISSING: $file"
    FAIL=$((FAIL+1))
  fi
done

if grep -qi "Next action" business/PARTNERSHIP_TRACKER.md; then
  echo "✓ FOLLOW-UP TRACKING VERIFIED"
  PASS=$((PASS+1))
else
  echo "✗ FOLLOW-UP TRACKING MISSING"
  FAIL=$((FAIL+1))
fi

if grep -qi "Meeting" business/PARTNERSHIP_TRACKER.md; then
  echo "✓ RELATIONSHIP STAGES VERIFIED"
  PASS=$((PASS+1))
else
  echo "✗ RELATIONSHIP STAGES MISSING"
  FAIL=$((FAIL+1))
fi

echo "----------------------------"
echo "PASSED: $PASS"
echo "FAILED: $FAIL"

if [ "$FAIL" -eq 0 ]; then
  echo "✓ BUSINESS TRACKING VERIFIED"
else
  echo "⚠ BUSINESS TRACKING NEEDS ATTENTION"
fi
