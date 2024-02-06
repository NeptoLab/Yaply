import React from 'react';

const ChatContext = React.createContext<{
  chats: any[],
  fetchChats: () => void,
}>({
  chats: [],
  fetchChats: () => {},
});

export default ChatContext;
