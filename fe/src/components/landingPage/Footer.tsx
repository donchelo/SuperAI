import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram, Email, Phone } from '@mui/icons-material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const customColors = {
    darkGray: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[800],
    white: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.common.white,
    lightGray: theme.palette.grey[500],
    orange: theme.palette.warning.main,
    blue: theme.palette.primary.main,
  };

  const socialLinks = [
    { icon: <Facebook />, label: 'Facebook', url: 'https://facebook.com' },
    { icon: <Twitter />, label: 'Twitter', url: 'https://twitter.com' },
    { icon: <LinkedIn />, label: 'LinkedIn', url: 'https://www.linkedin.com/company/ai4u-artificial-intelligence-for-you' },
    { icon: <Instagram />, label: 'Instagram', url: 'https://www.instagram.com/a.i.4.u/' },
  ];

  const quickLinks = ['Inicio', 'Pricing', 'Demo'];

  return (
    <Box component="footer" sx={{ 
      bgcolor: customColors.darkGray, 
      color: customColors.white,
      py: { xs: 4, md: 6 },
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${customColors.blue}, ${customColors.orange})`,
      }
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: customColors.orange }}>
              SuperAI Empresarial
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Transformando el liderazgo empresarial mediante la inteligencia artificial.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {socialLinks.map((link) => (
                <IconButton 
                  key={link.label}
                  aria-label={link.label} 
                  component="a" 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: customColors.white,
                    '&:hover': { color: customColors.orange },
                    transition: 'color 0.3s'
                  }}
                >
                  {link.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: customColors.blue }}>
              Enlaces Rápidos
            </Typography>
            {quickLinks.map((text, index) => (
              <Link 
                key={text}
                component={RouterLink} 
                to={index === 0 ? "/" : `/${text.toLowerCase()}`}
                sx={{ 
                  display: 'block', 
                  color: customColors.white, 
                  mb: 1,
                  transition: 'color 0.3s',
                  '&:hover': { 
                    color: customColors.orange,
                    textDecoration: 'none',
                  }
                }}
              >
                {text}
              </Link>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: customColors.blue }}>
              Contacto
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1, color: customColors.orange }} />
              <Typography variant="body2">
                mariano@ai4u.com.co
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1, color: customColors.orange }} />
              <Typography variant="body2">
                +57 (321) 817-5744
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: customColors.lightGray }} />
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center',
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          <Typography variant="body2" sx={{ mb: { xs: 2, sm: 0 } }}>
            © 2024 SuperAI Empresarial. Todos los derechos reservados.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link component={RouterLink} to="/politica-de-privacidad" sx={{ color: customColors.lightGray, '&:hover': { color: customColors.orange } }}>
              Política de Privacidad
            </Link>
            <Link component={RouterLink} to="/terms" sx={{ color: customColors.lightGray, '&:hover': { color: customColors.orange } }}>
              Términos y Condiciones
            </Link>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', fontStyle: 'italic', color: customColors.orange }}>
          Mariano - 마리아노
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
