'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // read saved preference or system preference
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        setThemeState(saved as Theme);
      } else {
        setThemeState('light');
      }
    } catch (e) {
      setThemeState('light');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Apply theme to document body and root so plain CSS respects it
    const root = document.documentElement;
    const body = document.body;

    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      body.style.backgroundColor = '#ffffff';
      body.style.color = '#111827';
      // small adjustments for meta theme-color
      const meta = document.querySelector('meta[name=theme-color]') as HTMLMetaElement | null;
      if (meta) meta.content = '#ffffff';
    } else {
      root.setAttribute('data-theme', 'dark');
      body.style.backgroundColor = '#020617';
      body.style.color = '#ffffff';
      const meta = document.querySelector('meta[name=theme-color]') as HTMLMetaElement | null;
      if (meta) meta.content = '#020617';
    }

    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // ignore
    }
  }, [theme, mounted]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => setThemeState((s) => (s === 'dark' ? 'light' : 'dark'));

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'light', setTheme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

