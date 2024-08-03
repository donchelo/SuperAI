// src/components/Chat/MessageItem.tsx
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Message } from './types';
import ReactMarkdown from 'react-markdown';

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: message.sender === 'bot' ? 'flex-start' : 'flex-end' }}>
      <Paper sx={{ p: 2, maxWidth: '80%', bgcolor: message.sender === 'bot' ? 'background.paper' : 'primary.main' }}>
        <Typography color={message.sender === 'bot' ? 'text.primary' : 'primary.contrastText'}>
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </Typography>
      </Paper>
    </Box>
  );
};
