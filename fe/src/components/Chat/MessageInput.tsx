import React from 'react';
import { Box, TextField, Button, IconButton } from '@mui/material';
import { Send, QuestionAnswer } from '@mui/icons-material';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  toggleQuickPrompts: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ newMessage, setNewMessage, handleSendMessage, toggleQuickPrompts }) => (
  <Box sx={{ display: 'flex', gap: 1 }}>
    <IconButton
      color="primary"
      onClick={toggleQuickPrompts}
    >
      <QuestionAnswer />
    </IconButton>
    <TextField
      variant="outlined"
      fullWidth
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          handleSendMessage();
          e.preventDefault();  // Prevenir el comportamiento por defecto del Enter
        }
      }}
      placeholder="Escribe un mensaje..."
      sx={{ 
        bgcolor: 'background.paper',
        '& .MuiOutlinedInput-root': {
          borderRadius: 28,
        },
      }}
    />
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        handleSendMessage();  // Asegurándonos de que la función se llama correctamente
      }}
      endIcon={<Send />}
      sx={{ 
        borderRadius: 28, 
        px: 3,
      }}
    >
      Enviar
    </Button>
  </Box>
);
