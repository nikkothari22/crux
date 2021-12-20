import {
    Flex,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { DividerWithText } from '../../layout'
import { EmailPasswordForm, FormCard, getSocialButtonPropsFromProvider, Header, SocialButton } from '../common'
import { LoginSettings } from 'types'
import NextLink from 'next/link'
import { ColorModeButton } from '../../theme'

export const SignupForm = ({ metadata }: { metadata: LoginSettings }) => {

    const { heading, text, logo, signup_enabled, providers } = metadata
    return (
        <>
            <Flex
                bg={useColorModeValue('gray.50', 'gray.900')}
                minH="100vh"
                py="12"
                w="full"
                justify="center"
                align="center"
                px={{ base: '4', lg: '8' }}
            >
                <Stack maxW="lg" minW={{ base: 'full', md: 'md' }} mx="auto" spacing={4} mb={8}>
                    <Header text={text?.signup} heading={heading.signup} logo={logo} />

                    <FormCard>
                        {providers.includes("password") &&
                            <>
                                <EmailPasswordForm page="signup" />
                                {providers.length > 1 &&
                                    <DividerWithText mt="4" mb="4">OR</DividerWithText>}
                            </>
                        }

                        <Stack spacing={4}>
                            {providers.map(provider => provider !== "password" && <SocialButton
                                {...getSocialButtonPropsFromProvider(provider)}
                                onClick={() => console.log(provider, " clicked!")}
                            />
                            )}
                        </Stack>
                    </FormCard>
                    {signup_enabled &&
                        <Text pt="4" align="center" maxW="md" fontWeight="medium">
                            <Text as="span">Already have an account?</Text>
                            <NextLink href="/login">
                                <Link
                                    marginStart="1"
                                    color={useColorModeValue('blue.500', 'blue.200')}
                                    _hover={{ color: useColorModeValue('blue.600', 'blue.300') }}
                                    display={{ base: 'block', sm: 'inline' }}
                                >
                                    Sign in here
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