import React from 'react';

const ChatContext = React.createContext<{ chats?: any[] }>({});

export default ChatContext;
