// src/Theme/ThemeContext.tsx
import React, { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from './index'; // Ajuste de la ruta
const ThemeContext = createContext(undefined);
export const CustomThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };
    const value = useMemo(() => ({
        toggleTheme,
        isDarkMode,
    }), [isDarkMode]);
    const theme = useMemo(() => createTheme(isDarkMode ? darkTheme : lightTheme), [isDarkMode]);
    return (React.createElement(ThemeContext.Provider, { value: value },
        React.createElement(MuiThemeProvider, { theme: theme },
            React.createElement(CssBaseline, null),
            children)));
};
export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a CustomThemeProvider');
    }
    return context;
};
// Asegúrate de exportar `CustomThemeProvider` como `ThemeProvider` para que coincida con las importaciones en `App.tsx`
export { CustomThemeProvider as ThemeProvider };
