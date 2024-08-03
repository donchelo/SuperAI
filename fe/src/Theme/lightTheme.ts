import { createTheme, ThemeOptions } from '@mui/material/styles';

const lightTheme: ThemeOptions = {
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#dc004e',
      contrastText: '#fff',
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    text: {
      primary: '#000',
      secondary: '#555',
    },
  },
  shadows: [
    'none', // Índice 0
    '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)', // Índice 1
    '0px 1px 5px rgba(0, 0, 0, 0.2)', // Índice 2
    '0px 1px 8px rgba(0, 0, 0, 0.24)', // Índice 3
    '0px 1px 10px rgba(0, 0, 0, 0.25)', // Índice 4
    '0px 2px 4px rgba(0, 0, 0, 0.12)', // Índice 5
    '0px 3px 6px rgba(0, 0, 0, 0.16)', // Índice 6
    '0px 4px 8px rgba(0, 0, 0, 0.24)', // Índice 7
    '0px 5px 10px rgba(0, 0, 0, 0.25)', // Índice 8
    '0px 6px 12px rgba(0, 0, 0, 0.3)', // Índice 9
    '0px 7px 14px rgba(0, 0, 0, 0.32)', // Índice 10
    '0px 8px 16px rgba(0, 0, 0, 0.34)', // Índice 11
    '0px 9px 18px rgba(0, 0, 0, 0.36)', // Índice 12
    '0px 10px 20px rgba(0, 0, 0, 0.38)', // Índice 13
    '0px 11px 22px rgba(0, 0, 0, 0.4)', // Índice 14
    '0px 12px 24px rgba(0, 0, 0, 0.42)', // Índice 15
    '0px 13px 26px rgba(0, 0, 0, 0.44)', // Índice 16
    '0px 14px 28px rgba(0, 0, 0, 0.46)', // Índice 17
    '0px 15px 30px rgba(0, 0, 0, 0.48)', // Índice 18
    '0px 16px 32px rgba(0, 0, 0, 0.5)', // Índice 19
    '0px 17px 34px rgba(0, 0, 0, 0.52)', // Índice 20
    '0px 18px 36px rgba(0, 0, 0, 0.54)', // Índice 21
    '0px 19px 38px rgba(0, 0, 0, 0.56)', // Índice 22
    '0px 20px 40px rgba(0, 0, 0, 0.58)', // Índice 23
    '0px 21px 42px rgba(0, 0, 0, 0.6)'  // Índice 24
  ],
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
};

export default createTheme(lightTheme);
