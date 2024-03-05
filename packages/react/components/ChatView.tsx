import React from 'react';
import { XStack, View} from 'tamagui';
import ChatList from './ChatList';

const ChatView: React.FC<React.PropsWithChildren<{ id: string, onChange: (item) => void}>> = ({ children, id, onChange }) => {
  return (
    <XStack f={1}>
      <ChatList
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
