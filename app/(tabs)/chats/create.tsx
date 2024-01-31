import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FlatList } from 'react-native';
import { Input, Button, Form, Label, View, YStack, XStack, Text, Checkbox, ListItem, Avatar } from 'tamagui';
import supabase from 'utils/supabase';

const CreateChat = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    await supabase.from('chats').insert([{ name: data.name }]);
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
          <YStack my="$4">
            <Label htmlFor="name">
              Contacts
            </Label>

            <ListItem gap="$4" p="$4">
              <Checkbox
                onCheckedChange={onChange}
                onBlur={onBlur}
                value={value}
              />
              <Avatar circular size="$4">
              <Avatar.Image
                accessibilityLabel="Cam"
                src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
              />
              <Avatar.Fallback backgroundColor="$blue10" />
            </Avatar>
              <Text f={1}>Georgii Ivanov</Text>
            </ListItem>

          </YStack>
        )}
        name="members"
        defaultValue=""
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

      <Button onPress={handleSubmit(onSubmit)}>
        Create Chat
      </Button>
    </Form>
  );
};

export default CreateChat;
