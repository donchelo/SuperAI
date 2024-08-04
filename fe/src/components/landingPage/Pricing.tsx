import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
  Slider,
  Tooltip,
  IconButton,
  Fade,
  useTheme, // Importar useTheme
} from '@mui/material';
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeContext } from '../Context/ThemeContext';

interface Feature {
  name: string;
  description: string;
}

const StyledCard = styled(motion.div)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.customShadows[3],
  overflow: 'hidden',
}));

const HighlightedCard = styled(StyledCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  boxShadow: theme.customShadows[5],
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const PlanCard: React.FC<{
  price: number;
  monthlyPrice?: number;
  period: string;
  isHighlighted: boolean;
  onSelect: () => void;
}> = ({ price, monthlyPrice, period, isHighlighted, onSelect }) => {
  const theme = useTheme(); // Usar useTheme para obtener el tema actual
  const CardComponent = isHighlighted ? HighlightedCard : StyledCard;

  return (
    <CardComponent
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom fontWeight="bold">
            {period === 'año' ? 'Plan Anual' : 'Plan Mensual'}
          </Typography>
          <PriceTypography variant="h3" gutterBottom>
            ${price.toLocaleString()}
          </PriceTypography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            por{' '}
            <span style={{ fontWeight: 'bold', color: isHighlighted ? theme.palette.secondary.main : theme.palette.primary.main }}>
              {period.toUpperCase()}
            </span>
          </Typography>
          {monthlyPrice && (
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              (${monthlyPrice.toLocaleString()} / mes)
            </Typography>
          )}
          {period === 'año' && <Chip label="Ahorra 34%" color="secondary" sx={{ mt: 2 }} />}
        </CardContent>
        <CardActions sx={{ mt: 'auto', justifyContent: 'center', pb: 2 }}>
          <Button variant={isHighlighted ? 'contained' : 'outlined'} color="primary" onClick={onSelect} size="large" fullWidth>
            Seleccionar Plan
          </Button>
        </CardActions>
      </Card>
    </CardComponent>
  );
};

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const { toggleTheme, currentTheme, isDarkMode } = useThemeContext();
  const theme = useTheme(); // Usar useTheme para obtener el tema actual
  const [numEmployees, setNumEmployees] = useState<number>(1);
  const [animatedPrice, setAnimatedPrice] = useState<Record<string, number>>({});
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const planFeatures: Feature[] = [
    { name: 'Acceso completo a SuperAI Empresarial', description: 'Acceso ilimitado a todas las funcionalidades de nuestra plataforma de IA' },
    { name: 'Análisis predictivo en tiempo real', description: 'Obtén insights instantáneos basados en datos en tiempo real' },
    { name: 'Paneles de control personalizables', description: 'Crea y personaliza dashboards según tus necesidades específicas' },
    { name: 'Integración de datos multifuente', description: 'Conecta y analiza datos de múltiples fuentes en una sola plataforma' },
    { name: 'Alertas y notificaciones proactivas', description: 'Recibe alertas automáticas sobre eventos importantes y oportunidades' },
    { name: 'Optimización de recursos empresariales', description: 'Mejora la eficiencia de tus recursos con recomendaciones basadas en IA' },
    { name: 'Soporte prioritario 24/7', description: 'Acceso a soporte técnico las 24 horas, los 7 días de la semana' },
    { name: 'Actualizaciones gratuitas', description: 'Obtén las últimas funcionalidades y mejoras sin costo adicional' },
    { name: '1 mes de implementación incluido', description: 'Asistencia profesional para la configuración inicial de tu plataforma' },
    { name: 'Consultor de IA dedicado', description: 'Un experto en IA asignado a tu empresa para maximizar el valor de la plataforma' },
    { name: 'Informes personalizados y análisis avanzados', description: 'Genera informes detallados y realiza análisis complejos según tus necesidades' },
    { name: 'Formación y certificación para equipos internos', description: 'Capacitación completa para que tu equipo domine la plataforma' },
    { name: 'Implementación personalizada', description: 'Adaptamos la plataforma a los procesos específicos de tu empresa' },
    { name: 'Ajustes periódicos del sistema', description: 'Optimizaciones regulares para mantener el rendimiento óptimo' },
    { name: 'Servicios de consultoría adicionales', description: 'Acceso a servicios de consultoría estratégica para potenciar tu negocio' },
  ];

  const basePrice = 650000;
  const employeeCost = 4000;

  const calculatePrice = (basePrice: number, numEmployees: number, isAnnual: boolean): number => {
    const totalPrice = basePrice + numEmployees * employeeCost;
    return isAnnual ? totalPrice * 12 * 0.66 : totalPrice;
  };

  useEffect(() => {
    const targetPriceMonthly = calculatePrice(basePrice, numEmployees, false);
    const targetPriceAnnual = calculatePrice(basePrice, numEmployees, true);
    setAnimatedPrice({
      monthly: targetPriceMonthly,
      annual: targetPriceAnnual,
    });
  }, [numEmployees]);

  const handleSelectPlan = (period: string) => {
    console.log(`Plan seleccionado: SuperAI Empresarial - ${period}`);
    // Aquí puedes agregar la lógica para procesar la selección del plan
  };

  const handleNumEmployeesChange = (event: Event, newValue: number | number[]) => {
    setNumEmployees(newValue as number);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', py: 4 }}>
      <Box maxWidth="lg" margin="auto" sx={{ flex: '1 0 auto' }}>
        <Typography variant="h2" component="div" align="center" gutterBottom>
          Planes y Precios
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Elige el plan perfecto para tu empresa
        </Typography>
        <Button variant="contained" color="primary" onClick={toggleTheme}>
          Cambiar a {isDarkMode ? 'Tema Claro' : 'Tema Oscuro'}
        </Button>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Typography variant="h6" gutterBottom>
            Número de empleados: {numEmployees}
          </Typography>
          <Slider
            value={numEmployees}
            onChange={handleNumEmployeesChange}
            aria-labelledby="employee-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={100}
            sx={{ width: 300, mt: 2 }}
          />
          <Typography variant="body2" color="textSecondary" mt={2}>
            Cada empleado adicional cuesta $4,000 al mes.
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <PlanCard
              price={animatedPrice.monthly || calculatePrice(basePrice, numEmployees, false)}
              period={'mes'}
              isHighlighted={false}
              onSelect={() => handleSelectPlan('mensual')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PlanCard
              price={animatedPrice.annual || calculatePrice(basePrice, numEmployees, true)}
              monthlyPrice={calculatePrice(basePrice, numEmployees, true) / 12}
              period={'año'}
              isHighlighted={true}
              onSelect={() => handleSelectPlan('anual')}
            />
          </Grid>
        </Grid>
        <Box mt={8} mb={4}>
          <Typography variant="h4" component="div" align="center" gutterBottom>
            Características Incluidas
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {planFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeatureItem
                  onMouseEnter={() => setHoveredFeature(feature.name)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <CheckIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">{feature.name}</Typography>
                  <Tooltip title={feature.description} placement="top">
                    <IconButton size="small" sx={{ ml: 'auto' }}>
                      <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </FeatureItem>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={4} textAlign="center">
          <Button variant="contained" color="primary" onClick={() => navigate('/')} size="large">
            Volver a Inicio
          </Button>
        </Box>
      </Box>
      <Fade in={hoveredFeature !== null}>
        <Box
          sx={{
            position: 'fixed',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: theme.palette.background.paper,
            padding: 2,
            borderRadius: 2,
            boxShadow: theme.customShadows[3],
            maxWidth: 300,
          }}
        >
          <Typography variant="body2">
            {planFeatures.find(f => f.name === hoveredFeature)?.description}
          </Typography>
        </Box>
      </Fade>
      <Box mt={2} textAlign="center" sx={{ flexShrink: 0 }}>
        <Typography variant="h6" gutterBottom>
          ¿Necesitas un plan personalizado?
        </Typography>
        <Button variant="outlined" color="primary" size="large">
          Contáctanos
        </Button>
      </Box>
    </Box>
  );
};

export default Pricing;
