import {
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
import { useForm } from 'react-hook-form'
import { CustomError } from 'types'

interface Props extends HTMLChakraProps<'form'> {
    page: 'login' | 'signup',
    callback: (email: string, password: string) => void,
    state?: {
        loading: boolean,
        error: CustomError | null
    }
}
interface EmailPasswordFormFields {
    email: string,
    password: string
}

export const EmailPasswordForm = ({ page, callback, state, ...props }: Props) => {

    const { register, handleSubmit } = useForm<EmailPasswordFormFields>()

    const onSubmit = (data: EmailPasswordFormFields) => {
        callback(data.email, data.password)
    }

    return (
        <chakra.form
            onSubmit={handleSubmit(onSubmit)}
            {...props}
        >
            <Stack spacing="4">
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" autoComplete="email" required {...register("email")} />
                </FormControl>
                <PasswordField showForgotPassword={page === "login"} {...register("password")} />
                <Button type="submit" colorScheme="blue" size="lg" fontSize="md" isLoading={state?.loading}>
                    {page === "login" ? "Sign in" : "Sign up"}
                </Button>
            </Stack>
        </chakra.form >
    )
}

interface PasswordInputProps extends InputProps {
    showForgotPassword?: boolean
}

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordInputProps>(({ showForgotPassword, ...props }, ref) => {
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
                {showForgotPassword &&
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