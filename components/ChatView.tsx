import React from 'react';
import { XStack, View} from 'tamagui';
import { useGlobalSearchParams } from 'expo-router';
import ChatList from './ChatList';

const ChatView: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { id: chatId } = useGlobalSearchParams();

  return (
    <XStack f={1}>
      <ChatList />
      <View f={1} {...!chatId && { display: 'none' } }>
        {children}
      </View>
    </XStack>
  );
};

export default ChatView;
