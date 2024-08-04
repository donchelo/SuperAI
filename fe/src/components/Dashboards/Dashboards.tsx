import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, useTheme, useMediaQuery } from '@mui/material';
import DashboardVentasMensuales from './DashboardVentasMensuales';
import SalesByProductPieChart from './SalesByProductPieChart';

const Dashboards: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedDashboard, setSelectedDashboard] = useState<string>('ventas');

  const handleDashboardChange = (event: SelectChangeEvent) => {
    setSelectedDashboard(event.target.value as string);
  };

  return (
    <Box sx={{ 
      padding: { xs: 2, sm: 3 }, 
      marginTop: { xs: '56px', sm: '64px' },
      bgcolor: 'background.default',
      color: 'text.primary',
      minHeight: '100vh'
    }}>
      <Typography variant={isMobile ? "h5" : "h4"} gutterBottom sx={{ marginBottom: 2 }}>
        Dashboards
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="dashboard-select-label">Seleccionar Dashboard</InputLabel>
        <Select
          labelId="dashboard-select-label"
          id="dashboard-select"
          value={selectedDashboard}
          label="Seleccionar Dashboard"
          onChange={handleDashboardChange}
          aria-label="Seleccionar tipo de dashboard"
          sx={{
            bgcolor: 'background.paper',
            color: 'text.primary',
          }}
        >
          <MenuItem value="ventas">Dashboard Ventas Mensuales</MenuItem>
          <MenuItem value="productos">Ventas por Producto</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ marginTop: 2 }}>
        {selectedDashboard === 'ventas' && <DashboardVentasMensuales />}
        {selectedDashboard === 'productos' && <SalesByProductPieChart />}
      </Box>
    </Box>
  );
};

export default Dashboards;
