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
      {/* Header */}
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
            {/* Display & Language */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-bayt-cool/50">
              <h2 className="text-2xl font-bold text-bayt-dark mb-6">Display & Language</h2>
              <div className="space-y-8">
                <ThemeToggle />
                <div className="border-t border-gray-200 pt-8">
                  <LanguageToggle />
                </div>
              </div>
            </div>

            {/* Currency & Region */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-bayt-cool/50">
              <h2 className="text-2xl font-bold text-bayt-dark mb-6">Currency & Region</h2>
              <CurrencySelector />
            </div>

            {/* Cultural Settings */}
            <div className="bg-gradient-to-br from-bayt-cultural/10 to-bayt-cultural/5 rounded-2xl shadow-lg p-8 border border-bayt-cultural/50">
              <h2 className="text-2xl font-bold text-bayt-dark mb-6">🕌 Cultural & Regional Settings</h2>
              {/* Prayer, Hijri, Ramadan toggles */}
              <div className="space-y-6">
                {/* ... same as before ... */}
              </div>
            </div>
          </div>

          {/* Sidebar - Quick Settings & Actions */}
          <div className="space-y-8">
            {/* Save & Reset Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-bayt-cool/50">
              <h3 className="text-lg font-bold text-bayt-dark mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <button onClick={handleSave} disabled={isSaving} className="w-full flex items-center justify-center gap-2 p-4 bg-bayt-warm text-bayt-dark rounded-xl font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <Save className="w-5 h-5" />
                  {isSaving ? 'Saving...' : 'Save All Changes'}
                </button>

                <button onClick={handleReset} className="w-full flex items-center justify-center gap-2 p-4 border-2 border-bayt-cool text-bayt-dark rounded-xl font-semibold hover:bg-bayt-light/50 transition-colors">
                  <RotateCcw className="w-5 h-5" />
                  Reset to Defaults
                </button>
              </div>
            </div>

            {/* Account & Security */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-bayt-cool/50">
              <h3 className="text-lg font-bold text-bayt-dark mb-4">Account & Security</h3>
              <div className="space-y-4">
                {/* Profile, Privacy, Export buttons */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
