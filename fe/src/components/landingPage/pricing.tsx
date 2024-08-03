import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Paper,
  Switch,
  Typography,
  useTheme,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

// Definir interfaces
interface Feature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  basePrice: number;
  maxEmployees: number;
  features: Feature[];
}

// Crear un tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
  },
});

// Estilos personalizados
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[10],
  },
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const PlanCard: React.FC<{
  plan: Plan;
  price: number;
  period: string;
  isRecommended: boolean;
  onSelect: (plan: Plan) => void;
}> = ({ plan, price, period, isRecommended, onSelect }) => {
  const theme = useTheme();

  return (
    <StyledCard elevation={isRecommended ? 8 : 2}>
      {isRecommended && (
        <Chip
          label="Recomendado"
          color="secondary"
          sx={{
            position: 'absolute',
            top: -16,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {plan.name}
        </Typography>
        <PriceTypography variant="h3" gutterBottom>
          ${price.toLocaleString()}
        </PriceTypography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          por {period}
        </Typography>
        <Box mt={2}>
          {plan.features.map((feature, index) => (
            <FeatureItem key={index}>
              {feature.included ? (
                <CheckIcon color="primary" sx={{ mr: 1 }} />
              ) : (
                <CloseIcon color="error" sx={{ mr: 1 }} />
              )}
              <Typography variant="body2">{feature.name}</Typography>
            </FeatureItem>
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ mt: 'auto', justifyContent: 'center', pb: 2 }}>
        <Button
          variant={isRecommended ? "contained" : "outlined"}
          color={isRecommended ? "secondary" : "primary"}
          onClick={() => onSelect(plan)}
          size="large"
          fullWidth
        >
          Seleccionar Plan
        </Button>
      </CardActions>
    </StyledCard>
  );
};

const Pricing: React.FC = () => {
  const [numEmployees, setNumEmployees] = useState<number>(10);
  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  const [animatedPrice, setAnimatedPrice] = useState<Record<string, number>>({});

  const plans: Plan[] = [
    {
      name: "Plan Básico",
      basePrice: 350000,
      maxEmployees: 10,
      features: [
        { name: "Acceso básico a SuperAI Empresarial", included: true },
        { name: "Análisis predictivo básico", included: true },
        { name: "Paneles de control limitados", included: true },
        { name: "Soporte estándar", included: true },
        { name: "Integración de datos multifuente", included: false },
        { name: "Alertas y notificaciones proactivas", included: false },
        { name: "Consultor de IA dedicado", included: false },
      ]
    },
    {
      name: "Plan Estándar",
      basePrice: 650000,
      maxEmployees: 50,
      features: [
        { name: "Acceso completo a SuperAI Empresarial", included: true },
        { name: "Análisis predictivo en tiempo real", included: true },
        { name: "Paneles de control personalizables", included: true },
        { name: "Integración de datos multifuente", included: true },
        { name: "Alertas y notificaciones proactivas", included: true },
        { name: "Optimización de recursos empresariales", included: true },
        { name: "Soporte prioritario 24/7", included: true },
        { name: "Actualizaciones gratuitas", included: true },
        { name: "1 mes de implementación incluido", included: true },
        { name: "Consultor de IA dedicado", included: false },
      ]
    },
    {
      name: "Plan Premium",
      basePrice: 1200000,
      maxEmployees: Infinity,
      features: [
        { name: "Todas las características del plan Estándar", included: true },
        { name: "Consultor de IA dedicado", included: true },
        { name: "Informes personalizados y análisis avanzados", included: true },
        { name: "Formación y certificación para equipos internos", included: true },
        { name: "Implementación personalizada", included: true },
        { name: "Ajustes periódicos del sistema", included: true },
        { name: "Servicios de consultoría adicionales", included: true },
      ]
    }
  ];

  const employeeCost = 2000;

  const calculatePrice = (basePrice: number, numEmployees: number, maxEmployees: number): number => {
    const additionalEmployees = Math.max(0, numEmployees - maxEmployees);
    const totalPrice = basePrice + (additionalEmployees * employeeCost);
    return isAnnual ? totalPrice * 12 * 0.9 : totalPrice;
  };

  useEffect(() => {
    const newAnimatedPrice: Record<string, number> = {};
    plans.forEach(plan => {
      const targetPrice = calculatePrice(plan.basePrice, numEmployees, plan.maxEmployees);
      const startPrice = animatedPrice[plan.name] || targetPrice;
      let currentPrice = startPrice;
      const animatePrice = () => {
        if (Math.abs(currentPrice - targetPrice) > 1) {
          currentPrice += (targetPrice - currentPrice) * 0.1;
          newAnimatedPrice[plan.name] = Math.round(currentPrice);
          requestAnimationFrame(animatePrice);
        } else {
          newAnimatedPrice[plan.name] = targetPrice;
        }
        setAnimatedPrice({...newAnimatedPrice});
      };
      animatePrice();
    });
  }, [numEmployees, isAnnual]);

  const handleSelectPlan = (plan: Plan) => {
    console.log(`Plan seleccionado: ${plan.name}`);
    // Aquí puedes agregar la lógica para procesar la selección del plan
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
        <Box maxWidth="lg" margin="auto">
          <Typography variant="h2" component="h1" align="center" gutterBottom>
            Planes y Precios
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Elige el plan perfecto para tu empresa
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" my={4}>
            <Typography variant="body1">Mensual</Typography>
            <Switch
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
              color="primary"
              inputProps={{ 'aria-label': 'toggle annual billing' }}
            />
            <Typography variant="body1">
              Anual <Chip label="Ahorra 10%" size="small" color="secondary" />
            </Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {plans.map((plan, index) => (
              <Grid item key={plan.name} xs={12} sm={6} md={4}>
                <PlanCard
                  plan={plan}
                  price={animatedPrice[plan.name] || calculatePrice(plan.basePrice, numEmployees, plan.maxEmployees)}
                  period={isAnnual ? 'año' : 'mes'}
                  isRecommended={index === 1}
                  onSelect={handleSelectPlan}
                />
              </Grid>
            ))}
          </Grid>
          <Box mt={8} textAlign="center">
            <Typography variant="h6" gutterBottom>
              ¿Necesitas un plan personalizado?
            </Typography>
            <Button variant="outlined" color="primary" size="large">
              Contáctanos
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Pricing;