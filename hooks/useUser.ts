import { User } from '@supabase/supabase-js';
import useSWR from 'swr';
import supabase from 'utils/supabase';

const useUser = () => {
    const { data, isLoading, error } = useSWR('/api/user', async () => {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
            throw error;
        }

        return data;
    });
    return {
        user: data?.user,
        isLoading,
        error,
    };
};

export default useUser;
