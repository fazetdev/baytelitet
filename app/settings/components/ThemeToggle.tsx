'use client';

import { Sun, Moon, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('bayt_theme') as 'light' | 'dark' | 'auto';
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        setTheme('auto');
        applyTheme('dark');
      }
    }
  }, []);

  const applyTheme = (selectedTheme: 'light' | 'dark' | 'auto') => {
    const root = document.documentElement;
    
    if (selectedTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } else if (selectedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('bayt_theme', selectedTheme);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'auto') => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      description: 'Bright and clean interface',
      icon: Sun,
      color: 'text-bayt-warm',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      description: 'Easier on the eyes, saves battery',
      icon: Moon,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      id: 'auto',
      name: 'Auto (System)',
      description: 'Follows your device settings',
      icon: () => (
        <div className="relative w-6 h-6">
          <Sun className="absolute top-0 left-0 w-4 h-4 text-bayt-warm" />
          <Moon className="absolute bottom-0 right-0 w-4 h-4 text-indigo-500" />
        </div>
      ),
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  ];

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-bayt-dark mb-4">Theme Preference</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          const isSelected = theme === themeOption.id;
          
          return (
            <button
              key={themeOption.id}
              onClick={() => handleThemeChange(themeOption.id as 'light' | 'dark' | 'auto')}
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                isSelected
                  ? `${themeOption.borderColor} ${themeOption.bgColor} scale-[1.02] shadow-lg`
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`mb-3 p-3 rounded-full ${themeOption.bgColor}`}>
                  <Icon className={`w-6 h-6 ${themeOption.color}`} />
                </div>
                
                <div className="font-semibold text-bayt-dark mb-1">
                  {themeOption.name}
                </div>
                
                <div className="text-sm text-gray-600 mb-3">
                  {themeOption.description}
                </div>
                
                {isSelected && (
                  <div className="flex items-center gap-1 text-sm text-bayt-cool font-medium">
                    <Check className="w-4 h-4" />
                    Currently Active
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-bayt-light/50 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <p className="text-sm font-medium text-bayt-dark mb-1">Theme Tips</p>
            <p className="text-sm text-gray-600">
              • Dark mode reduces eye strain in low light<br/>
              • Auto mode syncs with your system preference<br/>
              • Theme applies immediately across all pages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
