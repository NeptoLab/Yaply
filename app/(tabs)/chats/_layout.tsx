import { Stack } from 'expo-router';
import ChatView from 'components/ChatView';
import { UserPlus } from '@tamagui/lucide-icons';
import { Button } from 'tamagui';
import AddMemberDialog from 'components/AddMemberDialog';

const ChatLayout = () => {
  return (
    <ChatView>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[id]" options={{ title: '', headerRight: () => <AddMemberDialog><Button mr="$2" icon={<UserPlus size="$1" />} chromeless /></AddMemberDialog> }} />
        <Stack.Screen name="create" options={{ title: 'Create Chat' }} />
      </Stack>
    </ChatView>
  )
}

export default ChatLayout;
