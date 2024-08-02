import React from 'react';
interface MessageInputProps {
    newMessage: string;
    setNewMessage: (message: string) => void;
    handleSendMessage: () => void;
    toggleQuickPrompts: () => void;
}
export declare const MessageInput: React.FC<MessageInputProps>;
export {};
