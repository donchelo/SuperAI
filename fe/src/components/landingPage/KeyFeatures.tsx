import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Dashboard, Storage, Notifications } from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@mui/material';

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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease-in-out',
      '&:hover': { 
        transform: isMobile ? 'none' : 'translateY(-10px)',
        boxShadow: isMobile ? 1 : 6
      }
    }}>
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center',
        p: isMobile ? 2 : 3
      }}>
        <Icon sx={{ fontSize: isMobile ? 40 : 60, color: customColors.blue, mb: 2 }} />
        <Typography variant={isMobile ? "subtitle1" : "h6"} component="h3" gutterBottom>{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
      </CardContent>
    </Card>
  );
};

const KeyFeatures: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    { icon: BarChart, title: "Análisis Predictivo en Tiempo Real", description: "Anticípese a las tendencias del mercado y tome decisiones informadas con datos actualizados constantemente." },
    { icon: Dashboard, title: "Paneles de Control Personalizables", description: "Visualice sus KPIs clave en dashboards intuitivos, obteniendo una visión clara del rendimiento de su negocio." },
    { icon: Storage, title: "Integración de Datos", description: "Unifique todas sus fuentes de datos, eliminando silos de información para una visión holística del negocio." },
    { icon: Notifications, title: "Alertas y Notificaciones Proactivas", description: "Reciba alertas sobre eventos críticos, desviaciones de rendimiento y nuevas oportunidades de negocio." }
  ];

  return (
    <Box sx={{ mb: { xs: 6, sm: 8, md: 12 } }}>
      <Typography 
        variant={isMobile ? "h4" : "h3"} 
        gutterBottom 
        align="center" 
        sx={{ 
          fontWeight: 'bold', 
          color: customColors.darkGray, 
          mb: { xs: 3, sm: 4, md: 6 }
        }}
      >
        Funcionalidades Clave
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {features.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
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
