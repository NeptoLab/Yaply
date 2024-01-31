import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { YStack, XStack, Paragraph, Input, Button } from 'tamagui';
import supabase from 'utils/supabase';
import { Send } from '@tamagui/lucide-icons';
import ChatView from 'components/ChatView';

type Message = {
    id: string;
    text: string;
};

const ChatScreen: React.FC = () => {
    const { handleSubmit, control, setValue } = useForm();
    const { id: chatId } = useLocalSearchParams();
    const navigation = useNavigation();
    const [messages, setMessages] = useState<Message[]>([]);
    const chatRef = React.useRef<FlatList>(null);
    const inputRef = React.useRef<Input>(null);

    const handleScrollToEnd = () => {
        chatRef.current?.scrollToEnd();
    };

    const fetchMessages = async () => {
        try {
            const { data: chat } = await supabase
                .from('chats')
                .select('name')
                .eq('id', chatId)
                .single();

            if (chat) {
                navigation.setOptions({
                    title: chat.name,
                });
            }

            const { data } = await supabase
                .from('messages')
                .select()
                .eq('chat_id', chatId)
                .order('created_at', { ascending: false })
                .limit(15);
            data && setMessages(data.reverse());
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // const handleScroll = (event) => {
    //     const y = event.nativeEvent.contentOffset.y;
    //     const contentHeight = event.nativeEvent.contentSize.height;
    //     const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    
    //     if (contentHeight - (y + layoutHeight) < 50) { // 50 is the threshold
    //       forceScroll.current = false;
    //     } else {
    //       forceScroll.current = true;
    //     }
    //     console.log('handleForceScroll', forceScroll.current);
    // };

    const handleKeyPress = (e: any) => {
        if (e.shiftKey) {
            return;
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    useEffect(() => {
        const subscription = supabase
            .channel(`${chatId}`)
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload: { new: Message }) => {
                    setMessages((prevMessages) => [...prevMessages, payload.new]);
                }
            )
            .subscribe();

        fetchMessages();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const renderItem = ({ item }: { item: Message }) => (
        <Paragraph
            backgroundColor="$gray4"
            br="$2"
            m="$2"
            p="$2"
            alignSelf="flex-start"
            display="flex"
            flexDirection="column"
        >
            {item.text}
        </Paragraph>
    );

    const onSubmit = async (data: any) => {
        const { error } = await supabase
            .from('messages')
            .insert([{ text: data.message, chat_id: chatId }])
            .single();

        if (error) {
            console.error('Error sending message:', error);
        } else {
            setValue('message', '');
            inputRef.current?.focus();
        }
    };

    return (
        <ChatView>
        <YStack flex={1}>
            <FlatList
                onContentSizeChange={handleScrollToEnd}
                ref={chatRef}
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <XStack gap="$2" p="$4" ai="center" backgroundColor="$backgroundHover">
                <Controller
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            f={1}
                            ref={inputRef}
                            placeholder="Type your message..."
                            onKeyPress={handleKeyPress}
                            h="$4"
                        />
                    )}
                    name="message"
                    rules={{ required: true }}
                />
                <Button onPress={handleSubmit(onSubmit)} icon={<Send size="$1" />} chromeless></Button>
            </XStack>
        </YStack>
        </ChatView>
    );
};

export default ChatScreen;
