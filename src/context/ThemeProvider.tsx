import React, { createContext, useContext, useState } from 'react';
import { ThemeConfig } from '../types/schemas';

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultTheme: ThemeConfig = {
  primary: '#FF9933',
  background: '#FFFFFF',
  secondary: '#0033A0',
  accent: '#FF6B35',
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);

  const value: ThemeContextType = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};