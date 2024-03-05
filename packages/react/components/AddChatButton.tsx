import React from 'react';
import { Button, ButtonProps } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';

const AddChatButton: React.FC<ButtonProps> = (props) => {
    return (
      <Button p="$2" m="$4" chromeless {...props}>
        <Plus />
      </Button>
    )
};

export default AddChatButton;
