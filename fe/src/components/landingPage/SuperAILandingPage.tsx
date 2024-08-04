import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
} from '@mui/material';
import { 
  Menu as MenuIcon,
  PrecisionManufacturing,
  Speed,
  TrendingUp,
  Visibility,
  EmojiNature
} from '@mui/icons-material';
import HeroSection from '../HeroSection/HeroSection';
import PreguntasFrecuentes from './PreguntasFrecuentes';
import Footer from './Footer';
import KeyFeatures from './KeyFeatures';

interface ValueItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const ValueItem: React.FC<ValueItemProps> = ({ icon: Icon, title, description }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: theme.palette.background.paper }}>
      <CardContent sx={{ p: isMobile ? 2 : 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Icon sx={{ fontSize: isMobile ? 30 : 40, color: theme.palette.primary.main, mr: 2 }} />
          <Typography variant={isMobile ? "subtitle1" : "h6"} component="h3">{title}</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
      </CardContent>
    </Card>
  );
};

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
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(5px)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: theme.palette.text.primary }}>
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
                <MenuItem onClick={handleClose} component={RouterLink} to="/Pricing">Pricing</MenuItem>
                <MenuItem onClick={handleClose} component={RouterLink} to="/app/chat">Sign In</MenuItem>
              </Menu>
            </>
          ) : (
            <Box>
              <Button color="inherit" component={RouterLink} to="/Pricing">Pricing</Button>
              <Button color="inherit" component={RouterLink} to="/app/chat">Sign In</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <HeroSection />

      <Container maxWidth="lg" sx={{ mt: { xs: 6, sm: 8, md: 12 }, mb: { xs: 6, sm: 8, md: 12 } }}>
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          gutterBottom 
          align="center" 
          sx={{ 
            fontWeight: 'bold', 
            color: theme.palette.text.primary, 
            mb: { xs: 3, sm: 4, md: 6 }
          }}
        >
          Decisiones Infalibles. Resultados Imprescindibles.
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          align="center" 
          sx={{ 
            fontSize: { xs: '1rem', sm: '1.1rem' }, 
            color: theme.palette.text.secondary, 
            maxWidth: '800px', 
            margin: '0 auto', 
            mb: { xs: 6, sm: 8, md: 12 }
          }}
        >
          SuperAI Empresarial empodera a los CEOs con una superinteligencia artificial avanzada que ofrece
          insights profundos e integrados, optimizando cada aspecto de su negocio para tomar
          decisiones informadas y estratégicas con confianza y precisión.
        </Typography>

        <Box sx={{ mb: { xs: 6, sm: 8, md: 12 } }}>
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            gutterBottom 
            align="center" 
            sx={{ 
              fontWeight: 'bold', 
              color: theme.palette.text.primary, 
              mb: { xs: 3, sm: 4, md: 6 }
            }}
          >
            Nuestros Valores
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {[
              { icon: PrecisionManufacturing, title: "Precisión", description: "Garantizamos la exactitud en cada dato y análisis para decisiones infalibles." },
              { icon: Speed, title: "Proactividad", description: "Anticipamos necesidades y ofrecemos recomendaciones antes de que las solicites." },
              { icon: TrendingUp, title: "Innovación", description: "Estamos a la vanguardia de la tecnología para impulsar tu crecimiento." },
              { icon: Visibility, title: "Transparencia", description: "Ofrecemos claridad total en cada proceso y recomendación." },
              { icon: EmojiNature, title: "Sostenibilidad", description: "Promovemos decisiones que aseguran un crecimiento responsable y duradero." }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ValueItem 
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <KeyFeatures />
        <PreguntasFrecuentes />
      </Container>

      <Footer />
    </Box>
  );
};

export default SuperAILandingPage;
