'use client';

import { useEffect, useState } from 'react';
import { Music, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [darkMode, setDarkMode] = useState(true);

  // Initialize theme on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 dark:bg-gray-900/95 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="w-8 h-8 text-purple-500" />
          <h1 className="text-2xl font-bold text-white dark:text-white">MusicStream</h1>
        </div>

        <Button
          onClick={toggleTheme}
          variant="ghost"
          size="icon"
          className="rounded-full text-gray-300 hover:text-white hover:bg-gray-800"
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>
    </header>
  );
}