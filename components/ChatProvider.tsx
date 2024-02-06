import ChatContext from 'contexts/ChatContext';
import { useRouter } from 'expo-router';
import React from 'react';
import supabase from 'utils/supabase';

export const ChatProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [chats, setChats] = React.useState<any[]>([]);
  const router = useRouter();

  const fetchChats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      };

      const { data } = await supabase
        .from('chats')
        .select('*, members!inner(*)')
        .eq('members.user_id', user.id);
      data && setChats(data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  React.useEffect(() => {
    fetchChats();
  }, []);

  return (
    <ChatContext.Provider value={{ chats, fetchChats }}>
      {children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
