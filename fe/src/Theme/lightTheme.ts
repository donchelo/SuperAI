import { createTheme, ThemeOptions } from '@mui/material/styles';

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#4a90e2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#a75740',
      contrastText: '#fff',
    },
    background: {
      default: '#f7f7f7',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  customShadows: [
    'none',
    '0px 1px 3px rgba(0,0,0,0.2)',
    '0px 1px 5px rgba(0,0,0,0.2)',
    '0px 1px 8px rgba(0,0,0,0.2)',
    '0px 1px 10px rgba(0,0,0,0.2)',
    '0px 1px 14px rgba(0,0,0,0.2)',
    '0px 1px 18px rgba(0,0,0,0.2)',
  ],
};

export default createTheme(lightTheme);
