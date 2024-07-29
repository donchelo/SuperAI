import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Rating,
  FormControlLabel,
  Switch,
  IconButton,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';

// Importar el contenido de ayuda
import { frequentQuestions } from './frequentQuestions';
import { newsAndUpdates } from './newsAndUpdates';
import {
  ChatIcon,
  DnsIcon,
  LightbulbIcon,
  BugReportIcon,
  SuggestIcon,
  HelpIcon
} from './icons';

const Ayuda: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'sugerencia' | 'bug' | null>(null);
  const [feedback, setFeedback] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [urgent, setUrgent] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleOpenDialog = (type: 'sugerencia' | 'bug') => {
    setDialogType(type);
    setOpenDialog(true);
    setRating(null);
    setUrgent(false);
    setFile(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFeedback('');
    setRating(null);
    setUrgent(false);
    setFile(null);
  };

  const handleSubmit = () => {
    console.log(`Enviando ${dialogType}:`, {
      feedback,
      rating,
      urgent,
      file: file ? file.name : 'No file attached'
    });
    handleCloseDialog();
    setSnackbarOpen(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const renderFrequentQuestions = () => (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Preguntas Frecuentes</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List disablePadding>
          {frequentQuestions.map((faq, index) => (
            <ListItem key={index} sx={{ py: 1 }}>
              <ListItemText 
                primary={<Typography variant="subtitle1"><strong>{faq.question}</strong></Typography>}
                secondary={<Typography variant="body2" sx={{ mt: 0.5 }}>{faq.answer}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );

  const renderNewsAndUpdates = () => (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Novedades y Actualizaciones</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List disablePadding>
          {newsAndUpdates.map((news, index) => (
            <ListItem key={index} sx={{ py: 1 }}>
              <ListItemText 
                primary={<Typography variant="subtitle1"><strong>{news.title}</strong></Typography>}
                secondary={<Typography variant="body2" sx={{ mt: 0.5 }}>{news.description}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );

  const renderUsageTips = () => (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Consejos de Uso</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List disablePadding>
          <ListItem sx={{ py: 1 }}>
            <LightbulbIcon color="primary" sx={{ mr: 2, fontSize: 24 }} />
            <ListItemText 
              primary={<Typography variant="subtitle1">Actualiza tu ADN empresarial</Typography>}
              secondary={<Typography variant="body2" sx={{ mt: 0.5 }}>Mantén actualizado tu ADN empresarial para obtener respuestas más precisas del asistente de IA.</Typography>}
            />
          </ListItem>
          <ListItem sx={{ py: 1 }}>
            <LightbulbIcon color="primary" sx={{ mr: 2, fontSize: 24 }} />
            <ListItemText 
              primary={<Typography variant="subtitle1">Usa las preguntas rápidas</Typography>}
              secondary={<Typography variant="body2" sx={{ mt: 0.5 }}>Utiliza las preguntas rápidas como punto de partida para conversaciones más profundas con el asistente.</Typography>}
            />
          </ListItem>
          <ListItem sx={{ py: 1 }}>
            <LightbulbIcon color="primary" sx={{ mr: 2, fontSize: 24 }} />
            <ListItemText 
              primary={<Typography variant="subtitle1">Explora diferentes temas</Typography>}
              secondary={<Typography variant="body2" sx={{ mt: 0.5 }}>Explora diferentes áreas de tu negocio en el chat para descubrir nuevas perspectivas e ideas.</Typography>}
            />
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );

  const renderSuggestionsAndBugs = () => (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Sugerencias y Reporte de Bugs</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List disablePadding>
          <ListItem sx={{ py: 1, alignItems: 'flex-start' }}>
            <SuggestIcon color="primary" sx={{ mr: 2, mt: 1, fontSize: 24 }} />
            <ListItemText 
              primary={<Typography variant="subtitle1">Enviar una sugerencia</Typography>}
              secondary={<Typography variant="body2" sx={{ mt: 0.5 }}>¿Tienes una idea para mejorar nuestra plataforma? ¡Nos encantaría escucharla!</Typography>}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleOpenDialog('sugerencia')}
              sx={{ ml: 2, minWidth: '120px', height: '36px' }}
            >
              Sugerir
            </Button>
          </ListItem>
          <ListItem sx={{ py: 1, alignItems: 'flex-start' }}>
            <BugReportIcon color="secondary" sx={{ mr: 2, mt: 1, fontSize: 24 }} />
            <ListItemText 
              primary={<Typography variant="subtitle1">Reportar un bug</Typography>}
              secondary={<Typography variant="body2" sx={{ mt: 0.5 }}>Si has encontrado algún problema o error en la plataforma, por favor háganoslo saber.</Typography>}
            />
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={() => handleOpenDialog('bug')}
              sx={{ ml: 2, minWidth: '120px', height: '36px' }}
            >
              Reportar
            </Button>
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Box 
      sx={{ 
        padding: isMobile ? 2 : 3, 
        paddingTop: { xs: '72px', sm: '80px' },
        height: '100%',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <Paper elevation={3} sx={{ padding: isMobile ? 2 : 3, marginBottom: 3, flexGrow: 1 }}>
        <Typography variant={isMobile ? "h5" : "h4"} gutterBottom color="primary" sx={{ mb: 2 }}>
          Ayuda y Soporte
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          Bienvenido a la sección de Ayuda de Super AI Empresarial. Aquí encontrarás información útil sobre cómo usar nuestra aplicación y sacar el máximo provecho de sus funcionalidades.
        </Typography>

        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Funcionalidades Principales</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List disablePadding>
              <ListItem sx={{ py: 1 }}>
                <ChatIcon color="primary" sx={{ mr: 2, fontSize: 24 }} />
                <ListItemText 
                  primary={<Typography variant="subtitle1">Chat con IA</Typography>}
                  secondary={<Typography variant="body2" sx={{ mt: 0.5 }}>Interactúa con nuestro asistente de IA empresarial para obtener respuestas y análisis personalizados.</Typography>}
                />
              </ListItem>
              <ListItem sx={{ py: 1 }}>
                <DnsIcon color="primary" sx={{ mr: 2, fontSize: 24 }} />
                <ListItemText 
                  primary={<Typography variant="subtitle1">ADN Empresarial</Typography>}
                  secondary={<Typography variant="body2" sx={{ mt: 0.5 }}>Accede y actualiza la información detallada del ADN de tu empresa, incluyendo misión, visión y estrategias.</Typography>}
                />
              </ListItem>
              <ListItem sx={{ py: 1 }}>
                <HelpIcon color="primary" sx={{ mr: 2, fontSize: 24 }} />
                <ListItemText 
                  primary={<Typography variant="subtitle1">Preguntas Rápidas</Typography>}
                  secondary={<Typography variant="body2" sx={{ mt: 0.5 }}>Encuentra respuestas inmediatas a preguntas comunes sobre gestión empresarial y estrategias.</Typography>}
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        {renderFrequentQuestions()}
        {renderNewsAndUpdates()}
        {renderUsageTips()}
        {renderSuggestionsAndBugs()}
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {dialogType === 'sugerencia' ? 'Enviar Sugerencia' : 'Reportar Bug'}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="feedback"
            label={dialogType === 'sugerencia' ? 'Tu sugerencia' : 'Descripción del bug'}
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{ mt: 2 }}
          />
          {dialogType === 'sugerencia' && (
            <Box sx={{ mt: 3 }}>
              <Typography component="legend" sx={{ mb: 1 }}>¿Qué tan importante es esta sugerencia?</Typography>
              <Rating
                name="importance"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                size="large"
              />
            </Box>
          )}
          {dialogType === 'bug' && (
            <FormControlLabel
              control={
                <Switch
                  checked={urgent}
                  onChange={(e) => setUrgent(e.target.checked)}
                  name="urgent"
                  color="primary"
                />
              }
              label="Este bug es urgente"
              sx={{ mt: 3 }}
            />
          )}
          <Box sx={{ mt: 3 }}>
            <input
              accept="image/*,.pdf"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="outlined" component="span" startIcon={<AttachFileIcon />}>
                {file ? file.name : 'Adjuntar archivo'}
              </Button>
            </label>
            {file && (
              <Tooltip title="Eliminar archivo">
                <IconButton onClick={() => setFile(null)} size="small" sx={{ ml: 1 }}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color={dialogType === 'sugerencia' ? 'primary' : 'secondary'}
            endIcon={<SendIcon />}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={dialogType === 'sugerencia' ? "¡Gracias por tu sugerencia!" : "Gracias por reportar el bug. Lo revisaremos pronto."}
      />
    </Box>
  );
};

export default Ayuda;
