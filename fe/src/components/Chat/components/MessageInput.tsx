import React, { useState, KeyboardEvent } from 'react';
import { Box, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import QuickReplyIcon from '@mui/icons-material/Quickreply';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  toggleQuickPrompts: () => void;
  disabled: boolean; // Añadir la propiedad disabled
}

const MessageInput: React.FC<MessageInputProps> = ({ newMessage, setNewMessage, handleSendMessage, toggleQuickPrompts, disabled }) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !disabled) {
      handleSendMessage();
      event.preventDefault(); // Prevenir salto de línea en TextField
    } else if ((event.key === 'Enter' && (event.ctrlKey || event.metaKey)) && !disabled) {
      handleSendMessage();
      event.preventDefault();
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <TextField
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        disabled={disabled} // Deshabilitar entrada si se está procesando el mensaje
        placeholder="Escribe tu mensaje..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleQuickPrompts} edge="end" aria-label="Abrir respuestas rápidas">
                <QuickReplyIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        aria-label="Campo de entrada de mensaje"
      />
      <Button
        onClick={handleSendMessage}
        variant="contained"
        color="primary"
        sx={{ ml: 1 }}
        disabled={disabled} // Deshabilitar el botón si se está procesando el mensaje
        aria-label="Enviar mensaje"
      >
        <SendIcon />
      </Button>
    </Box>
  );
};

export default MessageInput;
