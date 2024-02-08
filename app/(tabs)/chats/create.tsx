import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FlatList } from 'react-native';
import { Check } from '@tamagui/lucide-icons'
import { Input, Button, Form, Label, YStack, Text, Checkbox, ListItem, Avatar } from 'tamagui';
import { useRouter } from 'expo-router';
import useUser from 'hooks/useUser';
import useContacts from 'hooks/useContacts';
import useCreateChat from 'hooks/useCreateChat';

const CreateChat = () => {
  const { control, handleSubmit } = useForm();
  const { user, isLoading } = useUser();
  const { contacts } = useContacts();
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
    <Form w="100%" maw={800} p="$4" alignSelf="center" onSubmit={handleSubmit(onSubmit)}>
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
          contacts && contacts.length > 0 ? <YStack my="$4">
            <Label htmlFor="name">
              Contacts
            </Label>
            <FlatList
              data={contacts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const isSelected = !!value.find((v) => v.id === item.id);
                return <ListItem gap="$4" p="$4">
                  <Checkbox 
                    onCheckedChange={() => onChange(!isSelected ? [item, ...value] : value.filter((v) => v.id !== item.id))}
                    onBlur={onBlur}
                    checked={!!value.find((v) => v.id === item.id)}
                  >
                    <Checkbox.Indicator>
                      <Check />
                    </Checkbox.Indicator>
                  </Checkbox>
                  <Avatar circular size="$4">
                    {item.profile?.avatar && <Avatar.Image
                      accessibilityLabel={item.profile.name || ''}
                      src={item.profile.avatar}
                    />}
                    <Avatar.Fallback backgroundColor="$blue10" />
                  </Avatar>
                  <Text f={1}>{item.profile?.name || ''}</Text>
                </ListItem>
              }}
            />
          </YStack> : <></>
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
