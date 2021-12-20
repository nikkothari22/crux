import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
    useDisclosure,
    useMergeRefs,
    useColorModeValue as mode,
    Button,
    Stack,
    Link,
    chakra,
    HTMLChakraProps,
} from '@chakra-ui/react'
import * as React from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import NextLink from 'next/link'
interface Props extends HTMLChakraProps<'form'> {
    page: 'login' | 'signup'
}

export const EmailPasswordForm = ({ page, ...props }: Props) => {
    return (
        <chakra.form
            onSubmit={(e) => {
                e.preventDefault()
                // your login logic here
            }}
            {...props}
        >
            <Stack spacing="4">
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input name="email" type="email" autoComplete="email" required />
                </FormControl>
                <PasswordField showForgotPassword={page === "login"} />
                <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                    {page === "login" ? "Sign in" : "Sign up"}
                </Button>
            </Stack>
        </chakra.form>
    )
}

interface PasswordInputProps extends InputProps {
    showForgotPassword?: boolean
}

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = React.useRef<HTMLInputElement>(null)

    const mergeRef = useMergeRefs(inputRef, ref)

    const onClickReveal = () => {
        onToggle()
        const input = inputRef.current
        if (input) {
            input.focus({ preventScroll: true })
            const length = input.value.length * 2
            requestAnimationFrame(() => {
                input.setSelectionRange(length, length)
            })
        }
    }

    return (
        <FormControl id="password">
            <Flex justify="space-between">
                <FormLabel>Password</FormLabel>
                {props.showForgotPassword &&
                    <NextLink href="/forgot-password">
                        <Link color={mode('blue.600', 'blue.200')} fontWeight="semibold" fontSize="sm">
                            Forgot Password?
                        </Link>
                    </NextLink>
                }
            </Flex>
            <InputGroup>
                <InputRightElement>
                    <IconButton
                        bg="transparent !important"
                        variant="ghost"
                        aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                    />
                </InputRightElement>
                <Input
                    ref={mergeRef}
                    name="password"
                    type={isOpen ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    {...props}
                />
            </InputGroup>
        </FormControl>
    )
})

PasswordField.displayName = 'PasswordField'
