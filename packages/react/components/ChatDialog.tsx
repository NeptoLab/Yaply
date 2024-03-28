import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { YStack, XStack, Paragraph, Input, Button } from 'tamagui';
import { Send } from '@tamagui/lucide-icons';
import { Message } from '@yaply/types/models';

const ChatDialog: React.FC<{ chatId?: string, userId?: string, messages?: Message[], handleSendMessage?: any }> = ({ messages = [], userId = null, chatId = null, handleSendMessage }) => {
    const { handleSubmit, control, setValue } = useForm();
    const chatRef = React.useRef<FlatList>(null);
    const inputRef = React.useRef<Input>(null);

    const handleScrollToEnd = () => {
        chatRef.current?.scrollToEnd();
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

    const handleKeyPress = (e) => {
        if (e.shiftKey) {
            return;
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    const renderItem = ({ item }) => (
        <Paragraph
            backgroundColor={item.user_id === userId ? '$blue10' : '$gray4'}
            br="$2"
            m="$4"
            p="$2"
            alignSelf={item.user_id === userId ? 'flex-end' : 'flex-start'}
            display="flex"
            flexDirection="column"
            color={item.user_id === userId ? 'white' : '$text'}
        >
            {item.text}
        </Paragraph>
    );

    const onSubmit = async (data) => {
        setValue('message', '');
        await handleSendMessage({ text: data.message, chat_id: chatId });
        inputRef.current?.focus();
    };

    return (
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
    );
};

export default ChatDialog;
