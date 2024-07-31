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
  useMediaQuery,
  Fade,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ArrowForward,
  BarChart,
  Dashboard,
  Storage,
  Notifications,
  FlashOn,
  CheckCircle,
  Menu as MenuIcon,
  ExpandMore
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
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      textAlign: 'center',
      p: 3, 
      borderRadius: 2,
      transition: 'all 0.3s ease-in-out',
      '&:hover': { 
        bgcolor: 'action.hover',
        transform: 'translateY(-5px)'
      }
    }}>
      <Icon sx={{ fontSize: 48, color: customColors.blue, mb: 2 }} />
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Typography variant="body2" color="text.secondary">{description}</Typography>
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
    <Box sx={{ bgcolor: customColors.white, minHeight: '100vh' }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: customColors.lightGreen }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: customColors.darkGray }}>
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

      <Container maxWidth="lg" sx={{ mt: 12, mb: 12, textAlign: 'center' }}>
        <Fade in={true} timeout={1000}>
          <Box>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: customColors.darkGray }}>
              SuperAI Empresarial
            </Typography>
            <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4, color: customColors.darkGray }}>
              Transformando el liderazgo empresarial mediante la inteligencia artificial
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              component={RouterLink}
              to="/app/chat"
              sx={{ 
                bgcolor: customColors.blue, 
                color: customColors.white,
                '&:hover': { 
                  bgcolor: customColors.orange,
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              Solicitar Demo
            </Button>
          </Box>
        </Fade>
      </Container>

      <Container maxWidth="md" sx={{ mb: 12 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: customColors.darkGray }}>
          Decisiones Infalibles. Resultados Imprescindibles.
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ fontSize: '1.1rem', color: customColors.darkGray }}>
          SuperAI Empresarial empodera a los CEOs con una superinteligencia artificial avanzada que ofrece
          insights profundos e integrados, optimizando cada aspecto de su negocio para tomar
          decisiones informadas y estratégicas con confianza y precisión.
        </Typography>
      </Container>

      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: customColors.darkGray }}>
          Nuestros Valores
        </Typography>
        <Grid container spacing={4}>
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

      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: customColors.darkGray }}>
          Funcionalidades Clave
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureItem
              icon={BarChart}
              title="Análisis Predictivo en Tiempo Real"
              description="Anticípese a las tendencias del mercado y tome decisiones informadas con datos actualizados constantemente."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureItem
              icon={Dashboard}
              title="Paneles de Control Personalizables"
              description="Visualice sus KPIs clave en dashboards intuitivos, obteniendo una visión clara del rendimiento de su negocio."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureItem
              icon={Storage}
              title="Integración de Datos"
              description="Unifique todas sus fuentes de datos, eliminando silos de información para una visión holística del negocio."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureItem
              icon={Notifications}
              title="Alertas y Notificaciones Proactivas"
              description="Reciba alertas sobre eventos críticos, desviaciones de rendimiento y nuevas oportunidades de negocio."
            />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md" sx={{ mb: 12 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: customColors.darkGray }}>
          Cómo Funciona
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, borderLeft: `4px solid ${customColors.blue}` }}>
              <Typography variant="h6" gutterBottom>1. Integración de Datos</Typography>
              <Typography variant="body2">Conectamos SuperAI con sus sistemas existentes para recopilar y unificar todos sus datos empresariales.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, borderLeft: `4px solid ${customColors.orange}` }}>
              <Typography variant="h6" gutterBottom>2. Análisis y Aprendizaje</Typography>
              <Typography variant="body2">Nuestros algoritmos analizan sus datos y aprenden los patrones únicos de su negocio.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, borderLeft: `4px solid ${customColors.blue}` }}>
              <Typography variant="h6" gutterBottom>3. Generación de Insights</Typography>
              <Typography variant="body2">SuperAI genera predicciones, recomendaciones y alertas basadas en el análisis continuo de sus datos.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, borderLeft: `4px solid ${customColors.orange}` }}>
              <Typography variant="h6" gutterBottom>4. Toma de Decisiones Informada</Typography>
              <Typography variant="body2">Utilice los insights proporcionados para tomar decisiones estratégicas con confianza y precisión.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md" sx={{ mb: 12 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: customColors.darkGray }}>
          Preguntas Frecuentes
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>¿Cómo se integra SuperAI con mis sistemas existentes?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              SuperAI se diseña para integrarse sin problemas con la mayoría de los sistemas empresariales existentes. Nuestro equipo de expertos trabajará con usted para garantizar una integración fluida y eficiente.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>¿Qué medidas de seguridad implementa SuperAI?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              SuperAI utiliza encriptación de grado militar y cumple con todas las regulaciones de protección de datos relevantes. Ofrecemos opciones de almacenamiento de datos on-premise para requisitos de seguridad más estrictos.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>¿Cuánto tiempo se necesita para ver resultados?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              La mayoría de nuestros clientes comienzan a ver mejoras significativas en sus procesos de toma de decisiones y eficiencia operativa dentro de los primeros 3 meses de implementación. Algunos beneficios, como las alertas proactivas, son inmediatos.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>

      <Box component="footer" sx={{ bgcolor: customColors.lightGray, py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" sx={{ color: customColors.darkGray }}>
            © 2024 SuperAI Empresarial. Todos los derechos reservados.
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1, color: customColors.darkGray }}>
            <Link component={RouterLink} to="/politica-de-privacidad" sx={{ color: customColors.darkGray, '&:hover': { color: customColors.blue } }}>
              Política de Privacidad
            </Link>
            {' | '}
            <Link component={RouterLink} to="/terms" sx={{ color: customColors.darkGray, '&:hover': { color: customColors.blue } }}>
              Términos y Condiciones
            </Link>
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1, color: customColors.darkGray, fontWeight: 'bold' }}>
            Mariano - 마리아노
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default SuperAILandingPage;