import ChatContext from 'contexts/ChatContext';
import React from 'react';
import supabase from 'utils/supabase';

export const ChatProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [chats, setChats] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from('chats')
          .select('*, members!inner(*)')
          .eq('members.user_id', user.id);
        data && setChats(data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  return (
    <ChatContext.Provider value={{ chats }}>
      {children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
