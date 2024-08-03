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
};

export default createTheme(lightTheme);
