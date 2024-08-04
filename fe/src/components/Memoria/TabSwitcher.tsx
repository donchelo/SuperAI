import React, { useState } from 'react';
import { Box, Tabs, Tab, useTheme, useMediaQuery } from '@mui/material';
import ADN from './ADN/ADN';
import DatosInternos from './DatosInternos/DatosInternos';

const TabSwitcher: React.FC = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ 
      width: '100%', 
      pt: isMobile ? 8 : 10,
      px: 2,
    }}>
      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        position: 'sticky',
        top: isMobile ? 56 : 64,
        backgroundColor: theme.palette.background.default,
        zIndex: 1,
        width: '100%',
      }}>
        <Tabs value={value} onChange={handleChange} aria-label="memoria tabs" variant="fullWidth">
          <Tab label="ADN" />
          <Tab label="Datos Internos" />
        </Tabs>
      </Box>
      <Box sx={{ p: 3, width: isMobile ? '100%' : 'auto' }}>
        {value === 0 && <ADN />}
        {value === 1 && <DatosInternos />}
      </Box>
    </Box>
  );
};

export default TabSwitcher;
