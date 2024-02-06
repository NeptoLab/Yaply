import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FlatList } from 'react-native';
import { Check } from '@tamagui/lucide-icons'
import { Input, Button, Form, Label, View, YStack, XStack, Text, Checkbox, ListItem, Avatar } from 'tamagui';
import supabase from 'utils/supabase';
import ChatContext from 'contexts/ChatContext';
import { useRouter } from 'expo-router';

type CreateChatForm = {
  name: string;
  members: any[];
};

const CreateChat = () => {
  const { control, handleSubmit } = useForm<CreateChatForm>();
  const [contacts, setContacts] = useState<any[]>([]);
  const { fetchChats } = useContext(ChatContext);
  const router = useRouter();

  useEffect(() => {
    const fetchContacts = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase.from('contacts').select('*, profile:profiles!contacts_contact_user_id_fkey(*)').eq('user_id', user.id);
      if (error) {
        console.error(error);
      } else {
        console.log('contacts', data);
        setContacts(data);
      }
    };

    fetchContacts();
  }, []);

  const onSubmit = async (formData: CreateChatForm) => {
    const { data, error } = await supabase
      .from('chats')
      .insert([{ name: formData.name }])
      .select()
      .single();

    if (error) {
      console.log('error creating chat:', error);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error('no user found');
      return;
    }

    await supabase.from('members').insert([
      { chat_id: data.id, user_id: user.id },
      ...formData.members.map(
        (member) => ({ chat_id: data.id, user_id: member.contact_user_id })
      )
    ]);

    fetchChats();

    router.replace(`/chats/${data.id}`);
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
          contacts.length > 0 ? <YStack my="$4">
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
                    <Avatar.Image
                      accessibilityLabel={item.name}
                      src={item.avatar}
                    />
                    <Avatar.Fallback backgroundColor="$blue10" />
                  </Avatar>
                  <Text f={1}>{item.profile.name}</Text>
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

      <Button onPress={handleSubmit(onSubmit)}>
        Create Chat
      </Button>
    </Form>
  );
};

export default CreateChat;
