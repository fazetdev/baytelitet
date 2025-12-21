'use client';

import { useState } from 'react';
import { Save, RotateCcw, Shield, Download, Bell } from 'lucide-react';
import LanguageToggle from './components/LanguageToggle';
import ThemeToggle from './components/ThemeToggle';
import CurrencySelector from './components/CurrencySelector';

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [prayerNotifications, setPrayerNotifications] = useState(true);
  const [hijriCalendar, setHijriCalendar] = useState(true);
  const [ramadanMode, setRamadanMode] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      localStorage.removeItem('bayt_theme');
      localStorage.removeItem('bayt_currency');
      alert('Settings reset to defaults. Please refresh the page.');
    }
  };

  return (
    <div className="min-h-screen bg-bayt-light">
      <div className="bg-bayt-dark text-white">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-2">App Settings & Preferences</h1>
          <p className="text-lg text-bayt-cool">Customize your Bayt Elite experience</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-bayt-cool/50">
              <h2 className="text-2xl font-bold text-bayt-dark mb-6">Display & Language</h2>
              <div className="space-y-8">
                <ThemeToggle />
                <div className="border-t border-gray-200 pt-8">
                  <LanguageToggle />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-bayt-cool/50">
              <h2 className="text-2xl font-bold text-bayt-dark mb-6">Currency & Region</h2>
              <CurrencySelector />
            </div>

            <div className="bg-gradient-to-br from-bayt-cultural/10 to-bayt-cultural/5 rounded-2xl shadow-lg p-8 border border-bayt-cultural/50">
              <h2 className="text-2xl font-bold text-bayt-dark mb-6">🕌 Cultural & Regional Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-bayt-cultural" />
                    <div>
                      <div className="font-semibold text-bayt-dark">Prayer Time Notifications</div>
                      <div className="text-sm text-gray-600">Get notified before each prayer</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setPrayerNotifications(!prayerNotifications)}
                    className={`w-12 h-6 rounded-full transition-colors ${prayerNotifications ? 'bg-bayt-cultural' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${prayerNotifications ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl text-bayt-cultural">🌙</div>
                    <div>
                      <div className="font-semibold text-bayt-dark">Hijri Calendar Display</div>
                      <div className="text-sm text-gray-600">Show dates in both Gregorian and Hijri</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setHijriCalendar(!hijriCalendar)}
                    className={`w-12 h-6 rounded-full transition-colors ${hijriCalendar ? 'bg-bayt-cultural' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${hijriCalendar ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl text-bayt-cultural">🕌</div>
                    <div>
                      <div className="font-semibold text-bayt-dark">Ramadan Mode</div>
                      <div className="text-sm text-gray-600">Special features during Ramadan</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setRamadanMode(!ramadanMode)}
                    className={`w-12 h-6 rounded-full transition-colors ${ramadanMode ? 'bg-bayt-cultural' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${ramadanMode ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Quick Actions */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-bayt-cool/50">
              <h3 className="text-lg font-bold text-bayt-dark mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full flex items-center justify-center gap-2 p-4 bg-bayt-warm text-bayt-dark rounded-xl font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  {isSaving ? 'Saving...' : 'Save All Changes'}
                </button>

                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 p-4 border-2 border-bayt-cool text-bayt-dark rounded-xl font-semibold hover:bg-bayt-light/50 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset to Defaults
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-bayt-cool/50">
              <h3 className="text-lg font-bold text-bayt-dark mb-4">Account & Security</h3>
              <div className="space-y-4">
                <button className="w-full text-left p-4 rounded-xl border border-bayt-cool/50 hover:bg-bayt-light/50 transition-colors">
                  <div className="font-semibold text-bayt-dark">Profile Information</div>
                  <div className="text-sm text-gray-600">Update your personal details</div>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-bayt-cool/50 hover:bg-bayt-light/50 transition-colors">
                  <Shield className="w-5 h-5 text-bayt-dark" />
                  <div>
                    <div className="font-semibold text-bayt-dark">Privacy Settings</div>
                    <div className="text-sm text-gray-600">Control data sharing</div>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-bayt-cool/50 hover:bg-bayt-light/50 transition-colors">
                  <Download className="w-5 h-5 text-bayt-dark" />
                  <div>
                    <div className="font-semibold text-bayt-dark">Export My Data</div>
                    <div className="text-sm text-gray-600">Download all your information</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
