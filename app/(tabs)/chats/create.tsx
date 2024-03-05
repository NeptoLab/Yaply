import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FlatList } from 'react-native';
import { Check } from '@tamagui/lucide-icons'
import { Input, Button, Form, Label, YStack, Text, Checkbox, ListItem, Avatar } from 'tamagui';
import { useRouter } from 'expo-router';
import useUser from '@yaply/core/hooks/useUser';
import useCreateChat from '@yaply/core/hooks/useCreateChat';
import AddMemberInput from '@yaply/react/components/AddMemberInput';

const CreateChat = () => {
  const { control, handleSubmit } = useForm();
  const { user, isLoading } = useUser();
  const { trigger: handleCreateChat } = useCreateChat();
  const router = useRouter();

  useEffect(() => {
      if (!isLoading && !user) {
        router.push('/login');
        return;
      }
  }, [user, isLoading]);

  const onSubmit = async (data) => {
    const chat = await handleCreateChat(data);

    router.replace(`/chats/${chat.id}`);
  };

  return (
    <Form f={1} mx="$4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <YStack my="$4">
            <Label htmlFor="name">
              Name
            </Label>
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Enter your name"
            />
          </YStack>
        )}
        name="name"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <YStack my="$4">
            <Label htmlFor="name">
              Add Members to Chat
            </Label>
            <AddMemberInput onChange={onChange} onBlur={onBlur} value={value} />
          </YStack>
        )}
        name="members"
        defaultValue={[]}
      />

      {/* <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <YStack my="$4">
            <Label htmlFor="name">
              Invite
            </Label>
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Enter email address"
            />
          </YStack>
        )}
        name="name"
        defaultValue=""
      /> */}

      <Form.Trigger asChild>
        <Button>
          Create Chat
        </Button>
      </Form.Trigger>
    </Form>
  );
};

export default CreateChat;
