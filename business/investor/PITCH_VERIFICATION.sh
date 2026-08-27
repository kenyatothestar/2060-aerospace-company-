#!/bin/bash

echo "2060 INVESTOR MATERIALS CHECK"
echo "-----------------------------"

PASS=0
FAIL=0

for file in \
business/investor/PITCH_STRUCTURE.md \
business/FINANCIAL_MODEL.md \
business/PRODUCT_ROADMAP.md \
business/TECHNICAL_ARCHITECTURE.md \
business/data-room/README.md
do
  if [ -f "$file" ]; then
    echo "✓ $file"
    PASS=$((PASS+1))
  else
    echo "✗ MISSING: $file"
    FAIL=$((FAIL+1))
  fi
done

echo "-----------------------------"
echo "PASSED: $PASS"
echo "FAILED: $FAIL"

if [ "$FAIL" -eq 0 ]; then
  echo "✓ INVESTOR MATERIALS VERIFIED"
else
  echo "⚠ INVESTOR MATERIALS NEED ATTENTION"
fi
