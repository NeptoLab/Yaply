import React from 'react';
import {FlatList} from 'react-native';
import {ListItem, YStack} from 'tamagui';
import useChats from '@yaply/core/hooks/useChats';

const ChatList: React.FC<{ chatId: string, onChange: (item) => void}> = ({ chatId, onChange }) => {
  const { chats } = useChats();

  return (
    <YStack bg="$background" f={1} {...((chatId) && { display: 'none' }) } $gtMd={{ maw: 400, display: 'flex' }}>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              borderWidth={1}
              onPress={onChange}
              {...(chatId === item.id.toString() && { backgroundColor: '$backgroundFocus' })}
            >
              {item.name}
            </ListItem> 
          )}
        />
      </YStack>
  );
};

export default ChatList;
