// src/global.d.ts
import { Theme } from '@mui/material/styles';


declare module '*.png' {
    const value: string;
    export default value;
  }
  
  declare module '*.jpg' {
    const value: string;
    export default value;
  }
  
  declare module '*.svg' {
    const value: string;
    export default value;
  }


declare module '@mui/material/styles' {
  interface Theme {
    customShadows: string[];
  }

  interface ThemeOptions {
    customShadows?: string[];
  }
}