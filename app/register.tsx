import supabase from 'utils/supabase';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { Button, Input, Stack, Text, ToggleGroup as Group, Label, Form, YStack } from 'tamagui';

const RegisterScreen = () => {
    const { control, handleSubmit, formState: { errors }, watch } = useForm();
    const router = useRouter();
    const password = watch('password');

    const onSubmit = async (data) => {
        try {
            const { data: { user }, error } = await supabase.auth.signUp(
                { email: data.email, password: data.password }
            );
            if (error) {
                console.error(error);
                // Handle registration error
            } else {
                console.log(user);
                router.push('/');
            }
        } catch (error) {
            console.error(error);
            // Handle registration error
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} maw={400} w="100%" p="$4" f={1} jc="center" als="center" gap="$4">
            <Controller
                name="email"
                control={control}
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                    <YStack>
                        <Label>Email</Label>
                        <Input
                            {...field}
                            placeholder="Email"
                        />
                    </YStack>
                )}
            />
            {errors.email && <Text color="red">This field is required</Text>}

            <Controller
                name={'password'}
                control={control}
                rules={{ required: 'Password is required' }}
                render={({ field }) => (
                    <YStack>
                        <Label>Password</Label>
                        <Input {...field} placeholder={'Password'} secureTextEntry />
                    </YStack>
                )}
            />
            {errors.password && <Text color="red">This field is required</Text>}

            <Controller
                name={'confirmPassword'}
                control={control}
                rules={{
                    required: 'Confirm Password is required',
                    validate: (value) => value === password || 'Passwords do not match'
                }}
                render={({ field }) => (
                    <YStack>
                        <Label>Confirm Password</Label>
                        <Input {...field} placeholder={'Confirm Password'} secureTextEntry />
                    </YStack>
                )}
            />
            {errors.confirmPassword && <Text color="red">{errors.confirmPassword.message}</Text>}

            <Form.Trigger asChild>
                <Button>Register</Button>
            </Form.Trigger>
        </Form>
    );
};

export default RegisterScreen;
