import React from 'react';
interface ThemeContextType {
    toggleTheme: () => void;
    isDarkMode: boolean;
}
export declare const CustomThemeProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useThemeContext: () => ThemeContextType;
export { CustomThemeProvider as ThemeProvider };
