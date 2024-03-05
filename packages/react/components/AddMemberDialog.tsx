import { Dialog, Sheet, Adapt, Button, Unspaced, XStack, Form } from 'tamagui';
import AddMemberInput from './AddMemberInput';
import { Controller, useForm } from 'react-hook-form';
import { X } from '@tamagui/lucide-icons';

const AddMemberDialog = ({ children }) => {
  const { control } = useForm();

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>

          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Add Members</Dialog.Title>
          <Dialog.Description>
            Select new members to add to this chat.
          </Dialog.Description>
          <Form my="$4" onSubmit={() => undefined}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <AddMemberInput onChange={onChange} onBlur={onBlur} value={value} />
            )}
            name="members"
            defaultValue={[]}
          />
        </Form>

          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>

              <Button theme="active" aria-label="Close">

                Save changes

              </Button>

            </Dialog.Close>

          </XStack>
          <Unspaced>

            <Dialog.Close asChild>

              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />

            </Dialog.Close>

          </Unspaced>

        </Dialog.Content>

      </Dialog.Portal>

    </Dialog>

  )

}

export default AddMemberDialog;
