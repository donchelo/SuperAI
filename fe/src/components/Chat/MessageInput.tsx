import React, { useState, KeyboardEvent } from 'react';
import { Box, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import QuickReplyIcon from '@mui/icons-material/Quickreply';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  toggleQuickPrompts: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ newMessage, setNewMessage, handleSendMessage, toggleQuickPrompts }) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <TextField
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleQuickPrompts} edge="end">
                <QuickReplyIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button onClick={() => handleSendMessage()} variant="contained" color="primary" sx={{ ml: 1 }}>
        <SendIcon />
      </Button>
    </Box>
  );
};

export default MessageInput;
