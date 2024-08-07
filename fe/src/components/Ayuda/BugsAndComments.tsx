import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useComments, Comment } from './CommentContext';

const BugsAndComments: React.FC = () => {
  const { comments, updateComment } = useComments();
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (comment: Comment) => {
    setSelectedComment(comment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedComment(null);
    setOpenDialog(false);
  };

  const handleChangeStatus = (id: number, status: 'abierto' | 'cerrado') => {
    updateComment(id, { status });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Sugerencias y Reporte de Bugs
        </Typography>
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id}>
              <ListItemText
                primary={comment.type === 'sugerencia' ? 'Sugerencia' : 'Bug'}
                secondary={comment.feedback}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={comment.status === 'cerrado'}
                    onChange={() =>
                      handleChangeStatus(
                        comment.id,
                        comment.status === 'abierto' ? 'cerrado' : 'abierto'
                      )
                    }
                  />
                }
                label={comment.status === 'abierto' ? 'Abierto' : 'Cerrado'}
              />
              <Button
                variant="outlined"
                onClick={() => handleOpenDialog(comment)}
              >
                Ver Detalles
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Detalles del Comentario</DialogTitle>
        {selectedComment && (
          <DialogContent>
            <Typography>Tipo: {selectedComment.type}</Typography>
            <Typography>Feedback: {selectedComment.feedback}</Typography>
            {selectedComment.type === 'sugerencia' && (
              <Typography>Rating: {selectedComment.rating}</Typography>
            )}
            {selectedComment.type === 'bug' && (
              <Typography>Urgente: {selectedComment.urgent ? 'Sí' : 'No'}</Typography>
            )}
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BugsAndComments;
