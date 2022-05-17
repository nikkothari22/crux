import { Box, chakra, Text, Divider, FormControl, FormErrorMessage, FormLabel, HStack, Input, Switch, Button, Heading, Flex, Spinner, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomError, LoginProvider, LoginSettings } from 'types';
import { AlertBanner, BreadCrumb } from '../../layout';
import LoginProviders from './LoginProviders';
import LogoUpload from './LogoUpload';
import { useRouter } from 'next/router'

interface Props {
    getSettings: () => Promise<LoginSettings>,
    updateSettings: (data: LoginSettings) => Promise<any>,
}

interface LoginForm {
    light: string,
    dark: string,
    loginHeading: string,
    signupHeading: string,
    loginText: string,
    signupText: string,
}

export const LoginSettingsFormLayout = ({ getSettings, updateSettings }: Props) => {

    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [error, setError] = useState<CustomError | null>(null)
    const [providers, setProviders] = useState<LoginProvider[]>([])
    const [isSignupEnabled, setSignup] = useState(false)
    const methods = useForm<LoginForm>()
    const { register, setValue, handleSubmit, formState: { errors } } = methods
    const toast = useToast()
    const router = useRouter()

    useEffect(() => {
        getSettings().then((settings) => {
            setProviders(settings.providers)
            setSignup(settings.signup_enabled)
            setValue('loginHeading', settings.heading.login)
            setValue('loginText', settings.text?.login ?? "")
            setValue('signupHeading', settings.heading.signup)
            setValue('signupText', settings.text?.signup ?? "")
            setValue('light', settings.logo?.light ?? "")
            setValue('dark', settings.logo?.dark ?? "")
            setError(null)
            setLoading(false)
        });
    }, []);

    const updateLoginSettings = (data: LoginForm) => {
        // console.log(data)
        setUpdating(true)
        updateSettings({
            logo: {
                light: data.light,
                dark: data.dark,
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
            providers: providers
        }).then((x) => {
            console.log("data from update", x)
            toast({
                title: 'Settings saved',
                status: 'success',
                duration: 1000,
                isClosable: true,
            })
        }).catch((error) => {
            console.error("error from update", error)
        })
            .finally(() => {
                setUpdating(false)
                router.reload()
            })

    }

    // console.log(errors)

    return (
        <>
            <BreadCrumb
                pages={
                    [{
                        name: "Settings",
                        url: '/settings',
                    },
                    {
                        name: "Login Page Settings",
                        url: '/settings/loginPageSettings',
                        isCurrent: true
                    }]
                } />

            {loading ? <Flex align="center" justify="center" height="50vh" width="full"><Spinner /></Flex> :

                error ? <AlertBanner status="error" heading="There was an error while fetching the request.">{error.message} - {error.code}</AlertBanner> :

                    <FormProvider {...methods}>

                        <chakra.form id="loginForm" onSubmit={handleSubmit(updateLoginSettings)}>

                            <Flex justifyContent="space-between">
                                <Heading fontSize={{ base: '20px', md: '30px', lg: '40px' }}>
                                    Login Page Settings
                                </Heading>
                                <Button
                                    colorScheme="blue"
                                    type="submit"
                                    isLoading={updating}
                                    loadingText="Saving...">
                                    Save Changes
                                </Button>
                            </Flex>

                            <Divider mt={{ base: 4, md: 4, lg: 6 }} />

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
                            <Divider mt={{ base: 5, md: 6, lg: 8 }} />

                            {/* Is signup enabled */}
                            <Box mt={{ base: 5, md: 6, lg: 8 }}>
                                <HStack spacing={24}>
                                    <Text fontWeight="semibold"
                                        fontSize={{ base: '14px', md: '16px', lg: '18px' }}>
                                        Enable Email Signup
                                    </Text>
                                    <Switch
                                        isChecked={isSignupEnabled}
                                        onChange={() => setSignup(!isSignupEnabled)}
                                    />
                                </HStack>
                            </Box>

                            {isSignupEnabled &&
                                <>
                                    <Divider mt={{ base: 5, md: 6, lg: 8 }} />

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
                            <Divider mt={{ base: 5, md: 6, lg: 8 }} />

                            <LoginProviders providers={providers} updateSettings={setProviders} />

                            <HStack spacing={4} mt={10} mb={16}>
                                <Button
                                    colorScheme="blue"
                                    type="submit"
                                    isLoading={updating}
                                    loadingText="Saving...">
                                    Save Changes
                                </Button>
                            </HStack>

                        </chakra.form>
                    </FormProvider>
            }
        </>
    )
};