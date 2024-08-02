import React, { useState, useRef } from 'react';
import { Box, Typography, Paper, Button, Alert, CircularProgress, Fade } from '@mui/material';
import { CloudUpload, InsertDriveFile } from '@mui/icons-material';
const DatosInternos = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);
    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            if (uploadedFile.type === 'text/csv' || uploadedFile.name.endsWith('.csv')) {
                setLoading(true);
                setError(null);
                // Simulamos un proceso de carga
                setTimeout(() => {
                    setFile(uploadedFile);
                    setLoading(false);
                }, 1000);
            }
            else {
                setError('Por favor, sube un archivo CSV válido.');
            }
        }
    };
    const handleDeleteFile = () => {
        setFile(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    return (React.createElement(Box, { sx: { p: 2, maxWidth: 600, margin: 'auto' } },
        React.createElement(Paper, { elevation: 3, sx: { p: 4, mb: 2, borderRadius: 2 } },
            React.createElement(Typography, { variant: "h5", gutterBottom: true, sx: { color: 'primary.main', fontWeight: 'bold' } }, "Carga de Datos de Ventas"),
            React.createElement(Typography, { variant: "body1", paragraph: true }, "Sube tu archivo CSV de ventas para tenerlo disponible en la plataforma."),
            React.createElement(Box, { sx: {
                    border: '2px dashed',
                    borderColor: 'grey.300',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'action.hover'
                    }
                }, onClick: () => fileInputRef.current?.click() },
                React.createElement("input", { type: "file", accept: ".csv", hidden: true, ref: fileInputRef, onChange: handleFileUpload }),
                React.createElement(Button, { variant: "outlined", startIcon: React.createElement(CloudUpload, null), sx: { pointerEvents: 'none' } }, "Seleccionar archivo CSV")),
            loading && (React.createElement(Box, { sx: { display: 'flex', justifyContent: 'center', mt: 2 } },
                React.createElement(CircularProgress, null))),
            error && (React.createElement(Fade, { in: true },
                React.createElement(Alert, { severity: "error", sx: { mt: 2 } }, error))),
            file && !loading && !error && (React.createElement(Fade, { in: true },
                React.createElement(Alert, { icon: React.createElement(InsertDriveFile, null), severity: "success", sx: { mt: 2 }, action: React.createElement(Button, { color: "inherit", size: "small", onClick: handleDeleteFile }, "Eliminar") },
                    "Archivo cargado: ",
                    file.name)))),
        React.createElement(Typography, { variant: "body2", color: "textSecondary", sx: { mt: 2, textAlign: 'center' } }, "El archivo CSV cargado estar\u00E1 disponible para futuros an\u00E1lisis en la plataforma.")));
};
export default DatosInternos;
