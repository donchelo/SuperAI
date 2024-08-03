import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import ADN from './ADN/ADN';
import DatosInternos from './DatosInternos/DatosInternos';

const Memoria: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Paper elevation={3} sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <Tabs 
          value={tabIndex} 
          onChange={handleTabChange} 
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="ADN de la Startup" />
          <Tab label="Datos Internos" />
        </Tabs>
      </Paper>

      <Box sx={{ p: 3 }}>
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
