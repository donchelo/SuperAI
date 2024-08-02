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
  Card,
  CardContent,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Fade,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack
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
  ExpandMore,
  PrecisionManufacturing,
  Speed,
  Home,
  TrendingUp,
  Visibility,
  EmojiNature
} from '@mui/icons-material';
import HeroSection from '../HeroSection/HeroSection'; // Importa el nuevo componente HeroSection

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
  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease-in-out',
      '&:hover': { 
        transform: 'translateY(-10px)',
        boxShadow: 6
      }
    }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Icon sx={{ fontSize: 60, color: customColors.blue, mb: 2 }} />
        <Typography variant="h6" component="h3" gutterBottom>{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
      </CardContent>
    </Card>
  );
};

interface ValueItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const ValueItem: React.FC<ValueItemProps> = ({ icon: Icon, title, description }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon sx={{ fontSize: 40, color: customColors.orange, mr: 2 }} />
        <Typography variant="h6" component="h3">{title}</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">{description}</Typography>
    </CardContent>
  </Card>
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
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(5px)' }}>
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
                <MenuItem onClick={handleClose} component={RouterLink} to="/Pricing">Pricing</MenuItem>
                <MenuItem onClick={handleClose} component={RouterLink} to="/app/chat">Sign In</MenuItem>
              </Menu>
            </>
          ) : (
            <Box>
              <Button color="inherit" component={RouterLink} to="/">Inicio</Button>
              <Button color="inherit" component={RouterLink} to="/Pricing">Pricing</Button>
              <Button color="inherit" component={RouterLink} to="/app/chat">Sign In</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <HeroSection /> {/* Llamada al nuevo componente HeroSection */}

      {/* Main content */}
      <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: customColors.darkGray, mb: 6 }}>
          Decisiones Infalibles. Resultados Imprescindibles.
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ fontSize: '1.1rem', color: customColors.darkGray, maxWidth: '800px', margin: '0 auto', mb: 12 }}>
          SuperAI Empresarial empodera a los CEOs con una superinteligencia artificial avanzada que ofrece
          insights profundos e integrados, optimizando cada aspecto de su negocio para tomar
          decisiones informadas y estratégicas con confianza y precisión.
        </Typography>

        {/* Valores */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: customColors.darkGray, mb: 6 }}>
            Nuestros Valores
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <ValueItem 
                icon={PrecisionManufacturing} 
                title="Precisión" 
                description="Garantizamos la exactitud en cada dato y análisis para decisiones infalibles." 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ValueItem 
                icon={Speed} 
                title="Proactividad" 
                description="Anticipamos necesidades y ofrecemos recomendaciones antes de que las solicites." 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ValueItem 
                icon={Home}  // Cambiado de `Integration` a `Home`
                title="Integración" 
                description="Unificamos todos tus sistemas para una visión empresarial completa." 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ValueItem 
                icon={TrendingUp} 
                title="Innovación" 
                description="Estamos a la vanguardia de la tecnología para impulsar tu crecimiento." 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ValueItem 
                icon={Visibility} 
                title="Transparencia" 
                description="Ofrecemos claridad total en cada proceso y recomendación." 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ValueItem 
                icon={EmojiNature} 
                title="Sostenibilidad" 
                description="Promovemos decisiones que aseguran un crecimiento responsable y duradero." 
              />
            </Grid>
          </Grid>
        </Box>

        {/* Funcionalidades Clave */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: customColors.darkGray, mb: 6 }}>
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
        </Box>

        {/* Cómo Funciona */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: customColors.darkGray, mb: 6 }}>
            Cómo Funciona
          </Typography>
          <Stack spacing={4}>
            {[
              { title: "Integración de Datos", description: "Conectamos SuperAI con sus sistemas existentes para recopilar y unificar todos sus datos empresariales." },
              { title: "Análisis y Aprendizaje", description: "Nuestros algoritmos analizan sus datos y aprenden los patrones únicos de su negocio." },
              { title: "Generación de Insights", description: "SuperAI genera predicciones, recomendaciones y alertas basadas en el análisis continuo de sus datos." },
              { title: "Toma de Decisiones Informada", description: "Utilice los insights proporcionados para tomar decisiones estratégicas con confianza y precisión." }
            ].map((step, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  bgcolor: customColors.blue, 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mr: 2,
                  flexShrink: 0
                }}>
                  {index + 1}
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom>{step.title}</Typography>
                  <Typography variant="body2">{step.description}</Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Preguntas Frecuentes */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: customColors.darkGray, mb: 6 }}>
            Preguntas Frecuentes
          </Typography>
          {[
            {
              question: "¿Cómo se integra SuperAI con mis sistemas existentes?",
              answer: "SuperAI se diseña para integrarse sin problemas con la mayoría de los sistemas empresariales existentes. Nuestro equipo de expertos trabajará con usted para garantizar una integración fluida y eficiente."
            },
            {
              question: "¿Qué medidas de seguridad implementa SuperAI?",
              answer: "SuperAI utiliza encriptación de grado militar y cumple con todas las regulaciones de protección de datos relevantes. Ofrecemos opciones de almacenamiento de datos on-premise para requisitos de seguridad más estrictos."
            },
            {
              question: "¿Cuánto tiempo se necesita para ver resultados?",
              answer: "La mayoría de nuestros clientes comienzan a ver mejoras significativas en sus procesos de toma de decisiones y eficiencia operativa dentro de los primeros 3 meses de implementación. Algunos beneficios, como las alertas proactivas, son inmediatos."
            }
          ].map((faq, index) => (
            <Accordion key={index} sx={{ 
              '&:before': { display: 'none' }, 
              boxShadow: 'none', 
              borderBottom: `1px solid ${customColors.lightGray}`,
              '&:last-child': { borderBottom: 'none' }
            }}>
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: customColors.blue }} />}
                sx={{ 
                  '&.Mui-expanded': { 
                    minHeight: 48,
                    '& .MuiAccordionSummary-content': { marginY: '12px' }
                  }
                }}
              >
                <Typography sx={{ fontWeight: 'bold', color: customColors.darkGray }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: customColors.darkGray }}>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: customColors.lightGray, py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ color: customColors.darkGray, fontWeight: 'bold', mb: 2 }}>
                SuperAI Empresarial
              </Typography>
              <Typography variant="body2" sx={{ color: customColors.darkGray }}>
                Transformando el liderazgo empresarial mediante la inteligencia artificial.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ color: customColors.darkGray, fontWeight: 'bold', mb: 2 }}>
                Enlaces Rápidos
              </Typography>
              <Link component={RouterLink} to="/" sx={{ display: 'block', color: customColors.darkGray, mb: 1 }}>Inicio</Link>
              <Link component={RouterLink} to="/Pricing" sx={{ display: 'block', color: customColors.darkGray, mb: 1 }}>Pricing</Link>
              <Link component={RouterLink} to="/app/chat" sx={{ display: 'block', color: customColors.darkGray, mb: 1 }}>Demo</Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ color: customColors.darkGray, fontWeight: 'bold', mb: 2 }}>
                Contacto
              </Typography>
              <Typography variant="body2" sx={{ color: customColors.darkGray, mb: 1 }}>
                Email: info@superai.com
              </Typography>
              <Typography variant="body2" sx={{ color: customColors.darkGray, mb: 1 }}>
                Teléfono: +1 (123) 456-7890
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, pt: 2, borderTop: `1px solid ${customColors.darkGray}` }}>
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
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default SuperAILandingPage;
