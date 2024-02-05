import { Tabs } from 'expo-router';
import { MessageSquare, Mail, Bell } from '@tamagui/lucide-icons'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Activity',
          headerShown: false,
          tabBarIcon: ({ color }) => <Bell color={color} />
        }}
      />
      <Tabs.Screen
        name='chats'
        options={{
          title: 'Chats',
          headerShown: false,
          tabBarIcon: ({ color }) => <MessageSquare color={color} />
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
