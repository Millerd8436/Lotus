# This script removes all verified unused and redundant files from the project.
# It is the final step in the "Consolidate and Refine" plan.

Write-Host "Starting final project cleanup..."

# Redundant Phase 4 Components
Remove-Item -Path "./components/phase4-ethical/EthicalCheckoutFlow.tsx" -Force -ErrorAction Continue
Remove-Item -Path "./components/phase4-ethical/EthicalLoanCalculator.tsx" -Force -ErrorAction Continue
Remove-Item -Path "./components/phase4-ethical/EthicalLoanSummary.tsx" -Force -ErrorAction Continue
Remove-Item -Path "./components/phase4-ethical/EthicalHeader.tsx" -Force -ErrorAction Continue
Remove-Item -Path "./components/phase4-ethical/CoolingOffNotice.tsx" -Force -ErrorAction Continue

# Redundant Phase 1 Components
Remove-Item -Path "./components/phase1-exploitative/IncomeVerificationSimulator.tsx" -Force -ErrorAction Continue

# Redundant Pages
Remove-Item -Path "./app/ethical/counseling" -Recurse -Force -ErrorAction Continue
Remove-Item -Path "./app/ethical/resources" -Recurse -Force -ErrorAction Continue

Write-Host "Final cleanup complete." 