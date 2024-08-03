import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { customColors } from './SuperAILandingPage';

const Footer: React.FC = () => {
  return (
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
              Email: mariano@ai4u.com.co
            </Typography>
            <Typography variant="body2" sx={{ color: customColors.darkGray, mb: 1 }}>
              Teléfono: +57 (321) 817-5744
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
          <Typography variant="body2" align="center" sx={{ mt: 1, color: customColors.darkGray, fontStyle: 'italic' }}>
            by Mariano - 마리아노
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer