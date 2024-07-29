import React, { useState, useRef } from 'react';
import { Box, Typography, Paper, Button, Alert, CircularProgress, Fade } from '@mui/material';
import { CloudUpload, InsertDriveFile } from '@mui/icons-material';

const DatosInternos: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      } else {
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

  return (
    <Box sx={{ p: 2, maxWidth: 600, margin: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4, mb: 2, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Carga de Datos de Ventas
        </Typography>
        <Typography variant="body1" paragraph>
          Sube tu archivo CSV de ventas para tenerlo disponible en la plataforma.
        </Typography>
        <Box
          sx={{
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
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            accept=".csv"
            hidden
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <Button
            variant="outlined"
            startIcon={<CloudUpload />}
            sx={{ pointerEvents: 'none' }}
          >
            Seleccionar archivo CSV
          </Button>
        </Box>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Fade in={true}>
            <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
          </Fade>
        )}
        {file && !loading && !error && (
          <Fade in={true}>
            <Alert 
              icon={<InsertDriveFile />}
              severity="success" 
              sx={{ mt: 2 }}
              action={
                <Button color="inherit" size="small" onClick={handleDeleteFile}>
                  Eliminar
                </Button>
              }
            >
              Archivo cargado: {file.name}
            </Alert>
          </Fade>
        )}
      </Paper>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
        El archivo CSV cargado estará disponible para futuros análisis en la plataforma.
      </Typography>
    </Box>
  );
};

export default DatosInternos;