import React from 'react';
import { Message } from './types';
interface MessageItemProps {
    message: Message;
    renderMarkdown: (text: string) => JSX.Element;
}
export declare const MessageItem: React.FC<MessageItemProps>;
export default MessageItem;
