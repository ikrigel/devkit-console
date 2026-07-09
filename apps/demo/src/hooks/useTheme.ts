import { useState, useEffect } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';

const STORAGE_KEY = 'devkit-demo-theme';

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      return (stored && ['light', 'dark', 'auto'].includes(stored)) ? stored : 'auto';
    } catch {
      return 'auto';
    }
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Determine if dark based on mode
    const updateDarkMode = () => {
      if (mode === 'dark') {
        setIsDark(true);
      } else if (mode === 'light') {
        setIsDark(false);
      } else {
        // Auto: check system preference and time of day
        const hour = new Date().getHours();
        const isNightTime = hour < 6 || hour >= 20; // 8 PM to 6 AM
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(prefersDark || isNightTime);
      }
    };

    updateDarkMode();

    // Listen for system theme changes (if in auto mode)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (mode === 'auto') {
        updateDarkMode();
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    // Check time every minute (for auto mode)
    const timeInterval = setInterval(() => {
      if (mode === 'auto') {
        updateDarkMode();
      }
    }, 60000);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      clearInterval(timeInterval);
    };
  }, [mode]);

  const setThemeMode = (newMode: ThemeMode) => {
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
      setMode(newMode);
    } catch {
      setMode(newMode);
    }
  };

  return { mode, isDark, setThemeMode };
}
