import React, { useContext } from 'react';
import {FlatList} from 'react-native';
import {Button, ListItem, YStack} from 'tamagui';
import {useRouter, useGlobalSearchParams} from 'expo-router';
import ChatContext from '../contexts/ChatContext';

const ChatList: React.FC = () => {
  const router = useRouter();
  const { chats } = useContext(ChatContext);

  const { id: chatId } = useGlobalSearchParams();

  return (
    <YStack bg="$background" f={1} {...chatId && { display: 'none' } } $gtMd={{ maw: 400, display: 'flex' }}>
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
