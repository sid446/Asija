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
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    // read saved preference or system preference
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        setThemeState(saved as Theme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        setThemeState('light');
      } else {
        setThemeState('dark');
      }
    } catch (e) {
      setThemeState('dark');
    }
  }, []);

  useEffect(() => {
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
      body.style.backgroundColor = '#2a2a2a';
      body.style.color = '#ffffff';
      const meta = document.querySelector('meta[name=theme-color]') as HTMLMetaElement | null;
      if (meta) meta.content = '#2a2a2a';
    }

    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => setThemeState((s) => (s === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

