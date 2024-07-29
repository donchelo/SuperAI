import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  IconButton,
  Snackbar,
  useTheme,
  useMediaQuery,
  Tooltip,
  CircularProgress,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Save, Info } from '@mui/icons-material';
import CategoryComponent from './CategoryComponent';
import { sections } from './questionsData';

const ADN: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [formProgress, setFormProgress] = useState(0);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  const totalFields = sections.reduce((acc, section) => acc + section.fields.length, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/get-responses');
        const data = await response.json();
        setFormData(data);
        calculateProgress(data);
      } catch (error) {
        console.error('Error al cargar datos del servidor:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (category: string, field: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/save-responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Datos enviados:', formData);
        setSubmitStatus('success');
      } else {
        console.error('Error al enviar los datos');
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setSubmitStatus('error');
    }
    setTimeout(() => setSubmitStatus(null), 3000);
    calculateProgress();
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  const calculateProgress = (data = formData) => {
    const filledFields = sections.reduce((acc, section) =>
      acc + section.fields.filter(([field]) => data[section.key]?.[field]).length, 0
    );
    const progress = (filledFields / totalFields) * 100;
    setFormProgress(progress);
    return progress;
  };

  const handleEditField = (category: string, field: string) => {
    setEditingField(`${category}-${field}`);
  };

  const handleSaveField = (category: string, field: string) => {
    setEditingField(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', bgcolor: 'background.default', p: 2 }}>
      <Paper elevation={3} sx={{ p: 2, bgcolor: 'background.paper', mb: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
            ADN de tu Startup
          </Typography>
          <Tooltip title="Ver información sobre la importancia del ADN">
            <IconButton onClick={() => setShowInfoDialog(true)} color="primary">
              <Info />
            </IconButton>
          </Tooltip>
        </Box>
        <Grid container spacing={2} alignItems="center" direction={isMobile ? 'column-reverse' : 'row'}>
          <Grid item xs>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                Importancia de llenar el ADN
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                El ADN de tu startup es la esencia de tu negocio y es crucial para que nuestra IA pueda ofrecerte respuestas y análisis altamente personalizados y relevantes para tu empresa. Cuanta más información proporciones y más detallada sea, mejor podremos entender tu empresa y ofrecerte insights valiosos. Recuerda actualizar regularmente esta información para mantener la precisión de las respuestas de la IA a medida que tu startup evoluciona.
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ position: 'relative', display: 'inline-flex', mt: isMobile ? 2 : 0 }}>
              <CircularProgress
                variant="determinate"
                value={formProgress}
                size={isMobile ? 100 : 160}
                thickness={4}
                sx={{ color: theme.palette.primary.main }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant={isMobile ? "h6" : "h4"} component="div" color="text.primary" fontWeight="bold">
                  {`${Math.round(formProgress)}%`}
                </Typography>
                <Typography variant="caption" component="div" color="text.secondary">
                  Completado
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <form onSubmit={handleSubmit}>
        {sections.map(section => (
          <CategoryComponent
            key={section.key}
            section={section}
            formData={formData}
            expandedSections={expandedSections}
            handleChange={handleChange}
            toggleSection={toggleSection}
            errors={{}}
            editingField={editingField}
            handleEditField={handleEditField}
            handleSaveField={handleSaveField}
          />
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<Save />}
            size={isMobile ? "small" : "large"}
          >
            Actualizar ADN
          </Button>
        </Box>
      </form>

      <Snackbar
        open={submitStatus === 'success'}
        autoHideDuration={3000}
        onClose={() => setSubmitStatus(null)}
        message="¡Tu ADN se ha actualizado correctamente! La IA ahora podrá ofrecerte respuestas más precisas."
      />

      <Snackbar
        open={submitStatus === 'error'}
        autoHideDuration={3000}
        onClose={() => setSubmitStatus(null)}
        message="Error al actualizar el ADN. Por favor, inténtalo de nuevo."
      />

      <Dialog open={showInfoDialog} onClose={() => setShowInfoDialog(false)}>
        <DialogTitle>Importancia del ADN de tu Startup</DialogTitle>
        <DialogContent>
          <Typography paragraph>
            El ADN de tu startup es la esencia de tu negocio y es crucial para que nuestra IA pueda ofrecerte respuestas y análisis altamente personalizados y relevantes para tu empresa.
          </Typography>
          <Typography paragraph>
            Cuanta más información proporciones y más detallada sea, mejor podremos entender tu empresa y ofrecerte insights valiosos. Cada sección del ADN juega un papel importante:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>Identidad y Estrategia:</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Define quién eres y hacia dónde vas.</Typography>
            <Typography component="li" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>Clientes y Problemas:</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Ayuda a la IA a entender tu mercado objetivo.</Typography>
            <Typography component="li" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>Propuesta de Valor:</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Permite a la IA alinear sus sugerencias con tu oferta única.</Typography>
            <Typography component="li" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>Marca y Comunicación:</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Guía a la IA para mantener la consistencia de tu marca.</Typography>
            <Typography component="li" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>Roadmap y Objetivos:</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Ayuda a la IA a proporcionar consejos orientados al futuro.</Typography>
            <Typography component="li" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>Recursos y Canales:</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Permite a la IA considerar tus capacidades actuales.</Typography>
            <Typography component="li" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>Ingresos y Alianzas:</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Informa a la IA sobre tu modelo de negocio y red.</Typography>
            <Typography component="li" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>Equipo:</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Ayuda a la IA a entender las fortalezas y necesidades de tu organización.</Typography>
          </Box>
          <Typography paragraph sx={{ mt: 2, color: theme.palette.text.secondary }}>
            Tu nivel de definición del ADN refleja cuán completa y detallada es la información que has proporcionado. A medida que aumentes este nivel, obtendrás respuestas más precisas y adaptadas a tu startup.
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary }}>
            Recuerda actualizar regularmente esta información para mantener la precisión de las respuestas de la IA a medida que tu startup evoluciona.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInfoDialog(false)} color="primary">Entendido</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ADN;
