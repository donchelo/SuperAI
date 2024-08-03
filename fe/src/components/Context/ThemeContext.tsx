import React, { createContext, useState, useMemo, useContext, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import lightTheme from '../../Theme/lightTheme';
import darkTheme from '../../Theme/darkTheme';

interface ThemeContextType {
  toggleTheme: () => void;
  currentTheme: 'light' | 'dark';
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface CustomThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const isDarkMode = theme === 'dark';

  const currentTheme = useMemo(() => (theme === 'light' ? lightTheme : darkTheme), [theme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, currentTheme: theme, isDarkMode }}>
      <ThemeProvider theme={currentTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a CustomThemeProvider');
  }
  return context;
};
