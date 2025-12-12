#!/bin/bash

echo "Fixing import paths in components..."

# Fix imports in app/properties/components/
for file in app/properties/components/*.tsx; do
  if [ -f "$file" ]; then
    echo "Fixing $file"
    sed -i 's|@/components/|../../components/|g' "$file"
    sed -i 's|@/lib/|../../lib/|g' "$file"
    sed -i 's|@/hooks/|../../hooks/|g' "$file"
  fi
done

# Fix imports in app/calculator/components/
for file in app/calculator/components/*.tsx; do
  if [ -f "$file" ]; then
    echo "Fixing $file"
    sed -i 's|@/components/|../../components/|g' "$file"
    sed -i 's|@/lib/|../../lib/|g' "$file"
    sed -i 's|@/context/|../../context/|g' "$file"
  fi
done

# Fix imports in app/agents/components/
for file in app/agents/components/*.tsx; do
  if [ -f "$file" ]; then
    echo "Fixing $file"
    sed -i 's|@/components/|../../components/|g' "$file"
    sed -i 's|@/lib/|../../lib/|g' "$file"
  fi
done

# Fix imports in app/tours/components/
for file in app/tours/components/*.tsx; do
  if [ -f "$file" ]; then
    echo "Fixing $file"
    sed -i 's|@/components/|../../components/|g' "$file"
    sed -i 's|@/lib/|../../lib/|g' "$file"
  fi
done

# Fix imports in app/settings/components/
for file in app/settings/components/*.tsx; do
  if [ -f "$file" ]; then
    echo "Fixing $file"
    sed -i 's|@/components/|../../components/|g' "$file"
    sed -i 's|@/lib/|../../lib/|g' "$file"
  fi
done

# Fix imports in root components
for file in components/*.tsx; do
  if [ -f "$file" ]; then
    echo "Fixing $file"
    sed -i 's|@/lib/|../lib/|g' "$file"
  fi
done

echo "Import paths fixed!"
