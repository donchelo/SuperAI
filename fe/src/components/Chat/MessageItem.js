// src/components/Chat/MessageItem.tsx
import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import superAiChatImage from '../../assets/superai-chat.png';
import profilePicture from '../../assets/profile-picture.png';
export const MessageItem = ({ message, renderMarkdown }) => (React.createElement(Box, { sx: {
        display: 'flex',
        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
        mb: 2,
        alignItems: 'flex-end',
    } },
    message.sender === 'bot' && (React.createElement(Avatar, { src: superAiChatImage, alt: "SuperAI Chat", sx: { mr: 1, width: 40, height: 40 } })),
    React.createElement(Paper, { elevation: 1, sx: {
            maxWidth: '70%',
            p: 1.5,
            borderRadius: 2,
            bgcolor: message.sender === 'user' ? 'primary.main' : 'background.paper',
            color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
            ...(message.sender === 'user' ? { borderBottomRightRadius: 0 } : { borderBottomLeftRadius: 0 }),
        } }, message.sender === 'bot' ? (renderMarkdown(message.text)) : (React.createElement(Typography, null, message.text))),
    message.sender === 'user' && (React.createElement(Avatar, { src: profilePicture, alt: "User Profile", sx: { ml: 1, width: 40, height: 40 } }))));
export default MessageItem;
