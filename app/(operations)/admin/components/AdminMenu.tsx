'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminMenu() {
  const { lang } = useLanguage();

  return (
    <nav className="space-y-4">
      <Link href="/admin/assets/onboard" className="block px-3 py-2 rounded hover:bg-gray-200">
        {lang === 'en' ? 'Onboard Asset' : 'إضافة الأصول'}
      </Link>
      <Link href="/admin/assets/compliance" className="block px-3 py-2 rounded hover:bg-gray-200">
        {lang === 'en' ? 'Compliance Dashboard' : 'لوحة الامتثال'}
      </Link>
      <Link href="/admin/assets/publish" className="block px-3 py-2 rounded hover:bg-gray-200">
        {lang === 'en' ? 'Publishing Control' : 'تحكم النشر'}
      </Link>
    </nav>
  );
}
