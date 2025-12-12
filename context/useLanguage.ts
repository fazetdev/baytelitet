'use client';

import { useState } from 'react';

export default function useLanguage() {
  const [lang, setLang] = useState('en');
  return { lang, setLang };
}
