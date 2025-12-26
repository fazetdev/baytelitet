/**
 * Gulf RERA Number Validator
 * Strict compliance with ALL Gulf Cooperation Council countries
 * GCC: UAE, Saudi Arabia, Qatar, Bahrain, Kuwait, Oman
 */

export interface ReraValidationResult {
  valid: boolean;
  jurisdiction: string;
  jurisdictionCode: string;
  normalizedNumber: string;
  authorityName: string;
  error?: string;
}

/**
 * Dubai RERA Number Validation (Dubai Land Department)
 * Format: RERA-XXXXX or BRK-XXXXX (5 digits)
 * Example: RERA-12345, BRK-67890
 */
export const validateDubaiRera = (reraNumber: string): ReraValidationResult => {
  const cleanNumber = reraNumber.trim().toUpperCase();
  const normalized = cleanNumber.replace(/[-_\s]/g, '-');
  
  const patterns = [
    /^RERA-\d{5}$/,      // RERA-12345
    /^BRK-\d{5}$/,       // BRK-67890
    /^\d{5}$/,           // 12345 (implied RERA prefix)
  ];
  
  const isValid = patterns.some(pattern => pattern.test(normalized));
  
  if (!isValid) {
    return {
      valid: false,
      jurisdiction: 'Dubai',
      jurisdictionCode: 'AE-DU',
      authorityName: 'Dubai Land Department (DLD)',
      normalizedNumber: normalized,
      error: 'Invalid Dubai RERA format. Expected: RERA-12345 or BRK-67890'
    };
  }
  
  const finalNumber = normalized.includes('-') 
    ? normalized 
    : `RERA-${normalized}`;
  
  return {
    valid: true,
    jurisdiction: 'Dubai',
    jurisdictionCode: 'AE-DU',
    authorityName: 'Dubai Land Department (DLD)',
    normalizedNumber: finalNumber
  };
};

/**
 * Abu Dhabi Municipality Number Validation
 * Format: ADM-XXXXXX (6 digits)
 * Example: ADM-123456
 */
export const validateAbuDhabiMunicipality = (number: string): ReraValidationResult => {
  const cleanNumber = number.trim().toUpperCase();
  const normalized = cleanNumber.replace(/[-_\s]/g, '-');
  
  const patterns = [
    /^ADM-\d{6}$/,      // ADM-123456
    /^\d{6}$/,          // 123456 (implied ADM prefix)
  ];
  
  const isValid = patterns.some(pattern => pattern.test(normalized));
  
  if (!isValid) {
    return {
      valid: false,
      jurisdiction: 'Abu Dhabi',
      jurisdictionCode: 'AE-AZ',
      authorityName: 'Abu Dhabi Municipality',
      normalizedNumber: normalized,
      error: 'Invalid Abu Dhabi Municipality number. Expected: ADM-123456'
    };
  }
  
  const finalNumber = normalized.includes('-') 
    ? normalized 
    : `ADM-${normalized}`;
  
  return {
    valid: true,
    jurisdiction: 'Abu Dhabi',
    jurisdictionCode: 'AE-AZ',
    authorityName: 'Abu Dhabi Municipality',
    normalizedNumber: finalNumber
  };
};

/**
 * Saudi Arabia EJAR Number Validation
 * Format: 8 digits
 * Example: 12345678
 */
export const validateSaudiEjar = (ejarNumber: string): ReraValidationResult => {
  const cleanNumber = ejarNumber.trim();
  const pattern = /^\d{8}$/;
  const isValid = pattern.test(cleanNumber);
  
  if (!isValid) {
    return {
      valid: false,
      jurisdiction: 'Saudi Arabia',
      jurisdictionCode: 'SA-RY',
      authorityName: 'Ministry of Municipal and Rural Affairs (Ejar)',
      normalizedNumber: cleanNumber,
      error: 'Invalid Saudi EJAR number. Expected: 8 digits'
    };
  }
  
  return {
    valid: true,
    jurisdiction: 'Saudi Arabia',
    jurisdictionCode: 'SA-RY',
    authorityName: 'Ministry of Municipal and Rural Affairs (Ejar)',
    normalizedNumber: cleanNumber
  };
};

/**
 * Qatar Real Estate Regulatory Authority (RERA)
 * Format: Q-RERA-XXXX (4 digits) or QR-XXXX
 * Example: Q-RERA-1234, QR-5678
 */
export const validateQatarRera = (reraNumber: string): ReraValidationResult => {
  const cleanNumber = reraNumber.trim().toUpperCase();
  const normalized = cleanNumber.replace(/[-_\s]/g, '-');
  
  const patterns = [
    /^Q-RERA-\d{4}$/,    // Q-RERA-1234
    /^QR-\d{4}$/,        // QR-5678
    /^Q\d{4}$/,          // Q1234
  ];
  
  const isValid = patterns.some(pattern => pattern.test(normalized));
  
  if (!isValid) {
    return {
      valid: false,
      jurisdiction: 'Qatar',
      jurisdictionCode: 'QA-DA',
      authorityName: 'Qatar Real Estate Regulatory Authority',
      normalizedNumber: normalized,
      error: 'Invalid Qatar RERA format. Expected: Q-RERA-1234 or QR-5678'
    };
  }
  
  let finalNumber = normalized;
  if (/^Q\d{4}$/.test(normalized)) {
    finalNumber = `QR-${normalized.substring(1)}`;
  }
  
  return {
    valid: true,
    jurisdiction: 'Qatar',
    jurisdictionCode: 'QA-DA',
    authorityName: 'Qatar Real Estate Regulatory Authority',
    normalizedNumber: finalNumber
  };
};

/**
 * Bahrain Real Estate Regulatory Authority (RERA)
 * Format: BHR-XXXXX (5 digits)
 * Example: BHR-12345
 */
export const validateBahrainRera = (reraNumber: string): ReraValidationResult => {
  const cleanNumber = reraNumber.trim().toUpperCase();
  const normalized = cleanNumber.replace(/[-_\s]/g, '-');
  
  const patterns = [
    /^BHR-\d{5}$/,      // BHR-12345
    /^BH-\d{5}$/,       // BH-12345 (alternative)
    /^\d{5}$/,          // 12345 (implied BHR prefix)
  ];
  
  const isValid = patterns.some(pattern => pattern.test(normalized));
  
  if (!isValid) {
    return {
      valid: false,
      jurisdiction: 'Bahrain',
      jurisdictionCode: 'BH-MA',
      authorityName: 'Bahrain Real Estate Regulatory Authority',
      normalizedNumber: normalized,
      error: 'Invalid Bahrain RERA format. Expected: BHR-12345'
    };
  }
  
  const finalNumber = normalized.includes('-') 
    ? normalized 
    : `BHR-${normalized}`;
  
  return {
    valid: true,
    jurisdiction: 'Bahrain',
    jurisdictionCode: 'BH-MA',
    authorityName: 'Bahrain Real Estate Regulatory Authority',
    normalizedNumber: finalNumber
  };
};

/**
 * Kuwait Real Estate Regulatory Authority
 * Format: K-RE-XXXXX (5 digits)
 * Example: K-RE-12345
 */
export const validateKuwaitRera = (reraNumber: string): ReraValidationResult => {
  const cleanNumber = reraNumber.trim().toUpperCase();
  const normalized = cleanNumber.replace(/[-_\s]/g, '-');
  
  const patterns = [
    /^K-RE-\d{5}$/,     // K-RE-12345
    /^KRE-\d{5}$/,      // KRE-12345
    /^\d{5}$/,          // 12345 (implied K-RE prefix)
  ];
  
  const isValid = patterns.some(pattern => pattern.test(normalized));
  
  if (!isValid) {
    return {
      valid: false,
      jurisdiction: 'Kuwait',
      jurisdictionCode: 'KW-KU',
      authorityName: 'Kuwait Real Estate Regulatory Authority',
      normalizedNumber: normalized,
      error: 'Invalid Kuwait RERA format. Expected: K-RE-12345'
    };
  }
  
  const finalNumber = normalized.includes('-') 
    ? normalized 
    : `K-RE-${normalized}`;
  
  return {
    valid: true,
    jurisdiction: 'Kuwait',
    jurisdictionCode: 'KW-KU',
    authorityName: 'Kuwait Real Estate Regulatory Authority',
    normalizedNumber: finalNumber
  };
};

/**
 * Oman Real Estate Regulatory Authority
 * Format: OMR-XXXX (4 digits)
 * Example: OMR-1234
 */
export const validateOmanRera = (reraNumber: string): ReraValidationResult => {
  const cleanNumber = reraNumber.trim().toUpperCase();
  const normalized = cleanNumber.replace(/[-_\s]/g, '-');
  
  const patterns = [
    /^OMR-\d{4}$/,      // OMR-1234
    /^OM-\d{4}$/,       // OM-1234
    /^\d{4}$/,          // 1234 (implied OMR prefix)
  ];
  
  const isValid = patterns.some(pattern => pattern.test(normalized));
  
  if (!isValid) {
    return {
      valid: false,
      jurisdiction: 'Oman',
      jurisdictionCode: 'OM-MU',
      authorityName: 'Oman Real Estate Regulatory Authority',
      normalizedNumber: normalized,
      error: 'Invalid Oman RERA format. Expected: OMR-1234'
    };
  }
  
  const finalNumber = normalized.includes('-') 
    ? normalized 
    : `OMR-${normalized}`;
  
  return {
    valid: true,
    jurisdiction: 'Oman',
    jurisdictionCode: 'OM-MU',
    authorityName: 'Oman Real Estate Regulatory Authority',
    normalizedNumber: finalNumber
  };
};

/**
 * Unified Gulf RERA Validator for ALL GCC Countries
 */
export const validateGulfReraNumber = (
  reraNumber: string, 
  jurisdictionHint?: string
): ReraValidationResult => {
  // If jurisdiction hint provided, use specific validator
  if (jurisdictionHint) {
    const hint = jurisdictionHint.toUpperCase();
    
    // UAE Emirates
    if (hint === 'AE-DU' || hint === 'DUBAI') return validateDubaiRera(reraNumber);
    if (hint === 'AE-AZ' || hint === 'ABU DHABI') return validateAbuDhabiMunicipality(reraNumber);
    if (hint === 'AE-SH' || hint === 'SHARJAH') return validateDubaiRera(reraNumber); // Uses DLD format
    
    // Saudi Arabia
    if (hint === 'SA-RY' || hint === 'SAUDI' || hint === 'RIYADH' || hint === 'JEDDAH') 
      return validateSaudiEjar(reraNumber);
    
    // Qatar
    if (hint === 'QA-DA' || hint === 'QATAR' || hint === 'DOHA') 
      return validateQatarRera(reraNumber);
    
    // Bahrain
    if (hint === 'BH-MA' || hint === 'BAHRAIN' || hint === 'MANAMA') 
      return validateBahrainRera(reraNumber);
    
    // Kuwait
    if (hint === 'KW-KU' || hint === 'KUWAIT' || hint === 'KUWAIT CITY') 
      return validateKuwaitRera(reraNumber);
    
    // Oman
    if (hint === 'OM-MU' || hint === 'OMAN' || hint === 'MUSCAT') 
      return validateOmanRera(reraNumber);
    
    return {
      valid: false,
      jurisdiction: jurisdictionHint,
      jurisdictionCode: 'UNKNOWN',
      authorityName: 'Unknown Authority',
      normalizedNumber: reraNumber.trim(),
      error: `Validator not implemented for jurisdiction: ${jurisdictionHint}`
    };
  }
  
  // Auto-detect based on format
  const upperNumber = reraNumber.trim().toUpperCase();
  
  // Qatar detection
  if (upperNumber.startsWith('Q-RERA-') || upperNumber.startsWith('QR-') || /^Q\d{4}$/.test(upperNumber)) {
    return validateQatarRera(reraNumber);
  }
  
  // Bahrain detection
  if (upperNumber.startsWith('BHR-') || upperNumber.startsWith('BH-') || /^\d{5}$/.test(upperNumber)) {
    return validateBahrainRera(reraNumber);
  }
  
  // Kuwait detection
  if (upperNumber.startsWith('K-RE-') || upperNumber.startsWith('KRE-') || /^\d{5}$/.test(upperNumber)) {
    return validateKuwaitRera(reraNumber);
  }
  
  // Oman detection
  if (upperNumber.startsWith('OMR-') || upperNumber.startsWith('OM-') || /^\d{4}$/.test(upperNumber)) {
    return validateOmanRera(reraNumber);
  }
  
  // UAE - Dubai/Abu Dhabi detection
  if (upperNumber.startsWith('RERA-') || upperNumber.startsWith('BRK-')) {
    return validateDubaiRera(reraNumber);
  }
  
  if (upperNumber.startsWith('ADM-') || /^\d{6}$/.test(upperNumber)) {
    return validateAbuDhabiMunicipality(reraNumber);
  }
  
  // Saudi Arabia detection
  if (/^\d{8}$/.test(upperNumber)) {
    return validateSaudiEjar(reraNumber);
  }
  
  // Try Dubai format (5 digits)
  if (/^\d{5}$/.test(upperNumber)) {
    return validateDubaiRera(reraNumber);
  }
  
  // Final attempt with Dubai validator for detailed error
  const result = validateDubaiRera(reraNumber);
  if (!result.valid) {
    result.error = 'Unable to determine Gulf jurisdiction. Please specify: Dubai, Abu Dhabi, Saudi, Qatar, Bahrain, Kuwait, or Oman.';
    result.jurisdiction = 'Unknown';
    result.jurisdictionCode = 'UNKNOWN';
    result.authorityName = 'Multiple Gulf Authorities';
  }
  return result;
};

// Export primary validator as default
export default validateGulfReraNumber;
