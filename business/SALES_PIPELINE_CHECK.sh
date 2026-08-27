#!/bin/bash

echo "2060 SALES PIPELINE CHECK"
echo "-------------------------"

PASS=0
FAIL=0

for file in \
business/SALES_PIPELINE.md \
business/FIRST_OUTREACH_CAMPAIGN.md \
business/CUSTOMER_REQUIREMENTS.md \
business/CUSTOMER_FEEDBACK.md \
business/PRICING_STRATEGY.md
do
  if [ -f "$file" ]; then
    echo "✓ $file"
    PASS=$((PASS+1))
  else
    echo "✗ MISSING: $file"
    FAIL=$((FAIL+1))
  fi
done

if grep -qi "Prospect" business/SALES_PIPELINE.md; then
  echo "✓ PIPELINE STAGES VERIFIED"
  PASS=$((PASS+1))
else
  echo "✗ PIPELINE STAGES NOT FOUND"
  FAIL=$((FAIL+1))
fi

if grep -qi "Next action" business/SALES_PIPELINE.md; then
  echo "✓ FOLLOW-UP FIELD VERIFIED"
  PASS=$((PASS+1))
else
  echo "✗ FOLLOW-UP FIELD NOT FOUND"
  FAIL=$((FAIL+1))
fi

echo "-------------------------"
echo "PASSED: $PASS"
echo "FAILED: $FAIL"

if [ "$FAIL" -eq 0 ]; then
  echo "✓ SALES SYSTEM VERIFIED"
else
  echo "⚠ SALES SYSTEM NEEDS ATTENTION"
fi
