// src/components/Chat/MessageItem.tsx

import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import { Message } from './types';
import superAiChatImage from '../../assets/superai-chat.png';
import profilePicture from '../../assets/profile-picture.png';
import ReactMarkdown from 'react-markdown';

interface MessageItemProps {
  message: Message;
  renderMarkdown: (text: string) => JSX.Element;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, renderMarkdown }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
      mb: 2,
      alignItems: 'flex-end',
    }}
  >
    {message.sender === 'bot' && (
      <Avatar 
        src={superAiChatImage} 
        alt="SuperAI Chat"
        sx={{ mr: 1, width: 40, height: 40 }}
      />
    )}
    <Paper
      elevation={1}
      sx={{
        maxWidth: '70%',
        p: 1.5,
        borderRadius: 2,
        bgcolor: message.sender === 'user' ? 'primary.main' : 'background.paper',
        color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
        ...(message.sender === 'user' ? { borderBottomRightRadius: 0 } : { borderBottomLeftRadius: 0 }),
      }}
    >
      {message.sender === 'bot' ? (
        renderMarkdown(message.text)
      ) : (
        <Typography>{message.text}</Typography>
      )}
    </Paper>
    {message.sender === 'user' && (
      <Avatar 
        src={profilePicture} 
        alt="User Profile"
        sx={{ ml: 1, width: 40, height: 40 }}
      />
    )}
  </Box>
);

export default MessageItem;
