import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ArrowForward,
  BarChart,
  Dashboard,
  Storage,
  Notifications,
  FlashOn,
  CheckCircle,
  Menu as MenuIcon
} from '@mui/icons-material';

// Definimos los colores como un objeto de tema personalizado
const customColors = {
  darkGray: '#282728',
  white: '#FFFFFF',
  lightGray: '#94989B',
  orange: '#FC8E46',
  lightGreen: '#EAF4EB',
  blue: '#20A6D2'
};

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, description }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4, '&:hover': { bgcolor: 'action.hover', borderRadius: 2 }, p: 2 }}>
      <Icon sx={{ mr: 2, color: customColors.blue }} />
      <Box>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
      </Box>
    </Box>
  );
};

interface ValueItemProps {
  children: React.ReactNode;
}

const ValueItem: React.FC<ValueItemProps> = ({ children }) => (
  <ListItem>
    <ListItemIcon>
      <CheckCircle sx={{ color: customColors.orange }} />
    </ListItemIcon>
    <ListItemText primary={children} />
  </ListItem>
);

const SuperAILandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ bgcolor: customColors.lightGreen, minHeight: '100vh' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SuperAI
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={RouterLink} to="/">Inicio</MenuItem>
                <MenuItem onClick={handleClose} component={RouterLink} to="/pricing">Pricing</MenuItem>
                <MenuItem onClick={handleClose} component={RouterLink} to="/app/chat">Sign In</MenuItem>
              </Menu>
            </>
          ) : (
            <Box>
              <Button color="inherit" component={RouterLink} to="/">Inicio</Button>
              <Button color="inherit" component={RouterLink} to="/pricing">Pricing</Button>
              <Button color="inherit" component={RouterLink} to="/app/chat">Sign In</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 8, mb: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          SuperAI Empresarial
        </Typography>
        <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4 }}>
          Transformando el liderazgo empresarial mediante la inteligencia artificial
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ArrowForward />}
          component={RouterLink}
          to="/app/chat"
          sx={{ bgcolor: customColors.blue, '&:hover': { bgcolor: customColors.orange } }}
        >
          Solicitar Demo
        </Button>
      </Container>

      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Typography variant="h3" gutterBottom align="center">
          Decisiones Infalibles. Resultados Imprescindibles.
        </Typography>
        <Typography variant="body1" paragraph align="center">
          SuperAI Empresarial empodera a los CEOs con una superinteligencia artificial avanzada que ofrece
          insights profundos e integrados, optimizando cada aspecto de su negocio para tomar
          decisiones informadas y estratégicas con confianza y precisión.
        </Typography>
      </Container>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" gutterBottom align="center">
          Nuestros Valores
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <List>
              <ValueItem>Precisión en cada dato y análisis</ValueItem>
              <ValueItem>Proactividad en recomendaciones</ValueItem>
              <ValueItem>Integración completa de sistemas</ValueItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ValueItem>Innovación constante</ValueItem>
              <ValueItem>Transparencia absoluta</ValueItem>
              <ValueItem>Crecimiento sostenible</ValueItem>
            </List>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" gutterBottom align="center">
          Funcionalidades Clave
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FeatureItem
              icon={BarChart}
              title="Análisis Predictivo en Tiempo Real"
              description="Anticípese a las tendencias del mercado y tome decisiones informadas con datos actualizados constantemente."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureItem
              icon={Dashboard}
              title="Paneles de Control Personalizables"
              description="Visualice sus KPIs clave en dashboards intuitivos, obteniendo una visión clara del rendimiento de su negocio."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureItem
              icon={Storage}
              title="Integración de Datos"
              description="Unifique todas sus fuentes de datos, eliminando silos de información para una visión holística del negocio."
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeatureItem
              icon={Notifications}
              title="Alertas y Notificaciones Proactivas"
              description="Reciba alertas sobre eventos críticos, desviaciones de rendimiento y nuevas oportunidades de negocio."
            />
          </Grid>
        </Grid>
      </Container>

      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 SuperAI Empresarial. Todos los derechos reservados.
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            <Link component={RouterLink} to="/politica-de-privacidad" color="inherit">
              Política de Privacidad
            </Link>
            {' | '}
            <Link component={RouterLink} to="/terms" color="inherit">
              Términos y Condiciones
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            by Mariano - 마리아노
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default SuperAILandingPage;