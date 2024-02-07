import useSWR from 'swr';
import supabase from 'utils/supabase';

const useChats = () => {
    const { data, isLoading, error } = useSWR(
        '/api/chats',
        async () => (
            await supabase
                .from('chats')
                .select('*, members!inner(*)')
        )
    );
    return {
        chats: data?.data,
        isLoading,
        error,
    };
};

export default useChats;
