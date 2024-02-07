import useSWR from 'swr';
import supabase from 'utils/supabase';

const useProfile = (userId?: string) => {
    const { data, isLoading, error } = useSWR(
        userId ? ['/api/profile', userId] : null,
        async ([, userId]) => (
            await supabase
                .from('profiles')
                .select()
                .eq('user_id', userId)
                .single()
        )
    );
    return {
        profile: data?.data,
        isLoading,
        error,
    };
};

export default useProfile;
