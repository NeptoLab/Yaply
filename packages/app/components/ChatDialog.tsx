import BaseChatDialog from '@yaply/react/components/ChatDialog';
import useChat from '@yaply/hooks/useChat';
import useSendMessage from '@yaply/hooks/useSendMessage';
import React, { useEffect, useState } from 'react';
import { Message } from '@yaply/types/models';

const ChatDialog = ({ chatId, onLoad, ...props }) => {
  const { chat } = useChat(chatId, {
    onMessage: (message) => setMessages((prevMessages) => [...prevMessages, message]),
  });
  const [ messages, setMessages ] = useState<Message[]>([]);
  const { trigger: handleSendMessage } = useSendMessage(chatId);

  useEffect(() => {
    if (chat) {
        onLoad && onLoad(chat);
        setMessages(chat.messages);
    }
  }, [chat]);

  return (
    <BaseChatDialog
      messages={messages}
      chatId={chatId}
      handleSendMessage={handleSendMessage}
      {...props}
    />
  );
}

export default ChatDialog;
