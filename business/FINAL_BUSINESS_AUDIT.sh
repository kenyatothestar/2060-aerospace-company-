#!/bin/bash

echo "========================================"
echo "2060 FINAL BUSINESS PACKAGE AUDIT"
echo "========================================"

PASS=0
FAIL=0

required=(
"business/FINAL_BUSINESS_AUDIT.md"
"business/MASTER_CHECKLIST.md"
"business/PRODUCTION_LAUNCH_PLAN.md"
"business/KPI_DASHBOARD.md"
"business/SALES_PIPELINE.md"
"business/PARTNERSHIP_TRACKER.md"
"business/CUSTOMER_SUPPORT.md"
"business/CUSTOMER_REQUIREMENTS.md"
"business/FINANCIAL_MODEL.md"
"business/PRICING_STRATEGY.md"
"business/PRODUCT_ROADMAP.md"
"business/TECHNICAL_ARCHITECTURE.md"
"business/API_DOCUMENTATION.md"
"business/SECURITY_BASELINE.md"
"business/LEGAL_COMPLIANCE_PLAN.md"
"business/IP_PROTECTION_CHECKLIST.md"
"business/investor/PITCH_STRUCTURE.md"
"business/data-room/README.md"
)

for file in "${required[@]}"
do
  if [ -f "$file" ]; then
    PASS=$((PASS+1))
  else
    echo "✗ MISSING: $file"
    FAIL=$((FAIL+1))
  fi
done

echo "----------------------------------------"
echo "DOCUMENTS FOUND: $PASS"
echo "DOCUMENTS MISSING: $FAIL"

if [ "$FAIL" -eq 0 ]; then
  echo "✓ BUSINESS PACKAGE VERIFIED"
else
  echo "⚠ BUSINESS PACKAGE NEEDS ATTENTION"
fi

echo "========================================"
