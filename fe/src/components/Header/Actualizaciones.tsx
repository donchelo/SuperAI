import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';

const Actualizaciones: React.FC = () => {
  const [updates, setUpdates] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch('/data/actualizaciones.txt');
        const text = await response.text();
        setUpdates(text);
      } catch (error) {
        console.error('Error al cargar actualizaciones:', error);
        setUpdates('No se pudieron cargar las actualizaciones.');
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, bgcolor: 'background.paper', maxWidth: '800px', mx: 'auto' }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Últimas Actualizaciones
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', color: 'text.primary' }}>
            {updates}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Actualizaciones;
