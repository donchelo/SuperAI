// src/components/Chat/types.ts
export interface Message {
    id: number; // Añadir esta línea
    sender: 'user' | 'bot';
    text: string;
    // Añade aquí cualquier otra propiedad que pueda tener tu objeto Message
  }
  