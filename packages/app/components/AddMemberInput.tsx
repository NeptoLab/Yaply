import React from 'react';
import BaseAddMemberInput from '@yaply/react/components/AddMemberInput';
import useContacts from '@yaply/hooks/useContacts';

const AddMemberInput = (props) => {
  const { contacts } = useContacts();

  return (
    <BaseAddMemberInput
      contacts={contacts}
      {...props}
    />
  );
};

export default AddMemberInput;
