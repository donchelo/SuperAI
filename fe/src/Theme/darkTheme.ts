import { createTheme, ThemeOptions } from '@mui/material/styles';

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#4a90e2',
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
};

export default createTheme(darkTheme);
