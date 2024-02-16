import React from 'react';
import { Link } from 'expo-router';
import { Button } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';

const AddChatButton = () => {
    return (
      <Link href="/chats/create">
        <Button p="$2" m="$4" chromeless>
          <Plus />
        </Button>
      </Link>
    )
};

export default AddChatButton;
