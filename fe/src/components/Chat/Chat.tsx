import React, { useEffect, useRef, useCallback, useState, memo } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import useChat from './hooks/useChat';
import ChatFooter from './components/ChatFooter';
import QuickPromptsDrawer from './components/QuickPromptsDrawer';
import { MessageItem } from './components/MessageItem';

const Chat: React.FC = memo(() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { messages, addMessage, fetchInitialPrompt, getBotResponse } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const [quickPromptsOpen, setQuickPromptsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Verificamos que el mensaje de bienvenida no se añada más de una vez
  const welcomeMessageAdded = useRef(false);

  useEffect(() => {
    fetchInitialPrompt();
    document.getElementById('message-input')?.focus();

    // Añadir el mensaje de bienvenida solo si no se ha añadido anteriormente
    if (!welcomeMessageAdded.current) {
      addMessage('Bienvenido a tu Asistente de IA Empresarial. Estoy aquí para ayudarte con tus consultas empresariales. Puedes hacer preguntas específicas o elegir una de las preguntas rápidas sugeridas.', 'bot');
      welcomeMessageAdded.current = true; // Marcar como añadido
    }
  }, [fetchInitialPrompt, addMessage]);

  useEffect(() => {
    const shouldScroll = chatBoxRef.current && (chatBoxRef.current.scrollHeight - chatBoxRef.current.scrollTop <= chatBoxRef.current.clientHeight + 100);
    
    if (shouldScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (newMessage.trim()) {
      setIsSending(true);
      addMessage(newMessage.trim(), 'user');
      setNewMessage('');
      await getBotResponse(newMessage.trim());
      setQuickPromptsOpen(false);
      setIsSending(false);
    }
  }, [newMessage, addMessage, getBotResponse]);

  const toggleQuickPrompts = useCallback(() => {
    setQuickPromptsOpen((prev) => !prev);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)', // Ajustado para considerar el header
        bgcolor: 'background.default',
        position: 'relative',
      }}
    >
      <Box
        ref={chatBoxRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          p: isMobile ? 1 : 2, // Menos padding en móviles
          pb: '70px',
        }}
      >
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <ChatFooter
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        toggleQuickPrompts={toggleQuickPrompts}
        disabled={isSending} // Deshabilitar entrada durante el envío
      />

      <QuickPromptsDrawer
        open={quickPromptsOpen}
        isMobile={isMobile}
        toggleQuickPrompts={toggleQuickPrompts}
        onPromptClick={handleSendMessage}
      />
    </Box>
  );
});

export default Chat;
