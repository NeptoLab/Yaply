import supabase from 'utils/supabase';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { Button, Input, Text, Avatar, Label, Form, YStack } from 'tamagui';
import useUser from 'hooks/useUser';
import { useEffect } from 'react';
import useProfile from 'hooks/useProfile';

const SettingsScreen = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const { user } = useUser();
    const { profile } = useProfile(user?.id);

    useEffect(() => {
        if (user) {
            router.push('/login');
        }
    }, []);

    const onSubmit = async (data) => {
        try {
            if (!user) {
                throw new Error('User not found');
            }

            const { data: profile, error } = await supabase.from('profiles').upsert({
                id: user.id,
                ...data
            });
            if (error) {
                console.error(error);
                // Handle login error
            } else {
                console.log(profile);
                router.push('/');
            }
        } catch (error) {
            console.error(error);
            // Handle login error
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} maw={400} w="100%" p="$4" f={1} jc="center" als="center" gap="$4">
            <Controller
                name="avatar"
                control={control}
                render={({ field }) => (
                    <YStack>
                        <Avatar circular size="$4">
                            {profile?.avatar && <Avatar.Image
                                accessibilityLabel={profile.name || ''}
                                src={profile.avatar}
                            />}
                            <Avatar.Fallback backgroundColor="$blue10" />
                        </Avatar>
                    </YStack>
                )}
            />
            {errors.name && <Text color="red">This field is required</Text>}
            
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <YStack>
                        <Label>Full Name</Label>
                        <Input
                            {...field}
                            placeholder="Full Name"
                        />
                    </YStack>
                )}
            />
            {errors.name && <Text color="red">This field is required</Text>}

            <Form.Trigger asChild>
                <Button>Save</Button>
            </Form.Trigger>
        </Form>
    );
};

export default SettingsScreen;
