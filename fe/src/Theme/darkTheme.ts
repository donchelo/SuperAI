import { createTheme, ThemeOptions } from '@mui/material/styles';

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#8c564b', // Marrón rojizo
      contrastText: '#fff',
    },
    secondary: {
      main: '#a75740', // Marrón rojizo más claro
      contrastText: '#fff',
    },
    background: {
      default: '#1a1a1a', // Negro suave
      paper: '#2c2c2c', // Gris oscuro
    },
    text: {
      primary: '#f7f7f7', // Off-white
      secondary: '#b3b3b3', // Gris claro
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
};

export default createTheme(darkTheme);
