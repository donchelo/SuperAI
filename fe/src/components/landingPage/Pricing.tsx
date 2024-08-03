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
  TextField,
  useTheme,
  ThemeProvider,
} from '@mui/material';
import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { darkTheme, lightTheme } from '/Theme/index'; // Ajusta la ruta según sea necesario

interface Feature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  basePrice: number;
  features: Feature[];
}

interface StyledCardProps {
  isRecommended: boolean;
  theme: any;
}

const StyledCard = styled(Card)<StyledCardProps>(({ theme, isRecommended }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  backgroundColor: isRecommended ? theme.palette.secondary.light : theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

interface PriceTypographyProps {
  isRecommended: boolean;
  theme: any;
}

const PriceTypography = styled(Typography)<PriceTypographyProps>(({ theme, isRecommended }) => ({
  fontWeight: 700,
  color: isRecommended ? theme.palette.secondary.main : theme.palette.primary.main,
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
    <StyledCard elevation={isRecommended ? 8 : 2} isRecommended={isRecommended} theme={theme}>
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
        <Typography variant="h5" component="div" gutterBottom>
          {plan.name}
        </Typography>
        <PriceTypography variant="h3" gutterBottom isRecommended={isRecommended} theme={theme}>
          ${price.toLocaleString()}
        </PriceTypography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          por {period}
        </Typography>
        <Box mt={2}>
          {plan.features.map((feature, index) => (
            <FeatureItem key={index} theme={theme}>
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
  const navigate = useNavigate();
  const theme = useTheme();
  const [numEmployees, setNumEmployees] = useState<number>(1); // Empezar con 1 empleado
  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  const [animatedPrice, setAnimatedPrice] = useState<Record<string, number>>({});

  const plans: Plan[] = [
    {
      name: "Plan Básico",
      basePrice: 350000,
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

  const employeeCost = 4000;

  const calculatePrice = (basePrice: number, numEmployees: number): number => {
    const totalPrice = basePrice + (numEmployees * employeeCost);
    return isAnnual ? totalPrice * 12 * 0.66 : totalPrice; // Descuento del 34% para el plan anual
  };

  useEffect(() => {
    const newAnimatedPrice: Record<string, number> = {};
    plans.forEach(plan => {
      const targetPrice = calculatePrice(plan.basePrice, numEmployees);
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
        setAnimatedPrice({ ...newAnimatedPrice });
      };
      animatePrice();
    });
  }, [numEmployees, isAnnual]);

  const handleSelectPlan = (plan: Plan) => {
    console.log(`Plan seleccionado: ${plan.name}`);
    // Aquí puedes agregar la lógica para procesar la selección del plan
  };

  const handleNumEmployeesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setNumEmployees(Math.max(value, 1)); // Asegura que el número mínimo de empleados sea 1
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', py: 4 }}>
        <Box maxWidth="lg" margin="auto" sx={{ flex: '1 0 auto' }}>
          <Typography variant="h2" component="div" align="center" gutterBottom>
            Planes y Precios
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Elige el plan perfecto para tu empresa
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" my={2}>
            <Typography variant="body1">Mensual</Typography>
            <Switch
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
              color="primary"
              inputProps={{ 'aria-label': 'toggle annual billing' }}
            />
            <Typography variant="body1">
              Anual <Chip label="Ahorra 34%" size="small" color="secondary" />
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
            <TextField
              label="Número de empleados"
              type="number"
              variant="outlined"
              value={numEmployees}
              onChange={handleNumEmployeesChange}
              sx={{ width: 200, mr: 2 }}
            />
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {plans.map((plan, index) => (
              <Grid item key={plan.name} xs={12} sm={6} md={4}>
                <PlanCard
                  plan={plan}
                  price={animatedPrice[plan.name] || calculatePrice(plan.basePrice, numEmployees)}
                  period={isAnnual ? 'año' : 'mes'}
                  isRecommended={index === 1}
                  onSelect={handleSelectPlan}
                />
              </Grid>
            ))}
          </Grid>
          <Box mt={4} textAlign="center">
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              Ir a Inicio
            </Button>
          </Box>
        </Box>
        <Box mt={2} textAlign="center" sx={{ flexShrink: 0 }}>
          <Typography variant="h6" gutterBottom>
            ¿Necesitas un plan personalizado?
          </Typography>
          <Button variant="outlined" color="primary" size="large">
            Contáctanos
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Pricing;
