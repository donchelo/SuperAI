import { createTheme, ThemeOptions } from '@mui/material/styles';

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#00E5FF', // Cyan brillante
      contrastText: '#000000',
    },
    secondary: {
      main: '#FF4081', // Rosa brillante
      contrastText: '#000000',
    },
    background: {
      default: '#121212', // Gris muy oscuro, casi negro
      paper: '#1E1E1E', // Gris oscuro
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3',
    },
    error: {
      main: '#FF5252', // Rojo brillante
    },
    warning: {
      main: '#FFD740', // Amarillo brillante
    },
    info: {
      main: '#40C4FF', // Azul claro brillante
    },
    success: {
      main: '#69F0AE', // Verde brillante
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          borderRadius: 8,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        },
      },
    },
  },
};

export default createTheme(darkTheme);