import React from 'react';
import { FlatList } from 'react-native';
import { ListItem, YStack } from 'tamagui';
import { Chat } from '@yaply/types/models';

const ChatList: React.FC<{ chats?: Chat[], chatId: string, onChange?: (item) => void}> = ({ chats = [], chatId, onChange }) => {
  return (
    <YStack bg="$background" f={1} {...((chatId) && { display: 'none' }) } $gtMd={{ maw: 400, display: 'flex' }}>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              borderWidth={1}
              onPress={() => onChange && onChange(item)}
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
