import supabase from '@yaply/core/utils/supabase';

const useAuth = () => {
    return supabase.auth;
};

export default useAuth;
