import { useEffect } from 'react';
import useSWR from 'swr';
import supabase from 'utils/supabase';

const useChat = (chatId, { onMessage }) => {
    const { data, isLoading, error } = useSWR(
        chatId ? ['/api/profile', chatId] : null,
        async ([, chatId]) => (
            await supabase
                .from('chats')
                .select('name, messages(*)')
                .order("created_at", { foreignTable: 'messages', ascending: true })
                .eq('id', chatId)
                .single()
        )
    );
    
    useEffect(() => {
        const subscription = supabase
            .channel(`${chatId}`)
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload: { new: any }) => {
                    onMessage(payload.new);
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return {
        chat: data?.data,
        isLoading,
        error
    };
};

export default useChat;
