import React from 'react';
import { XStack, View} from 'tamagui';
import ChatList from './ChatList';
import { Chat } from '@yaply/types/models';

const ChatView: React.FC<React.PropsWithChildren<{ chats?: Chat[], id: string, onChange: (item) => void}>> = ({ children, id, chats = [], onChange }) => {
  return (
    <XStack f={1}>
      <ChatList
        chats={chats}
        chatId={id}
        onChange={onChange}
      />
      <View f={1}>
        {children}
      </View>
    </XStack>
  );
};

export default ChatView;
