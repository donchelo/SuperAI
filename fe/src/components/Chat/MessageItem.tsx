import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Message } from '../Chat/types';
import ReactMarkdown from 'react-markdown';

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: message.sender === 'bot' ? 'flex-start' : 'flex-end' }}>
      <Paper sx={{
        p: 2,
        maxWidth: '80%',
        bgcolor: message.sender === 'bot' ? 'background.paper' : 'primary.main',
        borderRadius: message.sender === 'bot' ? '10px 10px 10px 0px' : '10px 10px 0px 10px',
        boxShadow: 1,
        transition: 'background-color 0.3s ease-in-out'
      }}>
        <Typography color={message.sender === 'bot' ? 'text.primary' : 'primary.contrastText'}>
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </Typography>
      </Paper>
    </Box>
  );
};
