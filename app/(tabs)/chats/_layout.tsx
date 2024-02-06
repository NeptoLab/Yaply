import { Link, Stack } from 'expo-router';
import { ListPlus } from '@tamagui/lucide-icons';
import { ChatProvider } from 'components/ChatProvider';
import { Button } from 'tamagui';

const AddChatButton = () => {
  return (
    <Link href="/chats/create">
      <Button p="$2" m="$4">
        <ListPlus />
      </Button>
    </Link>
  )
};

const ChatLayout = () => {
  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Chats', headerRight: () =>  <AddChatButton /> }} />
        <Stack.Screen name="[id]" options={{ title: '' }} />
        <Stack.Screen name="create" options={{ title: 'Create Chat' }} />
      </Stack>
    </ChatProvider>
  )
}

export default ChatLayout;
