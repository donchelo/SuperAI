import React from 'react';
import { Grid, Typography, Box, useTheme, useMediaQuery, Paper } from '@mui/material';
import { Rocket, Dashboard, Layers, Visibility, TrendingUp, Notifications } from '@mui/icons-material';
import { generateColorPalette } from '../../services/colorPalette';

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, description }) => {
  const theme = useTheme();
  const colors = generateColorPalette(theme.palette.primary.main, theme.palette.secondary.main);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <Icon sx={{ fontSize: 40, color: colors[2], mb: 2 }} />
      <Typography variant="h6" component="h3" gutterBottom fontWeight="bold" color="text.primary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
};

const features = [
  { icon: Rocket, title: "IA Predictiva", description: "Anticípese al mercado con insights en tiempo real." },
  { icon: Dashboard, title: "Dashboards", description: "Visualice KPIs clave de forma intuitiva." },
  { icon: Layers, title: "Integración", description: "Unifique datos para una visión holística." },
  { icon: Visibility, title: "Monitoreo", description: "Detecte anomalías y oportunidades con IA." },
  { icon: TrendingUp, title: "Optimización", description: "Mejore operaciones con machine learning." },
  { icon: Notifications, title: "Alertas", description: "Reciba notificaciones inteligentes." },
];

const KeyFeatures: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const colors = generateColorPalette(theme.palette.primary.main, theme.palette.secondary.main);

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 4, md: 6 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography
        variant={isMobile ? "h4" : "h3"}
        component="h2"
        align="center"
        gutterBottom
        fontWeight="bold"
        sx={{
          mb: { xs: 6, md: 8 },
          color: 'text.primary',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-16px',
            left: '50%',
            width: '60px',
            height: '4px',
            backgroundColor: colors[2],
            transform: 'translateX(-50%)',
          },
        }}
      >
        Funcionalidades Clave
      </Typography>
      <Grid container spacing={4}>
        {features.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FeatureItem
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KeyFeatures;