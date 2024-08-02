import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";
import ADN from "./ADN/ADN";
import DatosInternos from "./datosInternos";
const Memoria = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };
    return (React.createElement(Box, { sx: { width: '100%', bgcolor: 'background.paper' } },
        React.createElement(Paper, { elevation: 3, sx: { position: 'sticky', top: 0, zIndex: 1 } },
            React.createElement(Tabs, { value: tabIndex, onChange: handleTabChange, variant: "fullWidth", sx: { borderBottom: 1, borderColor: 'divider' } },
                React.createElement(Tab, { label: "ADN de la Startup" }),
                React.createElement(Tab, { label: "Datos Internos" }))),
        React.createElement(Box, { sx: { p: 3 } },
            tabIndex === 0 && (React.createElement(Box, null,
                React.createElement(Typography, { variant: "h4", gutterBottom: true }, "ADN de la Startup"),
                React.createElement(ADN, null))),
            tabIndex === 1 && (React.createElement(Box, null,
                React.createElement(Typography, { variant: "h4", gutterBottom: true }, "Datos Internos"),
                React.createElement(DatosInternos, null))))));
};
export default Memoria;
