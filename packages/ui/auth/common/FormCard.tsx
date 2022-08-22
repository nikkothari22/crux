import { BoxProps, Stack, useColorModeValue } from '@chakra-ui/react'

export const FormCard = (props: BoxProps) => {
    return (
        <Stack
            spacing={6}
            bg={useColorModeValue('white', 'gray.800')}
            py="8"
            px={{ base: '4', md: '8' }}
            shadow="md"
            rounded={{ sm: 'lg' }}
            {...props}
        />
    )
}
