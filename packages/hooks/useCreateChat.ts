import useSWRMutation from 'swr/mutation';
import supabase from '@yaply/core/supabase';

const handleCreateChat = async (_, { arg: chat }) => {
    const { data, error } = await supabase
        .from('chats')
        .insert({ name: chat.name })
        .select()
        .single();

    if (error) {
        throw error;
    }

    await supabase.from('members').insert([
        { chat_id: data.id },
        ...chat.members.map(
            (member) => ({ chat_id: data.id, user_id: member.contact_user_id })
        )
    ]);

    return data;
};

const useCreateChat = () => {
    const { trigger, data, error, isMutating } = useSWRMutation('/api/chats', handleCreateChat);

    return { trigger, data, error, isLoading: isMutating };
};

export default useCreateChat;
