"use client";
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { Button, Input, Stack, Text, ToggleGroup as Group, Form } from 'tamagui';
import useAuth from '@yaply/core/hooks/useAuth';

const LoginScreen = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const auth = useAuth();
    const [emailOrPhoneEntered, setEmailOrPhoneEntered] = useState(false);

    const onSubmit = async (data) => {
        try {
            const { data: { user }, error } = await auth.signInWithPassword(
                { email: data.email, password: data.password }
            );
            if (error) {
                console.error(error);
                // Handle login error
            } else {
                console.log(user);
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
                    name="email"
                    control={control}
                    rules={{ required: 'Email is required' }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Email"
                            onBlur={() => setEmailOrPhoneEntered(true)}
                        />
                    )}
                />
                {errors.email && <Text color="red">This field is required</Text>}

                  <Controller
                      name={'password'}
                      control={control}
                      rules={{ required: 'Password is required' }}
                      render={({ field }) => <Input {...field} placeholder={'Password'} secureTextEntry />}
                  />

                {emailOrPhoneEntered && errors.password && <Text color="red">This field is required</Text>}

                
                <Form.Trigger asChild>
                    <Button>Login</Button>
                </Form.Trigger>
            </Form>
        );
    };

    export default LoginScreen;
