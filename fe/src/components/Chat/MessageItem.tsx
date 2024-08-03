// src/components/Chat/MessageItem.tsx
import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Message } from './types';
import ReactMarkdown from 'react-markdown';

interface MessageItemProps {
  message: Message;
  renderMarkdown: (text: string) => JSX.Element;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, renderMarkdown }) => {
  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: message.sender === 'bot' ? 'flex-start' : 'flex-end' }}>
      <Paper sx={{ p: 2, maxWidth: '80%', bgcolor: message.sender === 'bot' ? 'background.paper' : 'primary.main' }}>
        <Typography variant="body1" color={message.sender === 'bot' ? 'textPrimary' : 'primary.contrastText'}>
          {renderMarkdown(message.text)}
        </Typography>
      </Paper>
    </Box>
  );
};
