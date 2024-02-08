import useSWR from 'swr';
import supabase from 'utils/supabase';

const useContacts = () => {
    const { data, isLoading, error, mutate } = useSWR(
        '/api/contacts',
        async () => {
            const { data, error } = await supabase.from('contacts')
                .select('*, profile:profiles!contacts_contact_user_id_fkey(*)');

            if (error) {
                throw error;
            }

            return data;
        }
    );

    return {
        contacts: data,
        isLoading,
        error,
        refetch: mutate,
    };
};

export default useContacts;
