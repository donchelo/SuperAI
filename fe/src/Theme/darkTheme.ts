// src/components/theme/darkTheme.ts
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#20A6D2', // Azul
    },
    secondary: {
      main: '#FC8E46', // Naranja
    },
    background: {
      default: '#303030', // Gris oscuro
      paper: '#424242', // Gris más claro
      appBar: '#1F1F1F', // Color de fondo para AppBar en modo oscuro
    },
    text: {
      primary: '#FFFFFF', // Blanco
      secondary: '#B0BEC5', // Gris claro
      appBarText: '#FFFFFF', // Color del texto en el AppBar
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default darkTheme;
