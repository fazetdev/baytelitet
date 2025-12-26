'use client';

import { useState } from 'react';
import {
  CheckCircle,
  Shield,
  FileText,
  Globe,
  UserCheck,
  Building,
  CreditCard,
  PenTool,
  FileCheck,
  Home,
  ChevronRight,
  ExternalLink,
  Download
} from 'lucide-react';

const ForeignBuyerGuidePage = () => {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const isRTL = lang === 'ar';
  const [activeStep, setActiveStep] = useState(1);

  // ... [keep all the existing code from line 20 to the end of the file] ...

export default ForeignBuyerGuidePage;
