import useSWR from 'swr';
import supabase from 'utils/supabase';

const useContacts = () => {
    const { data, isLoading, error, mutate } = useSWR(
        '/api/contacts',
        async () => (
            await supabase.from('contacts')
                .select('*, profile:profiles!contacts_contact_user_id_fkey(*)')
        )
    );

    return {
        contacts: data?.data,
        isLoading,
        error,
        refetch: mutate,
    };
};

export default useContacts;
