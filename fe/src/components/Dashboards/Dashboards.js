import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import DashboardVentasMensuales from './DashboardVentasMensuales';
import SalesByProductPieChart from './SalesByProductPieChart'; // Cambiado a SalesByProductPieChart
const Dashboards = () => {
    const [selectedDashboard, setSelectedDashboard] = useState('ventas');
    const handleDashboardChange = (event) => {
        setSelectedDashboard(event.target.value);
    };
    return (React.createElement(Box, { sx: {
            padding: { xs: 1, sm: 2 },
            marginTop: { xs: '56px', sm: '64px' },
        } },
        React.createElement(Typography, { variant: "h4", gutterBottom: true, sx: { marginBottom: 2 } }, "Dashboards"),
        React.createElement(FormControl, { fullWidth: true, sx: { marginBottom: 2 } },
            React.createElement(InputLabel, { id: "dashboard-select-label" }, "Seleccionar Dashboard"),
            React.createElement(Select, { labelId: "dashboard-select-label", id: "dashboard-select", value: selectedDashboard, label: "Seleccionar Dashboard", onChange: handleDashboardChange, "aria-label": "Seleccionar tipo de dashboard" },
                React.createElement(MenuItem, { value: "ventas" }, "Dashboard Ventas Mensuales"),
                React.createElement(MenuItem, { value: "productos" }, "Ventas por Producto"))),
        React.createElement(Box, { sx: { marginTop: 2 } },
            selectedDashboard === 'ventas' && React.createElement(DashboardVentasMensuales, null),
            selectedDashboard === 'productos' && React.createElement(SalesByProductPieChart, null))));
};
export default Dashboards;
