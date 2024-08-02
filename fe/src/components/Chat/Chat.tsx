import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, useTheme, IconButton, Drawer, useMediaQuery } from '@mui/material';
import { Close } from '@mui/icons-material';
import QuickPrompts from './QuickPrompts';
import { Message } from './types';
import { MessageItem } from './MessageItem';
import { MessageInput } from './MessageInput';
import ReactMarkdown from 'react-markdown';

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
  const [defaultPrompt, setDefaultPrompt] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/get-responses`);
        const data = await response.json();
        setDefaultPrompt(`Rol: Eres un asistente profesional de startups.

Contexto: [ ${JSON.stringify(data)} ]

Tarea: Responder las preguntas que se te hacen teniendo en cuenta las siguientes reglas.

1. Responde teniendo en cuenta el contexto proporcionado.
2. Tómate el tiempo necesario para responder y explica tu proceso paso a paso antes de dar una respuesta final.
3. Presenta tus respuestas en formato Markdown para una mejor legibilidad.

Instrucciones adicionales:

- Usa ejemplos prácticos cuando sea posible para ilustrar tus respuestas.
- Divide la información en secciones claras con encabezados y listas para facilitar la lectura.
- Asegúrate de que la respuesta sea coherente y bien estructurada.
 `);
      } catch (error) {
        console.error('Error al cargar datos del servidor:', error);
      }
    };
    fetchData();
  }, [messages]);

  const handleSendMessage = async (text = newMessage) => {
    if (text.trim() !== '') {
      addMessage(text, 'user');
      setNewMessage('');
      await getBotResponse(text);
    }
    setQuickPromptsOpen(false);
  };

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    setMessages(prev => [...prev, { id: prev.length + 1, text, sender }]);
  };

  const getBotResponse = async (text: string) => {
    addMessage('Gracias por tu pregunta. Estoy procesando la información...', 'bot');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {role: "system" , content: defaultPrompt},
            { role: "user", content: text }
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Error fetching data from OpenAI API');
      }

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.choices[0].message.content.trim() };
      addMessage(botMessage.text, 'bot');
    } catch (error) {
      console.error(error);
      addMessage('Lo siento, hubo un error procesando tu solicitud.', 'bot');
    }
  };

  const toggleQuickPrompts = () => {
    setQuickPromptsOpen(!quickPromptsOpen);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 64px)', // Ajustado para considerar el header
      bgcolor: 'background.default',
      position: 'relative',
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
          <MessageItem key={message.id} message={message} renderMarkdown={(text: string) => <ReactMarkdown>{text}</ReactMarkdown>} />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          borderTop: 1, 
          borderColor: 'divider', 
          position: 'sticky', 
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