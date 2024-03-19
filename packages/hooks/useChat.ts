import { useEffect } from 'react';
import useSWR from 'swr';
import supabase from '@yaply/core/supabase';

const useChat = (chatId, { onMessage }) => {
    const { data, isLoading, error } = useSWR(
        chatId ? ['/api/profile', chatId] : null,
        async () => {
            const { data, error } = await supabase
                .from('chats')
                .select('name, messages(*)')
                .order("created_at", { foreignTable: 'messages', ascending: true })
                .eq('id', chatId)
                .single();

            if (error) {
                throw error;
            }

            return data;
        }
    );
    
    useEffect(() => {
        const subscription = supabase
            .channel(`${chatId}`)
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload: { new }) => {
                    onMessage(payload.new);
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return {
        chat: data,
        isLoading,
        error
    };
};

export default useChat;
