'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  Users, 
  Home, 
  FileText, 
  Calculator, 
  Shield, 
  Globe, 
  AlertCircle,
  BarChart3,
  Banknote,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Smartphone
} from 'lucide-react';
import useGulfComplianceStore, { JurisdictionCode } from '@/lib/stores/compliance/gulfComplianceStore';

interface AdminLayoutProps {
  children: ReactNode;
}

const JURISDICTIONS: Array<{code: JurisdictionCode; name: string; flag: string}> = [
  { code: 'AE-DU', name: 'Dubai', flag: '🇦🇪' },
  { code: 'AE-AZ', name: 'Abu Dhabi', flag: '🇦🇪' },
  { code: 'SA-RY', name: 'Riyadh', flag: '🇸🇦' },
  { code: 'QA-DA', name: 'Doha', flag: '🇶🇦' },
  { code: 'BH-MA', name: 'Manama', flag: '🇧🇭' },
  { code: 'KW-KU', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'OM-MU', name: 'Muscat', flag: '🇴🇲' },
];

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: BarChart3 },
  { label: 'Properties', path: '/admin/assets/onboard', icon: Home },
  { label: 'Agents', path: '/admin/agents', icon: Users },
  { label: 'Agencies', path: '/admin/agencies', icon: Building2 },
  { label: 'Compliance', path: '/admin/compliance', icon: Shield },
  { label: 'Escrow', path: '/admin/escrow', icon: Banknote },
  { label: 'Reports', path: '/admin/reports', icon: FileText },
  { label: 'Calculator', path: '/admin/calculator', icon: Calculator },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { 
    getComplianceSummary, 
    auditLog, 
    lastUpdated,
    syncComplianceData,
    isLoading 
  } = useGulfComplianceStore();
  
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<JurisdictionCode>('AE-DU');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [isMobile, setIsMobile] = useState(false);
  
  const complianceSummary = getComplianceSummary();
  const criticalAlerts = auditLog.filter(log => 
    !log.success && log.action === 'COMPLIANCE_CHECK'
  ).length;
  
  // Detect mobile and handle sidebar state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
        setMobileMenuOpen(false);
      } else {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Auto-sync compliance data
    syncComplianceData();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Never';
    const date = new Date(lastUpdated);
    return isMobile ? date.toLocaleDateString() : `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  
  // Mobile sidebar toggle
  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };
  
  // Close mobile menu on navigation
  const handleNavigation = () => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };
  
  return (
    <div className={`flex min-h-screen bg-gray-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar - Mobile & Desktop */}
      <aside className={`
        ${isMobile ? 'fixed inset-y-0 left-0 z-50 transform' : 'relative'}
        ${sidebarOpen || mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isMobile ? 'w-64' : sidebarOpen ? 'w-64' : 'w-20'}
        bg-white shadow-xl transition-all duration-300 ease-in-out flex flex-col
        lg:translate-x-0 lg:static
      `}>
        {/* Logo and Toggle */}
        <div className="p-4 border-b flex items-center justify-between lg:p-6">
          {sidebarOpen || isMobile ? (
            <>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-blue-600 lg:h-8 lg:w-8" />
                <h1 className="text-lg font-bold text-gray-800 lg:text-xl">
                  {isMobile ? 'Gulf Admin' : 'Gulf Real Estate Admin'}
                </h1>
              </div>
              <button 
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-100 rounded lg:hidden"
              >
                <X className="h-5 w-5" />
              </button>
              {!isMobile && (
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded hidden lg:block"
                >
                  ←
                </button>
              )}
            </>
          ) : (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded mx-auto"
            >
              →
            </button>
          )}
        </div>
        
        {/* Jurisdiction Selector - Only show when sidebar is open */}
        {(sidebarOpen || isMobile) && (
          <div className="p-3 border-b lg:p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Region</span>
            </div>
            <select
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value as JurisdictionCode)}
              className="w-full p-2 border rounded text-sm bg-gray-50"
            >
              {JURISDICTIONS.map((jur) => (
                <option key={jur.code} value={jur.code}>
                  {jur.flag} {isMobile ? jur.name.split(' ')[0] : jur.name}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {/* Navigation */}
        <nav className="flex-1 p-2 overflow-y-auto lg:p-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            const showLabel = sidebarOpen || isMobile;
            
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={handleNavigation}
                className={`flex items-center ${showLabel ? 'space-x-3 px-3' : 'justify-center'} py-2 rounded-lg mb-1 transition-colors text-sm lg:py-3 lg:text-base ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 border-r-2 lg:border-r-4 border-blue-600' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Icon className={`h-4 w-4 lg:h-5 lg:w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                {showLabel && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
        
        {/* Compliance Status - Only show when sidebar is open */}
        {(sidebarOpen || isMobile) && (
          <div className="p-3 border-t bg-gray-50 lg:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-700 lg:text-sm">Status</span>
              {criticalAlerts > 0 && (
                <span className="bg-red-100 text-red-800 text-xs px-1.5 py-0.5 rounded-full">
                  {criticalAlerts}
                </span>
              )}
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Issues:</span>
                <span className={`font-medium ${complianceSummary.totalViolations > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {complianceSummary.totalViolations}
                </span>
              </div>
              <div className="text-xs text-gray-500 truncate">
                Updated: {formatLastUpdated()}
              </div>
            </div>
          </div>
        )}
        
        {/* User Menu */}
        <div className="p-3 border-t lg:p-4">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center lg:h-8 lg:w-8">
              <span className="text-blue-600 font-bold text-xs lg:text-sm">A</span>
            </div>
            {(sidebarOpen || isMobile) && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate lg:text-sm">Admin</p>
                <p className="text-xs text-gray-500 truncate">Super Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto min-w-0">
        {/* Mobile Top Bar */}
        {isMobile && (
          <header className="bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between lg:hidden">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h2 className="text-base font-semibold text-gray-800 truncate">
                  {NAV_ITEMS.find(item => item.path === pathname)?.label || 'Dashboard'}
                </h2>
                <p className="text-xs text-gray-500 truncate">
                  {JURISDICTIONS.find(j => j.code === selectedJurisdiction)?.name.split(' ')[0]}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="p-1.5 border rounded hover:bg-gray-50"
              >
                <span className="text-xs">{language === 'en' ? 'AR' : 'EN'}</span>
              </button>
              
              {criticalAlerts > 0 && (
                <button className="relative p-1.5">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {criticalAlerts}
                  </span>
                </button>
              )}
            </div>
          </header>
        )}
        
        {/* Desktop Top Bar */}
        {!isMobile && (
          <header className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between hidden lg:flex">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {NAV_ITEMS.find(item => item.path === pathname)?.label || 'Dashboard'}
              </h2>
              <p className="text-sm text-gray-500">
                {JURISDICTIONS.find(j => j.code === selectedJurisdiction)?.name}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Mobile Indicator */}
              <div className="flex items-center text-sm text-gray-500">
                <Smartphone className="h-4 w-4 mr-2" />
                <span>Responsive Design Active</span>
              </div>
              
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="flex items-center space-x-2 px-3 py-2 border rounded hover:bg-gray-50"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm">{language === 'en' ? 'العربية' : 'English'}</span>
              </button>
              
              {/* Sync Button */}
              <button
                onClick={syncComplianceData}
                disabled={isLoading}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Syncing...</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4" />
                    <span>Sync Data</span>
                  </>
                )}
              </button>
            </div>
          </header>
        )}
        
        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {/* Mobile Warning Banner */}
          {isMobile && (
            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start">
                <Smartphone className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Mobile Mode</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Tap menu icon for navigation. Some features optimized for larger screens.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {children}
        </div>
      </main>
    </div>
  );
}
