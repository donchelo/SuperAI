import React from 'react';
import { Box, Button, Container, Grid, Typography, Fade, useTheme, useMediaQuery } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import BackgroundImage from '../../../public/images/hero-background.png';

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        backgroundImage: `url(${BackgroundImage}), linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
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
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 4, sm: 6, md: 8 } }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Fade in={true} timeout={1000}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography 
                  variant={isMobile ? 'h3' : isTablet ? 'h2' : 'h1'} 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 900, 
                    color: theme.palette.common.white, 
                    mb: { xs: 2, sm: 3, md: 4 }, 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem', lg: '4.5rem' }
                  }}
                >
                  SuperAI Empresarial
                </Typography>
                <Typography 
                  variant={isMobile ? 'h6' : isTablet ? 'h5' : 'h4'} 
                  gutterBottom 
                  sx={{ 
                    mb: { xs: 3, sm: 4 }, 
                    color: theme.palette.common.white, 
                    fontWeight: 300, 
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '1.75rem' }
                  }}
                >
                  Transformando el liderazgo empresarial mediante la inteligencia artificial
                </Typography>
                <Button
                  variant="contained"
                  size={isMobile ? "medium" : "large"}
                  endIcon={<ArrowForward />}
                  component={RouterLink}
                  to="/app/chat"
                  sx={{ 
                    bgcolor: theme.palette.warning.main, 
                    color: theme.palette.common.white,
                    '&:hover': { 
                      bgcolor: theme.palette.background.default,
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.3s ease-in-out',
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1, sm: 1.5 },
                    fontSize: { xs: '1rem', sm: '1.2rem' },
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
