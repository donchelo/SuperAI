import React from 'react';
import { Box, TextField, Button, IconButton } from '@mui/material';
import { Send, QuestionAnswer } from '@mui/icons-material';
export const MessageInput = ({ newMessage, setNewMessage, handleSendMessage, toggleQuickPrompts }) => (React.createElement(Box, { sx: { display: 'flex', gap: 1 } },
    React.createElement(IconButton, { color: "primary", onClick: toggleQuickPrompts },
        React.createElement(QuestionAnswer, null)),
    React.createElement(TextField, { variant: "outlined", fullWidth: true, value: newMessage, onChange: (e) => setNewMessage(e.target.value), onKeyPress: (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
                e.preventDefault(); // Prevenir el comportamiento por defecto del Enter
            }
        }, placeholder: "Escribe un mensaje...", sx: {
            bgcolor: 'background.paper',
            '& .MuiOutlinedInput-root': {
                borderRadius: 28,
            },
        } }),
    React.createElement(Button, { variant: "contained", color: "primary", onClick: () => {
            handleSendMessage(); // Asegurándonos de que la función se llama correctamente
        }, endIcon: React.createElement(Send, null), sx: {
            borderRadius: 28,
            px: 3,
        } }, "Enviar")));
