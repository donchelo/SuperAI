// src/components/theme/mui.d.ts
import { PaletteOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    background?: PaletteBackgroundOptions;
    text?: PaletteTextOptions;
  }

  interface PaletteBackgroundOptions {
    default: string;
    paper: string;
    appBar?: string; // Añadir la propiedad appBar
  }

  interface PaletteTextOptions {
    primary: string;
    secondary: string;
    appBarText?: string; // Añadir la propiedad appBarText
  }
}
