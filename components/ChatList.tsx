import React from 'react';
import {FlatList} from 'react-native';
import {ListItem, YStack} from 'tamagui';
import {useRouter, useGlobalSearchParams} from 'expo-router';
import useChats from 'hooks/useChats';

const ChatList: React.FC = () => {
  const router = useRouter();
  const { chats } = useChats();

  const { id: chatId } = useGlobalSearchParams();

  return (
    <YStack bg="$background" f={1} {...((chatId) && { display: 'none' }) } $gtMd={{ maw: 400, display: 'flex' }}>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              borderWidth={1}
              onPress={() => router.push(`/chats/${item.id}`)}
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
