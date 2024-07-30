import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import DashboardVentasMensuales from './DashboardVentasMensuales';
import SalesByProductPieChart from './pieProducto';

const Dashboards: React.FC = () => {
  const [selectedDashboard, setSelectedDashboard] = useState<string>('ventas');

  const handleDashboardChange = (event: SelectChangeEvent) => {
    setSelectedDashboard(event.target.value as string);
  };

  return (
    <Box sx={{ 
      padding: 2, 
      marginTop: '64px', // Ajusta este valor según sea necesario
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