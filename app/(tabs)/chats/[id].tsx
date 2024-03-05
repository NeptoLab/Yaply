import React, { useEffect } from 'react';
import ChatDialog from '@yaply/react/components/ChatDialog';
import { useGlobalSearchParams, useNavigation } from 'expo-router';

const ChatScreen: React.FC = () => {
  const { id } = useGlobalSearchParams();
  const navigation = useNavigation();
  const handleLoad = (chat) => { 
    navigation.setOptions({
      title: chat.name,
    });
  };

  return <ChatDialog
    chatId={`${id}`}
    onLoad={handleLoad}
  />;
};

export default ChatScreen;
