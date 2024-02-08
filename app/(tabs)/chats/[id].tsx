import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { YStack, XStack, Paragraph, Input, Button } from 'tamagui';
import { Send } from '@tamagui/lucide-icons';
import ChatView from 'components/ChatView';
import useChat from 'hooks/useChat';
import useSendMessage from 'hooks/useSendMessage';

const ChatScreen: React.FC = () => {
    const { handleSubmit, control, setValue } = useForm();
    const { id: chatId } = useLocalSearchParams();
    const [ messages, setMessages ] = useState<any[]>([]);
    const { trigger: handleSendMessage } = useSendMessage(chatId);
    const { chat } = useChat(chatId, { 
        onMessage: (message) => setMessages((prevMessages) => [...prevMessages, message]),
    });
    const navigation = useNavigation();
    const chatRef = React.useRef<FlatList>(null);
    const inputRef = React.useRef<Input>(null);

    const handleScrollToEnd = () => {
        chatRef.current?.scrollToEnd();
    };

    useEffect(() => {
        if (chat) {
            navigation.setOptions({
                title: chat.name,
            });
            setMessages(chat.messages);
        }
    }, [chat]);

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

    const renderItem = ({ item }: { item: any }) => (
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
        await handleSendMessage({ text: data.message, chat_id: chatId });
        setValue('message', '');
        inputRef.current?.focus();
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
