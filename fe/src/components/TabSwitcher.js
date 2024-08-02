import React, { useState } from 'react';
import { Box, Tabs, Tab, useTheme, useMediaQuery } from '@mui/material';
import ADN from './Memoria/ADN/ADN';
import DatosInternos from './Memoria/datosInternos';
const TabSwitcher = () => {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (React.createElement(Box, { sx: {
            width: '100%',
            pt: isMobile ? 8 : 10,
            px: 2,
        } },
        React.createElement(Box, { sx: {
                borderBottom: 1,
                borderColor: 'divider',
                position: 'sticky',
                top: isMobile ? 56 : 64,
                backgroundColor: theme.palette.background.default,
                zIndex: 1,
            } },
            React.createElement(Tabs, { value: value, onChange: handleChange, "aria-label": "memoria tabs" },
                React.createElement(Tab, { label: "ADN" }),
                React.createElement(Tab, { label: "Datos Internos" }))),
        React.createElement(Box, { sx: { p: 3 } },
            value === 0 && React.createElement(ADN, null),
            value === 1 && React.createElement(DatosInternos, null))));
};
export default TabSwitcher;
