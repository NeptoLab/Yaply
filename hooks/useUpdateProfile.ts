import useSWRMutation from 'swr/mutation';
import supabase from 'utils/supabase';

const handleUpdateProfile = async (_, { arg: profile }) => {
    const { data, error } = await supabase
        .from('profiles')
        .upsert(profile);

    if (error) {
        throw error;
    }

    return data;
};

const useUpdateProfile = () => {
    const { trigger, data, error, isMutating } = useSWRMutation('/api/profile', handleUpdateProfile);

    return { trigger, data, error, isLoading: isMutating };
};

export default useUpdateProfile;
