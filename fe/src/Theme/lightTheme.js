// src/components/theme/lightTheme.ts
import { createTheme } from '@mui/material/styles';
const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#20A6D2', // Azul
        },
        secondary: {
            main: '#FC8E46', // Naranja
        },
        background: {
            default: '#EAF4EB', // Verde muy claro
            paper: '#FFFFFF', // Blanco
            appBar: '#F1F1F1', // Opcional: Color de fondo para AppBar en modo claro
        },
        text: {
            primary: '#282728', // Gris oscuro / Negro
            secondary: '#94989B', // Gris claro
            appBarText: '#282728', // Opcional: Color del texto en el AppBar
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});
export default lightTheme;
