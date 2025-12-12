export function formatCurrency(amount: number, currency: string = 'AED'): string {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatDate(date: Date, includeHijri: boolean = false): string {
  const gregorian = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  if (includeHijri) {
    try {
      const { toHijri } = require('hijri-converter');
      const hijriDate = toHijri(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );
      const hijri = `${hijriDate.hy}-${hijriDate.hm}-${hijriDate.hd} AH`;
      return `${gregorian} (${hijri})`;
    } catch (error) {
      return gregorian;
    }
  }
  
  return gregorian;
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
}

export function formatSquareMeters(sqft: number): string {
  const sqm = sqft * 0.092903;
  return `${sqft.toFixed(0)} sqft (${sqm.toFixed(0)} m²)`;
}
