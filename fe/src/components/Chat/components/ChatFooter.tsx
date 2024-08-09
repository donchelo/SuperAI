import React, { memo, useCallback } from 'react';
import { Paper, Grid } from '@mui/material';
import MessageInput from './MessageInput';

type ChatFooterProps = {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  toggleQuickPrompts: () => void;
  disabled: boolean; // Añadir la propiedad disabled
};

const ChatFooter: React.FC<ChatFooterProps> = memo(({ newMessage, setNewMessage, handleSendMessage, toggleQuickPrompts, disabled }) => {
  const handleInputChange = useCallback((message: string) => {
    setNewMessage(message);
  }, [setNewMessage]);

  return (
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
        zIndex: (theme) => theme.zIndex.appBar,
        bgcolor: 'background.paper',
      }}
      aria-label="Chat input and actions"
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <MessageInput
            newMessage={newMessage}
            setNewMessage={handleInputChange}
            handleSendMessage={handleSendMessage}
            toggleQuickPrompts={toggleQuickPrompts}
            disabled={disabled} // Pasar la propiedad disabled a MessageInput
          />
        </Grid>
      </Grid>
    </Paper>
  );
});

export default ChatFooter;
