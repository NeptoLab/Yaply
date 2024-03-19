import useSWR from 'swr';
import supabase from '@yaply/core/supabase';

const useChats = () => {
    const { data, isLoading, error, mutate } = useSWR(
        '/api/chats',
        async () => {
            const { data, error } = await supabase
                .from('chats')
                .select('*, members!inner(*)');

            if (error) {
                throw error;
            }

            return data;
        }
    );

    return {
        chats: data,
        isLoading,
        error,
        refetch: mutate,
    };
};

export default useChats;
