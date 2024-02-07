import { User } from '@supabase/supabase-js';
import useSWR from 'swr';
import supabase from 'utils/supabase';

const useUser = () => {
    const { data, isLoading, error } = useSWR('/api/user', () => supabase.auth.getUser());
    return {
        user: data?.data.user,
        isLoading,
        error,
    };
};

export default useUser;
