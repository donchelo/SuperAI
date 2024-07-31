import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import DashboardVentasMensuales from './DashboardVentasMensuales';
import SalesByProductPieChart from './SalesByProductPieChart'; // Cambiado a SalesByProductPieChart

const Dashboards: React.FC = () => {
  const [selectedDashboard, setSelectedDashboard] = useState<string>('ventas');

  const handleDashboardChange = (event: SelectChangeEvent) => {
    setSelectedDashboard(event.target.value as string);
  };

  return (
    <Box sx={{ 
      padding: { xs: 1, sm: 2 }, 
      marginTop: { xs: '56px', sm: '64px' },
    }}>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
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