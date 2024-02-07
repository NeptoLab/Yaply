import supabase from 'utils/supabase';

const useAuth = () => {
    return supabase.auth;
};

export default useAuth;
