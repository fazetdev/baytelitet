export default function Footer() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <footer dir={isRTL ? 'rtl' : 'ltr'} className="bg-black border-t border-[#D4AF37]/10 p-8 mt-12 text-center">
      <div className="container mx-auto">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Bayt Elite. 
          {isRTL ? ' جميع الحقوق محفوظة.' : ' All rights reserved.'}
        </p>
      </div>
    </footer>
  );
}