// src/components/theme/darkTheme.ts
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    background?: {
      default: string;
      paper: string;
      appBar: string; // Añadir la propiedad appBar
    };
    text?: {
      primary: string;
      secondary: string;
      appBarText: string; // Añadir la propiedad appBarText
    };
  }
}

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
