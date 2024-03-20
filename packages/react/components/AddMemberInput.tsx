import React from 'react';
import { FlatList } from 'react-native';
import { ListItem, Avatar, Checkbox, Text } from 'tamagui';
import { Check } from '@tamagui/lucide-icons';

const AddMemberInput = ({ contacts, value, onBlur, onChange }) => {
  if (!contacts) {
      return null;
  }

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const isSelected = !!value.find((v) => v.id === item.id);
        return <ListItem gap="$4" padding="$4">
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
          <Text flex={1}>{item.profile?.name || ''}</Text>
        </ListItem>
      }}
    />
  );
};

export default AddMemberInput;
