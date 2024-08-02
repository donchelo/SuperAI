import React, { useState } from 'react';
import { Box, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, useTheme, useMediaQuery, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Rating, FormControlLabel, Switch, IconButton, Tooltip, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
// Importar el contenido de ayuda
import { frequentQuestions } from './frequentQuestions';
import { newsAndUpdates } from './newsAndUpdates';
import { ChatIcon, DnsIcon, LightbulbIcon, BugReportIcon, SuggestIcon, HelpIcon, } from './icons';
const Ayuda = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [rating, setRating] = useState(null);
    const [urgent, setUrgent] = useState(false);
    const [file, setFile] = useState(null);
    const handleOpenDialog = (type) => {
        setDialogType(type);
        setOpenDialog(true);
        setRating(null);
        setUrgent(false);
        setFile(null);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFeedback('');
        setRating(null);
        setUrgent(false);
        setFile(null);
    };
    const handleSubmit = () => {
        console.log(`Enviando ${dialogType}:`, {
            feedback,
            rating,
            urgent,
            file: file ? file.name : 'No file attached',
        });
        handleCloseDialog();
        setSnackbarOpen(true);
    };
    const handleFileChange = (event) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };
    const renderFrequentQuestions = () => (React.createElement(Accordion, null,
        React.createElement(AccordionSummary, { expandIcon: React.createElement(ExpandMoreIcon, null) },
            React.createElement(Typography, { variant: "h6" }, "Preguntas Frecuentes")),
        React.createElement(AccordionDetails, null,
            React.createElement(List, { disablePadding: true }, frequentQuestions.map((faq, index) => (React.createElement(ListItem, { key: index, sx: { py: 1 } },
                React.createElement(ListItemText, { primary: React.createElement(Typography, { variant: "subtitle1" },
                        React.createElement("strong", null, faq.question)), secondary: React.createElement(Typography, { variant: "body2", sx: { mt: 0.5 } }, faq.answer) }))))))));
    const renderNewsAndUpdates = () => (React.createElement(Accordion, null,
        React.createElement(AccordionSummary, { expandIcon: React.createElement(ExpandMoreIcon, null) },
            React.createElement(Typography, { variant: "h6" }, "Novedades y Actualizaciones")),
        React.createElement(AccordionDetails, null,
            React.createElement(List, { disablePadding: true }, newsAndUpdates.map((news, index) => (React.createElement(ListItem, { key: index, sx: { py: 1 } },
                React.createElement(ListItemText, { primary: React.createElement(Typography, { variant: "subtitle1" },
                        React.createElement("strong", null, news.title)), secondary: React.createElement(Typography, { variant: "body2", sx: { mt: 0.5 } }, news.description) }))))))));
    const renderUsageTips = () => (React.createElement(Accordion, null,
        React.createElement(AccordionSummary, { expandIcon: React.createElement(ExpandMoreIcon, null) },
            React.createElement(Typography, { variant: "h6" }, "Consejos de Uso")),
        React.createElement(AccordionDetails, null,
            React.createElement(List, { disablePadding: true },
                React.createElement(ListItem, { sx: { py: 1 } },
                    React.createElement(LightbulbIcon, { color: "primary", sx: { mr: 2, fontSize: 24 } }),
                    React.createElement(ListItemText, { primary: React.createElement(Typography, { variant: "subtitle1" }, "Actualiza tu ADN empresarial"), secondary: React.createElement(Typography, { variant: "body2", sx: { mt: 0.5 } }, "Mant\u00E9n actualizado tu ADN empresarial para obtener respuestas m\u00E1s precisas del asistente de IA.") })),
                React.createElement(ListItem, { sx: { py: 1 } },
                    React.createElement(LightbulbIcon, { color: "primary", sx: { mr: 2, fontSize: 24 } }),
                    React.createElement(ListItemText, { primary: React.createElement(Typography, { variant: "subtitle1" }, "Usa las preguntas r\u00E1pidas"), secondary: React.createElement(Typography, { variant: "body2", sx: { mt: 0.5 } }, "Utiliza las preguntas r\u00E1pidas como punto de partida para conversaciones m\u00E1s profundas con el asistente.") })),
                React.createElement(ListItem, { sx: { py: 1 } },
                    React.createElement(LightbulbIcon, { color: "primary", sx: { mr: 2, fontSize: 24 } }),
                    React.createElement(ListItemText, { primary: React.createElement(Typography, { variant: "subtitle1" }, "Explora diferentes temas"), secondary: React.createElement(Typography, { variant: "body2", sx: { mt: 0.5 } }, "Explora diferentes \u00E1reas de tu negocio en el chat para descubrir nuevas perspectivas e ideas.") }))))));
    const renderSuggestionsAndBugs = () => (React.createElement(Accordion, null,
        React.createElement(AccordionSummary, { expandIcon: React.createElement(ExpandMoreIcon, null) },
            React.createElement(Typography, { variant: "h6" }, "Sugerencias y Reporte de Bugs")),
        React.createElement(AccordionDetails, null,
            React.createElement(List, { disablePadding: true },
                React.createElement(ListItem, { sx: { py: 1, alignItems: 'flex-start' } },
                    React.createElement(SuggestIcon, { color: "primary", sx: { mr: 2, mt: 1, fontSize: 24 } }),
                    React.createElement(ListItemText, { primary: React.createElement(Typography, { variant: "subtitle1" }, "Enviar una sugerencia"), secondary: React.createElement(Typography, { variant: "body2", sx: { mt: 0.5 } }, "\u00BFTienes una idea para mejorar nuestra plataforma? \u00A1Nos encantar\u00EDa escucharla!") }),
                    React.createElement(Button, { variant: "contained", color: "primary", onClick: () => handleOpenDialog('sugerencia'), sx: { ml: 2, minWidth: '120px', height: '36px' } }, "Sugerir")),
                React.createElement(ListItem, { sx: { py: 1, alignItems: 'flex-start' } },
                    React.createElement(BugReportIcon, { color: "secondary", sx: { mr: 2, mt: 1, fontSize: 24 } }),
                    React.createElement(ListItemText, { primary: React.createElement(Typography, { variant: "subtitle1" }, "Reportar un bug"), secondary: React.createElement(Typography, { variant: "body2", sx: { mt: 0.5 } }, "Si has encontrado alg\u00FAn problema o error en la plataforma, por favor h\u00E1ganoslo saber.") }),
                    React.createElement(Button, { variant: "contained", color: "secondary", onClick: () => handleOpenDialog('bug'), sx: { ml: 2, minWidth: '120px', height: '36px' } }, "Reportar"))))));
    return (React.createElement(Box, { sx: {
            padding: isMobile ? 2 : 3,
            paddingTop: { xs: '72px', sm: '80px' },
            height: '100%',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default',
        } },
        React.createElement(Paper, { elevation: 3, sx: { padding: isMobile ? 2 : 3, marginBottom: 3, flexGrow: 1 } },
            React.createElement(Typography, { variant: isMobile ? 'h5' : 'h4', gutterBottom: true, color: "primary", sx: { mb: 2 } }, "Ayuda y Soporte"),
            React.createElement(Typography, { variant: "body1", paragraph: true, sx: { mb: 3 } }, "Bienvenido a la secci\u00F3n de Ayuda de Super AI Empresarial. Aqu\u00ED encontrar\u00E1s informaci\u00F3n \u00FAtil sobre c\u00F3mo usar nuestra aplicaci\u00F3n y sacar el m\u00E1ximo provecho de sus funcionalidades."),
            React.createElement(Accordion, { sx: { mb: 2 } },
                React.createElement(AccordionSummary, { expandIcon: React.createElement(ExpandMoreIcon, null) },
                    React.createElement(Typography, { variant: "h6" }, "Funcionalidades Principales")),
                React.createElement(AccordionDetails, null,
                    React.createElement(List, { disablePadding: true },
                        React.createElement(ListItem, { sx: { py: 1 } },
                            React.createElement(ChatIcon, { color: "primary", sx: { mr: 2, fontSize: 24 } }),
                            React.createElement(ListItemText, { primary: React.createElement(Typography, { variant: "subtitle1" }, "Chat con IA"), secondary: React.createElement(Typography, { variant: "body2", sx: { mt: 0.5 } }, "Interact\u00FAa con nuestro asistente de IA empresarial para obtener respuestas y an\u00E1lisis personalizados.") })),
                        React.createElement(ListItem, { sx: { py: 1 } },
                            React.createElement(DnsIcon, { color: "primary", sx: { mr: 2, fontSize: 24 } }),
                            React.createElement(ListItemText, { primary: React.createElement(Typography, { variant: "subtitle1" }, "ADN Empresarial"), secondary: React.createElement(Typography, { variant: "body2", sx: { mt: 0.5 } }, "Accede y actualiza la informaci\u00F3n detallada del ADN de tu empresa, incluyendo misi\u00F3n, visi\u00F3n y estrategias.") })),
                        React.createElement(ListItem, { sx: { py: 1 } },
                            React.createElement(HelpIcon, { color: "primary", sx: { mr: 2, fontSize: 24 } }),
                            React.createElement(ListItemText, { primary: React.createElement(Typography, { variant: "subtitle1" }, "Preguntas R\u00E1pidas"), secondary: React.createElement(Typography, { variant: "body2", sx: { mt: 0.5 } }, "Encuentra respuestas inmediatas a preguntas comunes sobre gesti\u00F3n empresarial y estrategias.") })),
                        React.createElement(ListItem, { sx: { py: 1 } },
                            React.createElement(DashboardIcon, { color: "primary", sx: { mr: 2, fontSize: 24 } }),
                            React.createElement(ListItemText, { primary: React.createElement(Typography, { variant: "subtitle1" }, "Dashboards"), secondary: React.createElement(Typography, { variant: "body2", sx: { mt: 0.5 } }, "Visualiza m\u00E9tricas y an\u00E1lisis clave en tiempo real para tomar decisiones informadas y estrat\u00E9gicas.") }))))),
            renderFrequentQuestions(),
            renderNewsAndUpdates(),
            renderUsageTips(),
            renderSuggestionsAndBugs()),
        React.createElement(Dialog, { open: openDialog, onClose: handleCloseDialog, fullWidth: true, maxWidth: "sm" },
            React.createElement(DialogTitle, null,
                dialogType === 'sugerencia' ? 'Enviar Sugerencia' : 'Reportar Bug',
                React.createElement(IconButton, { "aria-label": "close", onClick: handleCloseDialog, sx: {
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    } },
                    React.createElement(CloseIcon, null))),
            React.createElement(DialogContent, null,
                React.createElement(TextField, { autoFocus: true, margin: "dense", id: "feedback", label: dialogType === 'sugerencia' ? 'Tu sugerencia' : 'Descripción del bug', type: "text", fullWidth: true, variant: "outlined", multiline: true, rows: 4, value: feedback, onChange: (e) => setFeedback(e.target.value), sx: { mt: 2 } }),
                dialogType === 'sugerencia' && (React.createElement(Box, { sx: { mt: 3 } },
                    React.createElement(Typography, { component: "legend", sx: { mb: 1 } }, "\u00BFQu\u00E9 tan importante es esta sugerencia?"),
                    React.createElement(Rating, { name: "importance", value: rating, onChange: (event, newValue) => {
                            setRating(newValue);
                        }, size: "large" }))),
                dialogType === 'bug' && (React.createElement(FormControlLabel, { control: React.createElement(Switch, { checked: urgent, onChange: (e) => setUrgent(e.target.checked), name: "urgent", color: "primary" }), label: "Este bug es urgente", sx: { mt: 3 } })),
                React.createElement(Box, { sx: { mt: 3 } },
                    React.createElement("input", { accept: "image/*,.pdf", style: { display: 'none' }, id: "raised-button-file", type: "file", onChange: handleFileChange }),
                    React.createElement("label", { htmlFor: "raised-button-file" },
                        React.createElement(Button, { variant: "outlined", component: "span", startIcon: React.createElement(AttachFileIcon, null) }, file ? file.name : 'Adjuntar archivo')),
                    file && (React.createElement(Tooltip, { title: "Eliminar archivo" },
                        React.createElement(IconButton, { onClick: () => setFile(null), size: "small", sx: { ml: 1 } },
                            React.createElement(CloseIcon, null)))))),
            React.createElement(DialogActions, null,
                React.createElement(Button, { onClick: handleCloseDialog }, "Cancelar"),
                React.createElement(Button, { onClick: handleSubmit, variant: "contained", color: dialogType === 'sugerencia' ? 'primary' : 'secondary', endIcon: React.createElement(SendIcon, null) }, "Enviar"))),
        React.createElement(Snackbar, { open: snackbarOpen, autoHideDuration: 6000, onClose: () => setSnackbarOpen(false), message: dialogType === 'sugerencia' ? '¡Gracias por tu sugerencia!' : 'Gracias por reportar el bug. Lo revisaremos pronto.' })));
};
export default Ayuda;
