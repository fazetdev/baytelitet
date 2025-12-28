'use client';

import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('bayt_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('bayt_theme', newTheme);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
      <div>
        <h3 className="font-semibold text-bayt-dark">Theme</h3>
        <p className="text-sm text-gray-600">Light or dark mode</p>
      </div>
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 p-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors"
      >
        {theme === 'light' ? (
          <>
            <Sun className="w-5 h-5" />
            <span>Light</span>
          </>
        ) : (
          <>
            <Moon className="w-5 h-5" />
            <span>Dark</span>
          </>
        )}
      </button>
    </div>
  );
}
