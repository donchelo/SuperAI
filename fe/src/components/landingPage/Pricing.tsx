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
  useTheme,
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
  boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
  border: 'none',
}));

const HighlightedCard = styled(StyledCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.2)',
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.light,
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
  '& .MuiTypography-body2': {
    color: theme.palette.text.primary,
  },
}));

const PlanCard: React.FC<{
  price: number;
  monthlyPrice?: number;
  period: string;
  isHighlighted: boolean;
  onSelect: () => void;
}> = ({ price, monthlyPrice, period, isHighlighted, onSelect }) => {
  const theme = useTheme();
  const CardComponent = isHighlighted ? HighlightedCard : StyledCard;

  return (
    <CardComponent
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 'inherit' }}>
        <CardContent sx={{ borderRadius: 'inherit' }}>
          <Typography variant="h5" component="div" gutterBottom fontWeight="bold" color="text.primary">
            {period === 'año' ? 'Plan Anual' : 'Plan Mensual'}
          </Typography>
          <PriceTypography variant="h3" gutterBottom>
            ${price.toLocaleString()}
          </PriceTypography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            por{' '}
            <span style={{ fontWeight: 'bold', color: isHighlighted ? theme.palette.secondary.main : theme.palette.primary.main }}>
              {period.toUpperCase()}
            </span>
          </Typography>
          {monthlyPrice && (
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              (${monthlyPrice.toLocaleString()} / mes)
            </Typography>
          )}
          {period === 'año' && <Chip label="Ahorra 34%" color="secondary" sx={{ mt: 2 }} />}
        </CardContent>
        <CardActions sx={{ mt: 'auto', justifyContent: 'center', pb: 2, borderRadius: 'inherit' }}>
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
  const theme = useTheme();
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
  };

  const handleNumEmployeesChange = (event: Event, newValue: number | number[]) => {
    setNumEmployees(newValue as number);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', py: 4 }}>
      <Box maxWidth="lg" margin="auto" sx={{ flex: '1 0 auto' }}>
        <Typography variant="h2" component="div" align="center" gutterBottom color="text.primary">
          Planes y Precios
        </Typography>
        <Typography variant="h5" align="center" color="text.primary" paragraph>
          Elige el plan perfecto para tu empresa
        </Typography>
        <Button variant="contained" color="primary" onClick={toggleTheme}>
          Cambiar a {isDarkMode ? 'Tema Claro' : 'Tema Oscuro'}
        </Button>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Typography variant="h6" gutterBottom color="text.primary">
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
          <Typography variant="body2" color="text.primary" mt={2}>
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
          <Typography variant="h4" component="div" align="center" gutterBottom color="text.primary">
            Características Incluidas
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {planFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <FeatureItem>
                  <CheckIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.primary">{feature.name}</Typography>
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
      <Box mt={2} textAlign="center" sx={{ flexShrink: 0 }}>
        <Typography variant="h6" gutterBottom color="text.primary">
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
