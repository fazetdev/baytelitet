#!/bin/bash

echo "Converting React.FC components to function declarations..."

# List of files to convert
files=(
  "app/(public)/guides/foreign-buyer/ForeignBuyerGuide.tsx"
  "app/(public)/home/TrustSection.tsx"
  "app/(public)/home/components/ChooseRole.tsx"
  "app/(tools)/market-tools/GoldenVisaChecker.tsx"
  "app/(tools)/market-tools/RentalCalculator.tsx"
  "app/(tools)/market-tools/UtilityEstimator.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing: $file"
    
    # Create backup
    cp "$file" "$file.bak"
    
    # Convert the file
    sed -i '
      # ForeignBuyerGuide
      s|const ForeignBuyerGuide: FC<GuidePageProps> = ({ lang = '"'"'en'"'"' }) => {|export default function ForeignBuyerGuide({ lang = '"'"'en'"'"' }: GuidePageProps) {|
      
      # TrustSection
      s|const TrustSection: FC<TrustSectionProps> = ({ lang }) => {|export default function TrustSection({ lang }: TrustSectionProps) {|
      
      # ChooseRole
      s|const ChooseRole: FC<ChooseRoleProps> = ({ lang = '"'"'en'"'"' }): JSX.Element => {|export default function ChooseRole({ lang = '"'"'en'"'"' }: ChooseRoleProps): JSX.Element {|
      
      # GoldenVisaChecker
      s|const GoldenVisaChecker: FC<GoldenVisaCheckerProps> = ({ lang = '"'"'en'"'"' }) => {|export default function GoldenVisaChecker({ lang = '"'"'en'"'"' }: GoldenVisaCheckerProps) {|
      
      # RentalCalculator
      s|const RentalCalculator: FC<RentalCalculatorProps> = ({ lang = '"'"'en'"'"' }) => {|export default function RentalCalculator({ lang = '"'"'en'"'"' }: RentalCalculatorProps) {|
      
      # UtilityEstimator
      s|const UtilityEstimator: FC<UtilityEstimatorProps> = ({ lang = '"'"'en'"'"' }) => {|export default function UtilityEstimator({ lang = '"'"'en'"'"' }: UtilityEstimatorProps) {|
    ' "$file"
    
    echo "  ✓ Converted"
  else
    echo "  ✗ File not found: $file"
  fi
done

echo ""
echo "Checking page.tsx file for icon/component types..."
# For page.tsx, we need to handle the type definitions differently
PAGE_FILE="app/(tools)/market-tools/page.tsx"
if [ -f "$PAGE_FILE" ]; then
  cp "$PAGE_FILE" "$PAGE_FILE.bak"
  # These are just type definitions, keep them as is or change to ComponentType
  sed -i '
    s|icon: FC<{ className?: string }>|icon: React.ComponentType<{ className?: string }>|
    s|component: FC<{ lang?: '"'"'en'"'"' | '"'"'ar'"'"' }>|component: React.ComponentType<{ lang?: '"'"'en'"'"' | '"'"'ar'"'"' }>|
  ' "$PAGE_FILE"
  echo "  ✓ Updated type definitions in page.tsx"
fi

echo ""
echo "Conversion complete! Backups saved as .bak files"
echo "Run: git diff --name-only to see changed files"
