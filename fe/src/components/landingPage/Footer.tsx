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
} from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const customColors = {
    darkGray: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[700],
    white: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.common.white,
    lightGray: theme.palette.grey[500],
    orange: theme.palette.warning.main,
    blue: theme.palette.primary.main,
  };

  return (
    <Box component="footer" sx={{ 
      bgcolor: customColors.darkGray, 
      color: customColors.white,
      py: 6,
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: customColors.orange }}>
              SuperAI Empresarial
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Transformando el liderazgo empresarial mediante la inteligencia artificial.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton aria-label="facebook" sx={{ color: customColors.white }}>
                <Facebook />
              </IconButton>
              <IconButton aria-label="twitter" sx={{ color: customColors.white }}>
                <Twitter />
              </IconButton>
              <IconButton aria-label="linkedin" sx={{ color: customColors.white }}>
                <LinkedIn />
              </IconButton>
              <IconButton aria-label="instagram" sx={{ color: customColors.white }}>
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: customColors.blue }}>
              Enlaces Rápidos
            </Typography>
            {['Inicio', 'Pricing', 'Demo'].map((text, index) => (
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
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: mariano@ai4u.com.co
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Teléfono: +57 (321) 817-5744
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, pt: 2, borderTop: `1px solid ${customColors.lightGray}`, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            © 2024 SuperAI Empresarial. Todos los derechos reservados.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Link component={RouterLink} to="/politica-de-privacidad" sx={{ color: customColors.lightGray, '&:hover': { color: customColors.orange } }}>
              Política de Privacidad
            </Link>
            <Link component={RouterLink} to="/terms" sx={{ color: customColors.lightGray, '&:hover': { color: customColors.orange } }}>
              Términos y Condiciones
            </Link>
          </Box>
          <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', color: customColors.orange }}>
            by Mariano - 마리아노
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
