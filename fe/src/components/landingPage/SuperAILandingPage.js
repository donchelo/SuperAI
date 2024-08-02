import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Button, Container, Grid, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography, useTheme, useMediaQuery, Fade, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ArrowForward, BarChart, Dashboard, Storage, Notifications, CheckCircle, Menu as MenuIcon, ExpandMore } from '@mui/icons-material';
// Definimos los colores como un objeto de tema personalizado
const customColors = {
    darkGray: '#282728',
    white: '#FFFFFF',
    lightGray: '#94989B',
    orange: '#FC8E46',
    lightGreen: '#EAF4EB',
    blue: '#20A6D2'
};
const FeatureItem = ({ icon: Icon, title, description }) => {
    const theme = useTheme();
    return (React.createElement(Box, { sx: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            p: 3,
            borderRadius: 2,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
                bgcolor: 'action.hover',
                transform: 'translateY(-5px)'
            }
        } },
        React.createElement(Icon, { sx: { fontSize: 48, color: customColors.blue, mb: 2 } }),
        React.createElement(Typography, { variant: "h6", gutterBottom: true }, title),
        React.createElement(Typography, { variant: "body2", color: "text.secondary" }, description)));
};
const ValueItem = ({ children }) => (React.createElement(ListItem, null,
    React.createElement(ListItemIcon, null,
        React.createElement(CheckCircle, { sx: { color: customColors.orange } })),
    React.createElement(ListItemText, { primary: children })));
const SuperAILandingPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (React.createElement(Box, { sx: { bgcolor: customColors.white, minHeight: '100vh' } },
        React.createElement(AppBar, { position: "static", color: "transparent", elevation: 0, sx: { bgcolor: customColors.lightGreen } },
            React.createElement(Toolbar, null,
                React.createElement(Typography, { variant: "h6", component: "div", sx: { flexGrow: 1, fontWeight: 'bold', color: customColors.darkGray } }, "SuperAI"),
                isMobile ? (React.createElement(React.Fragment, null,
                    React.createElement(IconButton, { size: "large", edge: "start", color: "inherit", "aria-label": "menu", onClick: handleMenu },
                        React.createElement(MenuIcon, null)),
                    React.createElement(Menu, { anchorEl: anchorEl, anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        }, keepMounted: true, transformOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        }, open: Boolean(anchorEl), onClose: handleClose },
                        React.createElement(MenuItem, { onClick: handleClose, component: RouterLink, to: "/" }, "Inicio"),
                        React.createElement(MenuItem, { onClick: handleClose, component: RouterLink, to: "/pricing" }, "Pricing"),
                        React.createElement(MenuItem, { onClick: handleClose, component: RouterLink, to: "/app/chat" }, "Sign In")))) : (React.createElement(Box, null,
                    React.createElement(Button, { color: "inherit", component: RouterLink, to: "/" }, "Inicio"),
                    React.createElement(Button, { color: "inherit", component: RouterLink, to: "/pricing" }, "Pricing"),
                    React.createElement(Button, { color: "inherit", component: RouterLink, to: "/app/chat" }, "Sign In"))))),
        React.createElement(Container, { maxWidth: "lg", sx: { mt: 12, mb: 12, textAlign: 'center' } },
            React.createElement(Fade, { in: true, timeout: 1000 },
                React.createElement(Box, null,
                    React.createElement(Typography, { variant: "h2", component: "h1", gutterBottom: true, sx: { fontWeight: 'bold', color: customColors.darkGray } }, "SuperAI Empresarial"),
                    React.createElement(Typography, { variant: "h5", component: "p", gutterBottom: true, sx: { mb: 4, color: customColors.darkGray } }, "Transformando el liderazgo empresarial mediante la inteligencia artificial"),
                    React.createElement(Button, { variant: "contained", size: "large", endIcon: React.createElement(ArrowForward, null), component: RouterLink, to: "/app/chat", sx: {
                            bgcolor: customColors.blue,
                            color: customColors.white,
                            '&:hover': {
                                bgcolor: customColors.orange,
                                transform: 'scale(1.05)'
                            },
                            transition: 'all 0.3s ease-in-out'
                        } }, "Solicitar Demo")))),
        React.createElement(Container, { maxWidth: "md", sx: { mb: 12 } },
            React.createElement(Typography, { variant: "h3", gutterBottom: true, align: "center", sx: { fontWeight: 'bold', color: customColors.darkGray } }, "Decisiones Infalibles. Resultados Imprescindibles."),
            React.createElement(Typography, { variant: "body1", paragraph: true, align: "center", sx: { fontSize: '1.1rem', color: customColors.darkGray } }, "SuperAI Empresarial empodera a los CEOs con una superinteligencia artificial avanzada que ofrece insights profundos e integrados, optimizando cada aspecto de su negocio para tomar decisiones informadas y estrat\u00E9gicas con confianza y precisi\u00F3n.")),
        React.createElement(Container, { maxWidth: "lg", sx: { mb: 12 } },
            React.createElement(Typography, { variant: "h3", gutterBottom: true, align: "center", sx: { fontWeight: 'bold', color: customColors.darkGray } }, "Nuestros Valores"),
            React.createElement(Grid, { container: true, spacing: 4 },
                React.createElement(Grid, { item: true, xs: 12, md: 6 },
                    React.createElement(List, null,
                        React.createElement(ValueItem, null, "Precisi\u00F3n en cada dato y an\u00E1lisis"),
                        React.createElement(ValueItem, null, "Proactividad en recomendaciones"),
                        React.createElement(ValueItem, null, "Integraci\u00F3n completa de sistemas"))),
                React.createElement(Grid, { item: true, xs: 12, md: 6 },
                    React.createElement(List, null,
                        React.createElement(ValueItem, null, "Innovaci\u00F3n constante"),
                        React.createElement(ValueItem, null, "Transparencia absoluta"),
                        React.createElement(ValueItem, null, "Crecimiento sostenible"))))),
        React.createElement(Container, { maxWidth: "lg", sx: { mb: 12 } },
            React.createElement(Typography, { variant: "h3", gutterBottom: true, align: "center", sx: { fontWeight: 'bold', color: customColors.darkGray } }, "Funcionalidades Clave"),
            React.createElement(Grid, { container: true, spacing: 4 },
                React.createElement(Grid, { item: true, xs: 12, sm: 6, md: 3 },
                    React.createElement(FeatureItem, { icon: BarChart, title: "An\u00E1lisis Predictivo en Tiempo Real", description: "Antic\u00EDpese a las tendencias del mercado y tome decisiones informadas con datos actualizados constantemente." })),
                React.createElement(Grid, { item: true, xs: 12, sm: 6, md: 3 },
                    React.createElement(FeatureItem, { icon: Dashboard, title: "Paneles de Control Personalizables", description: "Visualice sus KPIs clave en dashboards intuitivos, obteniendo una visi\u00F3n clara del rendimiento de su negocio." })),
                React.createElement(Grid, { item: true, xs: 12, sm: 6, md: 3 },
                    React.createElement(FeatureItem, { icon: Storage, title: "Integraci\u00F3n de Datos", description: "Unifique todas sus fuentes de datos, eliminando silos de informaci\u00F3n para una visi\u00F3n hol\u00EDstica del negocio." })),
                React.createElement(Grid, { item: true, xs: 12, sm: 6, md: 3 },
                    React.createElement(FeatureItem, { icon: Notifications, title: "Alertas y Notificaciones Proactivas", description: "Reciba alertas sobre eventos cr\u00EDticos, desviaciones de rendimiento y nuevas oportunidades de negocio." })))),
        React.createElement(Container, { maxWidth: "md", sx: { mb: 12 } },
            React.createElement(Typography, { variant: "h3", gutterBottom: true, align: "center", sx: { fontWeight: 'bold', color: customColors.darkGray } }, "C\u00F3mo Funciona"),
            React.createElement(Grid, { container: true, spacing: 4 },
                React.createElement(Grid, { item: true, xs: 12, md: 6 },
                    React.createElement(Box, { sx: { p: 2, borderLeft: `4px solid ${customColors.blue}` } },
                        React.createElement(Typography, { variant: "h6", gutterBottom: true }, "1. Integraci\u00F3n de Datos"),
                        React.createElement(Typography, { variant: "body2" }, "Conectamos SuperAI con sus sistemas existentes para recopilar y unificar todos sus datos empresariales."))),
                React.createElement(Grid, { item: true, xs: 12, md: 6 },
                    React.createElement(Box, { sx: { p: 2, borderLeft: `4px solid ${customColors.orange}` } },
                        React.createElement(Typography, { variant: "h6", gutterBottom: true }, "2. An\u00E1lisis y Aprendizaje"),
                        React.createElement(Typography, { variant: "body2" }, "Nuestros algoritmos analizan sus datos y aprenden los patrones \u00FAnicos de su negocio."))),
                React.createElement(Grid, { item: true, xs: 12, md: 6 },
                    React.createElement(Box, { sx: { p: 2, borderLeft: `4px solid ${customColors.blue}` } },
                        React.createElement(Typography, { variant: "h6", gutterBottom: true }, "3. Generaci\u00F3n de Insights"),
                        React.createElement(Typography, { variant: "body2" }, "SuperAI genera predicciones, recomendaciones y alertas basadas en el an\u00E1lisis continuo de sus datos."))),
                React.createElement(Grid, { item: true, xs: 12, md: 6 },
                    React.createElement(Box, { sx: { p: 2, borderLeft: `4px solid ${customColors.orange}` } },
                        React.createElement(Typography, { variant: "h6", gutterBottom: true }, "4. Toma de Decisiones Informada"),
                        React.createElement(Typography, { variant: "body2" }, "Utilice los insights proporcionados para tomar decisiones estrat\u00E9gicas con confianza y precisi\u00F3n."))))),
        React.createElement(Container, { maxWidth: "md", sx: { mb: 12 } },
            React.createElement(Typography, { variant: "h3", gutterBottom: true, align: "center", sx: { fontWeight: 'bold', color: customColors.darkGray } }, "Preguntas Frecuentes"),
            React.createElement(Accordion, null,
                React.createElement(AccordionSummary, { expandIcon: React.createElement(ExpandMore, null) },
                    React.createElement(Typography, null, "\u00BFC\u00F3mo se integra SuperAI con mis sistemas existentes?")),
                React.createElement(AccordionDetails, null,
                    React.createElement(Typography, null, "SuperAI se dise\u00F1a para integrarse sin problemas con la mayor\u00EDa de los sistemas empresariales existentes. Nuestro equipo de expertos trabajar\u00E1 con usted para garantizar una integraci\u00F3n fluida y eficiente."))),
            React.createElement(Accordion, null,
                React.createElement(AccordionSummary, { expandIcon: React.createElement(ExpandMore, null) },
                    React.createElement(Typography, null, "\u00BFQu\u00E9 medidas de seguridad implementa SuperAI?")),
                React.createElement(AccordionDetails, null,
                    React.createElement(Typography, null, "SuperAI utiliza encriptaci\u00F3n de grado militar y cumple con todas las regulaciones de protecci\u00F3n de datos relevantes. Ofrecemos opciones de almacenamiento de datos on-premise para requisitos de seguridad m\u00E1s estrictos."))),
            React.createElement(Accordion, null,
                React.createElement(AccordionSummary, { expandIcon: React.createElement(ExpandMore, null) },
                    React.createElement(Typography, null, "\u00BFCu\u00E1nto tiempo se necesita para ver resultados?")),
                React.createElement(AccordionDetails, null,
                    React.createElement(Typography, null, "La mayor\u00EDa de nuestros clientes comienzan a ver mejoras significativas en sus procesos de toma de decisiones y eficiencia operativa dentro de los primeros 3 meses de implementaci\u00F3n. Algunos beneficios, como las alertas proactivas, son inmediatos.")))),
        React.createElement(Box, { component: "footer", sx: { bgcolor: customColors.lightGray, py: 6 } },
            React.createElement(Container, { maxWidth: "lg" },
                React.createElement(Typography, { variant: "body2", align: "center", sx: { color: customColors.darkGray } }, "\u00A9 2024 SuperAI Empresarial. Todos los derechos reservados."),
                React.createElement(Typography, { variant: "body2", align: "center", sx: { mt: 1, color: customColors.darkGray } },
                    React.createElement(Link, { component: RouterLink, to: "/politica-de-privacidad", sx: { color: customColors.darkGray, '&:hover': { color: customColors.blue } } }, "Pol\u00EDtica de Privacidad"),
                    ' | ',
                    React.createElement(Link, { component: RouterLink, to: "/terms", sx: { color: customColors.darkGray, '&:hover': { color: customColors.blue } } }, "T\u00E9rminos y Condiciones")),
                React.createElement(Typography, { variant: "body2", align: "center", sx: { mt: 1, color: customColors.darkGray, fontWeight: 'bold' } }, "Mariano - \uB9C8\uB9AC\uC544\uB178")))));
};
export default SuperAILandingPage;
