import useSWRMutation from 'swr/mutation';
import supabase from '../utils/supabase';

const handleSendMessage = async (_, { arg: message }) => {
    const { data, error } = await supabase
        .from('messages')
        .insert([message])
        .single();

    if (error) {
        throw error;
    }

    return data;
};

const useSendMessage = (chatId) => {
    const { trigger, data, error, isMutating } = useSWRMutation(['/api/chat', chatId], handleSendMessage);

    return { trigger, data, error, isLoading: isMutating };
};

export default useSendMessage;
