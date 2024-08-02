import React from 'react';
import { Box, Button, Container, Grid, Paper, Typography, useTheme } from '@mui/material';
import { CheckCircle, Home } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
const PricingComponent = () => {
    const theme = useTheme();
    const features = [
        "Acceso completo a SuperAI Empresarial",
        "Análisis predictivo en tiempo real",
        "Paneles de control personalizables",
        "Integración de datos multifuente",
        "Alertas y notificaciones proactivas",
        "Optimización de recursos empresariales",
        "Soporte prioritario 24/7",
        "Actualizaciones gratuitas",
        "1 mes de implementación incluido",
    ];
    return (React.createElement(Box, { sx: { bgcolor: theme.palette.background.default, py: 8, position: 'relative' } },
        React.createElement(Button, { component: RouterLink, to: "/", startIcon: React.createElement(Home, null), variant: "contained", sx: {
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 1,
            } }, "Inicio"),
        React.createElement(Container, { maxWidth: "lg" },
            React.createElement(Typography, { variant: "h2", align: "center", gutterBottom: true }, "Planes y Precios"),
            React.createElement(Grid, { container: true, spacing: 4, justifyContent: "center" },
                React.createElement(Grid, { item: true, xs: 12, md: 6, lg: 5 },
                    React.createElement(Paper, { elevation: 3, sx: { p: 4, height: '100%', display: 'flex', flexDirection: 'column' } },
                        React.createElement(Typography, { variant: "h4", component: "h2", gutterBottom: true }, "Plan Mensual"),
                        React.createElement(Typography, { variant: "h3", component: "p", color: "primary", gutterBottom: true },
                            "$650,000 ",
                            React.createElement(Typography, { variant: "subtitle1", component: "span" }, "COP/mes")),
                        React.createElement(Box, { sx: { my: 4, flexGrow: 1 } }, features.map((feature, index) => (React.createElement(Box, { key: index, sx: { display: 'flex', alignItems: 'center', mb: 2 } },
                            React.createElement(CheckCircle, { color: "success", sx: { mr: 1 } }),
                            React.createElement(Typography, null, feature))))),
                        React.createElement(Button, { variant: "contained", color: "primary", size: "large", fullWidth: true }, "Comenzar ahora"))),
                React.createElement(Grid, { item: true, xs: 12, md: 6, lg: 5 },
                    React.createElement(Paper, { elevation: 3, sx: { p: 4, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: theme.palette.primary.main, color: 'white', position: 'relative', overflow: 'hidden' } },
                        React.createElement(Box, { sx: { position: 'absolute', top: 16, right: -28, bgcolor: 'warning.main', color: 'warning.contrastText', px: 4, py: 1, transform: 'rotate(45deg)' } },
                            React.createElement(Typography, { variant: "subtitle2" }, "OFERTA ESPECIAL")),
                        React.createElement(Typography, { variant: "h4", component: "h2", gutterBottom: true }, "Plan Anual"),
                        React.createElement(Typography, { variant: "h3", component: "p", gutterBottom: true },
                            "$3,900,000 ",
                            React.createElement(Typography, { variant: "subtitle1", component: "span" }, "COP/a\u00F1o")),
                        React.createElement(Typography, { variant: "h6", gutterBottom: true },
                            "$325,000 ",
                            React.createElement(Typography, { variant: "subtitle2", component: "span" }, "COP/mes")),
                        React.createElement(Typography, { variant: "subtitle1", gutterBottom: true },
                            React.createElement("span", { style: { textDecoration: 'line-through' } }, "$7,800,000"),
                            " (50% de descuento)"),
                        React.createElement(Box, { sx: { my: 4, flexGrow: 1 } },
                            features.map((feature, index) => (React.createElement(Box, { key: index, sx: { display: 'flex', alignItems: 'center', mb: 2 } },
                                React.createElement(CheckCircle, { sx: { mr: 1, color: 'white' } }),
                                React.createElement(Typography, null, feature)))),
                            React.createElement(Box, { sx: { display: 'flex', alignItems: 'center', mb: 2 } },
                                React.createElement(CheckCircle, { sx: { mr: 1, color: 'white' } }),
                                React.createElement(Typography, { fontWeight: "bold" }, "50% de descuento por pago de contado"))),
                        React.createElement(Button, { variant: "contained", color: "secondary", size: "large", fullWidth: true }, "\u00A1Aprovechar oferta!")))))));
};
export default PricingComponent;
