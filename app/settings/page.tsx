'use client';

import { useState } from 'react';
import { Sun, Moon, Globe, Moon as Crescent, Bell, Shield, Download } from 'lucide-react';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('AED');
  const [prayerNotifications, setPrayerNotifications] = useState(true);
  const [hijriCalendar, setHijriCalendar] = useState(true);
  const [ramadanMode, setRamadanMode] = useState(false);

  const currencies = [
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س' },
    { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق' },
    { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع.' },
    { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك' }
  ];

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ar', name: 'Arabic', native: 'العربية', rtl: true }
  ];

  const prayerTimes = [
    { name: 'Fajr', time: '05:30 AM', iqama: '05:45 AM' },
    { name: 'Dhuhr', time: '12:30 PM', iqama: '01:00 PM' },
    { name: 'Asr', time: '03:45 PM', iqama: '04:00 PM' },
    { name: 'Maghrib', time: '06:30 PM', iqama: '06:35 PM' },
    { name: 'Isha', time: '08:00 PM', iqama: '08:15 PM' }
  ];

  return (
    // Background uses light color from homepage
    <div className="min-h-screen bg-bayt-light">
      {/* Header */}
      {/* Header uses the dark primary color from homepage */}
      <div className="bg-bayt-dark text-white">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-4">App Settings & Preferences</h1>
          <p className="text-xl text-bayt-cool">Customize your Bayt Elite experience</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Theme & Language */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-bayt-cool/50">
              <h2 className="text-2xl font-bold text-bayt-dark mb-6">Display & Language</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Theme Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-bayt-dark mb-4">Theme</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        theme === 'light'
                          ? 'border-bayt-warm bg-bayt-warm/10'
                          : 'border-bayt-cool/50 hover:border-bayt-cool'
                      }`}
                    >
                      <Sun className="w-8 h-8 mx-auto mb-3 text-bayt-warm" />
                      <div className="font-semibold text-bayt-dark">Light Mode</div>
                      <div className="text-sm text-gray-600">Default theme</div>
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        theme === 'dark'
                          ? 'border-bayt-warm bg-bayt-warm/10'
                          : 'border-bayt-cool/50 hover:border-bayt-cool'
                      }`}
                    >
                      <Moon className="w-8 h-8 mx-auto mb-3 text-bayt-dark" />
                      <div className="font-semibold text-bayt-dark">Dark Mode</div>
                      <div className="text-sm text-gray-600">Eyes comfort</div>
                    </button>
                  </div>
                </div>

                {/* Language Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-bayt-dark mb-4">Language</h3>
                  <div className="space-y-4">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          language === lang.code
                            ? 'border-bayt-cool bg-bayt-cool/10'
                            : 'border-bayt-cool/50 hover:border-bayt-cool'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-bayt-dark">{lang.name}</div>
                            <div className="text-sm text-gray-600">{lang.native}</div>
                          </div>
                          <Globe className="w-5 h-5 text-bayt-cool" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Currency & Region */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-bayt-cool/50">
              <h2 className="text-2xl font-bold text-bayt-dark mb-6">Currency & Region</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Currency Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-bayt-dark mb-4">Currency</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {currencies.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => setCurrency(curr.code)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          currency === curr.code
                            ? 'border-bayt-cultural bg-bayt-cultural/10' // Use Cultural Green for financial/currency focus
                            : 'border-bayt-cool/50 hover:border-bayt-cool'
                        }`}
                      >
                        <div className="text-2xl font-bold text-bayt-cultural">{curr.symbol}</div>
                        <div className="font-semibold text-bayt-dark">{curr.code}</div>
                        <div className="text-sm text-gray-600">{curr.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Regional Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-bayt-dark mb-4">Regional Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-bayt-light/50 rounded-xl">
                      <div>
                        <div className="font-semibold text-bayt-dark">Date Format</div>
                        <div className="text-sm text-gray-600">DD/MM/YYYY (Gulf Standard)</div>
                      </div>
                      <button className="text-bayt-warm font-semibold hover:text-yellow-700">Change</button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-bayt-light/50 rounded-xl">
                      <div>
                        <div className="font-semibold text-bayt-dark">Measurement Units</div>
                        <div className="text-sm text-gray-600">Square Feet (Sq Ft)</div>
                      </div>
                      <button className="text-bayt-warm font-semibold hover:text-yellow-700">Change</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prayer Times (Cultural Focus) */}
            {/* Uses Cultural Green accent heavily */}
            <div className="bg-gradient-to-br from-bayt-cultural/10 to-bayt-cultural/5 rounded-2xl shadow-lg p-8 border border-bayt-cultural/50">
              <h2 className="text-2xl font-bold text-bayt-dark mb-6">🕌 Prayer Times & Qibla</h2>

              <div className="space-y-6">
                {/* Location */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="font-bold text-bayt-dark">Current Location</div>
                      <div className="text-gray-600">Dubai, United Arab Emirates</div>
                    </div>
                    <button className="px-4 py-2 bg-bayt-cultural text-white rounded-lg font-semibold hover:bg-emerald-700">
                      Update Location
                    </button>
                  </div>
                  <div className="text-center py-4">
                    <div className="text-6xl mb-2 text-bayt-dark">🕋</div>
                    <div className="font-bold text-bayt-dark">Qibla Direction: 68°</div>
                    <div className="text-gray-600">From your current location</div>
                  </div>
                </div>

                {/* Prayer Times Table */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden">
                  <div className="grid grid-cols-5 bg-bayt-cultural text-white font-bold">
                    <div className="p-4 text-center">Prayer</div>
                    <div className="p-4 text-center">Time</div>
                    <div className="p-4 text-center">Iqama</div>
                    <div className="p-4 text-center">Remaining</div>
                    <div className="p-4 text-center">Status</div>
                  </div>
                  {prayerTimes.map((prayer, index) => (
                    <div key={index} className="grid grid-cols-5 border-b border-gray-200 last:border-b-0">
                      <div className="p-4 text-center font-semibold text-bayt-dark">{prayer.name}</div>
                      <div className="p-4 text-center text-bayt-dark">{prayer.time}</div>
                      <div className="p-4 text-center text-bayt-dark">{prayer.iqama}</div>
                      <div className="p-4 text-center text-bayt-cultural font-semibold">2:15</div>
                      <div className="p-4 text-center">
                        <span className="px-3 py-1 bg-bayt-cultural/20 text-bayt-cultural rounded-full text-sm">
                          Upcoming
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Prayer Settings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-bayt-cultural" />
                      <div>
                        <div className="font-semibold text-bayt-dark">Prayer Time Notifications</div>
                        <div className="text-sm text-gray-600">Get notified 15 minutes before each prayer</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setPrayerNotifications(!prayerNotifications)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        prayerNotifications ? 'bg-bayt-cultural' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                        prayerNotifications ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Crescent className="w-5 h-5 text-bayt-cultural" />
                      <div>
                        <div className="font-semibold text-bayt-dark">Hijri Calendar Display</div>
                        <div className="text-sm text-gray-600">Show dates in both Gregorian and Hijri</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setHijriCalendar(!hijriCalendar)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        hijriCalendar ? 'bg-bayt-cultural' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                        hijriCalendar ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl text-bayt-cultural">🌙</div>
                      <div>
                        <div className="font-semibold text-bayt-dark">Ramadan Mode</div>
                        <div className="text-sm text-gray-600">Special features during Ramadan</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setRamadanMode(!ramadanMode)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        ramadanMode ? 'bg-bayt-cultural' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                        ramadanMode ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Quick Settings & Tools */}
          <div className="space-y-8">
            {/* Account Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-bayt-cool/50">
              <h3 className="text-lg font-bold text-bayt-dark mb-4">Account Settings</h3>
              <div className="space-y-4">
                <button className="w-full text-left p-4 rounded-xl border border-bayt-cool/50 hover:bg-bayt-light/50 transition-colors">
                  <div className="font-semibold text-bayt-dark">Profile Information</div>
                  <div className="text-sm text-gray-600">Update your personal details</div>
                </button>
                <button className="w-full text-left p-4 rounded-xl border border-bayt-cool/50 hover:bg-bayt-light/50 transition-colors">
                  <div className="font-semibold text-bayt-dark">Security & Privacy</div>
                  <div className="text-sm text-gray-600">Password, 2FA, privacy settings</div>
                </button>
                <button className="w-full text-left p-4 rounded-xl border border-bayt-cool/50 hover:bg-bayt-light/50 transition-colors">
                  <div className="font-semibold text-bayt-dark">Notifications</div>
                  <div className="text-sm text-gray-600">Manage email & push notifications</div>
                </button>
              </div>
            </div>

            {/* Market Tools */}
            {/* Uses Warm Gold accent for financial/market focus */}
            <div className="bg-gradient-to-br from-bayt-warm/10 to-yellow-50 rounded-2xl p-6 border border-bayt-warm/50">
              <h3 className="text-lg font-bold text-bayt-dark mb-4">Market Tools</h3>
              <div className="space-y-4">
                <button className="w-full text-left p-4 bg-white rounded-xl border border-bayt-warm/50 hover:border-bayt-warm transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl text-bayt-warm">🏆</div>
                    <div>
                      <div className="font-semibold text-bayt-dark">Golden Visa Checker</div>
                      <div className="text-sm text-gray-600">Check eligibility for UAE Golden Visa</div>
                    </div>
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-white rounded-xl border border-bayt-warm/50 hover:border-bayt-warm transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl text-bayt-warm">📈</div>
                    <div>
                      <div className="font-semibold text-bayt-dark">Rental Yield Calculator</div>
                      <div className="text-sm text-gray-600">Calculate potential rental income</div>
                    </div>
                  </div>
                </button>
                <button className="w-full text-left p-4 bg-white rounded-xl border border-bayt-warm/50 hover:border-bayt-warm transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl text-bayt-warm">⚡</div>
                    <div>
                      <div className="font-semibold text-bayt-dark">Utility Estimates</div>
                      <div className="text-sm text-gray-600">Power/water consumption estimates</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Data & Privacy */}
            {/* Uses Dark Accent for security/privacy focus */}
            <div className="bg-gradient-to-br from-bayt-dark/10 to-gray-100 rounded-2xl p-6 border border-bayt-dark/50">
              <h3 className="text-lg font-bold text-bayt-dark mb-4">Data & Privacy</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-3 p-4 bg-white rounded-xl border border-bayt-cool/50 hover:border-bayt-cool transition-colors">
                  <Download className="w-5 h-5 text-bayt-dark" />
                  <div>
                    <div className="font-semibold text-bayt-dark">Export My Data</div>
                    <div className="text-sm text-gray-600">Download all your information</div>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-white rounded-xl border border-bayt-cool/50 hover:border-bayt-cool transition-colors">
                  <Shield className="w-5 h-5 text-bayt-dark" />
                  <div>
                    <div className="font-semibold text-bayt-dark">Privacy Settings</div>
                    <div className="text-sm text-gray-600">Control data sharing</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Save Changes */}
            <div className="sticky top-6">
              {/* Primary action uses warm gold accent */}
              <button className="w-full py-4 bg-gradient-to-r from-bayt-warm to-yellow-700 text-bayt-dark rounded-xl font-bold text-lg hover:from-yellow-700 hover:to-bayt-warm transition-all shadow-lg">
                Save All Changes
              </button>
              {/* Secondary action uses cool accent border */}
              <button className="w-full mt-4 py-3 border-2 border-bayt-cool text-bayt-dark rounded-xl font-semibold hover:bg-bayt-light/50 transition-colors">
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
