import React from 'react';
import { Box, Button, Container, Grid, Paper, Typography, useTheme } from '@mui/material';
import { CheckCircle, Home } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const PricingComponent: React.FC = () => {
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

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, py: 8, position: 'relative' }}>
      <Button
        component={RouterLink}
        to="/"
        startIcon={<Home />}
        variant="contained"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1,
        }}
      >
        Inicio
      </Button>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom>
          Planes y Precios
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Plan Mensual */}
          <Grid item xs={12} md={6} lg={5}>
            <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Plan Mensual
              </Typography>
              <Typography variant="h3" component="p" color="primary" gutterBottom>
                $650,000 <Typography variant="subtitle1" component="span">COP/mes</Typography>
              </Typography>
              <Box sx={{ my: 4, flexGrow: 1 }}>
                {features.map((feature, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircle color="success" sx={{ mr: 1 }} />
                    <Typography>{feature}</Typography>
                  </Box>
                ))}
              </Box>
              <Button variant="contained" color="primary" size="large" fullWidth>
                Comenzar ahora
              </Button>
            </Paper>
          </Grid>

          {/* Plan Anual con Descuento */}
          <Grid item xs={12} md={6} lg={5}>
            <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: theme.palette.primary.main, color: 'white', position: 'relative', overflow: 'hidden' }}>
              <Box sx={{ position: 'absolute', top: 16, right: -28, bgcolor: 'warning.main', color: 'warning.contrastText', px: 4, py: 1, transform: 'rotate(45deg)' }}>
                <Typography variant="subtitle2">OFERTA ESPECIAL</Typography>
              </Box>
              <Typography variant="h4" component="h2" gutterBottom>
                Plan Anual (Pago de Contado)
              </Typography>
              <Typography variant="h3" component="p" gutterBottom>
                $3,900,000 <Typography variant="subtitle1" component="span">COP/año</Typography>
              </Typography>
              <Typography variant="h6" gutterBottom>
                $325,000 <Typography variant="subtitle2" component="span">COP/mes</Typography>
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <span style={{ textDecoration: 'line-through' }}>$7,800,000</span> (50% de descuento)
              </Typography>
              <Box sx={{ my: 4, flexGrow: 1 }}>
                {features.map((feature, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircle sx={{ mr: 1, color: 'white' }} />
                    <Typography>{feature}</Typography>
                  </Box>
                ))}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircle sx={{ mr: 1, color: 'white' }} />
                  <Typography fontWeight="bold">50% de descuento por pago de contado</Typography>
                </Box>
              </Box>
              <Button variant="contained" color="secondary" size="large" fullWidth>
                ¡Aprovechar oferta!
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PricingComponent;