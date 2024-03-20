import React from 'react';
import BaseAddMemberDialog from '@yaply/react/components/AddMemberDialog';
import useContacts from '@yaply/hooks/useContacts';

const AddMemberDialog = (props) => {
  const { contacts } = useContacts();

  return (
    <BaseAddMemberDialog
      contacts={contacts}
      {...props}
    />
  );
};

export default AddMemberDialog;
