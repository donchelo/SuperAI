import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography, IconButton, Snackbar, useTheme, useMediaQuery, Tooltip, CircularProgress, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Save, Info } from '@mui/icons-material';
import CategoryComponent from './CategoryComponent';
import { sections } from './questionsData';
const ADN = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [formData, setFormData] = useState({});
    const [expandedSections, setExpandedSections] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);
    const [formProgress, setFormProgress] = useState(0);
    const [showInfoDialog, setShowInfoDialog] = useState(false);
    const [editingField, setEditingField] = useState(null);
    const totalFields = sections.reduce((acc, section) => acc + section.fields.length, 0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/get-responses');
                const data = await response.json();
                setFormData(data);
                calculateProgress(data);
            }
            catch (error) {
                console.error('Error al cargar datos del servidor:', error);
            }
        };
        fetchData();
    }, []);
    const handleChange = (category, field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                [field]: value
            }
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/save-responses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Datos enviados:', formData);
                setSubmitStatus('success');
            }
            else {
                console.error('Error al enviar los datos');
                setSubmitStatus('error');
            }
        }
        catch (error) {
            console.error('Error al enviar los datos:', error);
            setSubmitStatus('error');
        }
        setTimeout(() => setSubmitStatus(null), 3000);
        calculateProgress();
    };
    const toggleSection = (section) => {
        setExpandedSections(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };
    const calculateProgress = (data = formData) => {
        const filledFields = sections.reduce((acc, section) => acc + section.fields.filter(([field]) => data[section.key]?.[field]).length, 0);
        const progress = (filledFields / totalFields) * 100;
        setFormProgress(progress);
        return progress;
    };
    const handleEditField = (category, field) => {
        setEditingField(`${category}-${field}`);
    };
    const handleSaveField = (category, field) => {
        setEditingField(null);
    };
    return (React.createElement(Box, { sx: { display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', bgcolor: 'background.default', p: 2 } },
        React.createElement(Paper, { elevation: 3, sx: { p: 2, bgcolor: 'background.paper', mb: 2, borderRadius: 2 } },
            React.createElement(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 } },
                React.createElement(Typography, { variant: "h5", sx: { color: 'text.primary', fontWeight: 'bold' } }, "ADN de tu Startup"),
                React.createElement(Tooltip, { title: "Ver informaci\u00F3n sobre la importancia del ADN" },
                    React.createElement(IconButton, { onClick: () => setShowInfoDialog(true), color: "primary" },
                        React.createElement(Info, null)))),
            React.createElement(Grid, { container: true, spacing: 2, alignItems: "center", direction: isMobile ? 'column-reverse' : 'row' },
                React.createElement(Grid, { item: true, xs: true },
                    React.createElement(Box, { sx: { p: 2 } },
                        React.createElement(Typography, { variant: "h6", sx: { color: theme.palette.primary.main, fontWeight: 'bold' } }, "Importancia de llenar el ADN"),
                        React.createElement(Typography, { variant: "body1", sx: { color: theme.palette.text.primary } }, "El ADN de tu startup es la esencia de tu negocio y es crucial para que nuestra IA pueda ofrecerte respuestas y an\u00E1lisis altamente personalizados y relevantes para tu empresa. Cuanta m\u00E1s informaci\u00F3n proporciones y m\u00E1s detallada sea, mejor podremos entender tu empresa y ofrecerte insights valiosos. Recuerda actualizar regularmente esta informaci\u00F3n para mantener la precisi\u00F3n de las respuestas de la IA a medida que tu startup evoluciona."))),
                React.createElement(Grid, { item: true },
                    React.createElement(Box, { sx: { position: 'relative', display: 'inline-flex', mt: isMobile ? 2 : 0 } },
                        React.createElement(CircularProgress, { variant: "determinate", value: formProgress, size: isMobile ? 100 : 160, thickness: 4, sx: { color: theme.palette.primary.main } }),
                        React.createElement(Box, { sx: {
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            } },
                            React.createElement(Typography, { variant: isMobile ? "h6" : "h4", component: "div", color: "text.primary", fontWeight: "bold" }, `${Math.round(formProgress)}%`),
                            React.createElement(Typography, { variant: "caption", component: "div", color: "text.secondary" }, "Completado")))))),
        React.createElement("form", { onSubmit: handleSubmit },
            sections.map((section) => (React.createElement(CategoryComponent, { key: section.key, section: section, formData: formData, expandedSections: expandedSections, handleChange: handleChange, toggleSection: toggleSection, errors: {}, editingField: editingField, handleEditField: handleEditField, handleSaveField: handleSaveField }))),
            React.createElement(Box, { sx: { display: 'flex', justifyContent: 'flex-end', mt: 4 } },
                React.createElement(Button, { type: "submit", variant: "contained", color: "primary", startIcon: React.createElement(Save, null), size: isMobile ? "small" : "large" }, "Actualizar ADN"))),
        React.createElement(Snackbar, { open: submitStatus === 'success', autoHideDuration: 3000, onClose: () => setSubmitStatus(null), message: "\u00A1Tu ADN se ha actualizado correctamente! La IA ahora podr\u00E1 ofrecerte respuestas m\u00E1s precisas." }),
        React.createElement(Snackbar, { open: submitStatus === 'error', autoHideDuration: 3000, onClose: () => setSubmitStatus(null), message: "Error al actualizar el ADN. Por favor, int\u00E9ntalo de nuevo." }),
        React.createElement(Dialog, { open: showInfoDialog, onClose: () => setShowInfoDialog(false) },
            React.createElement(DialogTitle, null, "Importancia del ADN de tu Startup"),
            React.createElement(DialogContent, null,
                React.createElement(Typography, { paragraph: true }, "El ADN de tu startup es la esencia de tu negocio y es crucial para que nuestra IA pueda ofrecerte respuestas y an\u00E1lisis altamente personalizados y relevantes para tu empresa."),
                React.createElement(Typography, { paragraph: true }, "Cuanta m\u00E1s informaci\u00F3n proporciones y m\u00E1s detallada sea, mejor podremos entender tu empresa y ofrecerte insights valiosos. Cada secci\u00F3n del ADN juega un papel importante:")),
            React.createElement(DialogActions, null,
                React.createElement(Button, { onClick: () => setShowInfoDialog(false), color: "primary" }, "Entendido")))));
};
export default ADN;
