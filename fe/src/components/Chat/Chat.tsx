import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, useTheme, IconButton, Drawer, useMediaQuery } from '@mui/material';
import { Close } from '@mui/icons-material';
import QuickPrompts from './QuickPrompts';
import superAiChatImage from '../../assets/superai-chat.png';
import profilePicture from '../../assets/profile-picture.jpg';
import { Message } from './types';
import { MessageItem } from './MessageItem';
import { MessageInput } from './MessageInput';

const Chat: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Bienvenido a tu Asistente de IA Empresarial. Estoy aquí para ayudarte con tus consultas empresariales. Puedes hacer preguntas específicas o elegir una de las preguntas rápidas sugeridas.',
      sender: 'bot'
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [quickPromptsOpen, setQuickPromptsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (text = newMessage) => {
    if (text.trim() !== '') {
      addMessage(text, 'user');
      setNewMessage('');
      simulateBotResponse();
    }
    setQuickPromptsOpen(false);
  };

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    setMessages(prev => [...prev, { id: prev.length + 1, text, sender }]);
  };

  const simulateBotResponse = () => {
    setTimeout(() => {
      addMessage('Gracias por tu pregunta. Estoy procesando la información...', 'bot');
    }, 1000);
  };

  const toggleQuickPrompts = () => {
    setQuickPromptsOpen(!quickPromptsOpen);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      bgcolor: 'background.default',
      position: 'relative',
      pt: { xs: '56px', sm: '64px' },
    }}>
      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto', 
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        pb: '70px',
      }}>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          borderTop: 1, 
          borderColor: 'divider', 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0,
          zIndex: theme.zIndex.appBar,
          bgcolor: 'background.paper',
        }}
      >
        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          toggleQuickPrompts={toggleQuickPrompts}
        />
      </Paper>

      <Drawer
        anchor="bottom"
        open={quickPromptsOpen && isMobile}
        onClose={toggleQuickPrompts}
      >
        <Box sx={{ p: 2, pt: 0 }}>
          <IconButton
            color="primary"
            onClick={toggleQuickPrompts}
            sx={{ float: 'right' }}
          >
            <Close />
          </IconButton>
          <QuickPrompts onPromptClick={handleSendMessage} />
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={quickPromptsOpen && !isMobile}
        onClose={toggleQuickPrompts}
      >
        <Box sx={{ p: 2, width: 300, pt: '64px' }}>
          <IconButton
            color="primary"
            onClick={toggleQuickPrompts}
            sx={{ float: 'right' }}
          >
            <Close />
          </IconButton>
          <QuickPrompts onPromptClick={handleSendMessage} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Chat;
