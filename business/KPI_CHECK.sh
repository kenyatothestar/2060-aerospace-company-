#!/bin/bash

echo "2060 KPI SYSTEM CHECK"
echo "---------------------"

PASS=0
FAIL=0

for file in \
business/KPI_DASHBOARD.md \
business/SALES_PIPELINE.md \
business/CUSTOMER_SUPPORT.md \
business/PILOT_SUCCESS_METRICS.md \
business/FINANCIAL_MODEL.md \
business/PARTNERSHIP_TRACKER.md
do
  if [ -f "$file" ]; then
    echo "✓ $file"
    PASS=$((PASS+1))
  else
    echo "✗ MISSING: $file"
    FAIL=$((FAIL+1))
  fi
done

for term in "Revenue" "Demos booked" "Customer satisfaction" "System availability"
do
  if grep -qi "$term" business/KPI_DASHBOARD.md; then
    echo "✓ KPI: $term"
    PASS=$((PASS+1))
  else
    echo "✗ KPI MISSING: $term"
    FAIL=$((FAIL+1))
  fi
done

echo "---------------------"
echo "PASSED: $PASS"
echo "FAILED: $FAIL"

if [ "$FAIL" -eq 0 ]; then
  echo "✓ KPI SYSTEM VERIFIED"
else
  echo "⚠ KPI SYSTEM NEEDS ATTENTION"
fi
