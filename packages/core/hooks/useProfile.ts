import useSWR from 'swr';
import supabase from '../utils/supabase';

const useProfile = (userId) => {
    const { data, isLoading, error } = useSWR(
        userId ? ['/api/profile', userId] : null,
        async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('user_id', userId)
                .single();

            if (error) {
                throw error;
            }

            return data;
        }
    );
    return {
        profile: data,
        isLoading,
        error,
    };
};

export default useProfile;
