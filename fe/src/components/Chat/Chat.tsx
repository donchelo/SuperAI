import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Fade,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { motion } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hola, ¿en qué puedo ayudarte hoy?', sender: 'ai', timestamp: new Date() },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      setIsTyping(true);
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          text: 'Gracias por tu mensaje. Estoy procesando tu solicitud...',
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 2 }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Chat con SuperAI
          </Typography>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
        <List sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          {messages.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                mb: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main',
                  width: 40,
                  height: 40,
                }}
              >
                {message.sender === 'user' ? 'U' : 'AI'}
              </Avatar>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    ml: message.sender === 'user' ? 1 : 2,
                    mr: message.sender === 'user' ? 2 : 1,
                    bgcolor: message.sender === 'user' ? 'primary.light' : 'background.paper',
                    borderRadius: 2,
                    maxWidth: '70%',
                  }}
                >
                  <ListItemText
                    primary={message.text}
                    secondary={formatTimestamp(message.timestamp)}
                    primaryTypographyProps={{
                      color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                    }}
                    secondaryTypographyProps={{
                      color: message.sender === 'user' ? 'primary.contrastText' : 'text.secondary',
                    }}
                  />
                </Paper>
              </motion.div>
            </ListItem>
          ))}
          {isTyping && (
            <Fade in={isTyping}>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  SuperAI está escribiendo...
                </Typography>
              </Box>
            </Fade>
          )}
          <div ref={messagesEndRef} />
        </List>
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Escribe un mensaje..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              sx={{ mr: 1 }}
            />
            <Tooltip title="Adjuntar archivo">
              <IconButton color="primary" sx={{ mr: 1 }}>
                <AttachFileIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mensaje de voz">
              <IconButton color="primary" sx={{ mr: 1 }}>
                <MicIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Enviar mensaje">
              <IconButton color="primary" onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chat;