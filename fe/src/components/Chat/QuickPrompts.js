import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
const QuickPrompts = ({ onPromptClick }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const promptsByArea = {
        "Finanzas y Contabilidad": [
            "¿Cómo puedo mejorar la eficiencia de mi departamento de contabilidad?",
            "¿Cuáles son las mejores prácticas para la gestión de flujo de caja?",
            "¿Qué estrategias puedo usar para reducir costos operativos?",
        ],
        "Recursos Humanos": [
            "¿Cómo puedo mejorar la retención de empleados?",
            "¿Cuáles son las mejores prácticas para el reclutamiento y selección?",
            "¿Qué estrategias de formación y desarrollo son más efectivas?",
        ],
        "Operaciones": [
            "¿Cómo puedo optimizar mis procesos operativos?",
            "¿Qué técnicas puedo implementar para mejorar la eficiencia logística?",
            "¿Cuáles son las mejores prácticas para la gestión de la cadena de suministro?",
        ],
        "Marketing y Ventas": [
            "¿Qué estrategias de marketing digital son más efectivas?",
            "¿Cómo puedo aumentar las ventas a través de marketing de contenido?",
            "¿Cuáles son las mejores prácticas para la gestión de relaciones con clientes (CRM)?",
        ],
        "Desarrollo de Producto e Innovación": [
            "¿Cómo puedo fomentar la innovación en mi empresa?",
            "¿Qué técnicas de desarrollo ágil puedo implementar?",
            "¿Cómo puedo mejorar el ciclo de vida del producto?",
        ],
        "Tecnología de la Información (TI)": [
            "¿Cuáles son las mejores prácticas para la gestión de proyectos de TI?",
            "¿Cómo puedo mejorar la seguridad cibernética en mi empresa?",
            "¿Qué estrategias de transformación digital puedo adoptar?",
        ],
        "Administración y Legal": [
            "¿Cómo puedo mejorar la gestión documental?",
            "¿Cuáles son las mejores prácticas para la gestión de contratos?",
            "¿Qué debo tener en cuenta para cumplir con las normativas legales?",
        ],
        "Servicio al Cliente": [
            "¿Cómo puedo mejorar la satisfacción del cliente?",
            "¿Cuáles son las mejores prácticas para la gestión de quejas y reclamos?",
            "¿Qué estrategias puedo usar para fidelizar a mis clientes?",
        ],
    };
    return (React.createElement(Box, { sx: { p: 2, bgcolor: 'background.paper' } },
        React.createElement(Typography, { variant: "h6", sx: { fontWeight: 'bold', color: 'primary.main', mb: 2 } }, "Preguntas R\u00E1pidas"),
        Object.entries(promptsByArea).map(([area, prompts], areaIndex) => (React.createElement(Box, { key: areaIndex, sx: { mb: 3 } },
            React.createElement(Typography, { variant: "h6", sx: { fontWeight: 'bold', color: 'text.primary', mb: 1 } }, area),
            React.createElement(Box, { sx: {
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: 1
                } }, prompts.map((prompt, index) => (React.createElement(Button, { key: index, onClick: () => onPromptClick(prompt), variant: "outlined", fullWidth: true, sx: {
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                        bgcolor: 'primary.light',
                    },
                } }, prompt)))))))));
};
export default QuickPrompts;
