// src/components/Chat/MessageInput.tsx
import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { Send, Menu } from '@mui/icons-material'; // Asegúrate de importar los íconos

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  toggleQuickPrompts: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ newMessage, setNewMessage, handleSendMessage, toggleQuickPrompts }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Escribe tu mensaje..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        sx={{ mr: 1 }}
      />
      <IconButton color="primary" onClick={handleSendMessage}>
        <Send />
      </IconButton>
      <IconButton color="secondary" onClick={toggleQuickPrompts}>
        <Menu /> {/* Usa el ícono importado aquí */}
      </IconButton>
    </Box>
  );
};
