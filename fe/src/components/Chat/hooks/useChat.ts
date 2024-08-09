import { useState, useCallback, useEffect } from 'react';
import { Message } from '../types';

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [defaultPrompt, setDefaultPrompt] = useState('');
  const [welcomeMessageAdded, setWelcomeMessageAdded] = useState(false);

  useEffect(() => {
    if (!welcomeMessageAdded) {
      setMessages([
        {
          id: 1,
          text: 'Bienvenido a tu Asistente de IA Empresarial. Estoy aquí para ayudarte con tus consultas empresariales. Puedes hacer preguntas específicas o elegir una de las preguntas rápidas sugeridas.',
          sender: 'bot'
        }
      ]);
      setWelcomeMessageAdded(true);
    }
  }, [welcomeMessageAdded]);

  const fetchInitialPrompt = useCallback(async () => {
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
  }, []);

  const addMessage = useCallback((text: string, sender: 'bot' | 'user') => {
    setMessages(prev => [...prev, { id: prev.length + 1, text, sender }]);
  }, []);

  const getBotResponse = useCallback(async (text: string) => {
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
            { role: "system", content: defaultPrompt },
            { role: "user", content: text }
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Error fetching data from OpenAI API');
      }

      const data = await response.json();
      addMessage(data.choices[0].message.content.trim(), 'bot');
    } catch (error) {
      console.error(error);
      addMessage('Lo siento, hubo un error procesando tu solicitud.', 'bot');
    }
  }, [defaultPrompt, addMessage]);

  return {
    messages,
    addMessage,
    fetchInitialPrompt,
    getBotResponse,
  };
};

export default useChat;
