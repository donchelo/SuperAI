import React from 'react';
import GoogleLoginButton from '../../Auth/GoogleLoginButton';
import { Box, Container, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="sm" sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <Paper 
        elevation={3} 
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 2,
          textAlign: 'center',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
          >
            Bienvenido a SuperAI
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            Inicia sesión con tu cuenta de Google para acceder a tu asistente IA personalizado.
          </Typography>
        </Box>
        <Box sx={{ position: 'relative', mb: 4 }}>
          <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.1,
          }}>
            <GoogleIcon sx={{ fontSize: 150 }} />
          </Box>
          <GoogleLoginButton />
        </Box>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
          Al iniciar sesión, aceptas nuestros Términos de Servicio y Política de Privacidad.
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginPage;