import { createTheme, ThemeOptions } from '@mui/material/styles';

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#8c564b',
      contrastText: '#fff',
    },
    secondary: {
      main: '#a75740',
      contrastText: '#fff',
    },
    background: {
      default: '#1a1a1a',
      paper: '#2c2c2c',
    },
    text: {
      primary: '#f7f7f7',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  customShadows: [
    'none',
    '0px 1px 3px rgba(0,0,0,0.5)',
    '0px 1px 5px rgba(0,0,0,0.5)',
    '0px 1px 8px rgba(0,0,0,0.5)',
    '0px 1px 10px rgba(0,0,0,0.5)',
    '0px 1px 14px rgba(0,0,0,0.5)',
    '0px 1px 18px rgba(0,0,0,0.5)',
  ],
};

export default createTheme(darkTheme);
