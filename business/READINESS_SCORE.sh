#!/bin/bash

echo "========================================"
echo "2060 LAUNCH READINESS SCORE"
echo "========================================"

PASS=0
TOTAL=0

check() {
  TOTAL=$((TOTAL+1))
  if [ -f "$1" ]; then
    echo "✓ $2"
    PASS=$((PASS+1))
  else
    echo "✗ $2"
  fi
}

check business/FINAL_TECHNICAL_AUDIT.md "Technical audit"
check business/FINAL_BUSINESS_AUDIT.md "Business audit"
check business/PRODUCTION_LAUNCH_PLAN.md "Production launch plan"
check business/MASTER_CHECKLIST.md "Master checklist"
check business/KPI_DASHBOARD.md "KPI dashboard"
check business/SALES_PIPELINE.md "Sales pipeline"
check business/CUSTOMER_SUPPORT.md "Customer support"
check business/BACKUP_RECOVERY.md "Backup and recovery"
check business/BUSINESS_CONTINUITY.md "Business continuity"
check business/investor/PITCH_STRUCTURE.md "Investor pitch"
check business/data-room/README.md "Investor data room"
check business/LAUNCH_READINESS_REPORT.md "Readiness report"

echo "----------------------------------------"
echo "READY AREAS: $PASS / $TOTAL"

PERCENT=$((PASS * 100 / TOTAL))

echo "READINESS SCORE: $PERCENT%"

if [ "$PASS" -eq "$TOTAL" ]; then
  echo "✓ DOCUMENTATION READINESS COMPLETE"
else
  echo "⚠ SOME AREAS NEED ATTENTION"
fi

echo "========================================"
