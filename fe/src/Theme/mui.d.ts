// src/components/theme/mui.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    appBar?: string;
  }

  interface TypeText {
    appBarText?: string;
  }
}
