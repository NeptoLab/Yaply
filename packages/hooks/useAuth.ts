import supabase from '@yaply/core/supabase';

const useAuth = () => {
    return supabase.auth;
};

export default useAuth;
