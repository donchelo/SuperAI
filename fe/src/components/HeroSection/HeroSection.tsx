import React from 'react';
import { Box, Button, Container, Grid, Typography, Fade } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import BackgroundImage from '../../../public/images/hero-background.png';

const customColors = {
  darkGray: '#1A202C',
  white: '#FFFFFF',
  orange: '#ED8936',
};

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        backgroundImage: `url(${BackgroundImage}), linear-gradient(to right, #4299E1, #48BB78)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', // Ajusta la opacidad según necesites
          zIndex: 1
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1000}>
              <Box>
                <Typography variant="h1" gutterBottom sx={{ fontWeight: 900, color: customColors.white, mb: 4, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                  SuperAI Empresarial
                </Typography>
                <Typography variant="h4" gutterBottom sx={{ mb: 4, color: customColors.white, fontWeight: 300, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Transformando el liderazgo empresarial mediante la inteligencia artificial
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  component={RouterLink}
                  to="/app/chat"
                  sx={{ 
                    bgcolor: customColors.orange, 
                    color: customColors.white,
                    '&:hover': { 
                      bgcolor: customColors.darkGray,
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.3s ease-in-out',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    borderRadius: 50
                  }}
                >
                  Solicitar Demo
                </Button>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
