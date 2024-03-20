import { Tabs, useRouter } from 'expo-router';
import { MessageSquare, Mail, Bell } from '@tamagui/lucide-icons'
import AddChatButton from '@yaply/react/components/AddChatButton';

export default function TabLayout() {
  const router = useRouter();

  const handleAddChat = () => {
    router.push('/chats/create');
  };

  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Activity',
          tabBarIcon: ({ color }) => <Bell color={color} />
        }}
      />
      <Tabs.Screen
        name='chats'
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => <MessageSquare color={color} />,
          headerRight: () => <AddChatButton onPress={handleAddChat} />
        }}
      />
      <Tabs.Screen
        name='mail'
        options={{
          title: 'Mail',
          tabBarIcon: ({ color }) => <Mail color={color} />,
        }}
      />
    </Tabs>
  )
}
