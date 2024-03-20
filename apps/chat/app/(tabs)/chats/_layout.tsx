import { Stack, useGlobalSearchParams, useRouter } from 'expo-router';
import ChatView from '@yaply/app/components/ChatView';
import { UserPlus } from '@tamagui/lucide-icons';
import { Button } from 'tamagui';
import AddMemberDialog from '@yaply/app/components/AddMemberDialog';

const ChatLayout = () => {
  const { id } = useGlobalSearchParams();
  const router = useRouter();

  const handleChange = (item) => {
    router.push(`/chats/${item.id}`);
  };

  return (
    <ChatView
      id={`${id}`}
      onChange={handleChange}
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[id]" options={{ title: '', headerRight: () => <AddMemberDialog><Button mr="$2" icon={<UserPlus size="$1" />} chromeless /></AddMemberDialog> }} />
        <Stack.Screen name="create" options={{ title: 'Create Chat' }} />
      </Stack>
    </ChatView>
  )
}

export default ChatLayout;
