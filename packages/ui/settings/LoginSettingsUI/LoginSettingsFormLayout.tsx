import { Box, chakra, Text, Divider, FormControl, FormErrorMessage, FormLabel, HStack, Input, Switch, Button, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginProvider, LoginSettings } from 'types';
import { BreadCrumb } from '../../layout';
import LoginProviders from './LoginProviders';
import LogoUpload from './LogoUpload';

interface Props {
    getSettings: () => Promise<LoginSettings>,
    updateSettings: (data: LoginSettings) => Promise<any>,
}

interface LoginForm {
    loginHeading: string,
    signupHeading: string,
    loginText: string,
    signupText: string,
}

export const LoginSettingsFormLayout = ({ getSettings, updateSettings }: Props) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [providers, setProviders] = useState<LoginProvider[]>([])
    const [isSignupEnabled, setSignup] = useState(false)
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<LoginForm>()

    useEffect(() => {
        getSettings().then((settings) => {
            setProviders(settings.providers)
            setSignup(settings.signup_enabled)
            setValue('loginHeading', settings.heading.login)
            setValue('loginText', settings.text?.login ?? "")
            setValue('signupHeading', settings.heading.signup)
            setValue('signupText', settings.text?.signup ?? "")
            setError(null)
            setLoading(false)
        });
    }, []);

    const updateLoginSettings = (data: LoginForm) => {
        console.log(data)
        updateSettings({
            logo: {
                light: '',
                dark: ''
            },
            heading: {
                login: data.loginHeading,
                signup: data.signupHeading,
            },
            text: {
                login: data.loginText,
                signup: data.signupText,
            },
            signup_enabled: isSignupEnabled,
            providers: []
        }).then((x) => {
            console.log("data from update", x)
        }).catch((error) => {
            console.error("error from update", error)
        })
    }

    // console.log(errors)

    return (
        <>
            <BreadCrumb
                currentPage="Login Page Settings"
                previousPage="Settings"
                previousPageLink="/settings" />
            <Heading fontSize={{ base: '20px', md: '30px', lg: '40px' }}>
                Login Page Settings
            </Heading>
            <Divider mt={{ base: 4, md: 4, lg: 6 }} maxW="90vw" />

            <chakra.form id="loginForm" onSubmit={handleSubmit(updateLoginSettings)}>

                <LogoUpload />

                {/* Input Login Heading */}
                <FormControl
                    isInvalid={!!errors?.loginHeading}>
                    <HStack spacing={{ base: 4, md: 16, lg: 20 }} mt={{ base: 5, md: 6, lg: 8 }}>
                        <FormLabel fontWeight="semibold"
                            fontSize={{ base: '14px', md: '16px', lg: '18px' }}>
                            Login form heading
                        </FormLabel>
                        <Input {...register("loginHeading",
                            {
                                required: "The login heading should not be blank, please enter an appropriate phrase.",
                                maxLength: {
                                    value: 100,
                                    message: "The heading cannot be more than 100 characters."
                                }
                            })}
                            fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                            placeholder="Ex: 'Welcome back'"
                            maxWidth="60vw" />
                    </HStack>
                    <FormErrorMessage pl={{ base: 110, md: 220, lg: 250 }}>
                        {errors?.loginHeading?.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl
                    isInvalid={!!errors?.loginText}>
                    <HStack spacing={{ base: 4, md: 16, lg: 20 }} mt={{ base: 5, md: 6, lg: 8 }}>
                        <FormLabel fontWeight="semibold"
                            fontSize={{ base: '14px', md: '16px', lg: '18px' }}>
                            Login form sub-text
                        </FormLabel>
                        <Input {...register("loginText",
                            {
                                maxLength: {
                                    value: 100,
                                    message: "The text cannot be more than 100 characters."
                                }
                            })}
                            placeholder="Ex: 'Sign in to Supabase'"
                            maxWidth="60vw" />
                    </HStack>
                    <FormErrorMessage pl={{ base: 110, md: 220, lg: 250 }}>
                        {errors?.loginText?.message}
                    </FormErrorMessage>
                </FormControl>
                <Divider mt={{ base: 5, md: 6, lg: 8 }} maxW="90vw" />

                {/* Is signup enabled */}
                <Box mt={{ base: 5, md: 6, lg: 8 }}>
                    <HStack spacing={24}>
                        <Text fontWeight="semibold"
                            fontSize={{ base: '14px', md: '16px', lg: '18px' }}>
                            Enable Email Signup
                        </Text>
                        <Switch
                            defaultChecked={true}
                            onChange={() => setSignup(!isSignupEnabled)}
                        />
                    </HStack>
                </Box>

                {isSignupEnabled &&
                    <>
                        <Divider mt={{ base: 5, md: 6, lg: 8 }} maxW="90vw" />
                        {/* Input Signup Heading */}
                        <FormControl
                            isInvalid={!!errors?.signupHeading}>
                            <HStack spacing={{ base: 4, md: 16, lg: 20 }} mt={{ base: 5, md: 6, lg: 8 }}>
                                <FormLabel fontWeight="semibold"
                                    fontSize={{ base: '14px', md: '16px', lg: '18px' }}>
                                    Signup form heading
                                </FormLabel>
                                <Input {...register("signupHeading",
                                    {
                                        required: "The signup heading should not be blank, please enter an appropriate phrase.",
                                        maxLength: {
                                            value: 100,
                                            message: "The heading cannot be more than 100 characters."
                                        }
                                    })}
                                    placeholder="Ex: 'Create your account'"
                                    maxWidth="60vw" />
                            </HStack>
                            <FormErrorMessage pl={{ base: 110, md: 240, lg: 270 }}>
                                {errors?.signupHeading?.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            isInvalid={!!errors?.signupText}>
                            <HStack spacing={{ base: 4, md: 16, lg: 20 }} mt={{ base: 5, md: 6, lg: 8 }}>
                                <FormLabel fontWeight="semibold"
                                    fontSize={{ base: '14px', md: '16px', lg: '18px' }}>
                                    Signup form sub-text
                                </FormLabel>
                                <Input {...register("signupText",
                                    {
                                        maxLength: {
                                            value: 100,
                                            message: "The text cannot be more than 100 characters."
                                        }
                                    })}
                                    placeholder="Ex: 'Sign up for Supabase'"
                                    maxWidth="60vw" />
                            </HStack>
                            <FormErrorMessage pl={{ base: 110, md: 240, lg: 270 }}>
                                {errors?.signupText?.message}
                            </FormErrorMessage>
                        </FormControl>

                    </>
                }
                <Divider mt={{ base: 5, md: 6, lg: 8 }} maxW="90vw" />

                <LoginProviders />

                <HStack spacing={4} mt={10} mb={16}>
                    <Button
                        colorScheme="blue"
                        type="submit"
                        disabled={loading}
                        loadingText="Saving">
                        Save Changes
                    </Button>
                </HStack>

            </chakra.form>
        </>
    )
};

function getLoginSettingsFromDatabase() {
    throw new Error('Function not implemented.');
}