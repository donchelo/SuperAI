import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import ADN from './ADN/ADN';
import DatosInternos from './DatosInternos/DatosInternos';

const Memoria: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          position: 'sticky', 
          top: isMobile ? 56 : 64, 
          zIndex: 1, 
          width: '100%',
          pt: isMobile ? 1 : 2, // Ajuste del padding superior para acercar al header
          pb: isMobile ? 1 : 2  // Ajuste del padding inferior para separación visual
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          aria-label="memoria tabs"
        >
          <Tab label="ADN de la Startup" />
          <Tab label="Datos Internos" />
        </Tabs>
      </Paper>
      <Box sx={{ p: 3, width: isMobile ? '100%' : 'auto' }}>
        {tabIndex === 0 && (
          <Box>
            <Typography variant="h4" gutterBottom>
              ADN de la Startup
            </Typography>
            <ADN />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <Typography variant="h4" gutterBottom>
              Datos Internos
            </Typography>
            <DatosInternos />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Memoria;
