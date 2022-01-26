import {
    Flex,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { DividerWithText } from '../../layout'
import { EmailPasswordForm, FormCard, getSocialButtonPropsFromProvider, Header, SocialButton } from '../common'
import { CustomError, LoginProvider, LoginSettings } from 'types'
import NextLink from 'next/link'
import { ColorModeButton } from '../../theme'

interface Props {
    metadata: LoginSettings,
    callback: (provider: LoginProvider, options?: {
        email?: string,
        password?: string,
    }) => void,
    state: {
        loading: boolean,
        error: CustomError | null
    }
}
export const LoginForm = ({ metadata, callback, state }: Props) => {

    const { heading, text, logo, signup_enabled, providers } = metadata
    return (
        <>
            <Flex
                bg={useColorModeValue('gray.50', 'gray.900')}
                minH="100vh"
                w="full"
                justify="center"
                align="center"
                py="12"
                px={{ base: '4', lg: '8' }}
            >
                <Stack maxW="lg" minW={{ base: 'full', md: 'md' }} mx="auto" spacing={4} mb={8}>
                    <Header text={text?.login} heading={heading.login} logo={logo} />

                    <FormCard>
                        {providers.includes("password") &&
                            <>
                                <EmailPasswordForm
                                    page="login"
                                    callback={(email: string, password: string) => callback('password', { email, password })}
                                    state={state} />
                                {providers.length > 1 &&
                                    <DividerWithText>OR</DividerWithText>}
                            </>
                        }

                        <Stack spacing={4}>
                            {providers.map(provider => provider !== "password" && <SocialButton
                                {...getSocialButtonPropsFromProvider(provider)}
                                onClick={() => callback(provider)}
                                key={provider}
                            />
                            )}
                        </Stack>

                    </FormCard>
                    {signup_enabled &&
                        <Text pt="4" align="center" maxW="md" fontWeight="medium">
                            <Text as="span">Do not have an account?</Text>
                            <NextLink href="/signup">
                                <Link
                                    marginStart="1"
                                    color={useColorModeValue('blue.500', 'blue.200')}
                                    _hover={{ color: useColorModeValue('blue.600', 'blue.300') }}
                                    display={{ base: 'block', sm: 'inline' }}>
                                    Sign up here
                                </Link>
                            </NextLink>
                        </Text>
                    }
                </Stack>
            </Flex>
            <ColorModeButton position="absolute" top={4} right={4} variant="ghost" />
        </>
    )
}